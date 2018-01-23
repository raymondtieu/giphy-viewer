import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { GifsComponent } from '../gifs/gifs.component';
import { GiphyService } from '../services/giphy.service';

@Component({
	selector: 'app-trending',
	templateUrl: './trending.component.html',
	styleUrls: ['./trending.component.scss']
})
export class TrendingComponent implements OnInit {
	private _gifs: Array<object>;
	private _recordLimit: number;
	private _subscription;
	private _page: number;
	private _totalGifs: number;

	// Indicator for whether or not gifs have already been loaded.
	private _hasLoaded: boolean;

	constructor(private _giphyService: GiphyService, private _titleService: Title) {
		this._titleService.setTitle('Giphy Viewer | Trending');
	}

	ngOnInit() {
		this._gifs = [];
		this._page = 0;
		this._recordLimit = this._giphyService.recordLimit;
		// Pagination result for trending does not include total number of gifs.
		this._totalGifs = Number.MAX_SAFE_INTEGER;
		this._hasLoaded = false;

		this.getTrendingGifs();
	}

	get gifs(): Array<object> {
		return this._gifs;
	}

	get recordLimit(): number {
		return this._recordLimit;
	}

	get totalGifs(): number {
		return this._totalGifs;
	}

	get hasLoaded(): boolean {
		return this._hasLoaded;
	}

	getTrendingGifs() {
		this._subscription = this._giphyService.getTrendingGifs(this._page)
		.subscribe((res) => {
			if (res.meta.status === 200) {
				this._hasLoaded = true;
				this._gifs = this._gifs.concat(res.data);
			}
		});
	}

	onLoadMore() {
		this._page++;
		this.getTrendingGifs();
	}
}
