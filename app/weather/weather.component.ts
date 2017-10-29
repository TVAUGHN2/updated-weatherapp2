import { Component }        from '@angular/core';
import { JSONP_PROVIDERS }  from '@angular/http';
import { Observable }       from 'rxjs/Observable';
import { Subject }          from 'rxjs/Subject';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';



import { WeatherService } from './weather.service';

@Component({
	selector: 'gs-weather',
	templateUrl: 'app/weather/weather.component.html',	
	providers: [JSONP_PROVIDERS, WeatherService],
})

export class WeatherComponent {
	isVisible: boolean = false;	
	today: {} = {};
	forecast: string[] = [];

	// items: Observable <string[]>;

	 private searchTermStream = new Subject<string>();

	constructor (private weatherService: WeatherService) {}

	search(term: string) {this.isVisible = false;  this.searchTermStream.next(term); }

	items = this.searchTermStream
	
    .debounceTime(1000)
    .distinctUntilChanged()
    .switchMap((term: string) => this.weatherService.search(term))
    .subscribe(data => {
		this.isVisible = true; 
		console.log(data); 
		this.items =  data;

		//TV added
		this.forecast = this.items["query"]["results"]["channel"]["item"]["forecast"];
		this.today = this.forecast.shift(); //remove and return first element of array for today's forecast
		this.forecast = this.forecast.slice(0,5); //only want 5 day forecast
		console.log(this.today);
		console.log(this.forecast);
	});
	
	// search (term: string) {
	// 	console.log(term);
	// 	this.items = this.weatherService.search(term);
	// 	this.isVisible = true;
	// 	console.log(this.items);
	// }

	weatherImgs = 
	{
		0:	"assets/images/icons/icon-8.svg",
		1:	"assets/images/icons/icon-8.svg",
		2:	"assets/images/icons/icon-8.svg",
		3:	"assets/images/icons/icon-12.svg",
		4:	"assets/images/icons/icon-12.svg",
		5:	"assets/images/icons/icon-13.svg",
		6:	"assets/images/icons/icon-13.svg",
		7:	"assets/images/icons/icon-13.svg",
		8:	"assets/images/icons/icon-9.svg",
		9:	"assets/images/icons/icon-9.svg",
		10:	"assets/images/icons/icon-9.svg",
		11:	"assets/images/icons/icon-4.svg",
		12:	"assets/images/icons/icon-4.svg",
		13:	"assets/images/icons/icon-13.svg",
		14:	"assets/images/icons/icon-13.svg",
		15:	"assets/images/icons/icon-13.svg",
		16:	"assets/images/icons/icon-13.svg",
		17:	"assets/images/icons/icon-4.svg",
		18:	"assets/images/icons/icon-4.svg",
		19:	"assets/images/icons/icon-4.svg",
		20:	"assets/images/icons/icon-4.svg",
		21:	"assets/images/icons/icon-4.svg",
		22:	"assets/images/icons/icon-4.svg",
		23:	"assets/images/icons/icon-7.svg",
		24:	"assets/images/icons/icon-7.svg",
		25:	"assets/images/icons/icon-4.svg",
		26:	"assets/images/icons/icon-5.svg",
		27:	"assets/images/icons/icon-6.svg",
		28: "assets/images/icons/icon-3.svg",
		29:	"assets/images/icons/icon-5.svg",
		30:	"assets/images/icons/icon-3.svg",
		31:	"assets/images/icons/icon-2.svg",
		32:	"assets/images/icons/icon-2.svg",
		33:	"assets/images/icons/icon-2.svg",
		34:	"assets/images/icons/icon-2.svg",
		35:	"assets/images/icons/icon-4.svg",
		36:	"assets/images/icons/icon-2.svg",
		37:	"assets/images/icons/icon-12.svg",
		38:	"assets/images/icons/icon-12.svg",
		39:	"assets/images/icons/icon-4.svg",
		40:	"assets/images/icons/icon-4.svg",
		41:	"assets/images/icons/icon-13.svg",
		42:	"assets/images/icons/icon-13.svg",
		43:	"assets/images/icons/icon-13.svg",
		44:	"assets/images/icons/icon-2.svg",
		45:	"assets/images/icons/icon-12.svg",
		46:	"assets/images/icons/icon-13.svg",
		47:	"assets/images/icons/icon-12.svg",
		3200:	"not available"
	
	}
}

