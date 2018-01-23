import { Routes } from '@angular/router';
import { SearchResultsComponent } from './search-results/search-results.component';
import { TrendingComponent } from './trending/trending.component';

export const appRoutes: Routes = [
	{path: '', component: TrendingComponent},
	{path: 'search', component: SearchResultsComponent},
];
