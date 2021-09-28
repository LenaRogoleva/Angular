import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, ValidationErrors} from "@angular/forms";
import {TaskInterface} from "../../interfaces/task.interface";
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {

  public task = new FormGroup( {
    nameTask: new FormControl(null, Validators.required),
    namePriority: new FormControl('Выберите приоритет', [Validators.required, TaskCreateComponent._myFirstValidator])
  })



  constructor(private _taskService: TaskService) {

  }

  public ngOnInit(): void {
  }

  public addTask(): void{

    let newTask: TaskInterface = {
      name: this.task.get('nameTask')?.value,
      priority: this.task.get('namePriority')?.value,
      time: new Date().toLocaleString(),
      id: Math.random(),
      status: 2
    }

    this._taskService.addTask(newTask);
    this.task.get('nameTask')?.reset();
  }

  private static _myFirstValidator(control: FormControl): ValidationErrors | null {
    const value = control.value;
    if (value === "Выберите приоритет"){
      return { invalidTask: false }
    }
    return null;
  }



}
