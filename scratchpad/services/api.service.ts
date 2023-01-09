import type { Context, ServiceBroker } from "moleculer";
import { Service,  } from "moleculer";
import type { IncomingRequest, Route } from "moleculer-web";
import ApiGateway from "moleculer-web";

interface Meta {
	userAgent?: string | null | undefined;
	user?: object | null | undefined;
}

class ApiService extends Service {
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

						whitelist: ["greeter.*"],

						use: [],

						mergeParams: true,

						authentication: false,

						authorization: false,
						autoAliases: true,

						aliases: {},

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

						mappingPolicy: "all", // Available values: "all", "restrict"

						logging: true,
					},
				],

				log4XXResponses: false,
				logRequestParams: "info",
				logResponseData: "info",

				assets: {
					folder: "public",

					options: {},
				},
			},
		});
	}

	authenticate(ctx: Context, route: Route, req: IncomingRequest): Record<string, unknown> | null {
		// Read the token from header
		const auth = req.headers.authorization;

		if (auth && auth.startsWith("Bearer")) {
			const token = auth.slice(7);

			// Check the token. Tip: call a service which verify the token. E.g. `accounts.resolveToken`
			if (token === "123456") {
				// Returns the resolved user. It will be set to the `ctx.meta.user`
				return { id: 1, name: "John Doe" };
			}
			// Invalid token
			throw new ApiGateway.Errors.UnAuthorizedError(
				ApiGateway.Errors.ERR_INVALID_TOKEN,
				null,
			);
		} else {
			// No token. Throw an error or do nothing if anonymous access is allowed.
			// throw new E.UnAuthorizedError(E.ERR_NO_TOKEN);
			return null;
		}
	}

	authorize(ctx: Context<null, Meta>, route: Route, req: IncomingRequest): any {
		// Get the authenticated user.
		const { user } = ctx.meta;

		// It check the `auth` property in action schema.
		if (req.$action.auth === "required" && !user) {
			throw new ApiGateway.Errors.UnAuthorizedError("NO_RIGHTS", null);
		}
		return user;
	}
}

export default ApiService;
