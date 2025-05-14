import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-author',
    templateUrl: './author.component.html',
    styleUrls: ['./authors.component.css']
})
export class AuthorComponent implements OnInit {
    author;
    form;
    sandbox;
    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private myRoute: Router,
                private auth: AuthService) { }

    ngOnInit() {
      console.log(this.route.snapshot.data);
        this.author = this.route.snapshot.data.author[0];
        this.sandbox =  this.route.snapshot.params['sandbox'];
        this.form = this.fb.group({
            firstName: [this.author.firstName, [ Validators.required ]],
            lastName: [this.author.lastName, Validators.required],
        });
    }

    updateAuthor() {
        if (this.form.valid) {
            this.auth.updateAuthor(this.sandbox, this.author.id, this.form.value).subscribe(r => {
                this.myRoute.navigate([this.sandbox, 'authors']);
            });
        }
    }

}
