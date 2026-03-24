import { Component, inject } from '@angular/core';
import { Vikendica } from '../../models/vikendica';
import { User } from '../../models/user';
import { VikendicaService } from '../../services/vikendica.service';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FeedbackService } from '../../services/feedback.service';
import { Feedback } from '../../models/feedback';

@Component({
  selector: 'app-tvikendice',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './tvikendice.component.html',
  styleUrl: './tvikendice.component.css'
})
export class TvikendiceComponent {
  nameSearch=""
  placeSearch=""
  srtype=""
  srtype2=""

  vikService=inject(VikendicaService)
  userService=inject(UserService)
  feedService=inject(FeedbackService)
  private router = inject(Router)

  user=""
  allVikendice:Vikendica[]=[]
  allTourists:User[]=[]
  allLandlords:User[]=[]
  allFeedbacks:Feedback[]=[]
  searchedVik:Vikendica[]=[]
  rateStars:number[]=[1,2,3,4,5]
  rating: number = 0; // Input property for the rating value
  maxStars: number = 5;
  currentRating=0
  ratings:Number[]=[]

  rrr:Map<string,number>=new Map<string,number>()

  ngOnInit():void{
    
    let username = localStorage.getItem("loggedUser")
    if(username) this.user=username
    this.nameSearch=""
    this.placeSearch=""
    this.srtype=""
    this.srtype2=""
    this.vikService.getAllVikendice().subscribe(data=>{
      if(data){
        let sum=0
        this.allVikendice=data
        this.searchedVik=data
        data.forEach((element)=>{
          this.feedService.getRating(element.name).subscribe(data=>{
            if(data){
              this.allFeedbacks=data
              this.allFeedbacks.forEach(element=>{
                sum=sum+element.rating
              })
              if(this.allFeedbacks.length>0){
                this.ratings.push(sum/this.allFeedbacks.length)
                this.rrr.set(element.name,sum/this.allFeedbacks.length)
                sum=0
              }
              else{
                this.ratings.push(0)
                this.rrr.set(element.name,0)
              }
            }
            /*else{
              this.ratings.push(0)
                this.rrr.set(element.name,0)
            }*/
          })
        })
      }
    })
    
    this.userService.getAllTourists().subscribe(data=>{
      if(data){
        this.allTourists=data
        
      }
    })

    this.userService.getAllLandlords().subscribe(data=>{
      if(data){
        this.allLandlords=data
        
      }
    })

  }

  search(){
    this.searchedVik=[]
    if(this.nameSearch=="" && this.placeSearch==""){
      this.searchedVik=this.allVikendice
      return
    }
    if(this.placeSearch==""){
      this.allVikendice.forEach((element)=>{
        if(element.name==this.nameSearch){
          this.searchedVik.push(element)
        }
      })
    }
    else if(this.nameSearch==""){
      this.allVikendice.forEach((element)=>{
        if(element.place==this.placeSearch){
          this.searchedVik.push(element)
        }
      })
    }
    else{
      this.allVikendice.forEach((element)=>{
        if(element.place==this.placeSearch && element.name==this.nameSearch){
          this.searchedVik.push(element)
        }
      })
    }
  }
  sort(){
    if(this.searchedVik.length!=0){
      if(this.srtype=="asc"){
        this.searchedVik.sort((a,b)=>a.name.localeCompare(b.name))
      }
      else if(this.srtype=="desc"){
        this.searchedVik.sort((a,b)=>b.name.localeCompare(a.name))
      }
    }
  }
  sort2(){
    if(this.searchedVik.length!=0){
      if(this.srtype2=="asc"){
        this.searchedVik.sort((a,b)=>a.place.localeCompare(b.place))
      }
      else if(this.srtype2=="desc"){
        this.searchedVik.sort((a,b)=>b.place.localeCompare(a.place))
      }
    }
  }
  go(n:string,p:string){
    localStorage.setItem("vikendicaName",n)
    localStorage.setItem("vikendicaPlace",p)
    this.router.navigate(['vikendica'])
  }

  get starsArray(): number[] {
    return Array(this.maxStars).fill(0);
  }

  getStarClass(num: Number,vikName:string): string {
    let index=num.valueOf()
    let x=this.rrr.get(vikName)
    console.log(x+"XXXXXXXXXXXXXXXX")
    if(x || x===0){
      this.currentRating=x
    }
    if (this.currentRating >= index + 1) {
      return 'full-star'; // Full star
    } else if (this.currentRating > index && this.currentRating < index + 1) {
      return 'half-star'; // Half star (for fractional ratings)
    } else {
      return 'empty-star'; // Empty star
    }
  }
}
