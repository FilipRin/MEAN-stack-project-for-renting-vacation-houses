import { Router } from "express";
import express from 'express'
import { FeedbackController } from "../controllers/feedback.controller";

const feedbRouter=express.Router()

feedbRouter.route("/rate").post(
    (req,res)=>new FeedbackController().rate(req,res)
)

feedbRouter.route("/getRating/:vik").get(
    (req,res)=> new FeedbackController().getRating(req,res)
)

export default feedbRouter