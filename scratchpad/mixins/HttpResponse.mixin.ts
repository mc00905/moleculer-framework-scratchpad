import type { Context, ServiceSchema } from "moleculer";

interface ApiMeta {
	$statusCode: number;
	$statusMessage: string;
	$location: string;
}

type PartialSchema = Partial<ServiceSchema>;

export enum ResponseLibrary {
	success = 200,
	successCreated = 201,
	successNoContent = 204,
	badRequest = 400,
	resourceNotFound = 404,
	internalServerError = 500,
}

function resolver(ctx: Context<any, ApiMeta>, status: ResponseLibrary): void {
	switch (status) {
		case ResponseLibrary.success:
			ctx.meta.$statusCode = 200;
			ctx.meta.$statusMessage = "Success";
			break;

		case ResponseLibrary.successCreated:
			ctx.meta.$statusCode = 201;
			ctx.meta.$statusMessage = "Created";
			break;

		case ResponseLibrary.successNoContent:
			ctx.meta.$statusCode = 204;
			ctx.meta.$statusMessage = "No Content";
			break;

		case ResponseLibrary.badRequest:
			ctx.meta.$statusCode = 400;
			ctx.meta.$statusMessage = "Bad Request";
			break;

		case ResponseLibrary.resourceNotFound:
			ctx.meta.$statusCode = 404;
			ctx.meta.$statusMessage = "Not Found";
			break;

		case ResponseLibrary.internalServerError:
			ctx.meta.$statusCode = 500;
			ctx.meta.$statusMessage = "Internal Server Error";
			break;
		default:
			ctx.meta.$statusCode = 500;
			ctx.meta.$statusMessage = "Internal Server Error";
			break;
	}
}

const schema: PartialSchema = {
	methods: {
		responseResolver(
			ctx: Context<object, ApiMeta>,
			status: ResponseLibrary,
		) {
			return resolver(ctx, status);
		},
	},
};

export default schema;
