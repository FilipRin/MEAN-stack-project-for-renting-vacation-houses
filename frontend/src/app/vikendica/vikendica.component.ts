import { Component, inject ,ChangeDetectionStrategy} from '@angular/core';
import { FormsModule, FormControl, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Vikendica } from '../models/vikendica';
import { VikendicaService } from '../services/vikendica.service';
//import {MatDatepickerModule} from '@angular/material/datepicker';
//import {MatFormFieldModule} from '@angular/material/form-field';
//import {provideNativeDateAdapter} from '@angular/material/core';
import {JsonPipe} from '@angular/common';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { ReservationService } from '../services/reservation.service';
import { FeedbackService } from '../services/feedback.service';
import { Feedback } from '../models/feedback';

@Component({
  selector: 'app-vikendica',
  standalone: true,
  imports: [FormsModule,RouterLink,ReactiveFormsModule, JsonPipe],
  templateUrl: './vikendica.component.html',
  styleUrl: './vikendica.component.css'
})
export class VikendicaComponent {

  dateForm!: FormGroup;
  startDate:Date= new Date();
  endDate:Date= new Date();
  edstr=""
  sdstr=""
  pom:Date= new Date();
  user=""
  place=""
  name=""
  numVis=""
  numChild=""
  message=""
  disp="block"
  dispPay="none"
  card=""
  cost:String=""
  us:User=new User()
  reqq=""
  cred=""

  vik:Vikendica=new Vikendica()
  feedbacks:Feedback[]=[]

  vikService=inject(VikendicaService)
  userService=inject(UserService)
  resService=inject(ReservationService)
  feedService=inject(FeedbackService)
  router=inject(Router)

  ngOnInit():void{
    let naziv=localStorage.getItem("vikendicaName")
    let mesto=localStorage.getItem("vikendicaPlace")
    let username= localStorage.getItem("loggedUser")
    
    if(username) this.user=username
    if(mesto) this.place=mesto
    if(naziv) this.name=naziv

    this.dateForm = new FormGroup({
      start: new FormControl(null), // Or new FormControl(new Date()) for a default
      end: new FormControl(null)
    });

    this.vikService.getVikendicu(this.name,this.place).subscribe(data=>{
      this.vik=data
      this.feedService.getRating(data.name).subscribe(data2=>{
        this.feedbacks=data2
      })
    })

    this.dateForm.get('start')?.valueChanges.subscribe(dateValue => {
      console.log('Selected Date:', dateValue);
      this.startDate=dateValue
      //this.sdstr=this.startDate.toLocaleDateString()
    });

    this.dateForm.get('end')?.valueChanges.subscribe(dateValue => {
      console.log('Selected Date:', dateValue);
      this.endDate=dateValue
      //this.edstr=this.endDate.toLocaleDateString()
    });

    console.log(typeof(this.endDate.toLocaleDateString()))
    console.log(this.startDate+" ee")
    //localStorage.removeItem("vikendicaName")
    //localStorage.removeItem("vikendicaPlace")
  }

  reserve(){
    let now = new Date().toLocaleDateString().split('.')
    const y = parseInt(now[2])
    let m = now[1]
    const d = now[0]
    if(parseInt(m)<10){m="0"+parseInt(m);}
    let date=`${y}-${m}-${d}`
    console.log("datummmmmmmmm" +date)
    if(this.sdstr < date) {this.message="Datumi ne mogu da budu pre danasnjeg datuma!"; return}
    if(this.endDate<this.startDate){ this.message="Datum od ne sme biti posle datuma do!"}
    else if(this.numChild=="" || this.numVis==""){ this.message="Popuniti sva polja"}
    else{
      this.message=""
      localStorage.setItem("dateStart",JSON.stringify(this.startDate))
      localStorage.setItem("dateEnd",JSON.stringify(this.endDate))
      localStorage.setItem("numberOld",this.numVis)
      localStorage.setItem("numberChild",this.numChild)
      this.disp="none"
      this.dispPay="block"
      this.userService.getUser(this.user).subscribe(data=>{
        if(data.body){
          this.us=data.body
          this.cred=this.us.credit
        }
      })
      let days
      let monthS = parseInt(this.sdstr.split("-")[1])
      let monthE = parseInt(this.edstr.split("-")[1])
      let sum=0;
      let ind;
      //30.07 - 02.08
      if(parseInt(this.edstr.split("-")[1])!=parseInt(this.sdstr.split("-")[1])){
        switch(parseInt(this.sdstr.split("-")[1])){
          case 1:case 3:case 5:case 7:case 8:case 10:case 12: days=31-parseInt(this.sdstr.split("-")[2])+parseInt(this.edstr.split("-")[2]);ind=1; break;
          default:days=30-parseInt(this.sdstr.split("-")[2])+parseInt(this.edstr.split("-")[2]);ind=0;break;
        }

        for(let i=monthS;i<=monthE;i++){
          if(i>=5 && i<=8){
            sum=sum+this.calc(i,monthS,monthE,ind)*parseInt(this.vik.prices[0].toString())
          }
          else{
            sum=sum+this.calc(i,monthS,monthE,ind)*parseInt(this.vik.prices[1].toString())
          }
        }
        this.cost=(sum*parseInt(this.numVis)).toString()
        return
      }
      else{
        days = parseInt(this.edstr.split("-")[2])-parseInt(this.sdstr.split("-")[2])
      }
      //month = parseInt(this.sdstr.split("-")[1])
      if(monthS>=5 && monthS<=8){
        console.log(this.vik.prices[0].toString())
        this.cost=(parseInt(this.vik.prices[0].toString())*days*parseInt(this.numVis)).toString()
      }
      else{
        this.cost=(parseInt(this.vik.prices[1].toString())*days*parseInt(this.numVis)).toString()
      }
    }
  }

