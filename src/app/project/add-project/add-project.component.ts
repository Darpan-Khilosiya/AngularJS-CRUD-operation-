import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';
import { Group} from '../group';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  title = 'Create Or Add New Project';
  rForm: FormGroup;
  groups: Group[];

  constructor(private projectService: ProjectService, private fb: FormBuilder ) {
    this.createForm();
   }

  createForm() {
    this.rForm = this.fb.group({
      projectName: ['', Validators.required],
      description: ['', Validators.required],
      groups: ['', Validators.required]
    });
  }

  addProject(rForm) {
    console.log(this.rForm.value);
    this.projectService.
    addProject(this.rForm.value['projectName'],
               this.rForm.value['description'],
               this.rForm.value['groups']);
   }

  ngOnInit() {
    this.projectService.getGroup().subscribe( groups => {
      this.groups = groups['data'];
    });
  }
}
