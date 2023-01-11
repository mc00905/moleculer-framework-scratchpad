import type { Context, ServiceBroker } from "moleculer";
import { Service } from "moleculer";
import gatewaymixin, { ResponseLibrary } from "../mixins/HttpResponse.mixin";

type tokenParam = {
    token: string;
}

class AuthService extends Service {

	constructor(broker: ServiceBroker) {
		super(broker);
		this.parseServiceSchema({
			name: "auth",
			mixins: [],
			settings: {
				defaultName: "Moleculer",
			},
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

    authorizeUserToken(ctx: Context<tokenParam>): any {
        const token = ctx.params.token;
        console.log(token)
    }

    authorizeAdminToken(ctx: Context<tokenParam>): any {
        const token = ctx.params.token;
        console.log(token)
    }

}

export default AuthService;
