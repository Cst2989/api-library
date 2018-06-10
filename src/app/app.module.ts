import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule } from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { AuthService } from './auth.service';

import { AuthGuard } from './auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { UserResolver } from './user.resolver';
import { LoanedResolver } from './viewloaned/viewloaned.resolver';
import { ViewloanedComponent } from './viewloaned/viewloaned.component';

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], resolve: { user: UserResolver } },
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
    ViewloanedComponent
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
    MatInputModule,
    MatSidenavModule,
    MatTableDataSource,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    RouterModule.forRoot(appRoutes),
    MatCardModule,
    MatMenuModule
  ],
  providers: [AuthService, AuthGuard, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})


export class AppModule { }
