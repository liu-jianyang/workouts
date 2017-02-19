import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from '../shared/index';
import { OnInit } from '@angular/core';
@Component({
  moduleId: module.id,
  selector: 'routine-new',
  templateUrl: 'routine-new.component.html',
  styleUrls: ['routine-new.component.css']
})

export class RoutineNewComponent implements OnInit {
  @ViewChild(ModalComponent)
  public readonly modal: ModalComponent;

  ngOnInit(): void {
    this.modal.show();
  }

  save(): void {
    //TODO: Save data
    this.modal.hide();
  }
}
