import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { appRoutes } from './app.routes';

import { AppComponent } from './app.component';
import { GifsComponent } from './gifs/gifs.component';
import { TrendingComponent } from './trending/trending.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { GifComponent } from './gif/gif.component';

@NgModule({
	declarations: [
		AppComponent,
		GifsComponent,
		TrendingComponent,
		SearchResultsComponent,
		SearchBarComponent,
		GifComponent
	],
	imports: [
		BrowserModule,
		HttpModule,
		FormsModule,
		RouterModule.forRoot(appRoutes),
		InfiniteScrollModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
