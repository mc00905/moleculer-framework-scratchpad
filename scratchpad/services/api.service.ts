import type { Context, ServiceBroker } from "moleculer";
import { Service } from "moleculer";
import type { ApiSettingsSchema, IncomingRequest, Route } from "moleculer-web";
import ApiGateway from "moleculer-web";

interface Meta {
	userAgent?: string | null | undefined;
	user?: object | null | undefined;
}

class ApiService extends Service<ApiSettingsSchema> {
	constructor(broker: ServiceBroker) {
		super(broker);
		this.parseServiceSchema({
			name: "api",
			mixins: [ApiGateway],
			settings: {
				port: process.env.PORT != null ? Number(process.env.PORT) : 3000,
				ip: "0.0.0.0",
				use: [],

				routes: [
					{
						path: "/api",

						whitelist: ["**"],

						// Route-level Express middlewares. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Middlewares
						use: [],

						// Enable/disable parameter merging method. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Disable-merging
						mergeParams: true,

						// Enable authentication. Implement the logic into `authenticate` method. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Authentication
						authentication: true,

						// Enable authorization. Implement the logic into `authorize` method. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Authorization
						authorization: true,

						// The auto-alias feature allows you to declare your route alias directly in your services.
						// The gateway will dynamically build the full routes from service schema.
						autoAliases: true,

						aliases: {},

						// Calling options. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Calling-options
						callingOptions: {},

						bodyParsers: {
							json: {
								strict: false,
								limit: "1MB",
							},
							urlencoded: {
								extended: true,
								limit: "1MB",
							},
						},

						// Mapping policy setting. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Mapping-policy
						mappingPolicy: "all", // Available values: "all", "restrict"

						// Enable/disable logging
						logging: true,
					},
				],

				// Do not log client side errors (does not log an error response when the error.code is 400<=X<500)
				log4XXResponses: false,
				// Logging the request parameters. Set to any log level to enable it. E.g. "info"
				logRequestParams: null,
				// Logging the response data. Set to any log level to enable it. E.g. "info"
				logResponseData: null,

				// Serve assets from "public" folder. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Serve-static-files
				assets: {
					folder: "public",

					// Options to `server-static` module
					options: {},
				},
			},
		});
	}

	authenticate(
		ctx: Context,
		route: Route,
		req: IncomingRequest,
	): Record<string, unknown> | null {
		// Returns the resolved user. It will be set to the `ctx.meta.user`
		return { id: 1, name: "John Doe", role: "Admin" };

	}

	authorize(ctx: Context<null, Meta>, route: Route, req: IncomingRequest): void {
		// Get the authenticated user.
		const { user } = ctx.meta;
	}
}

export default ApiService;
