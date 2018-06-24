import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';

@Component({
	selector: 'app-books',
	templateUrl: './books.component.html',
	styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

	books;
	authors$;
	form;
	sandbox;
	constructor(private fb: FormBuilder,
		private route: ActivatedRoute,
		private myRoute: Router,
		private auth: AuthService) { }

	ngOnInit() {
		this.books = this.route.snapshot.data.books;
		this.sandbox =  this.route.snapshot.params['sandbox'];
		this.authors$ = this.auth.getAuthors(this.sandbox);

		this.form = this.fb.group({
			name: ['', [ Validators.required ]],
			total: ['', Validators.required],
			available: ['', Validators.required],
			authors: ['', Validators.required],
			id: ['', Validators.required]
		});
	}

	addBook() {
		if (this.form.valid) {
			this.authors$.subscribe(au => {
				au.map(a => {
					if(a.id === this.form.get('authors').value) {
						let value = [];
						value.push(a);
						this.form.get('authors').patchValue(value)
						this.auth.createBook(this.sandbox, this.form.value).subscribe(r => {
							this.myRoute.navigate(['dashboard']);
						});
					}
				})
			})
			
			
		}
	}
	delete(id) {
		this.auth.deleteBook(this.sandbox, id).subscribe(r => {
			this.myRoute.navigate(['dashboard']);
		});
	}

}
