export default class GreeterProvider {
	helloInternal(): string {
		return "Hello!";
	}

	welcomeInternal(name: string): string {
		return `Welcome ${name}`;
	}
}
