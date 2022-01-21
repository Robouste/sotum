import { Pipe, PipeTransform } from "@angular/core";
import { Utils } from "./utils.class";

@Pipe({
	name: "exclude"
})
export class ExcludePipe implements PipeTransform {
	public transform(words: string[], exclude: string[]): string[] {
		return words.filter((word) => !exclude.some((char) => Utils.removeAccent(word).includes(char)));
	}
}
