import type { Context, ServiceBroker } from "moleculer";
import { Service } from "moleculer";
import gatewaymixin from "../mixins/HttpResponse.mixin";
import GreeterProvider from "../providers/greeter.provider";

export interface ActionHelloParams {
	name: string;
}

class GreeterService extends Service {
	private provider: GreeterProvider;

	constructor(broker: ServiceBroker, provider: GreeterProvider = new GreeterProvider()) {
		super(broker);
		this.provider = provider;
		this.parseServiceSchema({
			name: "greeter",
			mixins: [gatewaymixin],
			settings: {
				defaultName: "Moleculer",
			},
			dependencies: [],
			actions: {
				hello: {
					rest: {
						method: "GET",
						path: "/hello",
					},
					handler: this.hello,
				},

				welcome: {
					rest: "GET /welcome/:name",
					params: {
						name: "string",
					},
					handler: this.welcome,
				},
			},
			
			started: this.started,
		});
	}

	hello(): string {
		return this.provider.helloInternal();
	}

	welcome(ctx: Context<ActionHelloParams>): string {
		const { name } = ctx.params;
		// override response with custom mixin
		this.return201(ctx)
		return this.provider.welcomeInternal(name);
	}

	localFunc(): string {
		return "I don't really do anything";
	}

	// Lifecylce
	started(): void {
		this.logger.info("greeter.service.started()");
	}
}

export default GreeterService;
