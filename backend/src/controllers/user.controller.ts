import express from 'express'
import UserM from '../models/user'
import user from '../models/user';

export class UserController{
    login = (req: express.Request, res: express.Response)=>{
        let u = req.body.username;
        let p = req.body.password;
        let t = req.body.type;

        UserM.findOne({username: u, password: p, type: t}).then((user)=>{
            res.json(user)
        }).catch((err)=>{
            console.log(err)
            res.json(null)
        })
    }

    register = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let type=req.body.type;
        let gender=req.body.gender;
        let address=req.body.address;
        let phone=req.body.phone;
        let email=req.body.email;
        let credit=req.body.credit;

        UserM.findOne({username: username}).then((user)=>{
            if(!user){
                UserM.findOne({email:email}).then((uuser)=>{
                    if(!uuser){
                        let userx = {
                            username: username,
                            password: password,
                            firstname: firstname,
                            lastname: lastname,
                            type: type,
                            gender: gender,
                            address: address,
                            phone: phone,
                            email:email,
                            credit:credit,
                            ban:false,
                            active:false
                        }
                        new UserM(userx).save().then(ok=>{
                            res.json({message: "Zahtev za registraciju uspesno poslat!"})
                        }).catch(err=>{
                            console.log(err)
                            res.json({message: "Error email"})
                        })
                    }
                    else{
                        if(uuser.ban==true){
                            res.json({message:"Ovaj email nije moguce koristiti!"})
                        }
                        else if(uuser.active==true){
                            res.json({message:"Ovaj email je zauzet!"})
                        }
                    }
                })
            }
            else{
                if(user.ban==true){
                    res.json({message:"Ovaj username nije moguce koristiti!"})
                }
                else if(user.active==true){
                    res.json({message:"Ovaj username je zauzet!"})
                }
            }
        }).catch((err)=>{
            console.log(err)
            res.json({message:"error username"})
        })
    }

    change=(req:express.Request,res:express.Response)=>{
        let username= req.body.username;
        let oldpassword= req.body.oldpassword;
        let newpassword= req.body.newpassword;

        UserM.findOne({username:username,password:oldpassword}).then(user=>{
            if(user){
                UserM.updateOne({username:username},{$set:{password: newpassword}}).then(data=>{
                    res.json({message:"ok"})
                }).catch(err=>{
                    res.json({message:"error"})
                })
            }
        }).catch(err=>{
            res.json({message:"Ne postoji korisnik sa unetim username-om ili starom lozinkom"})
        })
    }

    changeInfo=(req:express.Request,res:express.Response)=>{
        let oldInfo=req.body.old
        let newInfo=req.body.new
        let which=req.body.which
        let username=req.body.username
        switch (which) {
            case "username":
                UserM.updateOne({username:oldInfo},{$set:{username:newInfo}}).then(data=>{
                    res.json({message:"Uspesno promenjen username!"})
                }).catch(err=>{
                    res.json({message:"Neuspesno menjanje username-a!"})
                    }
                )
                break;
            case "password":
                UserM.updateOne({username:username,password:oldInfo},{$set:{password:newInfo}}).then(data=>{
                    res.json({message:"Uspesno promenjen password!"})
                }).catch(err=>{
                    res.json({message:"Neuspesno menjanje password-a!"})
                    }
                )
                break;
            case "firstname":
                UserM.updateOne({username:username,firstname:oldInfo},{$set:{firstname:newInfo}}).then(data=>{
                    res.json({message:"Uspesno promenjeno ime korisnika!"})
                }).catch(err=>{
                    res.json({message:"Neuspesno menjanje imena korisnika!"})
                    }
                )
                break;
            case "lastname":
                UserM.updateOne({username:username,lastname:oldInfo},{$set:{lastname:newInfo}}).then(data=>{
                    res.json({message:"Uspesno promenjeno prezime korisnika!"})
                }).catch(err=>{
                    res.json({message:"Neuspesno menjanje prezimena korisnika!"})
                    }
                )
                break;
            case "gender":
                UserM.updateOne({username:username,gender:oldInfo},{$set:{gender:newInfo}}).then(data=>{
                    res.json({message:"Uspesno promenjen pol korisnika!"})
                }).catch(err=>{
                    res.json({message:"Neuspesno menjanje pola korisnika!"})
                    }
                )
                break;
            case "address":
                UserM.updateOne({username:username,address:oldInfo},{$set:{address:newInfo}}).then(data=>{
                    res.json({message:"Uspesno promenjena adresa korisnika!"})
                }).catch(err=>{
                    res.json({message:"Neuspesno menjanje adrese korisnika!"})
                    }
                )
                break;
            case "phone":
                UserM.updateOne({username:username,phone:oldInfo},{$set:{phone:newInfo}}).then(data=>{
                    res.json({message:"Uspesno promenjen broj telefona korisnika!"})
                }).catch(err=>{
                    res.json({message:"Neuspesno menjanje broja telefona korisnika!"})
                    }
                )
                break;
            case "email":
                UserM.updateOne({username:username,email:oldInfo},{$set:{email:newInfo}}).then(data=>{
                    res.json({message:"Uspesno promenjen email korisnika!"})
                }).catch(err=>{
                    res.json({message:"Neuspesno menjanje email-a korisnika!"})
                    }
                )
                break;
            case "credit":
                UserM.updateOne({username:username,credit:oldInfo},{$set:{credit:newInfo}}).then(data=>{
                    res.json({message:"Uspesno promenjen broj kartice korisnika!"})
                }).catch(err=>{
                    res.json({message:"Neuspesno menjanje broja kartice korisnika!"})
                    }
                )
                break;
            default:
                break;
        }
    }

