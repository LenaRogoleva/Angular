import { Component, OnInit } from '@angular/core';
import {AppModule} from "../../modules/app.module";
import {ActivatedRoute, Router} from "@angular/router";
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

  constructor(private route: ActivatedRoute, private _taskService: TaskService, private router: Router) { }

  ngOnInit(): void {

    this._taskService.getTask();

    this._taskService.tasks$.subscribe( task => {
      console.log(1);
      this.toDo = task;
      this.id = this.route.snapshot.params.id;
      console.log(this.id);
      let index = this.toDo.findIndex(item => item.id === +this.id);
      this.editTask.setValue(this.toDo[index].name);

    })

    // this.route.params.subscribe(params =>{
    //   console.log(1);
    //   this.id = params['id'];
    //
    //   let index = this.toDo.findIndex(item => item.id === +this.id);
    //   this.editTask.setValue(this.toDo[index].name);
    //   console.log(this.toDo);
    // })

  }

  public save(): void {
    let index = this.toDo.findIndex(item => item.id === +this.id);
    this._taskService.saveTask(this.editTask.value, this.toDo[index]);
  }

  public goToPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

}
