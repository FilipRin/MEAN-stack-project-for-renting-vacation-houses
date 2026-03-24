import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { VikendicaService } from '../services/vikendica.service';
import { Vikendica } from '../models/vikendica';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-indexpage',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './indexpage.component.html',
  styleUrl: './indexpage.component.css'
})
export class IndexpageComponent {

  vikNum=0
  llNum=0
  tourNum=0
  nameSearch=""
  placeSearch=""
  srtype=""
  srtype2=""

  vikService=inject(VikendicaService)
  userService=inject(UserService)

  allVikendice:Vikendica[]=[]
  allTourists:User[]=[]
  allLandlords:User[]=[]
  searchedVik:Vikendica[]=[]

  ngOnInit():void{
    this.vikService.getAllVikendice().subscribe(data=>{
      if(data){
        this.allVikendice=data
        this.vikNum=this.allVikendice.length
      }
    })
    
    this.userService.getAllTourists().subscribe(data=>{
      if(data){
        this.allTourists=data
        this.tourNum=this.allTourists.length
      }
    })

    this.userService.getAllLandlords().subscribe(data=>{
      if(data){
        this.allLandlords=data
        this.llNum=this.allLandlords.length
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
    else{
      this.allVikendice.forEach((element)=>{
        if(element.place==this.placeSearch){
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

}
