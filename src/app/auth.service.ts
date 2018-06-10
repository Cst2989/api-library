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

  editProfile(formValue) {
    return this.http.put('http://ec2-18-219-119-239.us-east-2.compute.amazonaws.com/users/update', formValue);
  }

  getUser() {
    return this.http.get('http://ec2-18-219-119-239.us-east-2.compute.amazonaws.com/users/view');
  }

  getLoaned() {
    return this.http.get('http://ec2-18-219-119-239.us-east-2.compute.amazonaws.com/users/view/lent_books');
  }

  getRole(username) {
    if (username.indexOf('_tester') > -1 ) return 'tester';
    return 'user';
  }

  getSandbox(username) {
    if (username.indexOf('_tester') > -1 ) {
      username = username.split('_')[0];
    }
    return username;
  }
}