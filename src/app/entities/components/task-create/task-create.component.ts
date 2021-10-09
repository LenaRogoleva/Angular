import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, ValidationErrors} from "@angular/forms";
import {TaskInterface} from "../../interfaces/task.interface";
import {TaskService} from "../../services/task.service";
import {MatDialog} from "@angular/material/dialog";
import {ModalWindowComponent} from "../../../modal-window/modal-window.component";
import {Inject} from "@angular/core";
// import {AuthService} from "../../services/Auth-service";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/Auth-service";

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {

  // @ts-ignore //todo здесь не поняла почему ругается
  // @ts-ignore
  public task = new FormGroup( {
    nameTask: new FormControl(null, Validators.required),
    namePriority: new FormControl('выберите приоритет',
      [Validators.required, TaskCreateComponent._myFirstValidator])
  })

  public click: boolean = false;


  constructor(private _taskService: TaskService, public dialog: MatDialog,
              private http: HttpClient, private _authService: AuthService) {

  }

  public ngOnInit(): void {

    this._taskService.click$.subscribe( station =>{
      this.click = station
      console.log(this.click);
    })

    // this._authService.key$.subscribe((key) => {
    //   this.key = key;
    // })
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
    this._authService.getPostKey();
  }

  private static _myFirstValidator(control: FormControl): ValidationErrors | null {
    const value = control.value;
    if (value === "Выберите приоритет"){
      return { invalidTask: false }
    }
    return null;
  }

  public signIn(): void {
    this.dialog.open(ModalWindowComponent, {
      width: '300px',
      height: '200px',
      position: {top: '20%',
      left: '57%',}})
    // this.http.get<string>('http://localhost:3000/authorize').toPromise().then( (data) => {
    //
    // })
  }
}


