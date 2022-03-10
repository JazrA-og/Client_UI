import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/common.service';
import { Client } from 'src/app/core/services/proxy.service';
import { SaveCredentialsService } from 'src/app/core/services/save-credentials.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  data: any;
  client?: Client;

  constructor(
    public CmSvc: CommonService,
    private router: Router,
    private saveCred: SaveCredentialsService
  ) { }

  ngOnInit(): void {
    this.client = this.saveCred.getLocalClient();
  }

  logout() {
    this.CmSvc.Is_Logged_In.next(false);
    this.client = {} as Client;
    this.saveCred.clearCredentials();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void { }

  goToClientInfo() {
    let i_id = this.client?.CLIENT_ID;
    this.router.navigate(
      ['/client-info'],
      { queryParams: { id: i_id } }
    );

  }
}
