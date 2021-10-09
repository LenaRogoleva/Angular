import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public key$$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public keyForPost$$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  // public key$: Observable<string> = this.key$$.asObservable();

  constructor(private http: HttpClient) {
  }

  public getKey(): void {
    this.http.get<string>('http://localhost:3000/authorize').toPromise().then( (data) => {
      this.key$$.next(data)
      console.log(this.key$$.value);
    })
  }

  public getPostKey(): void {
    this.http.post<string>('http://localhost:3000/items', this.key$$.value).toPromise().then()
  }
}

