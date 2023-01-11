/* eslint-disable max-classes-per-file */
import BaseError from "./BaseError";

export enum ErrorLibrary {
    resourceNotFoundError = 'ResourceNotFound',
    genericInternalServerError = 'InternalServerError',
    badRequestError = 'BadRequest'
}

export class TaggedError extends BaseError {

    category: ErrorLibrary;

    constructor(category: ErrorLibrary, code: string, message: string, details: string | object | [] = {}) {
        super(code, message, details);
        this.category = category;
    }
}


export class GenericInternalServerError extends TaggedError {
    constructor(code: string, message = 'Something went wrong', details: string | object | [] = {}) {
        super( ErrorLibrary.genericInternalServerError, code, message, details);
    }
}

export class ResourceNotFoundError extends TaggedError {
    constructor(code: string, message = 'Resource not found', details: string | object | [] = {}) {
        super( ErrorLibrary.resourceNotFoundError, code, message, details);
    }
}

export class BadRequestError extends TaggedError {
    constructor(code: string, message = 'Bad Request', details: string | object | [] = {}) {
        super( ErrorLibrary.badRequestError, code, message, details);
    }
}