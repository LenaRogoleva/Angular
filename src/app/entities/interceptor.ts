import {Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {AuthService} from "./services/Auth-service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  // public key: string = '';


  constructor(private _authService: AuthService ) {}

  // public get(): string {
  //   // this._authService.key$.subscribe((key) => {
  //
  //     console.log(this.key);
  //   // })
  //   return this.key
  //
  // }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // this.get();
    let key = this._authService.key$$.value;
    console.log(key);
    const authReq = req.clone({
      setHeaders: {
        Authorization: `${key}`
      }
    })

    return next.handle(authReq).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse)
            console.log('Server response')
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401)
              console.log('Unauthorized')
          }
        }
      )
    )
  }
}
