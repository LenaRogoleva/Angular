import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from "@angular/forms";

import { Routes, RouterModule} from "@angular/router";

import { AppComponent } from '../../app.component';
import { ContentComponent } from '../components/content/content.component';
import { ToolBarComponent } from '../components/tool-bar/tool-bar.component';
import { TaskEditComponent } from '../components/task-edit/task-edit.component';
import { TaskCreateComponent } from '../components/task-create/task-create.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RenderingComponent} from "../../rendering/rendering.component";

const appRoutes: Routes = [
  { path: '', component: RenderingComponent},
  { path: 'edit/:id', component: TaskEditComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    ToolBarComponent,
    TaskEditComponent,
    TaskCreateComponent,
    RenderingComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