  validate(){
    /*
    var inputCard: string = this.cred;
    console.log(this.cred)
        if(inputCard.length<15 || inputCard.length>16) {
            this.message = "Card number should be 15 or 16 numbers long!";
            return;
        }
        this.message="";
        
        //mora sve za kartice da se prebaci u zasebnu funkciju
        const DinersPattern1=/^300/.test(inputCard),DinersPattern2=/^301/.test(inputCard),DinersPattern3=/^302/.test(inputCard),DinersPattern4=/^303/.test(inputCard),DinersPattern5=/^36/.test(inputCard),DinersPattern6=/^38/.test(inputCard);
        if(DinersPattern1 || DinersPattern2 || DinersPattern3 || DinersPattern4 || DinersPattern5 || DinersPattern6){
          if(inputCard.length==15){
            console.log("Diners card");
          }
        }
        else{this.message = "Diners card mora imati 15 cifara i pocinjati sa 300/301/302/303/36/38";return}
        
        const MasterPattern1=/^51/.test(inputCard),MasterPattern2=/^52/.test(inputCard),MasterPattern3=/^53/.test(inputCard),MasterPattern4=/^54/.test(inputCard),MasterPattern5=/^55/.test(inputCard);
        if(MasterPattern1 || MasterPattern2 || MasterPattern3 || MasterPattern4 || MasterPattern5){
          if(inputCard.length==16){
            console.log("Masters card");
          }
        }
        else{this.message = "MasterCard card mora imati 16 cifara i pocinjati sa 51/52/53/54/55!";return}
        
        const VisaPattern1=/^4539/.test(inputCard),VisaPattern2=/^4556/.test(inputCard),VisaPattern3=/^4916/.test(inputCard),VisaPattern4=/^4532/.test(inputCard),VisaPattern5=/^4929/.test(inputCard),VisaPattern6=/^4485/.test(inputCard),VisaPattern7=/^4716/.test(inputCard);
        if(VisaPattern1 || VisaPattern2 || VisaPattern3 || VisaPattern4 || VisaPattern5 || VisaPattern6 || VisaPattern7){
          if(inputCard.length==16){
            console.log("Visa card");
          }
        }
        else{this.message = "Visa card mora imati 16 cifara i pocinjati sa 4539/4556/4916/4532/4929/4485/4716";return}
        
    */
    console.log(this.startDate+ "      X     "+this.endDate )
    
    this.resService.validate(this.startDate,this.endDate,this.vik.name,this.us.username,this.cost.toString(),this.reqq,this.place).subscribe(data=>{
      this.message=data.message
    })
  }

  calc(num:Number,monStart:Number,monEnd:Number,indic:Number):number{
    if(num==monStart){
      if(indic){
        return (31-parseInt(this.sdstr.split("-")[2]));
      }
      else{
        return (30-parseInt(this.sdstr.split("-")[2]));
      }
    }
    else if(num==monEnd){
      return parseInt(this.edstr.split("-")[2]);
    }
    else{
      if(indic) return 31;
      else return 30;
    }

    return 0;
  }

  go(){
    this.router.navigate(['tourist/tvikendice'])
  }

}
