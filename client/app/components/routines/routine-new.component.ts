import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { RoutinesService } from '../../services/index';

@Component({
  moduleId: module.id,
  selector: 'routine-new',
  templateUrl: 'routine-new.component.html',
  styleUrls: ['routine-new.component.css']
})
export class RoutineNewComponent implements OnInit {
  @Input() routine;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here

  constructor(
    private routineService: RoutinesService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.routineService
      .getRoutine(routine.id)
      .then(routine => {
        let keys = Object.keys(routine);
        for (let i = 0; i < keys.length; i++) {
          let key = keys[i];
          if (this.selectedRoutine[key]) {
            if (this.selectedRoutine[key] !== routine[key]) throw new Error('OnSelect: Keys do not match');
          } else {
            this.selectedRoutine[key] = routine[key];
          }
        }
      })
      .catch(error => this.error = error);
  }

  save(): void {
    this.heroService
        .save(this.hero)
        .then(hero => {
          this.hero = hero; // saved hero, w/ id if new
          this.goBack(hero);
        })
        .catch(error => this.error = error); // TODO: Display error message
  }

  goBack(savedHero: Hero = null): void {
    this.close.emit(savedHero);
    if (this.navigated) { window.history.back(); }
  }
}