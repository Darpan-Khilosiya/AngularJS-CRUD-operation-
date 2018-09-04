import { Component, OnInit } from '@angular/core';
import { Project } from './project';
import { Group} from './group';
import { ProjectService } from './project.service';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects: Project[];
  groups: Group[];

  constructor(private projectServices: ProjectService) { }


  ngOnInit() {
    this.projectServices.getProject().subscribe( projects => {
        this.projects = projects['data'];
      });
      this.projectServices.getGroup().subscribe( groups => {
        this.groups = groups['data'];
      });
  }

}
