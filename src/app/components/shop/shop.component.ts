import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/core/services/common.service';
import {
  Proxy,
  Params_Get_Service_prod_By_OWNER_ID,
  Params_Get_Sub_category_By_OWNER_ID,
  Params_Get_Category_By_OWNER_ID,
  Params_Get_Sub_category_By_CATEGORY_ID,
  Params_Get_Service_prod_By_SUB_CATEGORY_ID,
  Service_prod,
  Sub_category,
  Category,
} from 'src/app/core/services/proxy.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ToastService } from 'src/app/core/services/toast.service';
import { SaveCredentialsService } from 'src/app/core/services/save-credentials.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  serviceProdList: Service_prod[] = [];
  mockList: Service_prod[] = [];
  mockServiceProd: Service_prod = new Service_prod();
  categoryList: Category[] = [];
  subCategoryList: Sub_category[] = [];

  public isCollapsed = false;
  selectedItem: Category = new Category();

  Get_Product_By_OWNER_ID_Subscription = new Subscription();
  Get_Category_By_OWNER_ID_Subscription = new Subscription();
  Get_Sub_category_By_OWNER_ID_Subscription = new Subscription();
  Get_Sub_category_By_CATEGORY_ID_Subscription = new Subscription();
  Get_Service_prod_By_SUB_CATEGORY_ID_Subscription = new Subscription();

  i_Params_Get_Service_prod_By_OWNER_ID = new Params_Get_Service_prod_By_OWNER_ID();
  i_Params_Get_Category_By_OWNER_ID = new Params_Get_Category_By_OWNER_ID();
  i_Params_Get_Sub_category_By_OWNER_ID = new Params_Get_Sub_category_By_OWNER_ID();
  i_Params_Get_Sub_category_By_CATEGORY_ID = new Params_Get_Sub_category_By_CATEGORY_ID();
  i_Params_Get_Service_prod_By_SUB_CATEGORY_ID = new Params_Get_Service_prod_By_SUB_CATEGORY_ID();

  constructor(private proxySrv: Proxy,
    private CmSvc: CommonService,
    private toastr: ToastService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {

    this.fetchData();
    this.fetchCategory();
  }
  ngOnDestroy(): void {
    this.Get_Product_By_OWNER_ID_Subscription.unsubscribe();
    this.Get_Category_By_OWNER_ID_Subscription.unsubscribe();
    this.Get_Sub_category_By_OWNER_ID_Subscription.unsubscribe();
    this.Get_Service_prod_By_SUB_CATEGORY_ID_Subscription.unsubscribe();
  }

  goProduct(i_id: number | undefined) {
    this.router.navigate(
      ['/product'],
      { queryParams: { id: i_id } }
    );
  }

  fetchData() {
    this.i_Params_Get_Service_prod_By_OWNER_ID.OWNER_ID = 1;
    this.Get_Product_By_OWNER_ID_Subscription = this.proxySrv
      .Get_Service_prod_By_OWNER_ID_Adv(this.i_Params_Get_Service_prod_By_OWNER_ID)
      .subscribe((result) => {
        result.sort((a, b) => {
          let fa = a.IS_BOOSTED,
            fb = b.IS_BOOSTED;

          if (fa! < fb!) {
            return 1;
          }
          if (fa! > fb!) {
            return -1;
          }
          return 0;
        })
        this.serviceProdList = result;
      });

  }

  fetchCategory() {
    this.i_Params_Get_Category_By_OWNER_ID.OWNER_ID = 1;
    this.Get_Category_By_OWNER_ID_Subscription = this.proxySrv.Get_Category_By_OWNER_ID(this.i_Params_Get_Category_By_OWNER_ID).subscribe(result => {
      if (result != null) {
        result.forEach((element: any) => {
          this.i_Params_Get_Sub_category_By_CATEGORY_ID.CATEGORY_ID = element.CATEGORY_ID
          this.Get_Sub_category_By_CATEGORY_ID_Subscription = this.proxySrv.Get_Sub_category_By_CATEGORY_ID(this.i_Params_Get_Sub_category_By_CATEGORY_ID).subscribe(
            (e) => {
              element.My_Sub_categories = e;

            }
          )
          this.categoryList.push(element);
        });
      }
    });
  }

  clearServiceList() {
    this.serviceProdList = [];
  }

  getDataByCat(id: number | undefined) {
    this.clearServiceList();
    this.i_Params_Get_Service_prod_By_SUB_CATEGORY_ID.SUB_CATEGORY_ID = id;
    this.Get_Service_prod_By_SUB_CATEGORY_ID_Subscription = this.proxySrv.Get_Service_prod_By_SUB_CATEGORY_ID_Adv(this.i_Params_Get_Service_prod_By_SUB_CATEGORY_ID).subscribe(
      (result) => {
        if (result != null) {
          this.serviceProdList = result;
        }
      }
    )
  }

  selectItem(category: Category) {
    if (this.selectedItem != category) {
      this.selectedItem = category;
    } else {
      this.selectedItem = {} as Category;
    }
  }
}
