import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Project } from './project';
import { Group } from './group';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projectUrl = 'API WHICH YOU REFER OR YOUR LOCAL SERVER ADDRESS';
  groupUrl = 'API WHICH YOU REFER OR YOUR LOCAL SERVER ADDRESS';

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router) { }

  // fatching all Project from API
  getProject(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.projectUrl}`)
    .pipe(tap(data => console.log('Project Data')), // JSON.stringify(data) {TO show the data}
    catchError(this.handleError));
  }

  // fatching all the groups from the api
  getGroup(): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.groupUrl}`)
    .pipe(tap(data => console.log('Group Data')),
    catchError(this.handleError));
  }

  // this is returning the ID which we are going to update
  editProject(id) {
    return this.http.get(`${this.projectUrl}/${id}`);
  }

  // createing new project in API
  addProject(projectName, desc, groups) {
    const obj = {
      title: projectName,
      description: desc,
      groups: groups
    };
    this.http.post<Project[]>(`${this.projectUrl}`, obj)
    .pipe(tap(data1 => console.log('create'), catchError ( this.handleError)))
    .subscribe(data => {
      console.log('Data has been created', data);
      this.router.navigate(['project']);
    },
    error => { console.log('ERROR: some problem while adding new project', error); });
  }


  // updating the project details throw the id
  updateProject(id, projectName, desc, groups) {
    const obj = {
      title: projectName,
      description: desc,
      groups: groups
    };
    this.http.put<Project[]>(`${this.projectUrl}/${id}`, obj)
    .subscribe(data => {
      console.log('Data has been updated' + data);
      this.router.navigate(['project']);
      },
    error => {console.log('ERROR: some problem while updating', error); });
  }

  // error handler
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent ) {
        errorMessage = `ERROR Ouccered: $(err.error.message)`;
    } else {
        errorMessage = `Server Returened code: $(err.status)`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
