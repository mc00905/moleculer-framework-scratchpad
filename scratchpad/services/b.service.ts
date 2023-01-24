import type { Context, ServiceBroker } from "moleculer";
import { Service } from "moleculer";
import gatewaymixin, { ResponseLibrary } from "../mixins/HttpResponse.mixin";


class B extends Service {
	constructor(broker: ServiceBroker) {
		super(broker);
		this.parseServiceSchema({
			name: "b",
			mixins: [gatewaymixin],
			dependencies: [],
            events: {
                "createdA": {
                    params: {
                        data: { type: "string" }
                    },
                    handler: this.handleACreatedEvent
                }
            }
		});
	}

    public handleACreatedEvent(ctx: Context<{ data: string }>) {
        const { data } = ctx.params;
        const processData = `${data}-modified-by-b`
        this.broker.sendToRedisChannel("b.created", {
            data
        });

    }

}

export default B;
