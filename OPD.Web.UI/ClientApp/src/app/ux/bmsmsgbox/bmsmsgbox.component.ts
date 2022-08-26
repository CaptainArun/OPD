import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
// import {NgbModal, NgbModalOptions, NgbActiveModal,  ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  // selector: 'bms-messagebox',
  templateUrl: 'bmsmsgbox.component.html'
})

export class BMSMessageBox implements OnInit {
  @Input()
  msgBoxTitle: string | any;

  @Input()
  message: string | any;

  @Input()
  mode: BMSMessageBoxMode = BMSMessageBoxMode.MessageBox; // Mode of Message box - Values Message, Confirm
  @Input()
  colorMode: BMSMessageBoxColorMode = BMSMessageBoxColorMode.Information;  //Mode for header color  - Info, Danger, Warning

  // Changed line
  
  // private isInfo: boolean = true;
  // private isDanger: boolean = false;
  // private isWarning: boolean = false;
  isInfo: boolean = true;
  isDanger: boolean = false;
  isWarning: boolean = false;

  constructor(public dialogRef: MatDialogRef<BMSMessageBox>

  ) {

  }

  closeDialog(value: any) {
    this.dialogRef.close(value);
  }

  ngOnInit() {
    switch (this.colorMode) {
      case BMSMessageBoxColorMode.Information: {
        this.isInfo = true;
        this.isDanger = false;
        this.isWarning = false;
        break;
      }
      case BMSMessageBoxColorMode.Danger:
        {
          this.isInfo = false;
          this.isDanger = true;
          this.isWarning = false;
          break;
        }
      case BMSMessageBoxColorMode.Warning:
        {
          this.isInfo = false;
          this.isDanger = false;
          this.isWarning = true;
          break;
        }
    }
  }
}

export enum BMSMessageBoxColorMode {
  Information,
  Danger,
  Warning
}

export enum BMSMessageBoxMode {
  MessageBox,
  ConfrimBox
}
