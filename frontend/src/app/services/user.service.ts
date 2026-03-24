import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Message } from '../models/message';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  private httpClient = inject(HttpClient)

  login(u: string, p: string, t:string){
    const data={
      username: u,
      password: p,
      type: t
    }
    return this.httpClient.post<User>("http://localhost:4000/users/login", data)
  }

  change(u:string, op:string, np:string){
    const data={
      username:u,
      oldpassword:op,
      newpassword:np
    }
    return this.httpClient.post<User>("http://localhost:4000/users/change", data)
  }

  register(u: User){
    return this.httpClient.post<Message>("http://localhost:4000/users/register", u)
  }

  getUser(user: string){
    return this.httpClient.get<User>(`http://localhost:4000/users/getUser/${user}`, {observe: 'response'});
  }

  getAllTourists(){
    return this.httpClient.get<User[]>("http://localhost:4000/users/getAllTourists")
  }

  getAllLandlords(){
    return this.httpClient.get<User[]>("http://localhost:4000/users/getAllLandlords")
  }

  changeInfo(oldInfo:string,newInfo:string,whichInfo:string,username:string){
    const data={
      old:oldInfo,
      new:newInfo,
      which:whichInfo,
      username:username
    }
    return this.httpClient.post<Message>("http://localhost:4000/users/changeInfo",data)
  }

  banUser(username:string){
    return this.httpClient.post<Message>("http://localhost:4000/users/banUser",username)
  }

  getAllRegistrations(){
    return this.httpClient.get<User[]>("http://localhost:4000/users/getAllRegistrations")
  }

  accept(username:string){
    console.log(username)
    const data={
      username:username
    }
    return this.httpClient.post<Message>("http://localhost:4000/users/accept",data)
  }

}
