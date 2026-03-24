import express from 'express'
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router()

userRouter.route('/login').post(
    (req, res)=>new UserController().login(req, res)
)

userRouter.route('/register').post(
    (req, res)=>new UserController().register(req, res)
)

userRouter.route("/addToFavourites").post(
    (req,res)=>new UserController().addToFavourites(req,res)
)

userRouter.route("/deleteFromFavourites").post(
    (req,res)=>new UserController().deleteFromFavourites(req,res)
)

userRouter.route("/updateFavourite").post(
    (req,res)=>new UserController().updateFavourite(req,res)
)

userRouter.route("/getUser/:user").get(
    (req,res)=>new UserController().getUser(req,res)
)

userRouter.route("/change").post(
    (req,res)=>new UserController().change(req,res)
)

userRouter.route("/getAllTourists").get(
    (req,res) => new UserController().getAllTourists(req,res)
)

userRouter.route("/getAllLandlords").get(
    (req,res) => new UserController().getAllLandlords(req,res)
)

userRouter.route("/changeInfo").post(
    (req,res) => new UserController().changeInfo(req,res)
)

userRouter.route("/banUser").post(
    (req,res)=>new UserController().banUser(req,res)
)

userRouter.route("/getAllRegistrations").get(
    (req,res)=>new UserController().getAllRegistrationRequests(req,res)
)

userRouter.route("/accept").post(
    (req,res)=>new UserController().accept(req,res)
)

export default userRouter;