//////////////////////
    addToFavourites= (req: express.Request, res: express.Response)=>{
        let dateNow = new Date();
        let dateStr = dateNow.getFullYear() + "-" + (dateNow.getMonth()+1) + "-" + dateNow.getDate();
        let fav = {
            name: req.body.name,
            author: req.body.author,
            date: dateStr
        }
        UserM.updateOne({username: req.body.user}, {$push: {favourites: fav}}).then(data=>{
                res.json({message: "Ok"})
            }).catch(err=>{
                res.json({message: "Fail"})
            })
    }

    deleteFromFavourites = (req: express.Request, res: express.Response)=>{
        let name = req.body.book
        let user = req.body.user
        UserM.updateOne({username: user}, 
            {$pull: {favourites: {name: name}}}).then(data=>{
                res.json({message: "Ok"})
            }).catch(err=>{
                res.json({message: "Fail"})
            })
    }

    updateFavourite = (req: express.Request, res: express.Response)=>{
        let name = req.body.book
        let user = req.body.user

        UserM.updateOne({username: user}, {$set: {"favourites.$[fav].name": "New fav changed"}}, {arrayFilters: [{
            "fav.name": name
        }]}).then(data=>{
            res.json({message: "Ok"})
        }).catch(err=>{
            res.json({message: "Fail"})
        })
    }
///////////////////////////////////
    getUser = (req: express.Request, res: express.Response)=>{
        let user = req.params.user

        UserM.findOne({username: user}).then(user=>{
            res.json(user).status(200)
        }).catch(err=>{
            res.json({message: "Fail"}).status(400)
        })
    }

    getAllRegistrationRequests = (req:express.Request,res:express.Response)=>{
        console.log("eeeeeeee")
        UserM.find({active:false,ban:false}).then(users=>{
            res.json(users)
        }).catch(err=>{
            res.json(null)
        })
    }

    getAllLandlords = (req: express.Request, res: express.Response) => {
        UserM.find({type:"landlord",active:true,ban:false}).then(data=>{
            res.json(data)
        }).catch(err=>{
            res.json(null)
        })
    }

    getAllTourists = (req: express.Request, res: express.Response) => {
        UserM.find({type:"tourist",active:true,ban:false}).then(data=>{
            res.json(data)
        }).catch(err=>{
            res.json(null)
        })
    }

    banUser=(req:express.Request,res:express.Response)=>{
        let username=req.body.username
        UserM.updateOne({username:username},{$set:{ban:true}}).then(data=>{ 
            res.json({message:"Korisnik uspesno deaktiviran!"})
        }).catch(err=>{
            res.json({message:"Neuspesna deaktivacija korisnika"})
        })
    }

    accept=(req:express.Request,res:express.Response)=>{
        let username=req.body.username
        UserM.updateOne({username:username},{$set:{active:true}}).then(data=>{
            res.json({message:"Korisnik uspesno aktiviran!"})
        }).catch(err=>{
            res.json({message:"Neuspesna aktivacija korisnika"})
        })
    }

}