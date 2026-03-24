import { Component, inject } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private userService = inject(UserService)

  btnDis=true;
  ngOnInit():void{
    this.btnDis=true;
  }

  
  user: User = new User()
  message = ""
  messagePass=""
  passGood=false;

  register(){
    this.userService.register(this.user).subscribe(data=>{
      this.message = data.message
    })
  }

  testCard(){
    var inputCard: string = this.user.credit;
        if(inputCard.length<15 || inputCard.length>16) {
            this.message = "Card number should be 15 or 16 numbers long!";
            return;
        }
        this.message="";
        const DinersPattern1=/^300/.test(inputCard),DinersPattern2=/^301/.test(inputCard),DinersPattern3=/^302/.test(inputCard),DinersPattern4=/^303/.test(inputCard),DinersPattern5=/^36/.test(inputCard),DinersPattern6=/^38/.test(inputCard);
        if(DinersPattern1 || DinersPattern2 || DinersPattern3 || DinersPattern4 || DinersPattern5 || DinersPattern6){
          if(inputCard.length==15){
            console.log("Diners card");
            if(this.passGood){
                this.btnDis=false;
            }
            return;
          }
          this.message = "Diners card must have 15 numbers!";
        }
        const MasterPattern1=/^51/.test(inputCard),MasterPattern2=/^52/.test(inputCard),MasterPattern3=/^53/.test(inputCard),MasterPattern4=/^54/.test(inputCard),MasterPattern5=/^55/.test(inputCard);
        if(MasterPattern1 || MasterPattern2 || MasterPattern3 || MasterPattern4 || MasterPattern5){
          if(inputCard.length==16){
            console.log("Masters card");
            if(this.passGood){
              this.btnDis=false;
            }
            return;
          }
          this.message = "MasterCard card must have 16 numbers!";
        }
        const VisaPattern1=/^4539/.test(inputCard),VisaPattern2=/^4556/.test(inputCard),VisaPattern3=/^4916/.test(inputCard),VisaPattern4=/^4532/.test(inputCard),VisaPattern5=/^4929/.test(inputCard),VisaPattern6=/^4485/.test(inputCard),VisaPattern7=/^4716/.test(inputCard);
        if(VisaPattern1 || VisaPattern2 || VisaPattern3 || VisaPattern4 || VisaPattern5 || VisaPattern6 || VisaPattern7){
          if(inputCard.length==16){
            console.log("Visa card");
            if(this.passGood){
              this.btnDis=false;
            }
            return;
          }
          this.message = "Visa card must have 16 numbers!";
        }
  }

  testPass(){
    var inputPass = this.user.password;
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
                this.passGood=true;
                this.messagePass="Password is valid!";
                return;
            }
            this.messagePass="Password must have at least 3 lowercase letters!";
        }
    }
    console.log("????????????")
    this.passGood=false;
    return;
}
}
