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
  public selectedPriority: string = 'любой';
  public selectedSortData: string = 'выберите сортировку';
  public selectedSortFilter: string = 'выберите сортировку';
  public selectedStatus: boolean = false;

  constructor( private _taskService: TaskService) { }


  public ngOnInit(): void {

    this._taskService.getTask();
    this._taskService.tasks$.subscribe( task => {
      this.toDo = task;
      this.sortData();
    })

    this._taskService._priorityFilter$.subscribe(priority => {
      this.selectedPriority = priority
    })

    this._taskService.sortData$.subscribe( data => {
      this.selectedSortData = data;
      this.sortData();
    })

    this._taskService.sortPriority$.subscribe( priority => {
      this.selectedSortFilter = priority;
      this.sortPriority();
    })

      this._taskService.filterByStatus$.subscribe(status => {
        this.selectedStatus = status;
        console.log(this.selectedStatus);
        // this.filterStatus();
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

  public sortData(): void {

    this.toDo.sort((a, b) => {
        let aTime = a.time.slice(3,6) + a.time.slice(0,3) + a.time.slice(6);
        let bTime = b.time.slice(3,6) + b.time.slice(0,3) + b.time.slice(6);
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

    this.toDo.sort ((a: any,b: any) => {
      if (this.selectedSortFilter === 'По убыванию') {
        if (a.priority.length > b.priority.length) return -1;
        else if (a.priority.length < b.priority.length) return 1;
        else return 0;
      }
      else if (this.selectedSortFilter === 'По возрастанию') {
        if (a.priority.length < b.priority.length) return -1;
        else if (a.priority.length >= b.priority.length) return 1;
        else return 0;
      }
      else {
        return a.priority.length + b.priority.length;
      }
      })
    }

    public filterStatus(): void {
      // if (this.selectedStatus.active === true){
      //
      // }
    }



}
