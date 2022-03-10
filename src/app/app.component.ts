import { Component, OnInit } from '@angular/core';
import { SaveCredentialsService } from './core/services/save-credentials.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularshop';
  constructor(private saveCred: SaveCredentialsService) {

  }
  ngOnInit(): void {
    // this.saveCred.clearCredentials();
  }
}
