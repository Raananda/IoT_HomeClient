import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ThingDtoReponse } from '../Dtos/ThingDtoReponse';
import { UpdateSwitchRequestDTO } from '../Dtos/UpdateSwitchRequestDto';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'my-auth-token'
    })
}

@Injectable({
    providedIn: 'root'
})
export class SwitchShadowService {


    constructor(private http: HttpClient) { }


    GetAll(): Observable<ThingDtoReponse[]> {
        return this.http.get<ThingDtoReponse[]>("/api/SwitchShadow", httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    Update(thingPatchDto: UpdateSwitchRequestDTO): Observable<any> {
        return this.http.post<any>("/api/SwitchShadow/update", thingPatchDto, httpOptions)
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
