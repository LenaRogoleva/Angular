import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {TaskInterface} from "./task.interface";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private _tasks$$: BehaviorSubject<TaskInterface[]> = new BehaviorSubject<TaskInterface[]>([]);
  public tasks$: Observable<TaskInterface[]> = this._tasks$$.asObservable();

  private _sortData$$: BehaviorSubject<string> = new BehaviorSubject<string>('выберите сортировку');
  public sortData$: Observable<string> = this._sortData$$.asObservable();


  private _priorityFilter$$: BehaviorSubject<string> = new BehaviorSubject<string>('любой');
  public _priorityFilter$: Observable<string> = this._priorityFilter$$.asObservable();


  constructor(private http: HttpClient) { }

  public getTask(): void {
    this.http.get<TaskInterface[]>('http://localhost:3000/items').toPromise().then((data) => {
      this._tasks$$.next(data)
    });
  }

  public addTask(task: TaskInterface): void {
    this.http.post<TaskInterface>('http://localhost:3000/items', task).toPromise().then((data) => {
      const tasks = this._tasks$$.value;
      tasks.push(data);
      this._tasks$$.next(tasks);
    })
  }

  public deleteTask(task: TaskInterface): void {
    this.http.delete<TaskInterface>('http://localhost:3000/items/' + task.id).toPromise().then(() => {
      const tasks = this._tasks$$.value;
      let index = tasks.findIndex( item => item.id === task.id);
      tasks.splice(index,1);
      this._tasks$$.next(tasks);
    })
  }

  public finishTask(task: TaskInterface): void {
    task.status = 1;
    this.http.put<TaskInterface>('http://localhost:3000/items/' + task.id, task).toPromise().then(() => {
      const tasks = this._tasks$$.value;
      task.status = 1;
      this._tasks$$.next(tasks);
    })
  }

  public cancelTask(task: TaskInterface): void {
    task.status = 3;
    this.http.put<TaskInterface>('http://localhost:3000/items/' + task.id, task).toPromise().then(() => {
      const tasks = this._tasks$$.value;
      task.status = 3;
      this._tasks$$.next(tasks);
    })
  }

  public setPriority(priority: string): void {
    this._priorityFilter$$.next(priority)
  }

  public setData(data: string): void {
    this._sortData$$.next(data)
  }


  // public filterPriority(item: string): void {
  //   const tasks = this._tasks$$.value;
  //   let tasksFiltered: TaskInterface[] = [];
  //     for ( let i=0; i<tasks.length; i++) {
  //       if (tasks[i].priority === item){
  //       tasksFiltered.push (tasks[i]);
  //       }
  //     this._tasks$$.next(tasksFiltered);
  //     }
  // }
}

