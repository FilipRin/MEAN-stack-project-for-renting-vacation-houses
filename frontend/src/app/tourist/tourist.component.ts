import { Component, inject } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tourist',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tourist.component.html',
  styleUrl: './tourist.component.css'
})
export class TouristComponent {

  private userService = inject(UserService) 
  private router = inject(Router) 

  user: User = new User()
  username=""
  ngOnInit():void{
    let username = localStorage.getItem("loggedUser");
    if(username!=null) this.userService.getUser(username).subscribe(user=>{
      if(user.status==200){
        if(user.body) {
          this.user = user.body;
          this.username=this.user.username
        }
        
      }
      
    })
  }


  go(){
    localStorage.clear()
    this.router.navigate(['login'])
  }

}
