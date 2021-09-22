import { Component, OnInit } from '@angular/core';
import {FormControl, ValidationErrors, Validators} from "@angular/forms";
import {TaskInterface} from "../../task.interface";
import {TaskService} from "../../task.service";

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {

  // public items: number[] = [0, 1, 2, 3 ,4 ,5 ];

  public filterControl = new FormControl('выберите приоритет');
  public dataControl = new FormControl('выберите сортировку');
  public selectedSortData: string = 'выберите сортировку';
  public toDo: TaskInterface[] = [];

  constructor(private _taskService: TaskService) {
  }

  ngOnInit(): void {
  }

  public filter(): void {
    // this._taskService.filterPriority(this.filterControl.value);
    this._taskService.setPriority(this.filterControl.value);
  }


  public sortByData(): void {
      this._taskService.setData(this.dataControl.value);
  }

}
