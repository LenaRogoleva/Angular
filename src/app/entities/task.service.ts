import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {TaskInterface} from "./task.interface";

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

  constructor() { }

  public getTask(): void {
    this._tasks$$.next(test)
  }

  public addTask(task: TaskInterface): void {
    const tasks = this._tasks$$.value;
    tasks.push(task);
    this._tasks$$.next(tasks);
  }
}
