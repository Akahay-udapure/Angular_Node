import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/services/api.service';
import * as alertify from 'alertifyjs'
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  @Input() catId:any;
  
  during: any = {
      fetchCategory: false,
      updateCategory: false,
      createCategory: false,
      deleteCategory: false
  };

  productResult: any = {};
  categoryToEdit: any = {};

  constructor(
      private activeModal: BsModalRef,
      private _apiService: ApiService,
      private modalService: BsModalService
  ) { }

  ngOnInit(): void {
      if (this.catId != -1) {
          this.fetchCategory();
      } else {
          this.preProcessfetchCategoryResult({ _id: -1 });
      }
  }

  private preProcessfetchCategoryResult(categoryObj: any) {
      if (categoryObj._id == -1) {
          this.categoryToEdit = {
          }
      } else {
          this.categoryToEdit = {
              categoryId: categoryObj._id,
              categoryName: categoryObj.categoryName,
          }
      }

  }

  fetchCategory() {
      this.during.fetchCategory = true;
      this._apiService.getCategory(this.catId).subscribe(result => {
          if (result.status == 200) {
              this.preProcessfetchCategoryResult(result.data);
          }
          this.during.fetchCategory = false;
      }, e => {
          alertify.error(e);
          this.during.fetchCategory = false;
      })
  }


  createCategory() {
      this.during.createCategory = true;
      this._apiService.addCategory(this.categoryToEdit)
          .subscribe(response => {
              if (response.status == 200) {
                  this.during.createCategory = false;
                  alertify.success(response.message);
                  this.modalService.setDismissReason("doRefresh");
                  this.close();
              }else{
                  this.during.createCategory = false;
                  alertify.error(response.message);
              }
          })
  }

  updateCategory() {
      this.during.updateCategory = true;
      this._apiService.updateCategory(this.categoryToEdit)
          .subscribe(response => {
              if (response.status == 200) {
                  this.during.updateCategory = false;
                  alertify.success(response.message);
                  this.modalService.setDismissReason("doRefresh");
                  this.close();
              }else{
                  this.during.updateCategory = false;
                  alertify.error(response.message);
              }
          })
  }

  close() {
      this.activeModal.hide();
  }

}
