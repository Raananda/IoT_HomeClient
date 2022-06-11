import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddAppData } from '../core/ngxs/actions/app-data.actions';
import { AppService } from '../core/services/app.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  constructor(private appService: AppService, private store: Store) { }

  ngOnInit() {

    // Add data to app state
    this.appService.Get().subscribe(resp => {
      this.store.dispatch(new AddAppData(resp));
    });

  }
}
