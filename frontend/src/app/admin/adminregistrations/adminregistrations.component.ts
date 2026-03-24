import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-adminregistrations',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './adminregistrations.component.html',
  styleUrl: './adminregistrations.component.css'
})
export class AdminregistrationsComponent {

  private userService=inject(UserService)
  private router = inject(Router)

  allRegReq:User[]=[]
  user=""

  ngOnInit():void{
    let username = localStorage.getItem("loggedUser");
    if(username==null) this.router.navigate(['admin/login'])
    else{
         this.user=username 
    }

    this.userService.getAllRegistrations().subscribe(data=>{
      if(data){
        this.allRegReq=data
      }
    })
  }

  accept(user:string){
    this.userService.accept(user).subscribe(data=>{
      if(data) alert("Prihvacena rezervacija korisnika: "+user)
    })
  }

  decline(user:string){
    this.userService.banUser(user).subscribe(data=>{
      if(data) alert("Odbijena registracija korisnika: "+user)
    })
  }

  go(){
    localStorage.clear()
    this.router.navigate(['admin/login'])
  }
}
