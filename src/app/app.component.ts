import { Component, OnInit } from "@angular/core";
import { AppService } from "./app.service";
import { Utils } from "./utils.class";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
	public startWith: string = "r";
	public length: number | null = 8;
	public result: string[] = [];
	public toExclude: string[] = [];
	public excluded: string[] = [];

	public toInclude: string[] = [];
	public included: string[] = [];

	public get headerCount(): any[] {
		return Array(this.length);
	}

	private _words: string[] = [];

	constructor(private appService: AppService) {}

	// TODO: add columns to easily identify character's position

	public ngOnInit(): void {
		this.appService.getWords().subscribe((words: string[]) => {
			this._words = words;
			this.filter();
		});
	}

	public filter(): void {
		this.result = this._words.filter(
			(word) => Utils.removeAccent(word).startsWith(this.startWith) && word.length === this.length
		);
	}

	public addToExcluded(): void {
		this.excluded.push(...this.toExclude);
		// force pipe execution
		this.excluded = this.excluded.slice();
		this.toExclude = [];
	}

	public addToIncluded(): void {
		this.included.push(...this.toInclude);
		this.included = this.included.slice();
		this.toInclude = [];
	}
}
