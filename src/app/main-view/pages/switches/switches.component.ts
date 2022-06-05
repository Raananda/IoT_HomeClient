import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { SwitchShadowService } from 'src/app/core/services/switch-shadow.service';
import { BehaviorSubject, fromEvent, iif, interval, Observable, of, Subject } from 'rxjs';
import { ThingDtoReponse } from 'src/app/core/Dtos/ThingDtoReponse';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { SwitchDeviceShadowDocument } from 'src/app/core/models/SwitchDocument';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ThingHistoryComponent } from '../../components/thing-history/thing-history.component';
import { ThingQuartzComponent } from '../../components/thing-quartz/thing-quartz.component';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styleUrls: ['./switches.component.css']
})
export class SwitchesComponent implements OnInit {

  cols!: number;
  rows!: number;
  Things!: Observable<ThingDtoReponse[]>;
  isUpdating: boolean = false;
  isReported: Subject<boolean> = new Subject();
  isError: Subject<boolean> = new Subject();
  errorMessage!: string;
  snackBarConfigconfig!: MatSnackBarConfig;

  observableUserProfile: BehaviorSubject<any> = new BehaviorSubject(0);


  constructor(
    private breakpointObserver: BreakpointObserver,
    private switchShadowService: SwitchShadowService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    // Card Config
    this.rows = 1;
    this.cols = 1;
    this.Things = this.switchShadowService.GetAll();

    this.breakpointObserver.observe(Breakpoints.Handset).subscribe((val) => {
      if (val.matches) {
        // this.rows = 2;
        this.cols = 2;
      }
      else {
        //  this.rows = 1;
        this.cols = 1;
      }
    })

    // Snackbar Config
    this.snackBarConfigconfig = {
      duration: 5000
    }
  }

  onSlide($event: MatSlideToggleChange, Thing: ThingDtoReponse) {
    //Update device shadow
    // console.log(Thing)
    this.isUpdating = true;
    this.isError.next(false);
    this.switchShadowService.Update({
      id: Thing.id,
      powerOn: $event.checked
    }).subscribe((response => {
      this.isUpdating = false;
      this.isReported.next(true);

      this.switchShadowService.CheckIfUpdatedById<SwitchDeviceShadowDocument>(Thing.id).subscribe((response) => {
        if (response) {
          this.isReported.next(false);
        }
      },
        ((error) => {
          this.isError.next(true);
          this.isReported.next(false);
          this.errorMessage = error.message;
          this._snackBar.open(this.errorMessage, "Close", this.snackBarConfigconfig);
        })
      );

    }));
  }

  checkStatus(id: string): boolean {
    console.log(id);
    return true
  }

  onHistory(thingName: string): void {

    const dialogRef = this.dialog.open(ThingHistoryComponent, {
      data: {
        thingName: thingName
      }
    });


    dialogRef.afterClosed().subscribe(result => {
      //   console.log(`Dialog result: ${result}`);
    });

  }


  onQuartz(thingName: string) {

    const dialogRef = this.dialog.open(ThingQuartzComponent, {
      data: {
        id: thingName
      }
    });


    dialogRef.afterClosed().subscribe(result => {
      //   console.log(`Dialog result: ${result}`);
    });

  }









  // acknowledge(id: string): Observable<boolean> {

  //   let response!: Observable<boolean>;

  //   let counter: number = 0;

  //   let request$ = this.switchShadowService.CheckIfUpdatedById<SwitchDeviceShadowDocument>(id);



  //   request$.subscribe((response) => {
  //     // read the response into a document model, if delta is not null,
  //     // set toggle state to reported state
  //   })

  //   return response;
  // }
}
