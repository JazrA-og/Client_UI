import { Component, OnDestroy, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/common.service';
import {
  Proxy,
} from 'src/app/core/services/proxy.service';
import { SaveCredentialsService } from 'src/app/core/services/save-credentials.service';
import { Location } from '@angular/common';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loading = false;
  model: any = {};
  constructor(
    private proxy: Proxy,
    private CmSvc: CommonService,
    private saveCred: SaveCredentialsService,
    private location: Location,
    private toast: ToastService

  ) {
    this.model = {};
    this.model.USERNAME = "";
    this.model.PASSWORD = "";
  }
  ngOnDestroy(): void {
  }

  ngOnInit() {}
  // login() {
  //   this.loading = true;
  //   this.CmSvc.Is_Logged_In.next(true);
  //   this.router.navigate(["/menu"]);

  // }

  login() {

    this.loading = true;

    this.proxy.Authenticate(this.model).subscribe((result) => {
      this.loading = false;
      this.CmSvc.ShowMessage("Login Successfull");
      if (!result) {
        this.CmSvc.ShowMessage("Invalid User and/or password");
      } else {
       // if (result.IsAuthenticated) {

          // -------------------------
         // this.CmSvc.ticket = result.Ticket;
        this.saveCred.setCredentials(result);
        this.CmSvc.Is_Logged_In.next(true);
        // this.router.navigate(["/shop"]);
        this.location.back();
          // --------------------------

      }
    });
  }
}
