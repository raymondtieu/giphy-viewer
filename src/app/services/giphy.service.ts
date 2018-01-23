import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/map';

@Injectable()
export class GiphyService {
	private API_KEY = 'dc6zaTOxFJmzC';
	private _apiUrl = 'https://api.giphy.com';

	private _recordLimit: number;

	constructor(private _http: Http) {
		console.log('Giphy service is ready.');

		// Default value for limit param in the Giphy api.
		this._recordLimit = 25;
	}

	getTrendingGifs(page: number) {
		const params = new URLSearchParams();

		params.set('offset', (page * this._recordLimit).toString());

		const url = this._apiUrl.concat('/v1/gifs/trending', '?api_key=', this.API_KEY);

		// publishReplay to cache most recent value.
		// refCount to keep observables alive while there are subscribers.
		return this._http.get(url, {params})
			.map((res: Response) => res.json())
			.publishReplay(1)
			.refCount();
	}

	searchGifs(searchTerm: string, page: number) {
		const params = new URLSearchParams();

		params.set('q', searchTerm);
		params.set('offset', (page * this._recordLimit).toString());

		const url = this._apiUrl.concat('/v1/gifs/search', '?api_key=', this.API_KEY);

		return this._http.get(url, {params})
			.map((res: Response) => res.json())
			.publishReplay(1)
			.refCount();
	}

	get recordLimit(): number {
		return this._recordLimit;
	}
}
