import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input('message') message:string;
  @Output() close=new EventEmitter<void>();
    constructor() { }
  
    ngOnInit(): void {
      console.log("message in alert component"+this.message);
    }
  
    onClose(){
      this.close.emit();
    }

}
