import { Component, OnInit, OnChanges, EventEmitter, Input, Output } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
	selector: 'app-gifs',
	templateUrl: './gifs.component.html',
	styleUrls: ['./gifs.component.scss']
})

/*
 * Divide loaded gifs into separate columns when they are loaded to
 * display them without a gap between rows due to varying heights
 * and width.
 * Gifs are displayed with a fixed width and 5 columns are displayed.
 */
export class GifsComponent implements OnInit, OnChanges {
	@Input() public gifs: Array<object>;
	@Input() public searchTerm: string;
	@Input() public recordLimit: number;
	@Input() public totalGifs: number;
	@Input() public hasLoaded: boolean;

	@Output() loadMore = new EventEmitter<number>();

	private _gifColumns: Array<Array<object>>;
	private _numColumns: number;

	// Indicator for whether the load more button has been pressed.
	private _shouldLoadMore: boolean;

	constructor() { }

	ngOnInit() {
		this._numColumns = 5;
		this.initColumns();
		this._shouldLoadMore = false;
	}

	ngOnChanges(...args: any[]) {
		// Check if there is a change in the search terms.
		if (args.length > 0 && args[0].hasOwnProperty('searchTerm')) {
			if (args[0].searchTerm.currentValue !== args[0].searchTerm.previousValue) {
				this.initColumns();
				this._shouldLoadMore = false;
			}
		}

		// Check if there is a change in the gifs.
		if (args.length > 0 && args[0].hasOwnProperty('gifs')) {
			const change = args[0].gifs;

			// Divide loaded gifs into columns.
			if (this.gifs.length > 0) {
				const newGifs = this.gifs.slice(-1 * this.recordLimit);

				newGifs.forEach((gif, i) => {
					const columnNumber = i % this._numColumns;
					this._gifColumns[columnNumber].push(gif);
				});
			}
		}
	}

	get gifColumns(): Array<Array<object>> {
		return this._gifColumns;
	}

	get shouldLoadMore(): boolean {
		return this._shouldLoadMore;
	}

	onLoadMore() {
		this._shouldLoadMore = true;
		this.loadMore.emit();
	}

	initColumns() {
		this._gifColumns = Array(this._numColumns).fill(null).map(() => []);
	}
}
