import { Errors, ServiceBroker } from "moleculer";
import TestService from "../../../services/greeter.service";

describe("Test 'greeter' service", () => {
	const broker = new ServiceBroker({ logger: false });
	const service = broker.createService(TestService);
	beforeAll(() => broker.start());
	afterAll(() => broker.stop());
	// unit test function logic
	describe("Test 'greeter.hello' action", () => {
		test("should return with 'Hello Moleculer'", () => {
			// still calls original function ???
			// jest.spyOn(service.provider, "hello").mockImplementation(() => "goodbye");
			// does not call original function
			jest.spyOn(service, "hello").mockImplementation(() => "goodbye");
			const res = service.hello();
			expect(res).toBe("goodbye");
		});
	});

	describe("Test 'greeter.welcome' action", () => {
		test("should return with 'Welcome'", async () => {
			const res = await broker.call("greeter.welcome", { name: "Adam" });
			expect(res).toBe("Welcome Adam");
		});

		test("should reject an ValidationError", async () => {
			await expect(broker.call("greeter.welcome")).rejects.toThrow(Errors.ValidationError);
		});
	});
});
