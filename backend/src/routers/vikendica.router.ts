import express from 'express'
import { VikendicaController } from '../controllers/vikendica.controller'


const vikRouter = express.Router()

vikRouter.route("/addVikendicu").post(
    (req,res)=> new VikendicaController().addVikendicu(req,res)
)

vikRouter.route("/getMyVikendice/:username").get(
    (req,res)=>new VikendicaController().getMyVikendice(req,res)
)

vikRouter.route("/deleteVikendicu").post(
    (req,res)=>new VikendicaController().deleteVikendicu(req,res)
)

vikRouter.route("/getAllVikendice").get(
    (req,res)=> new VikendicaController().getAllVikendice(req,res)
)

vikRouter.route("/getVikendicu/:data").get(
    (req,res) => new VikendicaController().getVikendicu(req,res)
)

export default vikRouter;