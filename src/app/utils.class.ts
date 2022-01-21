export class Utils {
	public static removeAccent(input: string): string {
		return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	}
}
