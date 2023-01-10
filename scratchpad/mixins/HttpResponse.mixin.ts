import type { Context, ServiceSchema } from "moleculer";

interface ApiMeta {
	$statusCode: number;
	$statusMessage: string;
	$location: string;
}


type PartialSchema = Partial<ServiceSchema>;

const schema: PartialSchema = {
	methods: {
		return201(ctx: Context<object, ApiMeta>) {
			ctx.meta.$statusCode = 201;
      		ctx.meta.$statusMessage = "Created"
			return ctx;
		},
	},
};

export default schema;
