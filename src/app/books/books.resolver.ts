import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable()
export class BooksResolver implements Resolve<any> {

    constructor(private service: AuthService) {}

    public resolve(route: ActivatedRouteSnapshot) {
        return this.service.getBooks(route.paramMap.get('sandbox'));
    }
}