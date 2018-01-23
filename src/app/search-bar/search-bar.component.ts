import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-search-bar',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
	constructor(private _router: Router) { }

	onSubmit(value: any) {
		if (value.searchTerm.trim().length > 0) {
			this._router.navigate(['/search'], { queryParams: {q: value.searchTerm.trim()}});
		}
	}
}
