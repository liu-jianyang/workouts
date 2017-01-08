import { Component } from '@angular/core';
import { UpdatesService } from './updates.service';

@Component({
  selector: 'updates',
  templateUrl: 'app/updates.component.html',
  styleUrls: ['app/updates.component.css']
})

export class UpdatesComponent {
  updates = '';
  errorMessage: string;
  mode = 'Observable';
  constructor (private updatesService: UpdatesService) {};
  ngOnInit() {
    this.getUpdates();
  };

  getUpdates() {
    this.updatesService.getUpdates()
      .subscribe(
        updates => this.updates = updates,
        error =>  this.errorMessage = <any>error);
  };
}