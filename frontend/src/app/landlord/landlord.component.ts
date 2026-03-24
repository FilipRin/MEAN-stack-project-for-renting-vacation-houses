import { Component, inject } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-landlord',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './landlord.component.html',
  styleUrl: './landlord.component.css'
})
export class LandlordComponent {
  private userService = inject(UserService) 
  private router = inject(Router) 
  user: User = new User()
  ngOnInit():void{
  let username = localStorage.getItem("loggedUser");
    if(username!=null) this.userService.getUser(username).subscribe(user=>{
      if(user.status==200){
        if(user.body) {
          this.user = user.body;
        }
        
      }
      
    })
  }
  go(){
    localStorage.clear()
    this.router.navigate(['login'])
  }

}
