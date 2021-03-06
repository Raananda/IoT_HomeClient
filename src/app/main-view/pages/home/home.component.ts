import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private breakpointObserver: BreakpointObserver, private fb: FormBuilder) {}

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Data 1', cols: 2, rows: 1,color: 'lightblue' },
          { title: 'Data 2', cols:2, rows: 1, color: 'lightblue' }
        ];
      }

      return [
        { title: 'Data 1', cols: 1, rows: 1,color: 'lightblue' },
        { title: 'Data 2', cols: 2, rows: 1,color: 'lightblue' }
      ];
    })
  );

  


}
