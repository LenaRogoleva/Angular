import {Component, Injectable, OnInit} from '@angular/core';
import {TaskService} from "../../task.service";
import {TaskInterface} from "../../task.interface";
import {disableDebugTools} from "@angular/platform-browser";


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})

export class ContentComponent implements OnInit {

  public toDo: TaskInterface[] = [];

  constructor( private _taskService: TaskService) { }


  public ngOnInit(): void {

    this._taskService.getTask();
    this._taskService.tasks$.subscribe( task => {
      task.sort( function (a,b){
        return a.status - b.status;
      })
      this.toDo = task
    })
  }

  public delete(task: TaskInterface): void {
    this._taskService.deleteTask(task);
  }

  public finish(task: TaskInterface): void {
    this._taskService.finishTask(task);
  }

  public cancel (task: TaskInterface): void {
    this._taskService.cancelTask(task);
  }


}
