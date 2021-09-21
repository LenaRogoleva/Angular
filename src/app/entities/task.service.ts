import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {TaskInterface} from "./task.interface";
import {HttpClient} from "@angular/common/http";

const test: TaskInterface[] = [{
  name: 'hello',
  priority: 'low',
  time: new Date(),
  id: 1,
  status: 2,
},
  {
    name: 'how',
    priority: 'low',
    time: new Date(),
    id: 1,
    status: 1
  },
  {
    name: 'are',
    priority: 'low',
    time: new Date(),
    id: 1,
    status: 3
  },
  {
    name: 'you',
    priority: 'low',
    time: new Date(),
    id: 1,
    status: 1
  }]

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private _tasks$$: BehaviorSubject<TaskInterface[]> = new BehaviorSubject<TaskInterface[]>([]);
  public tasks$: Observable<TaskInterface[]> = this._tasks$$.asObservable();

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

  public cancelTask (task: TaskInterface): void {
    task.status = 3;
    this.http.put<TaskInterface>('http://localhost:3000/items/' + task.id, task).toPromise().then(() => {
      const tasks = this._tasks$$.value;
      task.status = 3;
      this._tasks$$.next(tasks);
    })
  }
}
