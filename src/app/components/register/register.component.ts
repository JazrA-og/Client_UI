import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/common.service';
import {
  Proxy,
  Client
} from 'src/app/core/services/proxy.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  model: any = {};
  i_client: Client;
  constructor(
    private proxy: Proxy,
    private CmSvc: CommonService,
    private router: Router
  ) {
    this.i_client = new Client();
  }
  ngOnDestroy(): void {

  }
  ngOnInit(): void {
  }

  register() {
    this.i_client.CLIENT_ID = -1;
    this.i_client.IS_ACTIVE = false;
    this.i_client.IS_VERIFIED = false;
    // this.i_client.CLIENT_ID = -1;
    this.proxy.Edit_Client(this.i_client).subscribe(
      (result) => {
        if (result != null) {
          this.CmSvc.ShowMessage('Done');
        }
        // this.router.navigate(["/login"]);
      }
    )

  }
}
