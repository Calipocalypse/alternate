import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { HttpService } from "src/app/services/http/http.service";
import { LikeAggregator } from "../news/news.component";

@Component({
    selector: `al-like`,
    templateUrl: `./like.component.html`
})

export class LikeComponent implements OnChanges
{
    @Input() likeAggregator: LikeAggregator = new LikeAggregator('3', 'r', false, 22, 'article');
    likeContainerClass = 'button-like-container button-like-container-no';

    buttonarticle = 'button-like-article';
    buttoncomment = 'button-like-comment';
    buttonYesStyle ='button-like-container button-like-container-yes ';
    buttonNoStyle ='button-like-container button-like-container-no ';
    
    httpService: HttpService;

    createButtonClass(yesno: string, type: string) : string
    {
        var x = '';
        if (yesno == 'yes') x += this.buttonYesStyle;
        else x += this.buttonNoStyle;

        if (type == 'article') x += this.buttonarticle;
        else if (type == 'comment') x += this.buttoncomment;

        return x;
    }

    constructor(http: HttpService) 
    {
        this.httpService = http;
        if (this.likeAggregator.isLiked) {
            this.likeContainerClass = this.createButtonClass('yes', this.likeAggregator.type);
        }
        else{
            this.likeContainerClass = this.createButtonClass('no', this.likeAggregator.type);
        }
    }

    ngOnChanges(changes: SimpleChanges)
    {
        if (this.likeAggregator.isLiked) {
            this.likeContainerClass = this.createButtonClass('yes', this.likeAggregator.type);
        }
        else{
            this.likeContainerClass = this.createButtonClass('no', this.likeAggregator.type);
        }
    }

    onClick()
    {
        this.switchLikes();
    }

    switchLikes()
    {
        if (this.likeAggregator.isLiked)
        {
            this.httpService.deleteLike(this.likeAggregator.id);
            this.likeAggregator.isLiked = false;
            this.likeContainerClass = this.createButtonClass('no', this.likeAggregator.type);
            this.likeAggregator.likesNumber -= 1;
        }
        else{
            this.httpService.postLike(this.likeAggregator.id);
            this.likeAggregator.isLiked = true;
            this.likeContainerClass = this.createButtonClass('yes', this.likeAggregator.type);
            this.likeAggregator.likesNumber += 1;
        }
    }
}
