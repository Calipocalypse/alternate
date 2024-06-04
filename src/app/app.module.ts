import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProgressComponent } from './components/progress/progress.component';
import { MenuComponent } from './components/menu/menu.component';
import { BodyComponent } from './components/body/body.component';
import { HomeComponent } from './components/body/home/home.component';
import { NewsComponent } from './components/body/news/news.component';
import { GalleryComponent } from './components/body/gallery/gallery.component';
import { AboutComponent } from './components/body/about/about.component';
import { DownloadComponent } from './components/body/download/download.component';
import { ContactComponent } from './components/body/contact/contact.component';
import { FaqComponent } from './components/body/faq/faq.component';
import { GuestBookComponent } from './components/body/guestbook/guestbook.component';
import { HttpService } from './services/http/http.service';
import { LikeComponent } from './components/body/customelements/like.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ProgressComponent,
    BodyComponent,
    HomeComponent,
    NewsComponent,
    GalleryComponent,
    AboutComponent,
    DownloadComponent,
    ContactComponent,
    FaqComponent,
    GuestBookComponent,
    LikeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
