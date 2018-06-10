import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-viewloaned',
  templateUrl: './viewloaned.component.html',
  styleUrls: ['./viewloaned.component.css']
})
export class ViewloanedComponent implements OnInit {
  books;
  constructor(private route: ActivatedRoute) { 
  	this.books = new MatTableDataSource(this.route.snapshot.data.books);
  }

  ngOnInit() {
  }

}
