import TestProvider from "../../../providers/greeter.provider";

describe("Test 'greeter' service", () => {
    const provider = new TestProvider();
	describe("Test helloInternal()", () => {
		test("should return with 'Hello!'", async () => {
			const res = await provider.helloInternal(false);
			expect(res.isOk()).toBe(true);
			if (res.isOk()){
				expect(res.value).toBeTruthy();
			}
		});

		test("should return an error'", async () => {
			const res = await provider.helloInternal(true);
			expect(res.isErr()).toBe(true);
			if (res.isErr()){
				expect(res.error).toBeTruthy();
				expect(res.error.code).toBe('GreeterRepository.pseudoFetchResourceBadRequest');
			}		
		});
	});
});
