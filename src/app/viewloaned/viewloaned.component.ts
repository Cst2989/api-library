import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewloaned',
  templateUrl: './viewloaned.component.html',
  styleUrls: ['./viewloaned.component.css']
})
export class ViewloanedComponent implements OnInit {
  books;
  constructor(private route: ActivatedRoute) {
    this.books = this.route.snapshot.data.books;
  }

  ngOnInit() {
  }

}
