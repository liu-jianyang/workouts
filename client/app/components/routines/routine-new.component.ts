import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { ModalComponent } from '../../shared/index';
import { RoutinesService, ExercisesService } from '../../services/index';

@Component({
  moduleId: module.id,
  selector: 'routine-new',
  templateUrl: 'routine-new.component.html',
  styleUrls: ['routine-new.component.css']
})

export class RoutineNewComponent implements OnInit {
  @ViewChild(ModalComponent)
  public readonly modal: ModalComponent;
  public typeaheadModel: any;
  private selectedExercises: any[] = [];
  model: any = {};
  searching = false;
  searchFailed = false;
  search = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searching = true)
      .switchMap(term =>
        this.exercisesService.searchExercises(term, this.selectedExercises)
            .do(() => this.searchFailed = false)
            .catch(() => {
              this.searchFailed = true;
              return Observable.of([]);
            }))
      .do(() => this.searching = false);
  formatter = (x: {name: string}) => x.name;
  
  loading: boolean = false;
  errorMessage;

  constructor(
    private routinesService: RoutinesService,
    private exercisesService: ExercisesService) { }

  ngOnInit(): void {
    this.modal.show();
  }

  cancel(): void {
    this.modal.hide();
    this.selectedExercises = [];
    this.routinesService.setAddingRoutine(false);
  }

  onSelect($event, input) {
    $event.preventDefault();
    this.selectedExercises.push($event.item);
    this.typeaheadModel = undefined;
  }

  remove($event, exerciseToRemove) {
    $event.preventDefault();
    this.selectedExercises = this.selectedExercises.filter(function(exercise) {
      return exercise.eid !== exerciseToRemove.eid;  
    });
  }

  save(): void {
    this.model.exercises = this.selectedExercises;
    this.loading = true;
    this.routinesService.setRoutine(this.model)
      .subscribe(
        data => {
          this.modal.hide();
          this.selectedExercises = [];
          this.model = {};
          this.loading = false;
          this.routinesService.setAddingRoutine(false);
        },
        error => {
          this.errorMessage = <any>error;
          this.loading = false;
          this.selectedExercises = [];
        }
      );
  }
}
