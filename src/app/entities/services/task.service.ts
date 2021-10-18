import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {TaskInterface} from "../interfaces/task.interface";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./Auth-service";
import {ToastrService} from "ngx-toastr";


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private _tasks$$: BehaviorSubject<TaskInterface[]> = new BehaviorSubject<TaskInterface[]>([]);
  public tasks$: Observable<TaskInterface[]> = this._tasks$$.asObservable();

  private _sortData$$: BehaviorSubject<string> = new BehaviorSubject<string>('выберите сортировку');
  public sortData$: Observable<string> = this._sortData$$.asObservable();

  private _sortPriority$$: BehaviorSubject<string> = new BehaviorSubject<string>('выберите сортировку');
  public sortPriority$: Observable<string> = this._sortPriority$$.asObservable();

  private _priorityFilter$$: BehaviorSubject<string> = new BehaviorSubject<string>('любой');
  public _priorityFilter$: Observable<string> = this._priorityFilter$$.asObservable();

  private _filterByStatus$$: BehaviorSubject<object> = new BehaviorSubject<object>({active: true, canceled: true, finished: true});
  public filterByStatus$: Observable<object> = this._filterByStatus$$.asObservable();

  private _searchTask$$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public searchTask$: Observable<string> = this._searchTask$$.asObservable();

  private _saveTask$$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public saveTask$: Observable<string> = this._saveTask$$.asObservable();

  private _click$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public click$: Observable<boolean> = this._click$$.asObservable();

  private _key: number = 0;



  constructor(private http: HttpClient, private _authService: AuthService, private toastr: ToastrService) {
    this._authService.key$.subscribe( key => {
      this._key = key;
    })
  }

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
      .catch( () => {
        this.toastr.success('Пожалуйста, авторизуйтесь ^^')
        }
      )
  }

  public deleteTask(task: TaskInterface): void {
    this.http.delete<TaskInterface>('http://localhost:3000/items/' + task.id).toPromise().then(() => {
      const tasks = this._tasks$$.value;
      let index = tasks.findIndex( item => item.id === task.id);
      tasks.splice(index,1);
      this._tasks$$.next(tasks);
    })
      .catch( () => {
          this.toastr.success('Пожалуйста, авторизуйтесь ^^')
        }
      )
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

  public setPrioritySort (priority: string): void {
    this._sortPriority$$.next(priority)
  }

  public setStatus( status: object): void {
    this._filterByStatus$$.next(status)
  }

  public startSearch(text: string): void {
    this._searchTask$$.next(text);
  }

  public saveTask(name: string, task: TaskInterface): void {
    this._saveTask$$.next(name);
    task.name = name;
    this.http.put<TaskInterface>('http://localhost:3000/items/' + task.id, task).toPromise().then(() => {
      const tasks = this._tasks$$.value;
      task.name = name;
      this._tasks$$.next(tasks);
    })
  }

  public setClick(station: boolean): void {
    this._click$$.next(station);
  }

}

