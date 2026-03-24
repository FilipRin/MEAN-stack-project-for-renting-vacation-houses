import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Vikendica } from '../../models/vikendica';
import { VikendicaService } from '../../services/vikendica.service';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-llvikendice',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './llvikendice.component.html',
  styleUrl: './llvikendice.component.css'
})
export class LlvikendiceComponent {

  myVikendice: Vikendica[] = [];
  vik:Vikendica=new Vikendica()
  private vikService=inject(VikendicaService)
  private userService=inject(UserService)
  message=""
  
  user: User = new User()
  ngOnInit(): void {
    let username = localStorage.getItem("loggedUser");
    if(username!=null) this.userService.getUser(username).subscribe(user=>{
      if(user.status==200){
        if(user.body) {
          this.user = user.body;
          this.vikService.getMyVikendice(username).subscribe(data=>{
            this.myVikendice=data
            this.myVikendice.forEach((item)=>{console.log(item.prices)})
          })
        }
      }
    })
    
  }

  
  addVikendicu(){
    this.vikService.addVikendicu(this.vik,this.user.username).subscribe(data=>{
      this.message=data.message
    })
    let username = localStorage.getItem("loggedUser");
    if(username!=null) this.userService.getUser(username).subscribe(user=>{
      if(user.status==200){
        if(user.body) {
          this.user = user.body;
          this.vikService.getMyVikendice(username).subscribe(data=>{
            this.myVikendice=data
            this.myVikendice.forEach((item)=>{console.log(item.prices)})
          })
        }
      }
    })
  }

  deleteVikendicu(coor:String){
    this.vikService.deleteVikendicu(coor).subscribe(data=>{
      this.message=data.message
    })
  }
}
