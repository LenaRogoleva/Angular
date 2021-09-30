import { Component, OnInit } from '@angular/core';
import {FormArrayName, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {TaskInterface} from "../../interfaces/task.interface";
import {TaskService} from "../../services/task.service";

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
      active: new FormControl(false),
      canceled: new FormControl(false),
      finished: new FormControl(false)
    }
  )
  public search = new FormControl('');


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

  public searchTask(): void {
    this._taskService.startSearch(this.search.value);
  }

}
