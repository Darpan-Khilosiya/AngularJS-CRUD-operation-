import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Group } from '../group';
import { ProjectService } from '../project.service';
import { ActivatedRoute , Router} from '@angular/router';
import { Project } from '../project';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  title = 'Update or Edit Project';
  rForm: FormGroup ;
  project: Project[];
  groups: Group[];
  projectDetails: Object;


  constructor(private projectServices: ProjectService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
    this.createForm();
  }

  createForm() {
    this.rForm = this.fb.group({
      projectName: ['', Validators.required],
      description: ['', Validators.required],
      groups: ['', Validators.required]
    });
  }

  updateProject() {
  console.log(this.rForm.value);
  this.route.params.subscribe(param => {
    this.projectServices.updateProject(
        param['id'],
        this.rForm.value['projectName'],
        this.rForm.value['description'],
        this.rForm.value['groups']
      );
    });
  }

  ngOnInit() {
    this.projectServices.getGroup().subscribe( groups => {
      this.groups = groups['data'];
    });
    this.route.params.subscribe(params => {
      this.projectServices.editProject(params['id']).subscribe(res => {
        this.projectDetails = res['data']; console.log('project details', this.projectDetails);
        this.rForm.patchValue({
          projectName: this.projectDetails['title'],
          description: this.projectDetails['description'],
          groups: this.groups['groups.name']
        });
      });
    });
  }
}
