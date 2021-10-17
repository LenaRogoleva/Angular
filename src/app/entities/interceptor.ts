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

  private _key: string = '';


  constructor(private _authService: AuthService ) {

    this._authService.key$.subscribe( key => {
      this._key = String(key);
    })
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: req.headers.set('key', this._key),
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
