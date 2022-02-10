import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class AppService {
	constructor(private http: HttpClient) {}

	public getWords(lang: string): Observable<string[]> {
		return this.http.get<string[]>(`/assets/words-${lang}.json`);
	}
}
