import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/core/services/common.service';
import {
  Client,
  Params_Delete_Client,
  Params_Get_Client_By_CLIENT_ID,
  Proxy
} from 'src/app/core/services/proxy.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.css']
})
export class ClientInfoComponent implements OnInit {
  Get_Client_By_CLIENT_ID_Subscription = new Subscription();
  searchModel: Params_Get_Client_By_CLIENT_ID = new Params_Get_Client_By_CLIENT_ID();
  data: Client = new Client();



  constructor(private proxy: Proxy, private CmSvc: CommonService, private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (d) => {
        this.searchModel.CLIENT_ID = d['id']
      }
    )

    this.fetchData();
  }
  ngOnDestroy(): void {
    this.Get_Client_By_CLIENT_ID_Subscription.unsubscribe();

  }
  fetchData() {
    this.Get_Client_By_CLIENT_ID_Subscription = this.proxy.Get_Client_By_CLIENT_ID(this.searchModel).subscribe(result => {
      if (result != null) {
        this.data = result;
      }
    });
  }

  Edit() {

    this.proxy.Edit_Client(this.data).subscribe((result) => {
      if (result != null) {
        this.CmSvc.ShowMessage('Done');
      }
    });
  }

  Delete() {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        const _params_Delete_Client = new Params_Delete_Client();
        _params_Delete_Client.CLIENT_ID = this.data.CLIENT_ID;
        this.proxy.Delete_Client(_params_Delete_Client).subscribe(data => {

        });
      }
    });
  }
}
