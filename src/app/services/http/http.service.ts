import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { Observable, catchError, tap } from "rxjs";
import { Article, ArticleListEntry } from "src/app/components/body/news/news.component";
import { Progress } from "src/app/components/progress/progress.component";

@Injectable()
export class HttpService {

    private url = 'https://localhost:7116/';
    constructor(private http: HttpClient) { }

    getArticle(id: string): Observable<Article> {
        var x = this.http.get<Article>(this.url + 'articles/' + id).pipe(
            tap(data => console.log('All: ', JSON.stringify(data)))
        );
        return x;
    }

    getnewestArticle(): Observable<Article> {
        var x = this.http.get<Article>(this.url + 'articles/newest').pipe(
            tap(data => console.log('All: ', JSON.stringify(data)))
        );
        return x;
    }

    getArticlesList(): Observable<Array<ArticleListEntry>> {
        var x = this.http.get<Array<ArticleListEntry>>(this.url + 'articles').pipe(
            tap(data => console.log('All ', JSON.stringify(data))));
        return x;
    }

    getDemoStatus(): Observable<Progress> {
        var x = this.http.get<Progress>(this.url + 'projectstatus').pipe(
            tap(data => console.log('All', JSON.stringify(data))));
        return x;
    }

    postComment(content: string, author: string, articleId: string) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        var obj = { author: author, content: content };
        var objDto = JSON.stringify(obj);
        this.http.post(this.url + 'comments/'+articleId, objDto, { headers: headers }).subscribe(
            (error) => { },
            (success) => { this.handleError(success); } //Why the hell does it work like that!
        );
    }

    private handleError(error: any) {
        if (error instanceof HttpErrorResponse) {
            if (error.status >= 400 && error.status < 600)
            {
                alert(`Error communication with API: ${error.status}: ${error.statusText}`);
            }
            else if (error.status == 0)
            {
                alert(`Error communication with API: It seems that API server is not possible to reach.`);
            }
        }
    }

    postLike(id: string) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        this.http.post(this.url + 'likes/' + id, { headers: headers }).subscribe(
            (error) => { },
            (success) => { this.handleError(success); } //Why the hell does it work like that!
        );
    }

    deleteLike(id: string)
    {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        this.http.delete(this.url + 'likes/' + id, { headers: headers }).subscribe(
            (error) => { },
            (success) => { this.handleError(success); } //Why the hell does it work like that!
        );
    }
}