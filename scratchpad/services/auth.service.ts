import type { Context, ServiceBroker } from "moleculer";
import { Service } from "moleculer";
import gatewaymixin, { ResponseLibrary } from "../mixins/HttpResponse.mixin";
import jwt from 'jsonwebtoken';

type tokenParam = {
    token: string;
}

interface Meta {
	userAgent?: string | null | undefined;
	user?: object | null | undefined;
}

class AuthService extends Service {

	constructor(broker: ServiceBroker) {
		super(broker);
		this.parseServiceSchema({
			name: "auth",
			mixins: [],
			dependencies: [],
			actions: {
				authorizeUserToken: {
                    visibility: "protected",
                    params: {
                        token: {
                            type: "string",
                        }
                    },
					handler: this.authorizeUserToken,
				},
                authorizeAdminToken: {
                    visibility: "protected",
                    params: {
                        token: {
                            type: "string",
                        }
                    },
					handler: this.authorizeAdminToken,
				},
			},
		});
	}

    authorizeUserToken(ctx: Context<tokenParam, Meta >): any {
        const token = ctx.params.token;
        const secret = "notsosecret";
        const decoded: jwt.JwtPayload = jwt.verify(token, secret, { issuer: 'apigateway' }) as jwt.JwtPayload;
        const user = decoded.sub as string;
        ctx.meta.user = { name: user };
    }

    authorizeAdminToken(ctx: Context<tokenParam, Meta>): any {
        const token = ctx.params.token;
        const secret = "notsosecret";
        const decoded: jwt.JwtPayload = jwt.verify(token, secret, { issuer: 'apigateway' }) as jwt.JwtPayload;
        const user = decoded.sub;
        ctx.meta.user = { name: user };
    }

}

export default AuthService;
