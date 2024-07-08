import ErrorRepository from "../errorRepository.js";

describe("ErrorRepository", () => {
  it("creates an object with preset errors", () => {
    const repo = new ErrorRepository();
    const errors = repo.errors;

    expect(errors.size).toBeTruthy();
    expect(typeof repo).toBe("object");
    expect(typeof errors).toBe("object");

    // Check only the main title of the error to allow for the message body
    // to be updated by the Content team without updating these tests:
    const err500 = errors.get(500).split(":")[0];
    const err600 = errors.get(600).split(":")[0];

    expect(err500).toBe("Server Error");
    expect(err600).toBe("Network Error");
  });

  describe("_addNewError()", () => {
    it("allows to add new errors", () => {
      const repo = new ErrorRepository();
      const errors = repo.errors;
      const numOfErrorsOnInit = errors.size;

      repo._addNewError(777, "Test Error");

      expect(errors.size).toBe(numOfErrorsOnInit + 1);

      expect(errors.get(777)).toBe("Test Error");
    });

    it("checks the input data for new errors", () => {
      const repo = new ErrorRepository();

      expect(() => {
        repo._addNewError("777", "Test Error");
      }).toThrow();
      expect(() => {
        repo._addNewError(777, 777);
      }).toThrow();
      expect(() => {
        repo._addNewError(true, false);
      }).toThrow();
    });
  });

  describe("translate()", () => {
    it("translates from an error code to a human-readable error description", () => {
      const repo = new ErrorRepository();

      // Check only the main title of the error to allow for the message body
      // to be updated by the Content team without updating these tests:
      const err500 = repo.translate(500).split(":")[0];
      const err600 = repo.translate(600).split(":")[0];

      expect(err500).toBe("Server Error");
      expect(err600).toBe("Network Error");
    });

    it("checks the input data", () => {
      const repo = new ErrorRepository();

      expect(() => {
        repo.translate("500");
      }).toThrow();
      expect(() => {
        repo.translate(NaN);
      }).toThrow();
      expect(() => {
        repo.translate(true);
      }).toThrow();
      expect(() => {
        repo.translate(777);
      }).toThrow();
    });
  });
});
