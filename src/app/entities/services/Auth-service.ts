import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {TaskInterface} from "../interfaces/task.interface";


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private _key$$: BehaviorSubject<number> = new BehaviorSubject<any>(null);
  public key$: Observable<number> = this._key$$.asObservable();


  constructor(private http: HttpClient) {
  }

  public getKey(): void {
    this.http.get<any>('http://localhost:3000/authorize').toPromise().then( (data) => {
      this._key$$.next(data.key)
      console.log(this._key$$.value);
    })
  }

  // public getPostKey(): void {
  //   this.http.post<any>('http://localhost:3000/items', this._key$$.value).toPromise().then()
  // }
  //
  // public getPutKey(task: TaskInterface): void {
  //   this.http.put<any>('http://localhost:3000/items' + task.id, this._key$$.value).toPromise().then()
  // }
}

