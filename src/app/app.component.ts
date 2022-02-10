import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AppService } from "./app.service";
import { Utils } from "./utils.class";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent {
	public result: string[] = [];
	public toExclude: string[] = [];
	public excluded: string[] = [];

	public toInclude: string[] = [];
	public included: string[] = [];

	public form: FormGroup;
	public wordBuilderForm: FormGroup;

	public alphabet: string[] = [
		"a",
		"b",
		"c",
		"d",
		"e",
		"f",
		"g",
		"h",
		"i",
		"j",
		"k",
		"l",
		"m",
		"n",
		"o",
		"p",
		"q",
		"r",
		"s",
		"t",
		"u",
		"v",
		"w",
		"x",
		"y",
		"z"
	];

	public get length(): number {
		return this.form.get("length")?.value;
	}

	public get language(): string {
		return this.form.get("language")?.value;
	}

	public get startWith(): string {
		return this.form.get("startWith")?.value ?? "";
	}

	public get headerCount(): any[] {
		return Array(this.length);
	}

	private _words: string[] = [];

	constructor(private appService: AppService, private fb: FormBuilder) {
		this.form = fb.group({
			language: new FormControl("", Validators.required),
			startWith: new FormControl(""),
			length: new FormControl("", Validators.required)
		});

		this.form.get("language")?.valueChanges.subscribe((value: string) => {
			this.getWords();
		});

		this.wordBuilderForm = new FormGroup({});

		this.form.get("length")?.valueChanges.subscribe(() => {
			this.wordBuilderForm = new FormGroup({});
			for (let i = 0; i < this.headerCount.length; i++) {
				const fc = new FormControl("", Validators.maxLength(1));

				if (i === 0 && !!this.startWith) {
					fc.setValue(this.startWith);
					fc.disable();
				}

				this.wordBuilderForm.addControl(i.toString(), fc);

				fc.valueChanges.subscribe((value: string) => {
					if (value) {
						this.result = this.result.filter((word) =>
							word.toLocaleLowerCase().charAt(i) === value.toLocaleLowerCase()
						);
					}
				})
			}
		});
	}

	public getWords(): void {
		if (this.language) {
			this.appService.getWords(this.language).subscribe((words: string[]) => {
				this._words = words;
			});
		}
	}

	public reset(): void {
		this._words = [];
		this.result = [];
		this.excluded = [];
		this.included = [];
		this.form.reset();
		this.wordBuilderForm = new FormGroup({});
	}

	public filter(): void {
		this.result = this._words.filter((word) => Utils.removeAccent(word).startsWith(this.startWith) && word.length === this.length);
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
