import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  registerUser(input:any):Observable<any>{
      return this.http.post("http://localhost:5000/api/user/register", input);
  }

  loginUser(input:any):Observable<any>{
      return this.http.post("http://localhost:5000/api/user/login", input);
  }


}
