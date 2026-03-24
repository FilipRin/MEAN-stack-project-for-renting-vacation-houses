import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Message } from '../models/message';
import { Vikendica } from '../models/vikendica';
import { User } from '../models/user';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor() { }
  private http=inject(HttpClient)


  validate(sd:Date,ed:Date,v:string,u:string,p:string,r:string,pl:string){
    let x=p.toString()
    console.log(typeof(sd))
    console.log(typeof(ed))
    return this.http.post<Message>("http://localhost:4000/reservations/validate",{
      dateStart:sd,
      dateEnd:ed,
      name:v,
      tour:u,
      vik:v,
      price:x,
      requests:r,
      place:pl
    })
  }

  getActiveReservations(username:string){
    return this.http.get<Reservation[]>(`http://localhost:4000/reservations/getActiveReservations/${username}`)
  }

  getPendingReservations(name:string){
    return this.http.get<Reservation[]>(`http://localhost:4000/reservations/getPendingReservations/${name}`)
  }

  getArchivedReservations(username:string){
    return this.http.get<Reservation[]>(`http://localhost:4000/reservations/getArchivedReservations/${username}`)
  }

  acceptReservation(p:string,vik:string,sd:string,ed:string){
    let newsd=new Date(sd)
    let newed=new Date(ed)
    console.log(sd+" | aaaaaaaa| "+ed)
    console.log(newsd+" |xxxxxxx| "+newed)
    return this.http.post<Message>(`http://localhost:4000/reservations/acceptReservation`,{
      dateStart:newsd,
      dateEnd:newed,
      name:vik,
      place:p
    })
  }

  declineReservation(p:string,vik:string,sd:string,ed:string){
    let newsd=new Date(sd)
    let newed=new Date(ed)
    console.log(sd+" | aaaaaaaa| "+ed)
    console.log(newsd+" |xxxxxxx| "+newed)
    return this.http.post<Message>(`http://localhost:4000/reservations/declineReservation`,{
      dateStart:newsd,
      dateEnd:newed,
      name:vik,
      place:p
    })
  }

  deleteReservation(p:string,vik:string,sd:string,ed:string){
    let newsd=new Date(sd)
    let newed=new Date(ed)
    console.log(sd+" | aaaaaaaa| "+ed)
    console.log(newsd+" |xxxxxxx| "+newed)
    return this.http.post<Message>(`http://localhost:4000/reservations/deleteReservation`,{
      dateStart:newsd,
      dateEnd:newed,
      name:vik,
      place:p
    })
  }

  getAcceptedReservations(name:string){
    return this.http.get<Reservation[]>(`http://localhost:4000/reservations/getAcceptedReservations/${name}`)
  }

}
