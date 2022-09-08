import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  showMiniSidebar: boolean = true;
  categoryListResult: any = [];
  tableData: any = [];

  during: any = {
    fetchCategoryList: false
  }

  constructor(
    private _apiService: ApiService,
    private modalService: BsModalService

  ) { }

  ngOnInit(): void {
    this.fetchCategoryList();
  }

  private proprocessfetchCategoryListResult() {
    this.tableData.length = 0;
    (this.categoryListResult || []).forEach((category: any) => {
      this.tableData.push({
        categoryName: category.categoryName,
        _id: category._id,
      });
    });
  }

  fetchCategoryList() {
    this.during.fetchCategoryList = true;
    this._apiService.getAllCategory().subscribe(result => {
      if (result.status == 200) {
        this.categoryListResult = result.data;
        this.proprocessfetchCategoryListResult();
      }
      this.during.fetchCategoryList = false;
    })
  }

  deleteCategory(categoryId:any){
      this._apiService.deleteCategory(categoryId).subscribe(response =>{
        if(response.status == 200){
            alertify.success(response.message);
            this.fetchCategoryList();
        }else{
            alertify.error(response.message);
        }
      })
  }

  editCategory(catId: any) {
    this.modalService.show(EditCategoryComponent, {
      initialState: {
        catId: catId,
      },
    }).onHidden?.subscribe((dismiss) => {
      if (dismiss && dismiss == "doRefresh") {
        this.fetchCategoryList();
      }
    })

  }
}
