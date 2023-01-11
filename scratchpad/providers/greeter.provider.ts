import {  errAsync, ResultAsync, okAsync } from 'neverthrow'
import { BadRequestError } from '../libs/errors/ErrorLibrary';
import { GreeterRepository } from '../repositories/greeter.respository';

export default class GreeterProvider {
	repository: GreeterRepository;
	constructor (repository?: GreeterRepository) {
		this.repository = new GreeterRepository();
	}
	async helloInternal(fail: boolean): Promise<ResultAsync<string, BadRequestError>> {
		const op = await this.repository.pseudoFetchResource(fail);
		if (op.isOk()) {
			const val = op.value;
			return okAsync(`${val}!`)
		} else {
			return errAsync(op.error) // pass up
		}
	}

	async welcomeInternal(name: string): Promise<string> {
		return `Welcome ${name}`;
	}
}
