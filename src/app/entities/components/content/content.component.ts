import {Component, Injectable, OnInit} from '@angular/core';
import {TaskService} from "../../services/task.service";
import {TaskInterface} from "../../interfaces/task.interface";
import {disableDebugTools} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {AuthService} from "../../services/Auth-service";


// @ts-ignore
// @ts-ignore
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})

export class ContentComponent implements OnInit {

  public toDo: TaskInterface[] = [];
  public selectedPriority: string = 'любой';
  public selectedSortData: string = 'выберите сортировку';
  public selectedSortFilter: string = 'выберите сортировку';
  public selectedStatus: object = {
    active: true,
    canceled: true,
    finished: true
  }
  public selectedStatusArray: string[] = [];
  public search: string = '';
  // public key: string = '';

  constructor(private _taskService: TaskService, private router: Router,
              private _authService: AuthService) {

  }

  public goToPage(pageName: string, id: number) {
    this.router.navigate([`${pageName}`, id]);
  }


  public ngOnInit(): void {

    // this._authService.key$.subscribe((key) => {
    //   this.key = key;
    // })

    this._taskService.getTask();
    this._taskService.tasks$.subscribe(task => {
      this.toDo = task;
      this.sortData();
    })

    this._taskService._priorityFilter$.subscribe(priority => {
      this.selectedPriority = priority
    })

    this._taskService.sortData$.subscribe(data => {
      this.selectedSortData = data;
      this.sortData();
    })

    this._taskService.sortPriority$.subscribe(priority => {
      this.selectedSortFilter = priority;
      this.sortPriority();
    })

    this._taskService.filterByStatus$.subscribe(status => {
      this.selectedStatus = {
        active: false,
        finished: false,
        canceled: false
      }
      this.selectedStatus = status;
      this.selectedStatusArray = [];
      for (let item in status) {
        // @ts-ignore
        if (status[item] === true) {
          switch (item) {
            case 'active':
              item = '2';
              break;
            case 'finished':
              item = '1'
              break;
            case 'canceled':
              item = '3'
              break;
          }
          this.selectedStatusArray.push(item);
        }
      }
      if (this.selectedStatusArray.length === 0) {
        this.selectedStatusArray = ['1', '2', '3']
      }
    })

    this._taskService.searchTask$.subscribe(text => {
      this.search = text;
    })

  }

  public delete(task: TaskInterface): void {
    this._taskService.deleteTask(task);
  }

  public finish(task: TaskInterface): void {
    this._taskService.finishTask(task);
    // this._authService.getPutKey(task);
  }

  public cancel(task: TaskInterface): void {
    this._taskService.cancelTask(task);
    // this._authService.getPutKey(task);
  }

  public sortData(): void {

    this.toDo.sort((a, b) => {
      let aTime = a.time.slice(3, 6) + a.time.slice(0, 3) + a.time.slice(6);
      let bTime = b.time.slice(3, 6) + b.time.slice(0, 3) + b.time.slice(6);
      if (this.selectedSortData === 'По возрастанию') {
        return new Date(aTime).getTime() - new Date(bTime).getTime()
      } else if (this.selectedSortData === 'По убыванию') {
        return new Date(bTime).getTime() - new Date(aTime).getTime()
      } else {
        return a.status - b.status;
      }
    })
  }

  public sortPriority(): void {

    this.toDo.sort((a: any, b: any) => {
      if (this.selectedSortFilter === 'По убыванию') {
        if (a.priority.length > b.priority.length) return -1;
        else if (a.priority.length < b.priority.length) return 1;
        else return 0;
      } else if (this.selectedSortFilter === 'По возрастанию') {
        if (a.priority.length < b.priority.length) return -1;
        else if (a.priority.length >= b.priority.length) return 1;
        else return 0;
      } else {
        return a.priority.length + b.priority.length;
      }
    })
  }

}
