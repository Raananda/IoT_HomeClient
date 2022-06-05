import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ThingDtoReponse } from '../Dtos/ThingDtoReponse';
import { UpdateSwitchRequestDTO } from '../Dtos/UpdateSwitchRequestDto';
import { IDeviceShadowDocument } from '../models/DocumentInterfaces';
import { SwitchDeviceShadowDocument } from '../models/SwitchDocument';

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

    GetDocumentById<T>(id: string): Observable<T> {
        const options = id ?
            { params: new HttpParams().set('id', id) } : {};
        return this.http.get<T>("/api/SwitchShadow/get-switch-document-by-id", options)
            .pipe(
                catchError(this.handleError)
            );
    }
    CheckIfUpdatedById<T>(id: string): Observable<T> {
        const options = id ?
            { params: new HttpParams().set('id', id) } : {};
        return this.http.get<T>("/api/SwitchShadow/check-if-updated-by-id", options)
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
