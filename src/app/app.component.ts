import { Component } from "@angular/core";

@Component({
  selector: 'pm-root',
  templateUrl: 'pages/alternatemain.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'alternate';
  currentPage = 'home';
  
  onPageSelected(pageName: string) {
    this.currentPage = pageName;
  }
}
