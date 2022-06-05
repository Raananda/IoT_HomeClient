import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
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
export class SwitchQuartzService {

  constructor(private http: HttpClient) { }

  Get(): Observable<any[]> {
    return this.http.get<any[]>("/api/SwitchQuartz", httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  GetTriggersByThingIdOfJob(thingId: string): Observable<any[]> {

    let options = thingId ?
      { params: new HttpParams().set('thingId', thingId) } : {};

    return this.http.get<any[]>("/api/SwitchQuartz/triggers-by-thing-id-of-job", options)
      .pipe(
        catchError(this.handleError)
      );
  }


  Post(data: any): Observable<any> {
    return this.http.post<any>("api/SwitchQuartz", data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  Delete(data: any): Observable<any> {
    return this.http.request<any>('delete', "api/SwitchQuartz", { body: data })
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
