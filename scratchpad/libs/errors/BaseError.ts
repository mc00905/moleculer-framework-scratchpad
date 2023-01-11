export default class BaseError extends Error {
	details: object | string | [];
	
    code: string; // unique reference for tracability

	message: string;

	constructor(
		code: string,
		message: string,
		details: object | string | [],
	) {
		super(message);
		this.details = details;
		this.code = code;
		this.message = message;
	}
}
