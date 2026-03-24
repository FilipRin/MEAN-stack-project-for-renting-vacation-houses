import express from 'express'
import VikM from '../models/vikendica'

export class VikendicaController{
    addVikendicu = (req:express.Request,res:express.Response)=>{
        let name=req.body.vikendica.name;
        let place=req.body.vikendica.place;
        let services=req.body.vikendica.services;
        let prices=req.body.vikendica.prices.toString();
        let pricee= prices.split(",");
        //let pricee:Array<String> = []
        //pricee.push(prices)
        let phone= req.body.vikendica.phone;
        let coordinates = req.body.vikendica.coordinates;
        let pictures = req.body.vikendica.pictures;
        let landlord = req.body.username;
        console.log(landlord);
        let vik={
            name:name,
            place:place,
            services:services,
            prices:pricee,
            phone:phone,
            coordinates:coordinates,
            pictures:pictures,
            landlord:landlord
        }

        new VikM(vik).save().then(ok=>{
            res.json({message:"ok"})
        }).catch(err=>{
            res.json({message:"fail add"})
        })  
    }

    getMyVikendice = (req:express.Request,res:express.Response)=>{
        let username = req.params.username;
        VikM.find({landlord:username}).then(data=>{
            res.json(data)
        }).catch(err=>{
            res.json(null)
        })
    }

    deleteVikendicu = (req:express.Request,res:express.Response)=>{
        console.log(req.body.coor)
        VikM.deleteOne({coordinates:req.body.coor}).then(data=>{
            res.json({message:"deleted"})
        }).catch(err=>{
            res.json({message:"failed"})
        })
    }

    getAllVikendice = (req:express.Request,res:express.Response)=>{
        VikM.find({}).then(data=>{
            res.json(data)
        }).catch(err=>{
            res.json(null)
        })
    }

    getVikendicu = (req:express.Request,res:express.Response) =>{
        let data= req.params.data.split("0")
        console.log(data)
        VikM.findOne({name:data[0],place:data[1]}).then(data=>{
            res.json(data)
        }).catch(err=>{
            res.json(null)
        })
    }
}