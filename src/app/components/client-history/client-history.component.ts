import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/core/services/common.service';
import { SaveCredentialsService } from 'src/app/core/services/save-credentials.service';
import {
  Proxy,
  Booking,
  Client,
  Params_Get_Booking_By_CLIENT_ID

} from '../../core/services/proxy.service';
@Component({
  selector: 'app-client-history',
  templateUrl: './client-history.component.html',
  styleUrls: ['./client-history.component.css']
})
export class ClientHistoryComponent implements OnInit, OnDestroy {
  client!: Client;
  bookingList!: Booking[];
  _params_Get_Booking_By_CLIENT_ID = new Params_Get_Booking_By_CLIENT_ID();
  Get_Booking_By_CLIENT_ID_Subscription = new Subscription();



  constructor(private proxy: Proxy, private CmSvc: CommonService,
    private router: Router, private saveCred: SaveCredentialsService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.Get_Booking_By_CLIENT_ID_Subscription.unsubscribe();
  }

  fetchData() {
    this.client = this.saveCred.getLocalClient();
    this._params_Get_Booking_By_CLIENT_ID.CLIENT_ID = this.saveCred.getClientID();
    this.Get_Booking_By_CLIENT_ID_Subscription = this.proxy.Get_Booking_By_CLIENT_ID_Adv(this._params_Get_Booking_By_CLIENT_ID).subscribe(result => {
      if (result != null) {
        this.bookingList = result;
        this.bookingList.reverse();
      }
    });
  }

  Edit(current: Booking) {
    this.proxy.Edit_Booking(current).subscribe((result) => {
      if (result != null) {
        this.CmSvc.ShowMessage('Done');
        if (current.BOOKING_ID === -1) {
          this.bookingList.splice(this.bookingList.indexOf(current), 1);
          const newEntry: any = result;
          newEntry.MyUploadedImages = [];
          newEntry.MyURL = this.CmSvc.APIUrl + '/Upload_Image?REL_ENTITY=[TBL_BOOKING]&REL_FIELD=BOOKING_IMAGE&REL_KEY=' + newEntry.BOOKING_ID;
          this.bookingList.unshift(newEntry);
        }
      }
    });
  }

  goHistoryDetails(i_id: number | undefined) {
    this.router.navigate(
      ['/history-details'],
      { queryParams: { id: i_id } }
    );
  }
}
