import type { Context, ServiceBroker } from "moleculer";
import { Service } from "moleculer";
import gatewaymixin, { ResponseLibrary } from "../mixins/HttpResponse.mixin";
import GreeterProvider from "../providers/greeter.provider";

export interface ActionHelloParams {
	name: string;
}

export interface MessageBody {
	message: string;
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

	hello(ctx: Context): MessageBody {
		const msg = this.provider.helloInternal();
		const body = { message: msg };
		this.responseResolver(ctx, ResponseLibrary.success);
		return body;
	}

	welcome(ctx: Context<ActionHelloParams>): MessageBody {
		const { name } = ctx.params;
		const msg = this.provider.welcomeInternal(name);
		const body = { message: msg };
		this.responseResolver(ctx, ResponseLibrary.success);
		return body;
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
