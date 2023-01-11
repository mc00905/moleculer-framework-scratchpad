import type { Context, ServiceBroker } from "moleculer";
import { Service } from "moleculer";
import gatewaymixin, { ResponseLibrary } from "../mixins/HttpResponse.mixin";
import GreeterProvider from "../providers/greeter.provider";

export interface ActionWelcomeParams {
	name: string;
}

export interface ActionHelloParams {
	fail: string;
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

	async hello(ctx: Context<ActionHelloParams>): Promise<any> {
		const { fail } = ctx.params;
		let bool = false;
		if (fail === 'true') {
			bool = true;
		}
		const op = await this.provider.helloInternal(bool);
		return op.match(
			(message) => {
				const body = { message };
				this.responseResolver(ctx, ResponseLibrary.success);
				return body;
			},
			(e) => {
				const body = { message: e.message };
				this.responseResolver(ctx, ResponseLibrary.badRequest);
				return body;
			})
	}

	welcome(ctx: Context<ActionWelcomeParams>): MessageBody {
		const { name } = ctx.params;
		// const msg = this.provider.welcomeInternal(name);
		// const body = { message: msg };
		// this.responseResolver(ctx, ResponseLibrary.success);
		// return body;
		const msg = `Welcome ${name}`;
		return {
			message: msg,
		}
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
