export default class Settings {
  constructor() {
    this.default = new Map([
      ["theme", "dark"],
      ["music", "trance"],
      ["difficulty", "easy"],
    ]);

    this.user = new Map();

    this.theme = new Set(["dark", "light", "gray", "high-contrast"]);
    this.music = new Set(["trance", "pop", "rock", "chillout", "off"]);
    this.difficulty = new Set(["easy", "normal", "hard", "nightmare"]);
  }

  /**
   * Tracks user-specific preferences for the Settings UI.
   *
   * @param {String} pref  - Setting type to customize
   * @param {String} value - Setting value
   */
  setUserPref(pref, value) {
    if (typeof pref === "string" && typeof value === "string") {
      if (this.default.has(pref) && this[pref].has(value)) {
        this.user.set(pref, value);
      } else {
        throw new Error("Unknown type of a setting and/or its value");
      }
    } else {
      throw new Error("Unknown type(s) of settings data");
    }
  }

  get() {
    const settings = this.user;

    [...this.default.keys()].forEach((pref) => {
      if (!settings.has(pref)) {
        settings.set(pref, this.default.get(pref));
      }
    });

    return settings;
  }
}
