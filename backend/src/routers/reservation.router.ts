import express from 'express'
import { ReservationController } from '../controllers/reservation.controller'

const resRouter=express.Router()

resRouter.route("/validate").post(
    (req,res)=>new ReservationController().validate(req,res)
)

resRouter.route("/getActiveReservations/:username").get(
    (req,res)=>new ReservationController().getActiveReservations(req,res)
)

resRouter.route("/getArchivedReservations/:username").get(
    (req,res)=>new ReservationController().getArchivedReservations(req,res)
)

resRouter.route("/getPendingReservations/:name").get(
    (req,res)=>new ReservationController().getPendingReservations(req,res)
)

resRouter.route("/acceptReservation").post(
    (req,res)=>new ReservationController().acceptReservation(req,res)
)

resRouter.route("/declineReservation").post(
    (req,res)=>new ReservationController().declineReservation(req,res)
)

resRouter.route("/getAcceptedReservations/:name").get(
    (req,res)=>new ReservationController().getAcceptedReservations(req,res)
)

resRouter.route("/deleteReservation").post(
    (req,res)=>new ReservationController().deleteReservation(req,res)
)


export default resRouter;