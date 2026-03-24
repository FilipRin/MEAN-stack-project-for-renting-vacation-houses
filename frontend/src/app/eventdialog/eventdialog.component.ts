import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-eventdialog',
  standalone: true,
  imports: [],
  /*template: `<h1 mat-dialog-title>{{ data.event.title }}</h1>
    <div mat-dialog-content>
      <p><strong>Date:</strong> {{ data.event.start }}</p>
      <p><strong>Description:</strong> {{ data.event.extendedProps.description }}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </div>`,*/
  templateUrl: './eventdialog.component.html',
  styleUrl: './eventdialog.component.css'
})
export class EventdialogComponent {
  dateStart=""
  dateEnd=""
  closemsg=""
  constructor(private ref:MatDialogRef<EventdialogComponent>, @Inject(MAT_DIALOG_DATA) public data:any){
    this.dateStart=new Date(data.event.start).toLocaleDateString()
    this.dateEnd=new Date(data.event.end).toLocaleDateString()
    const xd=data.event.extendedProps.requests
    console.log(this.dateStart)
    console.log(xd)
  }

  closePopup(){
    this.ref.close('close');
  }

  acceptPopup(){
    //this.data.event.extendedProps.active=true;
    this.ref.close('accept');
  }

  denyPopup(){
    this.ref.close('deny');
  }

}
