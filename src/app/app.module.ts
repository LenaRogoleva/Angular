import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContentComponent } from './entities/components/content/content.component';
import { ToolBarComponent } from './entities/components/tool-bar/tool-bar.component';
import { TaskEditComponent } from './entities/components/task-edit/task-edit.component';
import { TaskCreateComponent } from './entities/components/task-create/task-create.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    ToolBarComponent,
    TaskEditComponent,
    TaskCreateComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
