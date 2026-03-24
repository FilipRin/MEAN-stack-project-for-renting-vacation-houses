import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-passchange',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './passchange.component.html',
  styleUrl: './passchange.component.css'
})
export class PasschangeComponent {


  private userService = inject(UserService)
  private router = inject(Router)

  ngOnInit():void{
    this.btnDis=true;
  }

  username = ""
  oldpassword = ""
  message = ""
  newpassword=""
  repnewpassword=""
  messagePass=""
  btnDis=true;

  change(){
    if(this.oldpassword==this.newpassword){
      this.message="Old and new password must not be same!";
      return;
    }
    if(this.newpassword!=this.repnewpassword){
      this.message="You need to repeat new password!";
      return;
    }
    this.userService.change(this.username,this.oldpassword,this.newpassword).subscribe(user=>{
      if(user){
        if(user.type=="admin"){
          this.router.navigate(['admin/login'])
        }
        else{
          this.router.navigate(['login'])
        }
      } 
    })
    //ovde se poziva servis za promenu lozinke za dati user+password
    this.message="Old password or username were wrong!"
    //zatim se u zavisnosti od tipa usera ide na /login ili /admin/login
  }

  testPass(){
    var inputPass = this.newpassword;
    const regex = /[a-z]/g;
    const matches = inputPass.match(regex);
    
      if(matches)
      matches.forEach(element => {
          console.log("malo slovo: "+ element);
      });
    
    if(inputPass.length<6 || inputPass.length>10){
        this.messagePass = "Password should be between 6-10 characters long!";
        return;
    }
    var reg = [/^[a-zA-Z]/,/[A-Z]/,/[0-9]/,/[(!@#$%&]/];//j3Tra#x  3xDrra# xDter# x31Trae Rr7$AAE aea7%87
    var count = 0;
    for (var i = 0; i < reg.length;i++) {
        if (reg[i].test(inputPass)) {
            count++;
            console.log(count+" "+i);
        }
        else{
          switch(i){
            case 0: this.messagePass="Password must begin with a letter!"; break;
            case 1: this.messagePass="Password must have at least one capital letter!"; break;
            case 2: this.messagePass="Password must have at least one number!"; break;
            case 3: this.messagePass="Password must have at least one special sign!"; break;
          }
        }
        if (count ==4) {
          if(matches)
            if(matches.length>=3){
                console.log("dobar pass ");
                //this.passGood=true;
                this.btnDis=false;
                this.messagePass="Password is valid!";
                return;
            }
            this.messagePass="Password must have at least 3 lowercase letters!";
        }
    }
    console.log("????????????")
    //this.passGood=false;
    return;
  }

}
