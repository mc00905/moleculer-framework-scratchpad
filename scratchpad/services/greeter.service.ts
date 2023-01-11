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
			dependencies: [],
			actions: {
				hello: {
					params: {
						fail: { type: "string" }
					},
					handler: this.hello,
				},

				welcome: {
					params: {
						name: { type: "string", min: 5 } // 5 chars long
					},
					handler: this.welcome,
				},
				
				ping: {
					handler: () => {
						return "pong"
					}
				}
			},

			started: this.started,
		});
	}

	async hello(ctx: Context<ActionHelloParams>): Promise<object> {
		const { fail } = ctx.params;
		let bool = false;
		if (fail === "true") bool = true;
		const op = await this.provider.helloInternal(bool);
		return op.match(
			(message) => {
				const body = { message };
				this.responseResolver(ctx, ResponseLibrary.success);
				return body;
			},
			(e) => {
				const body = { message: e.message, code: e.code };
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

	// Lifecylce
	started(): void {
		this.logger.info("greeter.service.started()");
	}
}

export default GreeterService;
