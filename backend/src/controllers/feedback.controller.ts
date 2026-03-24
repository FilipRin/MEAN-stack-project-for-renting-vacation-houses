import express from 'express'
import FeedM from '../models/feedback'

export class FeedbackController{

    rate = (req:express.Request,res:express.Response)=>{
        let dend=req.body.dateEnd
        let dstart=req.body.dateStart
        let feed={
            comment:req.body.comment,
            rating:req.body.rating,
            vikendica:req.body.vikendica,
            place:req.body.place,
            dateStart:new Date(req.body.dateStart),
            dateEnd:new Date(req.body.dateEnd),
            tourist:req.body.tourist
        }
        console.log(new Date(dend)+"    |||||     "+dend)
        console.log(feed.dateStart+" x | x " +feed.dateEnd)
        FeedM.find({vikendica:feed.vikendica,dateStart:feed.dateStart,tourist:feed.tourist}).then(data=>{
            console.log(data)
            if(data.length!=0){
                res.json({message:"Vec ste ocenili ovu vikendicu, u ovom periodu!"})
            }
            else{
                new FeedM(feed).save().then(data=>{
                    res.json({message:"Uspesno ocenjena ostvarena rezervacija!"})
                }).catch(err=>{
                    res.json({message:"Error kod cuvanja ocene!"})
                })
            }
        }
        ).catch(err=>{
            res.json({message:"Doslo je do greske!"})
        })
    }

    getRating=(req:express.Request,res:express.Response)=>{
        FeedM.find({vikendica:req.params.vik}).then(data=>{
            res.json(data)
        }).catch(err=>{
            res.json(null)
        })
    }

}