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
            channels: {
                "b.created": {
                    deadLettering: {
                        enabled: true,
                        queueName: "DEAD_LETTER"
                    },
                    maxRetries: 0,
                    handler(payload: any) {
                        if (payload.data === "fail") {
                            throw new Error("DLQ");
                        } else {
                            console.log("success: ", payload.data)
                        }
                    }
                },

                "DEAD_LETTER": {
                    handler(payload: any) {
                        console.log("dlq: ", payload)
                    }
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
        ctx.emit("createdA", { data })
        return { str: "done" }
    }

    public handleBCreatedEvent(ctx: Context<{ data: string }>) {
        console.log("IN MICROSERVICE A");
        const { data } = ctx.params;
        console.log(`Received event from B`);
        console.log(`Data from B: ${data}`)

    }

}

export default A;
