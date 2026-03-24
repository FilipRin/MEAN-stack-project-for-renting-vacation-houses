import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Vikendica } from '../models/vikendica';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class VikendicaService {

  private http = inject(HttpClient)
  constructor() { }

  addVikendicu(v: Vikendica,user:String){
    
    return this.http.post<Message>("http://localhost:4000/vikendice/addVikendicu",{vikendica:v,username:user})
  }

  getAllVikendice(){
    return this.http.get<Vikendica[]>("http://localhost:4000/vikendice/getAllVikendice")
  }

  getMyVikendice(username:string){
    return this.http.get<Vikendica[]>(`http://localhost:4000/vikendice/getMyVikendice/${username}`)
  }

  getVikendicu(name:string,place:string){
    
    let data2=name.concat("0"+place)
    return this.http.get<Vikendica>(`http://localhost:4000/vikendice/getVikendicu/${data2}`)
  }

  deleteVikendicu(coor:String){
    return this.http.post<Message>("http://localhost:4000/vikendice/deleteVikendicu",{coor:coor})
  }
}
