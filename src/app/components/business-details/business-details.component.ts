import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  Proxy,
  Params_Get_Business_By_BUSINESS_ID,
  Params_Get_Service_prod_By_BUSINESS_ID,
  // Params_Get_Work_area_By_BUSINESS_ID,
  Params_Get_Category_By_OWNER_ID,
  Params_Get_Sub_category_By_CATEGORY_ID,
  Params_Get_Service_prod_By_SUB_CATEGORY_ID,
  Params_Get_Work_list_By_BUSINESS_ID,
  Business,
  Service_prod,
  Work_area,
  Category,
  Sub_category,
  Work_list
} from 'src/app/core/services/proxy.service';
import { SaveCredentialsService } from 'src/app/core/services/save-credentials.service';

@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.component.html',
  styleUrls: ['./business-details.component.css']
})
export class BusinessDetailsComponent implements OnInit, OnDestroy {

  businessID: any;
  business!: Business;
  servicesList: Service_prod[] = [];
  workAreaList: Work_area[] = [];
  categoryList: Category[] = [];
  subCategoryList: Sub_category[] = [];
  workList: Work_list[] = [];

  public isCollapsed = false;
  selectedItem: Category = new Category();

  i_Params_Get_Category_By_OWNER_ID = new Params_Get_Category_By_OWNER_ID();
  Get_Category_By_OWNER_ID_Subscription = new Subscription();

  i_Params_Get_Sub_category_By_CATEGORY_ID = new Params_Get_Sub_category_By_CATEGORY_ID();
  Get_Sub_category_By_CATEGORY_ID_Subscription = new Subscription();

  i_Params_Get_Service_prod_By_SUB_CATEGORY_ID = new Params_Get_Service_prod_By_SUB_CATEGORY_ID();
  Get_Service_prod_By_SUB_CATEGORY_ID_Subscription = new Subscription();

  // i_Params_Get_Work_area_By_BUSINESS_ID = new Params_Get_Work_area_By_BUSINESS_ID();
  Get_Work_area_By_BUSINESS_ID_Subscription = new Subscription();

  i_Params_Get_Service_prod_By_BUSINESS_ID = new Params_Get_Service_prod_By_BUSINESS_ID();
  Get_Service_prod_By_BUSINESS_ID_Subscription = new Subscription();

  i_Params_Get_Business_By_BUSINESS_ID = new Params_Get_Business_By_BUSINESS_ID();
  Get_Business_By_BUSINESS_ID_Subscription = new Subscription();

  i_Params_Get_Work_list_By_BUSINESS_ID = new Params_Get_Work_list_By_BUSINESS_ID();
  Get_Work_list_By_BUSINESS_ID_Subscription = new Subscription();

  constructor(private proxy: Proxy,
    private saveCred: SaveCredentialsService,
    private router: Router,
    private route: ActivatedRoute,) { }


  ngOnDestroy(): void {
    this.Get_Business_By_BUSINESS_ID_Subscription.unsubscribe();
    this.Get_Service_prod_By_BUSINESS_ID_Subscription.unsubscribe();
    this.Get_Work_area_By_BUSINESS_ID_Subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (d) => {
        this.businessID = d['id']
      }
    )
    this.fetchData();
    this.fetchCategory();
  }

  fetchData() {
    this.i_Params_Get_Business_By_BUSINESS_ID.BUSINESS_ID = this.businessID;
    this.Get_Business_By_BUSINESS_ID_Subscription = this.proxy.Get_Business_By_BUSINESS_ID_Adv(this.i_Params_Get_Business_By_BUSINESS_ID).subscribe(
      (result) => {
        if (result != null) {
          this.business = result;
        }
      }
    )

    this.i_Params_Get_Service_prod_By_BUSINESS_ID.BUSINESS_ID = this.businessID;
    this.Get_Service_prod_By_BUSINESS_ID_Subscription = this.proxy.Get_Service_prod_By_BUSINESS_ID_Adv(this.i_Params_Get_Service_prod_By_BUSINESS_ID).subscribe(
      (result) => {
        if (result != null) {
          this.servicesList = result;
        }

      }
    )

    // this.i_Params_Get_Work_area_By_BUSINESS_ID.BUSINESS_ID = this.businessID;
    // this.Get_Work_area_By_BUSINESS_ID_Subscription = this.proxy.Get_Work_area_By_BUSINESS_ID(this.i_Params_Get_Work_area_By_BUSINESS_ID).subscribe(
    //   (result) => {
    //     if (result != null) {
    //       this.workAreaList = result;
    //     }
    //   }
    // )
    this.fetchWorkList();
  }

  logBusiness() {
    console.log(this.business);
    console.log(this.servicesList);
    console.log(this.workAreaList);

  }

  goProduct(i_id: number | undefined) {
    this.router.navigate(
      ['/product'],
      { queryParams: { id: i_id } }
    );
  }

  clearServiceList() {
    this.servicesList = [];
  }

  fetchCategory() {
    this.i_Params_Get_Category_By_OWNER_ID.OWNER_ID = 1;
    this.Get_Category_By_OWNER_ID_Subscription = this.proxy.Get_Category_By_OWNER_ID(this.i_Params_Get_Category_By_OWNER_ID).subscribe(result => {
      if (result != null) {
        result.forEach((element: any) => {
          // console.log(element);
          this.i_Params_Get_Sub_category_By_CATEGORY_ID.CATEGORY_ID = element.CATEGORY_ID
          this.Get_Sub_category_By_CATEGORY_ID_Subscription = this.proxy.Get_Sub_category_By_CATEGORY_ID(this.i_Params_Get_Sub_category_By_CATEGORY_ID).subscribe(
            (e) => {
              element.My_Sub_categories = e;
            }
          )
          this.categoryList.push(element);
        });
      }
    });
  }

  selectItem(category: Category) {
    if (this.selectedItem != category) {
      this.selectedItem = category;
    } else {
      this.selectedItem = {} as Category;
    }
  }

  getDataByCat(id: number | undefined) {
    this.clearServiceList();
      this.i_Params_Get_Service_prod_By_SUB_CATEGORY_ID.SUB_CATEGORY_ID = id;
      this.Get_Service_prod_By_SUB_CATEGORY_ID_Subscription = this.proxy.Get_Service_prod_By_SUB_CATEGORY_ID_Adv(this.i_Params_Get_Service_prod_By_SUB_CATEGORY_ID).subscribe(
        (result) => {
          if (result != null) {
            result.forEach((element) => {
              if (element.BUSINESS_ID == this.businessID) {
                this.servicesList.push(element);
              }
            })
          }
        }
      )
  }

  fetchWorkList() {
    this.i_Params_Get_Work_list_By_BUSINESS_ID.BUSINESS_ID = this.businessID;

    this.Get_Work_list_By_BUSINESS_ID_Subscription = this.proxy.Get_Work_list_By_BUSINESS_ID_Adv(this.i_Params_Get_Work_list_By_BUSINESS_ID).subscribe(
      (e) => {
        if (e != null) {
          this.workList = e;
          // console.log("e");
          // console.log(e);
        }
      }
    )


  }


}
