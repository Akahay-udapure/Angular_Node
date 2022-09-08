import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/services/api.service';
import * as alertify from 'alertifyjs'
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-edit-product',
    templateUrl: './edit-product.component.html',
    styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
    @Input() proId: any;
    categoryList: any = [];
    pageInput:any = {
        inactiveAsset: false
    };

    during: any = {
        fetchProduct: false,
        updateProduct: false,
        createProduct: false,
        deleteProduct: false
    };

    productResult: any = {};
    productToEdit: any = {};

    constructor(
        private activeModal: BsModalRef,
        private _apiService: ApiService,
        private modalService: BsModalService
    ) { }

    ngOnInit(): void {
        if (this.proId != -1) {
            this.fetchProduct();
        } else {
            this.preProcessFetchProductResult({ _id: -1 });
        }
        this.fetchCategory();
    }

    private preProcessFetchProductResult(productObj: any) {
        if (productObj._id == -1) {
            this.productToEdit = {
            }
        } else {
            this.productToEdit = {
                productId: productObj._id,
                productName: productObj.productName,
                price: productObj.price,
                summery: productObj.summery
            }
        }

    }

    fetchProduct() {
        this.during.fetchProduct = true;
        this._apiService.getProduct(this.proId).subscribe(result => {
            if (result.status == 200) {
                this.preProcessFetchProductResult(result.data);
            }
            this.during.fetchProduct = false;
        }, e => {
            alertify.error(e);
            this.during.fetchProduct = false;
        })
    }

    fetchCategory() {
        this._apiService.getAllCategory().subscribe(result => {
            if (result.status == 200) {
                this.categoryList = result.data
            }
        })
    }

    createProduct() {
        this.during.createProduct = true;
        this._apiService.addProduct(this.productToEdit)
            .subscribe(response => {
                if (response.status == 200) {
                    this.during.createProduct = false;
                    alertify.success(response.message);
                    this.modalService.setDismissReason("doRefresh");
                    this.close();
                }else{
                    this.during.createProduct = false;
                    alertify.error(response.message);
                }
            })
    }

    updateProduct() {
        this.during.updateProduct = true;
        this._apiService.updateProduct(this.productToEdit)
            .subscribe(response => {
                if (response.status == 200) {
                    this.during.updateProduct = false;
                    alertify.success(response.message);
                    this.modalService.setDismissReason("doRefresh");
                    this.close();
                }else{
                    this.during.updateProduct = false;
                    alertify.error(response.message);
                }
            })
    }

    close() {
        this.activeModal.hide();
    }
}
