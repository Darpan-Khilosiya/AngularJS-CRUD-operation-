import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectComponent } from './project/project.component';
import { AddProjectComponent } from './project/add-project/add-project.component';
import { UpdateComponent } from './project/update/update.component';
import { ProjectService } from './project/project.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProjectComponent,
    AddProjectComponent,
    UpdateComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'dashboard' , component: DashboardComponent},
      {path: 'project' , component: ProjectComponent},
      {path: 'project/add-project', component: AddProjectComponent},
      {path: 'project/update/:id', component: UpdateComponent},
      {path: '', redirectTo: 'project', pathMatch: 'full'}
    ]),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
