import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from "@angular/forms";

import { Routes, RouterModule} from "@angular/router";

import { AppComponent } from '../../app.component';
import { ContentComponent } from '../components/content/content.component';
import { ToolBarComponent } from '../components/tool-bar/tool-bar.component';
import { TaskEditComponent } from '../components/task-edit/task-edit.component';
import {TaskCreateComponent} from '../components/task-create/task-create.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RenderingComponent} from "../../rendering/rendering.component";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {ModalWindowComponent} from "../../modal-window/modal-window.component";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthService} from "../services/Auth-service";
import {AuthInterceptor} from "../interceptor";
import {ToastrModule} from "ngx-toastr";
import {AccessGuard} from "../guards/access.guard";
// import {AuthInterceptor, AuthService} from "../services/Auth-service";
// import {TokenInterceptor} from "../auth";

const appRoutes: Routes = [
  { path: '', component: RenderingComponent},
  { path: 'edit/:id',
    component: TaskEditComponent,
    canActivate: [AccessGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    ToolBarComponent,
    TaskEditComponent,
    TaskCreateComponent,
    RenderingComponent,
    ModalWindowComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
    }
  ],
  entryComponents: [
    ModalWindowComponent
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
