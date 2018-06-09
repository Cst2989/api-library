import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
  constructor(private myRoute: Router,
              private http: HttpClient) { 
  }
  sendToken(form) {
    let token = this.encrypt(form);
    localStorage.setItem("token", token)
  }
  encrypt(form) {
    return btoa(form.username + ':' + form.password);
  }
  getToken() {
    return localStorage.getItem("token")
  }
  isLoggednIn() {
    return this.getToken() !== null;
  }
  logout() {
    localStorage.removeItem("token");
    this.myRoute.navigate(["login"]);
  }
  register(formValue) {
    return this.http.post('http://ec2-18-219-119-239.us-east-2.compute.amazonaws.com/users/signup', formValue , { observe: 'response' });
  }
}