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
        let dialogRef = this.dialog.open(DialogComponent, {
            width: '250px',
            data: { status: error.status}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }
}