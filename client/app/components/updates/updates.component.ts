import { Component } from '@angular/core';
import { UpdatesService } from '../../services/index';

@Component({
  selector: 'updates',
  templateUrl: 'app/components/updates/updates.component.html',
  styleUrls: ['app/components/updates/updates.component.css']
})

export class UpdatesComponent {
  private title = 'Changelog';
  updates = [];
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