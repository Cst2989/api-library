import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form;
  constructor(private fb: FormBuilder,
    private myRoute: Router,
    private auth: AuthService) {
    this.form = fb.group({
      username: ['', [ Validators.required ]],
      password: ['', Validators.required]
    });
  }
  ngOnInit() {
  }
  register() {
    if (this.form.valid) {
      this.auth.register(this.form.value).subscribe(r => {
        console.log(r);
        this.auth.sendToken(this.form.value)
      	this.myRoute.navigate(["home"]);
      })
    }
  }

}
