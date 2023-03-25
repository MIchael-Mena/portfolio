import {Component, OnInit} from '@angular/core';
import {StorageSessionService} from "./service/storage-session.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'portfolio';

  constructor(private storageSession: StorageSessionService) {
  }

  ngOnInit() {
    const isLogged = this.storageSession.isLoggedIn;

  }

}
