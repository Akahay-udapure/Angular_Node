import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductsComponent } from './products/products.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CategoryComponent } from './category/category.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { AuthGuard } from './services/auth.guard';
import { TokenInterceptotInterceptor } from './services/token-interceptot.interceptor';
import { ApiService } from './services/api.service';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        ProductsComponent,
        AboutComponent,
        ContactComponent,
        CategoryComponent,
        EditProductComponent,
        EditCategoryComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SnotifyModule,
        HttpClientModule,
        NgxSpinnerModule,
        ModalModule
    ],
    providers: [{ provide: 'SnotifyToastConfig', useValue: ToastDefaults }, SnotifyService, BsModalService,ApiService, AuthGuard, {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptotInterceptor,
        multi: true
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
