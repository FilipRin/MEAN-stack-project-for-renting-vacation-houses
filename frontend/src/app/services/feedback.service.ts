import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Message } from '../models/message';
import { Feedback } from '../models/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor() { }

  private http=inject(HttpClient)


  rate(vik:string,tourist:string,sd:Date,ed:Date,com:string,place:string,rating:Number){
    //let newsd= new Date(sd)
    //let newed=new Date(ed)
    console.log(sd+"    "+ed)
    let feedb={
      comment:com,
      rating:rating,
      vikendica:vik,
      place:place,
      dateStart:sd,
      dateEnd:ed,
      tourist:tourist
    }
    return this.http.post<Message>("http://localhost:4000/feedbacks/rate",feedb)
  }

  getRating(vik:string){
    return this.http.get<Feedback[]>(`http://localhost:4000/feedbacks/getRating/${vik}`)
  }

}
