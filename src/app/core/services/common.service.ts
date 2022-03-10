import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class CommonService {
  public APIUrl = 'http://localhost:5000/api/Data';
  public ticket = '';
  Is_Logged_In = new BehaviorSubject<boolean>(false);
  UI_Direction = new BehaviorSubject<string>('ltr');
  AZURE_BLOB_IMAGES_CONTAINER = "";
  constructor(private snackBar: MatSnackBar) { }
  // constructor(private toastr: ToastrService) { }
  // constructor() { }

  ShowMessage(message: string, d: number = 1000) {
    this.snackBar.open(message, '', {duration: d});
	// alert(message);
  // this.toastr.success(message);
  }

  showSuccess(message: string | undefined) {
    console.log(message);

    // this.toastr.success(message);
  }
  showFail(message: string | undefined){
    // this.toastr.error(message);
  }

  Handle_Exception(msg: string | null) {
    if ((msg != null) && (msg !== '')) {
      this.ShowMessage(msg , 3000);
    }
  }
}
