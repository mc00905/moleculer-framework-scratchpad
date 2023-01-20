import type { Context, ServiceBroker } from "moleculer";
import { Service } from "moleculer";
import gatewaymixin, { ResponseLibrary } from "../mixins/HttpResponse.mixin";


class A extends Service {
	constructor(broker: ServiceBroker) {
		super(broker);
		this.parseServiceSchema({
			name: "a",
			mixins: [gatewaymixin],
			dependencies: [],
			actions: {
                create: {
					params: {
						data: { type: "string" }
					},
					handler: this.createA,
				},
			},
            events: {
                "createdB": {
                    params: {
                        data: { type: "string" }
                    },
                    handler: this.handleBCreatedEvent
                }
            }
		});
	}

    public createA(ctx: Context<{ data: string }, { metaDataStr: string }>) {
        const { data } = ctx.params;
        const { metaDataStr } = ctx.meta;
        console.log("IN MICROSERVICE A");
        console.log(`Saving ${data} to database in A`);
        console.log("Emitting event createdA");
        ctx.emit("createdA", { data })
    }

    public handleBCreatedEvent(ctx: Context<{ data: string }>) {
        console.log("IN MICROSERVICE A");
        const { data } = ctx.params;
        console.log(`Received event from B`);
        console.log(`Data from B: ${data}`)

    }

}

export default A;
