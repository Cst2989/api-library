import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  authors;
  form;
    @ViewChild('f') myNgForm;
  sandbox;
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private myRoute: Router,
              private auth: AuthService) { }

  ngOnInit() {
    this.authors = this.route.snapshot.data.authors;
    this.sandbox =  this.route.snapshot.params['sandbox'];
    this.form = this.fb.group({
      firstName: ['', [ Validators.required ]],
      lastName: ['', Validators.required],
      id: ['', Validators.required]
    });
  }

    addAuthor() {
        if (this.form.valid) {
            this.auth.createAuthor(this.sandbox, this.form.value).subscribe(r => {
                if (r.status === 200) {
                    this.auth.getAuthors(this.sandbox).subscribe(a => {
                        this.authors = a;
                        this.myNgForm.resetForm();
                    });
                }
            });
        }
    }
    delete(id) {
        this.auth.deleteAuthor(this.sandbox, id).subscribe(r => {
            if (r.status === 200) {
                alert('Author was deleted');
                this.auth.getAuthors(this.sandbox).subscribe(a => {
                    this.authors = a;
                });
            }
        });
    }
}
