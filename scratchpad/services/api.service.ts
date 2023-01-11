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
						use: [],
						mergeParams: true,
						authentication: false,
						authorization: "authorizeUser",
						autoAliases: false,

						aliases: {
							"GET /hello": "greeter.hello",
							"GET /welcome/:name": "greeter.welcome"
						},

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

						mappingPolicy: "restrict",

						logging: true,
					},
					{
						path: "/admin",
						whitelist: ["**"],
						use: [],
						mergeParams: true,
						authentication: false,
						authorization: "authorizeAdmin",
						autoAliases: false,

						aliases: {
							"GET /ping": "greeter.ping",
						},

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

						mappingPolicy: "restrict",

						logging: true,
					},
				],
				log4XXResponses: false,
				logRequestParams: null,
				logResponseData: null,
			},
		});
	}

	authorizeUser(ctx: Context<null, Meta>, route: Route, req: IncomingRequest) {
		const auth = req.headers.authorization;
		return ctx.call("auth.authorizeUserToken", { token: "mytoken" })
	}

	authorizeAdmin(ctx: Context<null, Meta>, route: Route, req: IncomingRequest) {
		const auth = req.headers.authorization;
		return ctx.call("auth.authorizeAdminToken", { token: "myadmintoken" })
	}
}

export default ApiService;
