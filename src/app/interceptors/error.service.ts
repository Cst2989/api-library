import { ErrorHandler, Injectable} from '@angular/core';
import { MatDialog } from '@angular/material';
import {DialogComponent} from "../dialog/dialog.component";

@Injectable()
export class ErrorsHandler implements ErrorHandler {
    constructor(
        public dialog: MatDialog) {
    }

    handleError(error: any) {
        // Do whatever you like with the error (send it to the server?)
        // And log it to the console
        console.log(error);
        switch(error.status) {
            case 403:
                alert("Forbidden!")
                break;
            case 404:
                alert("Not Found!")
                break;
            case 401:
                alert("Bad Credentials!")
                break;
            case 409:
                alert("Resource Already exists!")
                break;
            default:

                alert("There was an error with the subbmited request!")
        }
    }
}