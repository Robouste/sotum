import { Pipe, PipeTransform } from "@angular/core";
import { Utils } from "./utils.class";

@Pipe({
	name: "include"
})
export class IncludePipe implements PipeTransform {
	public transform(words: string[], include: string[]): string[] {
		return include.length
			? words.filter((word) => include.some((char) => Utils.removeAccent(word).includes(char)))
			: words;
	}
}
