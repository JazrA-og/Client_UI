import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/core/services/common.service';
import { Params_Get_Category_By_OWNER_ID, Category,Sub_category, Proxy } from 'src/app/core/services/proxy.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  Get_Category_By_OWNER_ID_Subscription = new Subscription();
searchModel: Params_Get_Category_By_OWNER_ID = new Params_Get_Category_By_OWNER_ID();
data: Category[] = [];



constructor(private proxy: Proxy, private CmSvc: CommonService ) {}

ngOnInit(): void {



this.fetchData();
}
ngOnDestroy(): void {
this.Get_Category_By_OWNER_ID_Subscription.unsubscribe();

}
fetchData() {
this.searchModel.OWNER_ID = 1;
this.Get_Category_By_OWNER_ID_Subscription = this.proxy.Get_Category_By_OWNER_ID_Adv(this.searchModel).subscribe(result => {
 if (result != null) {
   result.forEach((element: any) => {

this.data.push(element);
});
}
});
}
}
