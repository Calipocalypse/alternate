import { Component } from "@angular/core";
import { HttpService } from "src/app/services/http/http.service";

@Component({
    selector: 'al-progress',
    templateUrl: './progress.component.html'
})
export class ProgressComponent{
    private http: HttpService;
    constructor(http: HttpService)
    {
        this.http = http;
        this.http.getDemoStatus().subscribe(
            {
                next: progress => this.progress = progress
            }
        );
    }
    progress: Progress = new Progress('0.00%');
    
}

export class Progress{
    demo :string = '0.00%'
    constructor(demo :string)
    {
        this.demo = demo;
    }
}