import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./books.component.css']
})
export class BookComponent implements OnInit {
    book;
    form;
    lender;
    returner;
    view: boolean = false;
    sandbox;
    authors$;
    constructor(private fb: FormBuilder,
        private route: ActivatedRoute,
        private myRoute: Router,
        private auth: AuthService) { }

    ngOnInit() {
        this.route.data
            .subscribe((data) => {
                this.view = data.view;
            });
        this.book = this.route.snapshot.data.book[0];
        this.sandbox =  this.route.snapshot.params['sandbox'];
        this.authors$ = this.auth.getAuthors(this.sandbox);
        this.form = this.fb.group({
            name: [this.book.name, [ Validators.required ]],
            total: [this.book.total, Validators.required],
            available: [this.book.available, Validators.required],
            authors: [this.book.authors, Validators.required],
            id: [this.book.id, Validators.required]
        });
    }

    updateBook() {
        if (this.form.valid) {
            this.auth.updateBook(this.sandbox, this.book.id, this.form.value).subscribe(r => {
                this.myRoute.navigate([this.sandbox, 'books']);
            });
        }
    }
    lendBook() {
        this.auth.lendBook(this.sandbox, this.book.id, this.lender).subscribe(r => {
            if (r.status === 204) {
                this.auth.getBook(this.sandbox, this.book.id).subscribe(book => {
                    this.book = book[0];
                    alert('Book was loaned');
                });
            }
            if (r.status === 403) {
                alert('Forbidden');
            }
        });
    }

    returnBook() {
        this.auth.returnBook(this.sandbox, this.book.id, this.returner).subscribe(r => {
            if (r.status === 204) {
                this.auth.getBook(this.sandbox, this.book.id).subscribe(book => {
                    this.book = book[0];
                    alert('Book was returned');
                });
            }
            if (r.status === 403) {
                alert('Forbidden');
            }
        });
    }
}
