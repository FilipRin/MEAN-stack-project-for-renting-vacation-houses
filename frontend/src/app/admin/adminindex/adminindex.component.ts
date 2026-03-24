import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { VikendicaService } from '../../services/vikendica.service';
import { User } from '../../models/user';
import { Vikendica } from '../../models/vikendica';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {MatGridListModule } from '@angular/material/grid-list'
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-adminindex',
  standalone: true,
  imports: [FormsModule, MatGridListModule, MatTableModule,RouterLink],
  templateUrl: './adminindex.component.html',
  styleUrl: './adminindex.component.css'
})
export class AdminindexComponent {

  private userService= inject(UserService)
  private vikService= inject(VikendicaService)
  private router = inject(Router)
  allLandlords:User[]=[]
  allTourists:User[]=[]
  allVikendice:Vikendica[]=[]
  user=""
  userChange=""
  displayedColumns: string[] = ['username', 'password', 'firstname', 'lastname','gender','address','phone','email', 'pfp','credit'];

  ngOnInit():void{
    let username = localStorage.getItem("loggedUser");
    if(username==null) this.router.navigate(['admin/login'])
    else{
         this.user=username 
         this.userChange=username
        }
    
    this.userService.getAllLandlords().subscribe(data=>{
      this.allLandlords=data
    })

    this.userService.getAllTourists().subscribe(data=>{
      this.allTourists=data
    })

    this.vikService.getAllVikendice().subscribe(data=>{
      this.allVikendice=data
    })
  }

  go(){
    localStorage.clear()
    this.router.navigate(['admin/login'])
  }
  del(username:string, index:number){
    console.log(username)
    const inputEl = document.getElementById(index.toString()) as HTMLInputElement;
    const inputValue=inputEl.value
    console.log(inputValue)
  }
  changeInfo(oldInfo:string, index:number, which:string, username:string){
    switch (which) {
      case "username":
        const inputEl = document.getElementById(index.toString()) as HTMLInputElement;
        const inputValue=inputEl.value
        console.log(inputValue)
        this.userService.changeInfo(oldInfo,inputValue,'username',username).subscribe(data=>{
          alert("Korisnik: "+username+"\n "+data.message)
        })
        break;
      case "password":
        const inputEl2 = document.getElementById(index.toString()+"1") as HTMLInputElement;
        const inputValue2=inputEl2.value
        console.log(inputValue2)
        this.userService.changeInfo(oldInfo,inputValue2,'password',username).subscribe(data=>{
          alert("Korisnik: "+username+"\n "+data.message)
        })
        break;
      case "firstname":
        const inputEl3 = document.getElementById(index.toString()+"11") as HTMLInputElement;
        const inputValue3=inputEl3.value
        console.log(inputValue3)
        this.userService.changeInfo(oldInfo,inputValue3,'firstname',username).subscribe(data=>{
          alert("Korisnik: "+username+"\n "+data.message)
        })
        break;
      case "lastname":
        console.log(oldInfo)
        const inputEl4 = document.getElementById(index.toString()+"111") as HTMLInputElement;
        const inputValue4=inputEl4.value
        console.log(inputValue4)
        this.userService.changeInfo(oldInfo,inputValue4,'lastname',username).subscribe(data=>{
          alert("Korisnik: "+username+"\n "+data.message)
        })
        break;
      case "gender":
        const inputEl5 = document.getElementById(index.toString()+"1111") as HTMLInputElement;
        const inputValue5=inputEl5.value
        console.log(inputValue5)
        this.userService.changeInfo(oldInfo,inputValue5,'gender',username).subscribe(data=>{
          alert("Korisnik: "+username+"\n "+data.message)
        })
        break;
      case "address":
        const inputEl6 = document.getElementById(index.toString()+"11111") as HTMLInputElement;
        const inputValue6=inputEl6.value
        console.log(inputValue6)
        this.userService.changeInfo(oldInfo,inputValue6,'address',username).subscribe(data=>{
          alert("Korisnik: "+username+"\n "+data.message)
        })
        break;
      case "phone":
        const inputEl7 = document.getElementById(index.toString()+"111111") as HTMLInputElement;
        const inputValue7=inputEl7.value
        console.log(inputValue7)
        this.userService.changeInfo(oldInfo,inputValue7,'phone',username).subscribe(data=>{
          alert("Korisnik: "+username+"\n "+data.message)
        })
        break;
      case "email":
        const inputEl8 = document.getElementById(index.toString()+"1111111") as HTMLInputElement;
        const inputValue8=inputEl8.value
        console.log(inputValue8)
        this.userService.changeInfo(oldInfo,inputValue8,'email',username).subscribe(data=>{
          alert("Korisnik: "+username+"\n "+data.message)
        })
        break;  
      case "credit":
        const inputEl9 = document.getElementById(index.toString()+"11111111") as HTMLInputElement;
        const inputValue9=inputEl9.value
        console.log(inputValue9)
        this.userService.changeInfo(oldInfo,inputValue9,'credit',username).subscribe(data=>{
          alert("Korisnik: "+username+"\n "+data.message)
        })
        break;  
      default:
        break;
    }
    console.log(oldInfo)
  }

