import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Vikendica } from '../../models/vikendica';
import { VikendicaService } from '../../services/vikendica.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from '../../models/reservation';
import {FullCalendarModule} from '@fullcalendar/angular'
import { CalendarOptions, EventApi, EventClickArg } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'
import { Title } from '@angular/platform-browser';
import { Events } from '../../models/events';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EventdialogComponent } from '../../eventdialog/eventdialog.component';

@Component({
  selector: 'app-llreservation',
  standalone: true,
  imports: [FormsModule,RouterLink,FullCalendarModule,MatDialogModule],
  templateUrl: './llreservation.component.html',
  styleUrl: './llreservation.component.css'
})
export class LlreservationComponent {

  resEvents:Events[]=[]
  ev=[{
    title:'pom', start:'2025-07-29',end:'2025-07-30',color:'yellow',requests:'',vik:new Vikendica(),active:false
  }]

  private vikService=inject(VikendicaService)
  private userService=inject(UserService)
  private resService= inject(ReservationService)
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin,interactionPlugin],
    //eventClick
    events:this.ev,
    editable:true,
    selectable:true,
    eventClick: this.handleEventClick.bind(this)
  };

   
  myVikendice: Vikendica[] = [];
  myRezervacije: Reservation[]=[];
  temp:Reservation[]=[];
  vik:Vikendica=new Vikendica()
  
  message=""
  username=""
  user: User = new User()

  constructor(public dialog:MatDialog){

  }

  ngOnInit(): void {
    
    //this.calendarOptions=new FullCalendar.Calendar()
    let usern = localStorage.getItem("loggedUser");
    if(usern!=null) this.username=usern
    this.userService.getUser(this.username).subscribe(user=>{
      if(user.status==200){
        if(user.body) {
          this.user = user.body;
          console.log(this.user)
        }
      }
    })
    let pom
    this.vikService.getMyVikendice(this.username).subscribe(data=>{
      this.myVikendice=data
      this.myVikendice.forEach((vik)=>this.resService.getPendingReservations(vik.name).subscribe(data2=>{
        data2.forEach(res=>{
          pom={title:res.vikendica,start:res.dateStart.slice(0,10),end:res.dateEnd.slice(0,10),color:'orange',requests:res.requests,vik:vik,active:false}
          this.ev.push(pom)
          
          res.dateStart=new Date(res.dateStart).toLocaleDateString();
          res.dateEnd=new Date(res.dateEnd).toLocaleDateString();
        })
        this.upd()
        console.log("eyo"+this.calendarOptions.events?.toString())
        this.myRezervacije=this.myRezervacije.concat(data2)
        this.temp=this.myRezervacije
        console.log(this.temp)
      })
      )
      this.myVikendice.forEach((vik)=>this.resService.getAcceptedReservations(vik.name).subscribe(data3=>{
        this.temp=data3
        console.log(this.temp)
        data3.forEach(res=>{
          pom={title:res.vikendica,start:res.dateStart.slice(0,10),end:res.dateEnd.slice(0,10),color:'green',requests:res.requests,vik:vik,active:true}
          this.ev.push(pom)
        })
        this.upd()
      }))
      this.ev.shift()
      this.upd()
    })
  }

  handleEventClick(clickInfo:any){
    var storage={data:{
      event:clickInfo.event,
      res:this.myRezervacije,
      decision:""
    }}
    var poptemp=this.dialog.open(EventdialogComponent,storage);
    console.log("OVDE SAM")
    //this.dialog.closeAll()
    poptemp.afterClosed().subscribe(data=>{
      if(data==="accept"){
        this.accept(storage.data.event._def.extendedProps.vik.place,storage.data.event._def.title,new Date(storage.data.event.start).toLocaleDateString(),new Date(storage.data.event.end).toLocaleDateString())
      }
      else if(data==="deny"){
        this.decline(storage.data.event._def.extendedProps.vik.place,storage.data.event._def.title,new Date(storage.data.event.start).toLocaleDateString(),new Date(storage.data.event.end).toLocaleDateString())
      }
      else{ console.log("zatvoren popup") }
    })
  }

  upd(){
    this.calendarOptions={
      ...this.calendarOptions,
      events:[...this.ev]
    }
  }

  accept(place:string,vikendica:string,dStart:string,dEnd:string){

    console.log("IME VIKENDICE: "+vikendica)
    let str=vikendica
    let newsd = dStart.split('.')
    let y = parseInt(newsd[2])
    let m = newsd[1]
    let d = newsd[0]
    if(parseInt(m)<10){m="0"+parseInt(m);}
    if(parseInt(d)<10){d="0"+parseInt(d);}
    let sdate=`${y}-${m}-${d}`
    
    let newed=dEnd.split(".")
    y=parseInt(newed[2])
    m = newed[1]
    d = newed[0]
    if(parseInt(m)<10){m="0"+parseInt(m);}
    if(parseInt(d)<10){d="0"+parseInt(d);}
    let edate=`${y}-${m}-${d}`
    
    this.resService.acceptReservation(place,vikendica,sdate,edate).subscribe(data=>{
      this.message=data.message
      alert(this.message)
      this.ev=this.ev.map(event=> event.title===vikendica && event.start===sdate && event.end===edate ? {...event,color:'green',active:true} : event)
      this.upd()
      this.myRezervacije=[]
      this.temp=[]
      this.vikService.getMyVikendice(this.username).subscribe(data=>{
        this.myVikendice=data
        this.myVikendice.forEach((vik)=>this.resService.getPendingReservations(vik.name).subscribe(data2=>{
          data2.forEach(res=>{
            res.dateStart=new Date(res.dateStart).toLocaleDateString();
            res.dateEnd=new Date(res.dateEnd).toLocaleDateString();
          })
          this.myRezervacije=this.myRezervacije.concat(data2)
          this.temp=this.myRezervacije
          console.log(this.temp)
        })
        )
        //this.calendarOptions
        console.log("xxxx"+this.myVikendice)
      })
    })
    //console.log(new Date(dStart)+"  "+new Date(dEnd))
  }

  decline(place:string,vikendica:string,dStart:string,dEnd:string){

    let str=vikendica
    let newsd = dStart.split('.')
    let y = parseInt(newsd[2])
    let m = newsd[1]
    let d = newsd[0]
    if(parseInt(m)<10){m="0"+parseInt(m);}
    if(parseInt(d)<10){d="0"+parseInt(d);}
    let sdate=`${y}-${m}-${d}`
    
    let newed=dEnd.split(".")
    y=parseInt(newed[2])
    m = newed[1]
    d = newed[0]
    if(parseInt(m)<10){m="0"+parseInt(m);}
    if(parseInt(d)<10){d="0"+parseInt(d);}
    let edate=`${y}-${m}-${d}`

    this.resService.declineReservation(place,vikendica,sdate,edate).subscribe(data=>{
      this.message=data.message
      alert(this.message)
      this.ev=this.ev.filter(event=>event.title!==vikendica && event.start!==sdate && event.end!==edate)
      this.upd()
      this.myRezervacije=[]
      this.temp=[]
      this.vikService.getMyVikendice(this.username).subscribe(data=>{
        this.myVikendice=data
        this.myVikendice.forEach((vik)=>this.resService.getPendingReservations(vik.name).subscribe(data2=>{
          data2.forEach(res=>{
            res.dateStart=new Date(res.dateStart).toLocaleDateString();
            res.dateEnd=new Date(res.dateEnd).toLocaleDateString();
          })
          this.myRezervacije=this.myRezervacije.concat(data2)
          this.temp=this.myRezervacije
          console.log(this.temp)
        })
        )
        console.log("xxxx"+this.myVikendice)
      })
    })

  }

  

}
