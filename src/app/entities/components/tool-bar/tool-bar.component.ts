import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {TaskInterface} from "../../task.interface";
import {TaskService} from "../../task.service";

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {

  public filterControl = new FormControl('выберите приоритет');
  public dataControl = new FormControl('выберите сортировку');
  public sortPriorityControl = new FormControl('выберите сортировку');
  public filterByStatus = new FormGroup({
      2: new FormControl(0),
      1: new FormControl(0),
      3: new FormControl(0)
    }
  )


  constructor(private _taskService: TaskService) {
  }

  ngOnInit(): void {
  }

  public filter(): void {
    this._taskService.setPriority(this.filterControl.value);
  }


  public sortByData(): void {
      this._taskService.setData(this.dataControl.value);
  }

  public sortByPriority(): void {
    this._taskService.setPrioritySort(this.sortPriorityControl.value);
  }

  public sortByStatus(): void {
    this._taskService.setStatus(this.filterByStatus.value);
  }

}
