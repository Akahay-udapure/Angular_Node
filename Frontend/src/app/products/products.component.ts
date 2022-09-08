import { Component, OnInit } from '@angular/core';
import * as alertify from 'alertifyjs'
import { ApiService } from '../services/api.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { EditProductComponent } from './edit-product/edit-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  showMiniSidebar: boolean = true;
  productListResult: any = [];
  tableData: any = [];

  during: any = {
    fetchProductList: false
  }

  constructor(
    private _apiService: ApiService,
    private modalService: BsModalService

  ) { }

  ngOnInit(): void {
    this.fetchProductList();
  }

  private proprocessfetchProductListResult() {
    this.tableData.length = 0;
    (this.productListResult || []).forEach((product: any) => {
      this.tableData.push({
        productName: product.productName,
        price: product.price,
        summery: product.summery,
        categoryName: product.categoryId.categoryName,
        _id: product._id,
      });
    });
  }

  fetchProductList() {
    this.during.fetchProductList = true;
    this._apiService.getAllProduct().subscribe(result => {
      if (result.status == 200) {
        this.productListResult = result.data;
        this.proprocessfetchProductListResult();
      }
      this.during.fetchProductList = false;
    })
  }

  deleteProduct(productId:any){
    this._apiService.deleteProduct(productId).subscribe(response =>{
      if(response.status == 200){
          alertify.success(response.message);
          this.fetchProductList();
      }else{
          alertify.error(response.message);
      }
    })
}


  editProduct(proId: any) {
    this.modalService.show(EditProductComponent, {
      initialState: {
        proId: proId,
      },
      class: 'modal-lg'
    }).onHidden?.subscribe((dismiss) => {
      if (dismiss && dismiss == "doRefresh") {
        this.fetchProductList();
      }
    })
  }


}
