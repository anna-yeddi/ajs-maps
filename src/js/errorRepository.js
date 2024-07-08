export default class ErrorRepository {
  constructor() {
    this.errors = new Map([
      [500, "Server Error: It's not you, it's us. Try again"],
      [600, "Network Error: Check your connection an try again"],
    ]);
  }

  /**
   * Private method to expand error coverage of the class.
   *
   * @param {Number} code - error code
   * @param {String} text - human-readable textual description of the error
   */
  _addNewError(code, text) {
    if (typeof code === "number" && typeof text === "string") {
      this.errors.set(code, text);
    } else {
      throw new Error("Wrong type(s) of error data.");
    }
  }

  /**
   * Method allowing to translate a machine-readable error code to a human-
   * readable string, if such error exists in the class.
   *
   * @param {Number} code  - error code
   * @returns {String} - human-readable textual description of the error
   */
  translate(code) {
    if (typeof code !== "number") {
      throw new Error("Error code should be a number.");
    }

    if (this.errors.has(code)) {
      return this.errors.get(code);
    } else {
      throw new Error("Unknown error code.");
    }
  }
}
