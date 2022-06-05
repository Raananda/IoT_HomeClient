import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DayOfWeek, DaysOfWeek } from 'src/app/core/models/DayOfWeek';
import { ThingData } from 'src/app/core/models/ThingData';
import { SwitchQuartzService } from '../../../core/services/switch-quartz.service'

@Component({
  selector: 'app-thing-quartz',
  templateUrl: './thing-quartz.component.html',
  styleUrls: ['./thing-quartz.component.css']
})

export class ThingQuartzComponent implements OnInit {

  Triggers: any;

  DaysOfWeek: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  DaysOfWeekobj: DaysOfWeek = new DaysOfWeek();

  AddBtnFlag: boolean = false;
  
  RemoveFlag: boolean = false;

  NewTimeForm = this.fb.group({
    startTime: [null, Validators.required],
    endTime: [null, Validators.required],
    DayOfWeek: [null]

  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ThingData,
    private switchQuartzService: SwitchQuartzService,
    private fb: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.switchQuartzService.GetTriggersByThingIdOfJob(this.data.id).subscribe((Response) => {
      this.Triggers = Response;
      //   this.dataSource = new MatTableDataSource(Response);
    });
  }

  onSubmitNewTime() {

    let StartTimeStr = this.NewTimeForm.controls["startTime"].value.split(':');
    let EndTimeStr = this.NewTimeForm.controls["endTime"].value.split(':');

    let StartTime: Date = new Date(Date.UTC(0, 0, 0, StartTimeStr[0], StartTimeStr[1], 0, 0));
    let EndTime: Date = new Date(Date.UTC(0, 0, 0, EndTimeStr[0], EndTimeStr[1], 0, 0));
    let daysOfWeek: number[] = [];

    this.DaysOfWeekobj.data.forEach(item => {
      if (item.selected) {
        daysOfWeek.push(item.value)
      }
    })

    let Request =
    {
      startTime: StartTime,
      endTime: EndTime,
      daysOfWeek: daysOfWeek,
      switchId: this.data.id
    };


    this.AddBtnFlag = true;
    this.switchQuartzService.Post(Request).subscribe((Response) => {
      if (Response) {
        this.switchQuartzService.GetTriggersByThingIdOfJob(this.data.id).subscribe((Response) => {
          this.Triggers = Response;
          this.AddBtnFlag = false;
        });
      }
    });

  }

  onRemoveTimer(Trigger: any) {

    let Request: any[] = [];

    Request.push(Trigger.start, Trigger.end);
    this.RemoveFlag = true;
    this.switchQuartzService.Delete(Request).subscribe((Response) => {
      if (Response) {
        this.switchQuartzService.GetTriggersByThingIdOfJob(this.data.id).subscribe((Response) => {
          this.Triggers = Response;
          this.RemoveFlag = false;
        });
      }
    });
  }

  onSelectDay(day: DayOfWeek) {

    this.DaysOfWeekobj.data = this.DaysOfWeekobj.data.map(item => {
      if (item.value == day.value) {
        item.selected = !item.selected;
      }
      return item;
    })

  }
}
