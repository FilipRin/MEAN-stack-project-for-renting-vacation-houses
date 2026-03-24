import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private userService = inject(UserService)
  private router = inject(Router)

  username = ""
  password = ""
  message = ""
  type=""

  login(){
    console.log(this.type.valueOf())
    this.userService.login(this.username, this.password, this.type).subscribe(data=>{
      if(data){
        if(data.ban) {
          this.message="Ovaj korisnik je suspendovan, pristup nalogu nije moguc!"
        }
        else if(data.active==false){
          this.message="Nije jos dozvoljena registracija od strane admina, pristup nalogu nije moguc!"
        }
        else{
          if(data.type=="tourist"){
            localStorage.setItem("loggedUser", data.username)
            this.router.navigate(['tourist'])
          }
          else{
            localStorage.setItem("loggedUser", data.username)
            this.router.navigate(['landlord'])
          }
        }
      }
      else{
        this.message = "Error"
      }
    })
  }
}
