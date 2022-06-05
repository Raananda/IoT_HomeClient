import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SwitchHistoryResponseDto } from 'src/app/core/Dtos/SwitchHistoryResponseDto';
import { ThingData } from 'src/app/core/models/ThingData';
import { ThingHistoryService } from 'src/app/core/services/thing-history.service';

@Component({
  selector: 'app-thing-history',
  templateUrl: './thing-history.component.html',
  styleUrls: ['./thing-history.component.css']
})
export class ThingHistoryComponent implements OnInit {

  // Table fields
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['timestamp', 'powerOn', 'version'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ThingData,
    private thingHistoryService: ThingHistoryService
  ) {
  }

  ngOnInit(): void {

    this.thingHistoryService.GetSwitchHistoryByName<SwitchHistoryResponseDto[]>(this.data.thingName).subscribe((response) => {

      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });

  }

}
