import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'my-auth-token'
    })
}

@Injectable({
    providedIn: 'root'
})
export class SecurityService {


    constructor(private http: HttpClient) { }


    Register(data: any): Observable<any> {
        return this.http.post<any>("api/Security/Registration", data, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }
    Login(data: any): Observable<any> {
        return this.http.post<any>("api/Security/Login", data, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }
    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
                `Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(
            error.error);
    }
}
