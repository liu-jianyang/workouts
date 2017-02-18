import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RoutinesService } from '../../services/index';

@Component({
  moduleId: module.id,
  selector: 'routines',
  templateUrl: 'routines-list.component.html',
  styleUrls: ['routines-list.component.css']
})
export class RoutinesComponent implements OnInit {
  routines = [];
  selectedRoutine;
  addingRoutine = false;
  error: any;
  showNgFor = false;

  constructor(
    private router: Router,
    private routineService: RoutinesService) { }

  getRoutines(): void {
    this.routineService
      .getRoutines()
      .then(routines => this.routines = routines)
      .catch(error => this.error = error);
  }

  addRoutine(): void {
    console.log('addRoutine');
    this.addingRoutine = true;
    this.selectedRoutine = null;
  }

  close(savedRoutine): void {
    this.addingRoutine = false;
    if (savedRoutine) { 
      this.getRoutines(); 
    }
  }

  deleteRoutine(routine, event): void {
    event.stopPropagation();
    this.routineService
      .delete(routine)
      .then(res => {
        this.routines = this.routines.filter(r => r !== routine);
        if (this.selectedRoutine === routine) { this.selectedRoutine = null; }
      })
      .catch(error => this.error = error);
  }

  ngOnInit(): void {
    this.getRoutines();
  }

  onSelect(routine): void {
    this.selectedRoutine = routine;
    this.addingRoutine = false;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedRoutine.id]);
  }
}