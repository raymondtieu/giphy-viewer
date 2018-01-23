import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { GifsComponent } from '../gifs/gifs.component';
import { GiphyService } from '../services/giphy.service';

@Component({
	selector: 'app-search-results',
	templateUrl: './search-results.component.html',
	styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
	private _gifs: Array<object>;
	private _recordLimit: number;
	private _subscription;
	private _page: number;
	private _searchTerm: string;
	private _totalGifs: number;

	// Indicator for whether or not gifs have already been loaded.
	private _hasLoaded: boolean;

	constructor(
		private _giphyService: GiphyService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _titleService: Title) {

		this._titleService.setTitle('Giphy Viewer | Search');
	}

	ngOnInit() {
		this._gifs = [];
		this._page = 0;
		this._recordLimit = this._giphyService.recordLimit;
		this._totalGifs = 0;
		this._hasLoaded = false;

		this._route.queryParams.subscribe((params) => {
			this._searchTerm = params.q;
			this.searchGifs();
		});
	}

	get gifs(): Array<object> {
		return this._gifs;
	}

	get searchTerm(): string {
		return this._searchTerm;
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

	searchGifs() {
		this._page = 0;

		this._subscription = this._giphyService.searchGifs(this._searchTerm, this._page)
			.subscribe((res) => {
				this._hasLoaded = true;

				if (res.meta.status === 200) {
					this._totalGifs = res.pagination.total_count;
					this._gifs = res.data;
				}
			});
	}

	onLoadMore() {
		if (this._totalGifs > this._gifs.length) {
			this._page++;

			this._subscription = this._giphyService.searchGifs(this.searchTerm, this._page)
				.subscribe((res) => {
					if (res.meta.status === 200) {
						this._totalGifs = res.pagination.total_count;
						this._gifs = this._gifs.concat(res.data);
					}
				});
		}
	}
}
