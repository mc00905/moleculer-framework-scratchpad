import TestProvider from "../../../providers/greeter.provider";

describe("Test 'greeter' service", () => {
    const provider = new TestProvider();
	describe("Test helloInternal()", () => {
		test("should return with 'Hello!'", () => {
			const res = provider.helloInternal();
			expect(res).toBe("Hello!");
		});
	});

    describe("Test welcomeInternal()", () => {
		test("should return with 'Welcome Matt'", () => {
			const res = provider.welcomeInternal('Matt');
			expect(res).toBe("Welcome Matt");
		});
	});
});
