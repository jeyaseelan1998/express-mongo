class SuccessResponse {
    constructor({ status = 200, message, data = {} }) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}

class FailedResponse extends SuccessResponse {
    constructor({ status = 400, message, stack, repository, url }) {
        super({ status, message });
        this.stack = stack;
        this.repository = repository;
        this.url = url;
    }

}

module.exports = { SuccessResponse, FailedResponse };