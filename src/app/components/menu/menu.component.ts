import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'al-menu',
    templateUrl: './menu.component.html'
})
export class MenuComponent{
    @Output() pageSelected = new EventEmitter<string>();
    
  showPage(pagename: string)
  {
    this.pageSelected.emit(pagename);
  }
}