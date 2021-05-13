import { Component, OnInit } from '@angular/core';
import { ApiService } from 'core-component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  apps: App[]

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loadAllApp();
  }

  loadAllApp(): void {
    this.apiService.getCall("app").subscribe((response) => {
      // console.log(response);
      this.apps = response;
    }
    );
  }
}
export interface App {
  id: Number;
  appName: string;
  appLink: string;
}
