import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';

import { ModalComponent } from '../../shared/index';
import { RoutinesService } from '../../services/index';

@Component({
  moduleId: module.id,
  selector: 'routine-new',
  templateUrl: 'routine-new.component.html',
  styleUrls: ['routine-new.component.css']
})

export class RoutineNewComponent implements OnInit {
  @ViewChild(ModalComponent)
  public readonly modal: ModalComponent;
  model: any = {};
  loading: boolean = false;
  errorMessage;

  constructor(
    private routinesService: RoutinesService) { }

  ngOnInit(): void {
    this.modal.show();
  }

  cancel(): void {
    this.modal.hide();
    this.routinesService.setAddingRoutine(false);
  }

  save(): void {
    //TODO: Save data
    this.loading = true;
    this.routinesService.setRoutine(this.model)
      .subscribe(
        data => {
          this.modal.hide();
          this.model = {};
          this.loading = false;
          this.routinesService.setAddingRoutine(false);
        },
        error => {
          this.errorMessage = <any>error;
          this.loading = false;
        }
      );
  }
}
