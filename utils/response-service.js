class Response_Object {
  constructor(success, data, message = null) {
    this.success = success;
    this.data = data;
    this.message = message;
  }
}

module.exports = Response_Object;
