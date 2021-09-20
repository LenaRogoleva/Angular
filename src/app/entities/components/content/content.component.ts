import {Component, Injectable, OnInit} from '@angular/core';
import {TaskService} from "../../task.service";
import {TaskInterface} from "../../task.interface";


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})

export class ContentComponent implements OnInit {

  public toDo: TaskInterface[] = [];

  constructor( private _taskService: TaskService) { }


  public ngOnInit(): void {

    // this._taskService.getTask();
    this._taskService.tasks$.subscribe( task => this.toDo = task);
  }



}
