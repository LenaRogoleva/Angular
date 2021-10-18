import {Component, OnInit} from '@angular/core';
import {FormControl, FormControlName} from "@angular/forms";
import {TaskService} from "../entities/services/task.service";
import {AuthService} from "../entities/services/Auth-service";

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css']
})

export class ModalWindowComponent implements OnInit {

  public click: boolean = false;

  constructor (private _taskService: TaskService, private _authService: AuthService) {
  }

  ngOnInit(): void {
  }

  public disable(){
    this.click = true;
    this._taskService.setClick(this.click);
    this._authService.getKey();
  }
}

