import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { RoutinesService } from '../../services/index';

@Component({
  moduleId: module.id,
  selector: 'routine-detail',
  templateUrl: 'routine-detail.component.html',
  styleUrls: ['routine-detail.component.css']
})
export class RoutineDetailComponent implements OnInit {
  @Input() routine;
  error: any;

  constructor(
    private routineService: RoutinesService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.routineService
      .getRoutine(this.routine.id)
      .then(routine => {
        let keys = Object.keys(routine);
        for (let i = 0; i < keys.length; i++) {
          let key = keys[i];
          if (this.routine[key]) {
            if (this.routine[key] !== routine[key]) throw new Error('ngOnInit: Keys do not match');
          } else {
            this.routine[key] = routine[key];
          }
        }
      })
      .catch(error => this.error = error);
  }
}