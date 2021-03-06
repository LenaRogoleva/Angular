import { Component, OnInit } from '@angular/core';
import {AppModule} from "../../modules/app.module";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskInterface} from "../../interfaces/task.interface";
import {TaskService} from "../../services/task.service";
import {FormControl} from "@angular/forms";
import {ToastrModule, ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {

  public id: number = -1;
  public toDo: TaskInterface[] = [];
  public editTask = new FormControl('');


  constructor(private route: ActivatedRoute, private _taskService: TaskService,
              private router: Router, private toastr: ToastrService ) { }

  ngOnInit(): void {


    this._taskService.getTask();

    this._taskService.tasks$.subscribe( task => {
      if (task.length != 0) {
        this.toDo = task;
        this.id = this.route.snapshot.params.id;
        console.log(this.id);
        let index = this.toDo.findIndex(item => item.id === +this.id);
        this.editTask.setValue(this.toDo[index].name);
      }
    })

  }

  public save(): void {
    let index = this.toDo.findIndex(item => item.id === +this.id);
    this._taskService.saveTask(this.editTask.value, this.toDo[index]);
    this.toastr.success('Вы сохранили изменения :)', '');
  }

  public goToPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }


}
