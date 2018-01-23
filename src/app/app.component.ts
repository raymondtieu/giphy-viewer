import { Component } from '@angular/core';
import { GiphyService } from './services/giphy.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	providers: [ GiphyService ]
})
export class AppComponent {
	title = 'Giphy Viewer';

	constructor() {

	}
}
