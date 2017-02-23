import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RoutinesService } from '../../services/index';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  moduleId: module.id,
  selector: 'routines',
  templateUrl: 'routines-list.component.html',
  styleUrls: ['routines-list.component.css']
})
export class RoutinesComponent implements OnInit {
  routines = [];
  selectedRoutine;
  error: any;
  showNgFor = false;

  constructor(
    private router: Router,
    private routinesService: RoutinesService) { }

  getRoutines() {
    return this.routinesService.getRoutines();
  }

  addingRoutine(): boolean {
    return this.routinesService.getAddingRoutine();
  }

  openRoutineModal(): void {
    this.routinesService.setAddingRoutine(true);
  }

  deleteRoutine(routine, event): void {
    console.log('routine:', routine);
    event.stopPropagation();
    this.routinesService
      .deleteRoutine(routine.id)
       .subscribe(error => this.error = error);
  }

  ngOnInit(): void {
    this.routinesService
      .loadRoutines()
      .subscribe(routines => this.routines = routines,
                 error => this.error = error);
  }

  onSelect(routine): void {
    console.log('select:', routine);
    this.selectedRoutine = routine;
    this.routinesService.setAddingRoutine(false);
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedRoutine.id]);
  }
}