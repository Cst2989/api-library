import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  user;
  sandbox;
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService) {
    this.user = this.route.snapshot.data.user;
  }
  ngOnInit() {
  	this.sandbox = this.auth.getSandbox(this.user.username);
  }

}
