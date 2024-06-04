import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http/http.service";

@Component({
    selector: 'al-news',
    templateUrl: './news.component.html'
})
export class NewsComponent{
private http: HttpService;

    constructor(http: HttpService)
    {
        this.emptyLikeAggregator = new LikeAggregator('0','unknown', false, 0, 'article');
        this.http = http;
        this.http.getArticlesList().subscribe(
            {
                next: articlesList => this.articlesPickList = articlesList
            }
        );
        this.http.getnewestArticle().subscribe(
            {
                next: articleGiven => this.currentArticle = articleGiven
            }
        );
    }

    articlesPickList: ArticleListEntry[] = [];
    emptyLikeAggregator = new LikeAggregator('0','unknown', false, 0, 'article');
    currentArticle: Article = new Article('', 0, '', '', '', this.emptyLikeAggregator, new Array<Comment>(
        new Comment('test','test','test','test','test', this.emptyLikeAggregator)
    ));
    textAreaCommentContent: string = '';
    textAreaCommentAuthor: string = '';

    doTextareaValueChangeForAuthor(ev: Event) {
        try {
            this.textAreaCommentAuthor = ((<HTMLTextAreaElement>ev.target).value);
        } catch (e) {
            console.info('could not set textarea-value');
        }
    }
    doTextareaValueChangeForComment(ev: Event) {
        try {
            this.textAreaCommentContent = ((<HTMLTextAreaElement>ev.target).value);
        } catch (e) {
            console.info('could not set textarea-value');
        }
    }

    onPick(pick: string) {
        this.http.getArticle(pick).subscribe(
            {
                next: articleGiven => {
                    this.currentArticle = articleGiven
                }
            }
        );
    }

    postComment()
    {
        this.http.postComment(this.textAreaCommentContent, this.textAreaCommentAuthor, this.currentArticle.id)
        this.onPick(this.currentArticle.id);
    }
}

export class Article{
    constructor(id: string, views: number, title: string, createdDateRead: string,
         content: string, likeAggregator: LikeAggregator, comments: Array<Comment>)
    {
        this.id = id;
        this.views = views;
        this.title = title;
        this.createdDateRead = createdDateRead;
        this.content = content;
        this.likeAggregator = likeAggregator;
        this.comments = comments;
    }
    id: string;
    views: number;
    title: string;
    createdDateRead: string;
    content: string;
    likeAggregator: LikeAggregator;
    comments: Array<Comment>;
}

export class Comment{
    constructor(id: string, articleId: string, content: string, author: string, createdDateRead: string, likeAggregator: LikeAggregator)
    {
        this.id = id;
        this.articleId = articleId;
        this.content = content;
        this.author = author;
        this.createdDateRead = createdDateRead;
        this.likeAggregator = likeAggregator;
    }

    id: string;
    articleId: string;
    content: string;
    author: string;
    createdDateRead: string;
    likeAggregator: LikeAggregator;
}

export class ArticleListEntry{
    constructor(id: string, publishDate: string)
    {
        this.id = id;
        this.publishDate = publishDate;
    }
    id: string;
    publishDate: string;
}

export class LikeAggregator{
    constructor(id: string, name: string, isLiked: boolean, likesNumber: number, type: string)
    {
        this.id = id;
        this.name = name;
        this.isLiked = isLiked;
        this.likesNumber = likesNumber;
        this.type = type;
    }
    id: string;
    name: string;
    isLiked: boolean;
    likesNumber: number;
    type: string;
}