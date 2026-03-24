import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './adminlogin.component.html',
  styleUrl: './adminlogin.component.css'
})
export class AdminloginComponent {

  private userService = inject(UserService)
  private router = inject(Router)
  username=""
  password=""
  type="admin"
  message=""

  ngOnInit():void{
    localStorage.clear()
  }

  login(){
    this.userService.login(this.username,this.password,this.type).subscribe(data=>{
      if(data){
        localStorage.setItem("loggedUser", data.username)
        this.router.navigate(['admin/adminindex'])
      }
      else{
        this.message = "Error"
      }
    })
  }

}
