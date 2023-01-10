import { Substitute } from '@fluffy-spoon/substitute';
import { Errors, ServiceBroker } from "moleculer";
import type GreeterProvider from "../../../providers/greeter.provider";
import TestService from "../../../services/greeter.service";

describe("Test 'greeter' service", () => {
	const broker = new ServiceBroker({ logger: false });
	broker.createService(TestService);
	beforeAll(() => broker.start());
	afterAll(() => broker.stop());
	// unit test function logic
	describe("Test 'greeter.hello' action", () => {
		test("should return with 'Hello Moleculer'", () => {
			const provider = Substitute.for<GreeterProvider>();
			provider.hello().returns('goodbye')
			const service = new TestService(broker, provider);
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
