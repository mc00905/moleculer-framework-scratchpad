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
        console.log("IN MICROSERVICE B");
        const { data } = ctx.params;
        console.log(`Received event from A`);
        console.log(`Data from A: ${data}`);
        const processData = `${data}-modified-by-b`
        console.log(`Saving ${processData} to database in B`);
        console.log("Emitting event createdB");
        ctx.emit("createdB", { data: processData })

    }

}

export default B;
