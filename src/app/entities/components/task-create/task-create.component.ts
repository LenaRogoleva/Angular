import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from "@angular/forms";
import {TaskInterface} from "../../task.interface";
import {TaskService} from "../../task.service";

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {

  public task = new FormGroup( {
    nameTask: new FormControl(''),
    namePriority: new FormControl('')
  })

  constructor(private _taskService: TaskService) {

  }

  public ngOnInit(): void {
  }

  public addTask(): void{

    let newTask: TaskInterface = {
      name: this.task.get('nameTask')?.value,
      priority: this.task.get('namePriority')?.value,
      time: new Date().toString(),
      id: Math.random(),
      status: 'unfinished'
    }
    this._taskService.addTask(newTask)
  }




}
