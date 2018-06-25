import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatDialogModule, MatSelectModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule } from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { AuthService } from './auth.service';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { UserResolver } from './user.resolver';
import { LoanedResolver } from './viewloaned/viewloaned.resolver';
import { ViewloanedComponent } from './viewloaned/viewloaned.component';
import { BooksComponent } from './books/books.component';
import { AuthorsComponent } from './authors/authors.component';
import { AuthorComponent } from './authors/author.component';
import { AuthorsResolver } from './authors/authors.resolver';
import { AuthorResolver } from './authors/author.resolver';
import { BooksResolver } from './books/books.resolver';
import { BookResolver } from './books/book.resolver';
import { BookComponent } from './books/book.component';
import { ErrorsHandler } from './interceptors/error.service';
import { DialogComponent } from './dialog/dialog.component';

const appRoutes: Routes = [
  {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [AuthGuard],
      resolve: { user: UserResolver },
  },
  {
      path: 'author/:id/:sandbox',
      component: AuthorComponent,
      canActivate: [AuthGuard],
      resolve: { author: AuthorResolver },
  },
  {
    path: ':sandbox/authors',
    component: AuthorsComponent,
    canActivate: [AuthGuard],
    resolve: { authors: AuthorsResolver },

  },
  {
    path: ':sandbox/books',
    component: BooksComponent,
    canActivate: [AuthGuard],
    resolve: { books: BooksResolver }
  },
  {
      path: 'book/:id/:sandbox',
      component: BookComponent,
      canActivate: [AuthGuard],
      resolve: { book: BookResolver },
  },
  {
      path: 'book/:id/:sandbox/view',
      component: BookComponent,
      canActivate: [AuthGuard],
      data: { 'view': true },
      resolve: { book: BookResolver },
  },
  { path: 'edit-profile', component: EditprofileComponent, canActivate: [AuthGuard], resolve: { user: UserResolver }},
  { path: 'view-loaned', component: ViewloanedComponent, canActivate: [AuthGuard], resolve: { books: LoanedResolver }},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
 
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    EditprofileComponent,
    ViewloanedComponent,
    BooksComponent,
    BookComponent,
    DialogComponent,
    AuthorsComponent,
    AuthorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    MatFormFieldModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    RouterModule.forRoot(appRoutes),
    MatCardModule,
    MatMenuModule
  ],
  entryComponents: [DialogComponent],
  providers: [{ provide: ErrorHandler, useClass: ErrorsHandler }, AuthService, UserResolver, AuthorResolver, BookResolver, LoanedResolver, AuthorsResolver, BooksResolver, AuthGuard, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})


export class AppModule { }
