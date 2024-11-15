class ApiResponse {
    constructor(status, data, message = "OK") {

        this.status = status;
        this.success = status < 400;
        this.data = data;
        this.message = message
    }

}

export default ApiResponse