import { Component, Input } from "@angular/core";

@Component({
    selector: 'al-body',
    templateUrl: './body.component.html'
})
export class BodyComponent{
    @Input() currentPage: string = '';
}