import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AuthService {
  constructor(private myRoute: Router, private http: HttpClient) {}
  sendToken(form) {
    const token = this.encrypt(form);
    localStorage.setItem("token", token);
  }
  encrypt(form) {
    return btoa(form.email + ":" + form.password);
  }
  getToken() {
    return localStorage.getItem("token");
  }
  isLoggednIn() {
    return this.getToken() !== null;
  }
  logout() {
    localStorage.removeItem("token");
    this.myRoute.navigate(["login"]);
  }
  register(formValue) {
    return this.http.post(
      "https://library-api.academiatestarii.ro/api/v1/users/signup",
      formValue,
      { observe: "response" }
    );
  }

  editProfile(formValue) {
    return this.http.put(
      "https://library-api.academiatestarii.ro/api/v1/users/update",
      formValue
    );
  }

  getUser() {
    return this.http.get("https://library-api.academiatestarii.ro/api/v1/users/view");
  }

  getLoaned() {
    return this.http.get("https://library-api.academiatestarii.ro/api/v1/users/view/lent_books");
  }

  getAuthors(sandbox) {
    return this.http.get("https://library-api.academiatestarii.ro/api/v1/authors/" + sandbox);
  }

  getAuthor(sandbox, id) {
    return this.http.get(
      "https://library-api.academiatestarii.ro/api/v1/authors/" + sandbox + "/" + id
    );
  }

  updateAuthor(sandbox, id, formValue) {
    return this.http.put(
      "https://library-api.academiatestarii.ro/api/v1/authors/" + sandbox + "/" + id,
      formValue
    );
  }

  createAuthor(sandbox, formValue) {
    return this.http.post(
      "https://library-api.academiatestarii.ro/api/v1/authors/" + sandbox,
      formValue,
      { observe: "response" }
    );
  }

  deleteAuthor(sandbox, id) {
    return this.http.delete(
      "https://library-api.academiatestarii.ro/api/v1/authors/" + sandbox + "/" + id,
      { observe: "response" }
    );
  }

  getBooks(sandbox) {
    return this.http.get("https://library-api.academiatestarii.ro/api/v1/books/" + sandbox);
  }

  getBook(sandbox, id) {
    return this.http.get(
      "https://library-api.academiatestarii.ro/api/v1/books/" + sandbox + "/" + id
    );
  }

  updateBook(sandbox, id, formValue) {
    return this.http.put(
      "https://library-api.academiatestarii.ro/api/v1/books/" + sandbox + "/" + id,
      formValue
    );
  }

  lendBook(sandbox, id, userId) {
    return this.http.post(
      "https://library-api.academiatestarii.ro/api/v1/books/" +
        sandbox +
        "/" +
        id +
        "/lend/" +
        userId,
      {},
      { observe: "response" }
    );
  }

  returnBook(sandbox, id, userId) {
    return this.http.post(
      "https://library-api.academiatestarii.ro/api/v1/books/" +
        sandbox +
        "/" +
        id +
        "/returned/" +
        userId,
      {},
      { observe: "response" }
    );
  }

  createBook(sandbox, formValue) {
    return this.http.post(
      "https://library-api.academiatestarii.ro/api/v1/books/" + sandbox,
      formValue,
      { observe: "response" }
    );
  }

  deleteBook(sandbox, id) {
    return this.http.delete(
      "https://library-api.academiatestarii.ro/api/v1/books/" + sandbox + "/" + id,
      { observe: "response" }
    );
  }

  getRole(username) {
    if (username.indexOf("_tester") > -1) {
      return "tester";
    }
    return "user";
  }

  getSandbox(username) {
    if (username.indexOf("_tester") > -1) {
      username = username.split("_")[0];
    }
    return username;
  }
}
