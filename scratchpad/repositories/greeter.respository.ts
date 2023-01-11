import { errAsync, okAsync, ResultAsync } from "neverthrow";
import {
	BadRequestError,
} from "../libs/errors/ErrorLibrary";

export class GreeterRepository {
	async pseudoFetchResource(fail: boolean): Promise<ResultAsync<string, BadRequestError>> {
        switch (fail) {
            case true:
                return errAsync(
                    new BadRequestError(
                        "GreeterRepository.pseudoFetchResourceBadRequest",
                        "Testing error bubbling",
                        {
                            field1: "String",
                            field2: 1234,
                        },
                    ),
                );
            case false:
                return okAsync("Hello");
        }
	}
}
