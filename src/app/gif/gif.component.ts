import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-gif',
	templateUrl: './gif.component.html',
	styleUrls: ['./gif.component.scss']
})
export class GifComponent implements OnInit {
	@Input() public gif: any;

	private _colourClass: string;
	private _colourClasses: Array<string>;

	constructor() { }

	ngOnInit() {
		// Colours for img placeholders while img src loads in the browser.
		this._colourClasses = [
			'red',
			'blue',
			'aqua',
			'yellow',
			'green'
		];

		// Assign a random colour class in a script instead of randomizing
		// background colours of elements in the SASS file because the colour
		// pattern does not change once the CSS is rendered.
		this._colourClass = this.getRandomColourClass();
	}

	get colourClass(): string {
		return this._colourClass;
	}

	getRandomColourClass() {
		const index = Math.floor(Math.random() * this._colourClasses.length);
		return this._colourClasses[index];
	}
}
