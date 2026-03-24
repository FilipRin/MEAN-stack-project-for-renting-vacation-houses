import express from 'express'
import ResM from '../models/reservation'
import VikM from '../models/vikendica'
import vikendica from '../models/vikendica';

export class ReservationController{
    validate = (req:express.Request,res:express.Response)=>{
        //da li postoji u bazi rezervacija izmedju perioda, za to mesto
        let dstart=req.body.dateStart;
        let dend=req.body.dateEnd;
        let name=req.body.name;
        let tour=req.body.tour;
        let vik=req.body.vik;
        let price=req.body.price;
        let requests=req.body.requests;
        let place=req.body.place;

        console.log(dstart<dend)
        console.log(typeof(dstart))
        
        let reserve={
            tourist:tour,
            dateStart:dstart,
            dateEnd:dend,
            vikendica:vik,
            price:price,
            requests:requests,
            active:false,
            place:place
        }
        
        console.log(reserve)
        let d=new Date(dend)
        console.log(d+"!   parsed")

        console.log(dend+" dend")


        /*ResM.findOne({vikendica:vik}).then(data=>{
            console.log(data)
        }).catch(err=>{
            console.log("NEAM BRE")
        })*/
        

        ResM.findOne({vikendica:name, $or:[
            { 
                dateStart:{$lte:dend,$gte:dstart},
            },
            {$and:[
                {dateStart:{$lte:dstart}},
                {dateEnd:{$gte:dend}}
            ]},
            {dateEnd:{$lte:dend,$gte:dstart}}
        ]}).then(data=>{
            console.log(data)
            if(!data){
                new ResM(reserve).save().then(ok=>{
                    res.json({message:"Rezervacija uspesno dodata!"})
                }).catch(err=>{
                    res.json({message:"Rezervacija nije uspela!"})
                })
            }
            else{   res.json({message:"U ovom periodu vec postoji rezervacija za ovo mesto, pokusajte ponovo sa novim datumom"})    }
        }).catch(err=>{
            new ResM(reserve).save().then(ok=>{
                res.json({message:"Rezervacija uspesno dodata, ceka se potvrda vlasnika!"})
            }).catch(err=>{
                res.json({message:"Rezervacija nije uspela!"})
            })
        })
    }

    getActiveReservations=(req:express.Request,res:express.Response)=>{
        let d=new Date()
        let user=req.params.username
        console.log("Provera date-a: "+d)

        ResM.find({active:true,tourist:user, dateStart:{$gt:d}}).then(data=>{
            res.json(data)
        }).catch(err=>{
            res.json(null)
        })
    }

    getPendingReservations=(req:express.Request,res:express.Response)=>{
        let d=new Date()
        let name=req.params.name

        ResM.find({active:false,vikendica:name, dateStart:{$gt:d}}).then(data=>{    
            res.json(data)
        }).catch(err=>{
            res.json(null)
        })
    }

    getAcceptedReservations=(req:express.Request,res:express.Response)=>{
        let name=req.params.name
        console.log("vikendicaaaaaaaa: "+name)
        ResM.find({active:true,vikendica:name}).then(data=>{
            console.log(data)
            res.json(data)
        }).catch(err=>{
            console.log(err)
            res.json(null)
        })
    }

    getArchivedReservations=(req:express.Request,res:express.Response)=>{
        let d=new Date()
        let user=req.params.username
        ResM.find({active:true,tourist:user, dateEnd:{$lt:d}}).then(data=>{
            console.log(data)
            res.json(data)
        }).catch(err=>{
            res.json(null)
        })
    }

    acceptReservation=(req:express.Request,res:express.Response)=>{
        let sd=req.body.dateStart
        let ed=req.body.dateEnd
        let v=req.body.name
        console.log("sd: "+sd+"  ed: "+ed)
        ResM.updateOne({place:req.body.place,dateEnd:ed,dateStart:sd,vikendica:req.body.name},{active:true}).then(message=>{
            console.log("yo 2131231")
            res.json({message:"Prihvacena rezervacija od: "+sd.slice(0,10)+" do: "+ed.slice(0,10)+" za vikendicu: "+v})
        }).catch(err=>{
            res.json({message:"Odbijena rezervacija"})
        })
    }

    declineReservation=(req:express.Request,res:express.Response)=>{
        let sd=req.body.dateStart
        let ed=req.body.dateEnd
        let v=req.body.name
        console.log("sd: "+sd+"  ed: "+ed)

        ResM.deleteOne({vikendica:v,dateEnd:ed,dateStart:sd,place:req.body.place,active:false}).then(message=>{
            res.json({message:"Odbijena rezervacija od: "+sd.slice(0,10)+" do: "+ed.slice(0,10)+" za vikendicu: "+v})
        }).catch(err=>{
            res.json({message:"Neuspesno odbijanje rezervacije"})
        })
    }

    deleteReservation = (req:express.Request,res:express.Response)=>{
        let sd=req.body.dateStart
        let ed=req.body.dateEnd
        let v=req.body.name

        ResM.deleteOne({vikendica:v,dateEnd:ed,dateStart:sd,place:req.body.place,active:true}).then(message=>{
            res.json({message:"Otkazana rezervacija za datum od: "+sd.slice(0,10)+" do: "+ed.slice(0,10)+" za vikendicu: "+v})
        }).catch(err=>{
            res.json({message:"Neuspesno otkazivanje rezervacije"})
        })
    }

    
}