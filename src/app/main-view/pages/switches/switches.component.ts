import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { SwitchShadowService } from 'src/app/core/services/switch-shadow.service';
import { Observable } from 'rxjs';
import { ThingDtoReponse } from 'src/app/core/Dtos/ThingDtoReponse';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styleUrls: ['./switches.component.css']
})
export class SwitchesComponent implements OnInit {

  cols!: number;
  rows!: number;
  Things!: Observable<ThingDtoReponse[]>;
  isLoading:boolean = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private switchShadowService: SwitchShadowService
  ) { }

  ngOnInit(): void {
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
  }

  onSlide($event: MatSlideToggleChange, Thing: ThingDtoReponse) {
    //Update device shadow
    // console.log(Thing)
    this.isLoading = true;
    this.switchShadowService.Update({
      id: Thing.id,
      powerOn: $event.checked
    }).subscribe((response => {
      this.isLoading = false;
    }))
  }

  checkStatus(id: string): boolean {
    console.log(id);
    return true
  }
}
