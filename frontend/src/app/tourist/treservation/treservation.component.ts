import { Component, inject, Input } from '@angular/core';
import { Reservation } from '../../models/reservation';
import { ReservationService } from '../../services/reservation.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { User } from '../../models/user';
import { VikendicaService } from '../../services/vikendica.service';
import { FeedbackService } from '../../services/feedback.service';

@Component({
  selector: 'app-treservation',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './treservation.component.html',
  styleUrl: './treservation.component.css'
})
export class TreservationComponent {

  activeRes:Reservation[]=[]
  archivedRes:Reservation[]=[]
  user=""
  dispRate="none"
  resService=inject(ReservationService)
  vikService=inject(VikendicaService)
  feedService=inject(FeedbackService)
  message=""
  message2=""
  @Input() rating: number = 0;
  @Input() maxStars: number = 5;
  rateVik=""
  ratePlace=""
  rateDateStart=""
  rateDateEnd=""
  dateStart=new Date()
  dateEnd=new Date()
  kom=""

  rateStars:number[]=[1,2,3,4,5]
  currentRating=0;

  ngOnInit():void
  {
    let username=localStorage.getItem("loggedUser")
    if(username) this.user=username
    this.resService.getActiveReservations(this.user).subscribe(data=>{
      if(data){
        this.activeRes=data
        for(let i=0;i<this.activeRes.length;i++){
          this.activeRes[i].dateStart=new Date(this.activeRes[i].dateStart).toLocaleDateString();
          
          this.activeRes[i].dateEnd=new Date(this.activeRes[i].dateEnd).toLocaleDateString();
          
        }
      }
    })
    
    this.resService.getArchivedReservations(this.user).subscribe(data=>{
      if(data)
        this.archivedRes=data
      console.log(this.archivedRes)
      for(let i=0;i<this.archivedRes.length;i++){
        this.archivedRes[i].dateStart=new Date(this.archivedRes[i].dateStart).toLocaleDateString();
        
        this.archivedRes[i].dateEnd=new Date(this.archivedRes[i].dateEnd).toLocaleDateString();
        
      }
    })
  } 

  cancelRes(place:string,vikName:string,dStart:string,dEnd:string){
    let newed=dEnd.split(".")
    let y=parseInt(newed[2])
    let m = newed[1]
    let d = newed[0]
    if(parseInt(m)<10){m="0"+parseInt(m);}
    if(parseInt(d)<10){d="0"+parseInt(d);}
    let edate=`${y}-${m}-${d}`
    
    let newsd = dStart.split('.')
    y = parseInt(newsd[2])
    m = newsd[1]
    d = newsd[0]
    if(parseInt(m)<10){m="0"+parseInt(m);}
    if(parseInt(d)<10){d="0"+parseInt(d);}
    let sdate=`${y}-${m}-${d}`
    
    

    let today=new Date().toLocaleDateString().split('.')
    let y2=parseInt(today[2])
    let m2 = today[1]
    let d2 = today[0]
    if(parseInt(m2)<10){m2="0"+parseInt(m2);}
    if(parseInt(d2)<10){d2="0"+parseInt(d2);}
    let currdate=`${y2}-${m2}-${d2}`
    console.log(currdate+"SADASNJI DATUM")

    if(parseInt(m)===parseInt(m2) && parseInt(d)-parseInt(d2)>=1){
      this.resService.deleteReservation(place,vikName,sdate,edate).subscribe(data=>{
        this.message=data.message
      })
      this.load()
    }
    else if(parseInt(m)-parseInt(m2)==1){
      switch(parseInt(m2)){
        case 1:case 3:case 5:case 7:case 8:case 10:case 12: 
          if(parseInt(d2)==31 && parseInt(d)==1){
            this.resService.deleteReservation(place,vikName,sdate,edate).subscribe(data=>{
              this.message=data.message
            })
          };break;
        case 4:case 6:case 9:case 11:
          if(parseInt(d2)==30 && parseInt(d)==1){
            this.resService.deleteReservation(place,vikName,sdate,edate).subscribe(data=>{
              this.message=data.message
            })
          };break;
        case 2:
          if(y2%4==0){
            if(parseInt(d2)==28 && parseInt(d)==1){
              this.resService.deleteReservation(place,vikName,sdate,edate).subscribe(data=>{
                this.message=data.message
              })
            }
          }
          else{
            if(parseInt(d2)==27 && parseInt(d)==1){
              this.resService.deleteReservation(place,vikName,sdate,edate).subscribe(data=>{
                this.message=data.message
              })
            }
          }
          ;break;
      }
      this.load()
    }
    else{
      this.message="Prekasno je za otkazivanje ove rezervacije!"
    }
  }

  rate(){
    let newed=this.rateDateEnd.split(".")
    let y=parseInt(newed[2])
    let m = newed[1]
    let d = newed[0]
    if(parseInt(m)<10){m="0"+parseInt(m);}
    if(parseInt(d)<10){d="0"+parseInt(d);}
    let edate=`${y}-${m}-${d}`
    
    let newsd = this.rateDateStart.split('.')
    y = parseInt(newsd[2])
    m = newsd[1]
    d = newsd[0]
    if(parseInt(m)<10){m="0"+parseInt(m);}
    if(parseInt(d)<10){d="0"+parseInt(d);}
    let sdate=`${y}-${m}-${d}`


    this.dateStart=new Date(sdate)
    this.dateEnd=new Date(edate)
    console.log(this.dateStart+"   pom   "+this.dateEnd)
    this.feedService.rate(this.rateVik,this.user,this.dateStart,this.dateEnd,this.kom,this.ratePlace,this.currentRating).subscribe(data=>{
      this.message2=data.message
    })
    this.dispRate="block"
    //this.currentRating = rating;
    //console.log(this.currentRating)
  }

  showForm(vikName:string,place:string,sdate:string,edate:string){
    this.dispRate="block"
    this.rateVik=vikName
    this.ratePlace=place
    this.rateDateStart=sdate
    this.rateDateEnd=edate
  }

  load(){
    let username=localStorage.getItem("loggedUser")
    if(username) this.user=username
    this.resService.getActiveReservations(this.user).subscribe(data=>{
      if(data){
        this.activeRes=data
        for(let i=0;i<this.activeRes.length;i++){
          this.activeRes[i].dateStart = new Date(this.activeRes[i].dateStart).toLocaleDateString();
          
          this.activeRes[i].dateEnd = new Date(this.activeRes[i].dateEnd).toLocaleDateString();
        }
      }
    })
  }

  selectRating(rating: number) {
    this.currentRating = rating;
    console.log(this.currentRating)
    //this.ratingChange.emit(this.currentRating);
  }

  get starsArray(): number[] {
    return Array(this.maxStars).fill(0);
  }

  getStarClass(index: number): string {
    if (this.currentRating >= index + 1) {
      return 'full-star'; // Full star
    } else if (this.currentRating > index && this.currentRating < index + 1) {
      return 'half-star'; // Half star (for fractional ratings)
    } else {
      return 'empty-star'; // Empty star
    }
  }

}
