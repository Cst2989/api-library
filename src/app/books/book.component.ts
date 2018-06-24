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
        this.book = this.route.snapshot.data.book;
        this.sandbox =  this.route.snapshot.params['sandbox'];
        this.authors$ = this.auth.getAuthors(this.sandbox);
        this.form = this.fb.group({
            name: [this.book.name, [ Validators.required ]],
            total: [this.book.total, Validators.required],
            available: [this.book.available, Validators.required],
            authors: [this.book.authors[0].id, Validators.required],
            id: [this.book.id, Validators.required]
        });
    }

    updateBook() {
        if (this.form.valid) {
            if (this.form.valid) {
                this.authors$.subscribe(au => {
                    au.map(a => {
                        if(a.id === this.form.get('authors').value) {
                            let value = [];
                            value.push(a);
                            this.form.get('authors').patchValue(value)
                            this.auth.updateBook(this.sandbox, this.book.id, this.form.value).subscribe(r => {
                                this.myRoute.navigate([this.sandbox, 'books']);
                            });
                        }
                    })
                })
            }
        }
    }
}