  changeInfo2(oldInfo:string, index:string, which:string, username:string){
    switch (which) {
      case "username":
        const inputEl = document.getElementById(index+"2") as HTMLInputElement;
        const inputValue=inputEl.value
        console.log(inputValue)
        this.userService.changeInfo(oldInfo,inputValue,'username',username).subscribe(data=>{
          alert("Korisnik: "+username+"\n "+data.message)
        })
        break;
      case "password":
        const inputEl2 = document.getElementById(index+"22") as HTMLInputElement;
        const inputValue2=inputEl2.value
        console.log(inputValue2)
        this.userService.changeInfo(oldInfo,inputValue2,'password',username).subscribe(data=>{
          alert("Korisnik: "+username+"\n "+data.message)
        })
        break;
      case "firstname":
        const inputEl3 = document.getElementById(index+"222") as HTMLInputElement;
        const inputValue3=inputEl3.value
        console.log(inputValue3)
        this.userService.changeInfo(oldInfo,inputValue3,'firstname',username).subscribe(data=>{
          alert("Korisnik: "+username+"\n "+data.message)
        })
        break;
      case "lastname":
        console.log(oldInfo)
        const inputEl4 = document.getElementById(index+"2222") as HTMLInputElement;
        const inputValue4=inputEl4.value
        console.log(inputValue4)
        this.userService.changeInfo(oldInfo,inputValue4,'lastname',username).subscribe(data=>{
          alert("Korisnik: "+username+"\n "+data.message)
        })
        break;
      case "gender":
        const inputEl5 = document.getElementById(index+"22222") as HTMLInputElement;
        const inputValue5=inputEl5.value
        console.log(inputValue5)
        this.userService.changeInfo(oldInfo,inputValue5,'gender',username).subscribe(data=>{
          alert("Korisnik: "+username+"\n "+data.message)
        })
        break;
      case "address":
        const inputEl6 = document.getElementById(index+"222222") as HTMLInputElement;
        const inputValue6=inputEl6.value
        console.log(inputValue6)
        this.userService.changeInfo(oldInfo,inputValue6,'address',username).subscribe(data=>{
          alert("Korisnik: "+username+"\n "+data.message)
        })
        break;
      case "phone":
        const inputEl7 = document.getElementById(index+"2222222") as HTMLInputElement;
        const inputValue7=inputEl7.value
        console.log(inputValue7)
        this.userService.changeInfo(oldInfo,inputValue7,'phone',username).subscribe(data=>{
          alert("Korisnik: "+username+"\n "+data.message)
        })
        break;
      case "email":
        const inputEl8 = document.getElementById(index+"22222222") as HTMLInputElement;
        const inputValue8=inputEl8.value
        console.log(inputValue8)
        this.userService.changeInfo(oldInfo,inputValue8,'email',username).subscribe(data=>{
          alert("Korisnik: "+username+"\n "+data.message)
        })
        break;  
      case "credit":
        const inputEl9 = document.getElementById(index+"222222222") as HTMLInputElement;
        const inputValue9=inputEl9.value
        console.log(inputValue9)
        this.userService.changeInfo(oldInfo,inputValue9,'credit',username).subscribe(data=>{
          alert("Korisnik: "+username+"\n "+data.message)
        })
        break;  
      default:
        break;
    }
    console.log(oldInfo)
    
  }

