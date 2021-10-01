import { Component, OnInit } from '@angular/core';
import {AppModule} from "../../modules/app.module";
import {ActivatedRoute} from "@angular/router";
import {TaskInterface} from "../../interfaces/task.interface";
import {TaskService} from "../../services/task.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {

  public id: number = -1;
  public toDo: TaskInterface[] = [];
  public editTask = new FormControl('');
  public index = this.toDo.findIndex(item => item.id == this.id);
  public task = this.toDo[this.index];


  constructor(private route: ActivatedRoute, private _taskService: TaskService) { }

  ngOnInit(): void {

    this._taskService.getTask();
    this._taskService.tasks$.subscribe( task => {
      this.toDo = task;
    })

    this.route.params.subscribe(params =>{
      this.id = params['id'];
      console.log(this.id);
      console.log(this.toDo);

      // let index = this.toDo.findIndex(item => item.id == this.id);
      console.log(this.index);
      this.editTask.setValue(this.toDo[this.index].name);
    })



    // this._taskService.saveTask$.subscribe(task => {
    //   this.edit = task;
    //   console.log(this.edit);
    // })
  }

  public save(): void {
    this._taskService.saveTask(this.editTask.value, this.task );
    console.log(this.editTask.value);


    // this.toDo[index].name = this.editTask.value;
  }

}
