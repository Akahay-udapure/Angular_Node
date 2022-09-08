import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private router:Router
  ) { }

  registerUser(input:any):Observable<any>{
      return this.http.post("http://localhost:5000/api/user/register", input);
  }

  loginUser(input:any):Observable<any>{
      return this.http.post("http://localhost:5000/api/user/login", input);
  }
  
  addCategory(input:any):Observable<any>{
    return this.http.post("http://localhost:5000/api/category/add", input);
  }

  getCategory(categoryId:string):Observable<any>{
    return this.http.get("http://localhost:5000/api/category/getOne?categoryId="+categoryId);
  }

  getAllCategory():Observable<any>{
    return this.http.get("http://localhost:5000/api/category/getAll");
  }

  updateCategory(input:any):Observable<any>{
    return this.http.put("http://localhost:5000/api/category/update", input);
  }

  deleteCategory(categoryId:string):Observable<any>{
    return this.http.delete("http://localhost:5000/api/category/delete?categoryId="+categoryId);
  }

  addProduct(input:any):Observable<any>{
    return this.http.post("http://localhost:5000/api/product/add", input);
  }

  getProduct(productId:string):Observable<any>{
    return this.http.get("http://localhost:5000/api/product/getOne?productId="+productId);
  }

  getAllProduct():Observable<any>{
    return this.http.get("http://localhost:5000/api/product/getAll");
  }

  updateProduct(input:any):Observable<any>{
    return this.http.put("http://localhost:5000/api/product/update", input);
  }

  deleteProduct(productId:string):Observable<any>{
    return this.http.delete("http://localhost:5000/api/product/delete?productId="+productId);
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  loggedIn(){
    return localStorage.getItem('token');
  }

}
