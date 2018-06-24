import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  form;
  userData;

  constructor(private fb: FormBuilder,
    private myRoute: Router,
    private route: ActivatedRoute,
    private auth: AuthService) {
  	this.userData = this.route.snapshot.data.user;
    this.form = fb.group({
      username: [ this.userData.username ? this.userData.username : '', [Validators.required]],
      email: [ this.userData.email ? this.userData.email : '', [Validators.required]],
      name: [ this.userData.name ? this.userData.name : '', Validators.required]
    });
  }
  ngOnInit() {
  }
  edit() {
    if (this.form.valid) {
      this.auth.editProfile(this.form.value).subscribe(data => {
          //this.myRoute.navigate(['dashboard']);
      });
    }
  }

}
