export default class GreeterProvider {
	hello(): string {
		return "Hello!";
	}

	welcome(name: string): string {
		return `Welcome ${name}`;
	}
}