  delInfo2(oldInfo:string, index:string, which:string, username:string){
    switch (which) {
      case "username":
        const inputEl = document.getElementById(index+"2") as HTMLInputElement;
        const inputValue=inputEl.value
        console.log(inputValue)
        this.userService.changeInfo(oldInfo,'','username',username).subscribe(data=>{
          alert("Korisnik: "+username+"\n "+data.message)
        })
        break;
      case "password":
        const inputEl2 = document.getElementById(index+"22") as HTMLInputElement;
        const inputValue2=inputEl2.value
        console.log(inputValue2)
        this.userService.changeInfo(oldInfo,'','password',username).subscribe(data=>{
          alert("Korisnik: "+username+"\n "+data.message)
        })
        break;
      case "firstname":
        const inputEl3 = document.getElementById(index+"222") as HTMLInputElement;
        const inputValue3=inputEl3.value
        console.log(inputValue3)
        this.userService.changeInfo(oldInfo,'','firstname',username).subscribe(data=>{
          alert("Korisnik: "+username+"\n "+data.message)
        })
        break;
      case "lastname":
        console.log(oldInfo)
        const inputEl4 = document.getElementById(index+"2222") as HTMLInputElement;
        const inputValue4=inputEl4.value
        console.log(inputValue4)
        this.userService.changeInfo(oldInfo,'','lastname',username).subscribe(data=>{
          alert("Korisnik: "+username+"\n "+data.message)
        })
        break;
      case "gender":
        const inputEl5 = document.getElementById(index+"22222") as HTMLInputElement;
        const inputValue5=inputEl5.value
        console.log(inputValue5)
        this.userService.changeInfo(oldInfo,'','gender',username).subscribe(data=>{
          alert("Korisnik: "+username+"\n "+data.message)
        })
        break;
      case "address":
        const inputEl6 = document.getElementById(index+"222222") as HTMLInputElement;
        const inputValue6=inputEl6.value
        console.log(inputValue6)
        this.userService.changeInfo(oldInfo,'','address',username).subscribe(data=>{
          alert("Korisnik: "+username+"\n "+data.message)
        })
        break;
      case "phone":
        const inputEl7 = document.getElementById(index+"2222222") as HTMLInputElement;
        const inputValue7=inputEl7.value
        console.log(inputValue7)
        this.userService.changeInfo(oldInfo,'','phone',username).subscribe(data=>{
          alert("Korisnik: "+username+"\n "+data.message)
        })
        break;
      case "email":
        const inputEl8 = document.getElementById(index+"22222222") as HTMLInputElement;
        const inputValue8=inputEl8.value
        console.log(inputValue8)
        this.userService.changeInfo(oldInfo,'','email',username).subscribe(data=>{
          alert("Korisnik: "+username+"\n "+data.message)
        })
        break;  
      case "credit":
        const inputEl9 = document.getElementById(index+"222222222") as HTMLInputElement;
        const inputValue9=inputEl9.value
        console.log(inputValue9)
        this.userService.changeInfo(oldInfo,'','credit',username).subscribe(data=>{
          alert("Korisnik: "+username+"\n "+data.message)
        })
        break;  
      default:
        break;
    }
    console.log(oldInfo)
    
  }

  ban(username:string){
    this.userService.banUser(username).subscribe(data=>{
      alert(data.message)
    })
  }

}
