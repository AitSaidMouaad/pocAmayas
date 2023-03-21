import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  navbarActive = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleNavbar(): void {
    this.navbarActive = !this.navbarActive;
  }
}
