import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ThingHistoryService {

  constructor(private http: HttpClient) { }

  GetSwitchHistoryByName<T>(thingName: string): Observable<T> {
    const options = thingName ?
      { params: new HttpParams().set('thingName', thingName) } : {};
    return this.http.get<T>("/api/SwitchShadow/switch-history-by-name", options)
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


