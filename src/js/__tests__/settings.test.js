import Settings from "../settings.js";

describe("Settings", () => {
  test.each([
    { pref: "default", type: "object", size: 3 },
    { pref: "user", type: "object", size: 0 },
    { pref: "theme", type: "object", size: 4 },
    { pref: "music", type: "object", size: 5 },
    { pref: "difficulty", type: "object", size: 4 },
  ])("creates an object with default settings: %s", ({ pref, type, size }) => {
    const prefs = new Settings();

    expect(typeof prefs[pref]).toBe(type);
    expect(prefs[pref].size).toBe(size);
  });

  describe("setUserPref()", () => {
    it("allows a user to customize their settings", () => {
      const prefs = new Settings();

      expect(prefs.user.size).toBe(0);

      prefs.setUserPref("theme", "gray");

      expect(prefs.user.size).toBe(1);
      expect(prefs.user.get("theme")).toBe("gray");
    });

    it("does not overwrite default settings", () => {
      const prefs = new Settings();

      prefs.setUserPref("theme", "light");

      expect(prefs.user.get("theme")).toBe("light");
      expect(prefs.default.get("theme")).toBe("dark");

      expect(() => {
        prefs.setUserPref("music", "light");
      }).toThrow();
    });

    it("does not store other settings that were not customized by the user", () => {
      const prefs = new Settings();
      const expectedHCM = new Map([["theme", "high-contrast"]]);

      prefs.setUserPref("theme", "high-contrast");

      expect(prefs.user).toEqual(expectedHCM);
      expect(prefs.default.get("theme")).toBe("dark");
    });

    describe("checks the type of data provided by a user", () => {
      const prefs = new Settings();

      test.each([
        ["theme", "trance"],
        ["theme", "foo"],
        ["theme", 101],
        ["theme-bar", null],
        ["music", "easy"],
        ["music", "foo"],
        ["music", 101],
        ["music-bar", null],
        ["difficulty", "dark"],
        ["difficulty", "foo"],
        ["difficulty", 101],
        ["difficulty-bar", null],
        ["foo", "bar"],
      ])("%s", ({ pref, val }) => {
        expect(() => {
          prefs.setUserPref(pref, val);
        }).toThrow();
      });
    });
  });

  describe("get()", () => {
    it("returns a Map with the full set of user prefs: theme", () => {
      const prefs = new Settings();
      const defaultPrefs = new Map([
        ["theme", "dark"],
        ["music", "trance"],
        ["difficulty", "easy"],
      ]);
      const customThemePrefs = new Map([
        ["theme", "high-contrast"],
        ["music", "trance"],
        ["difficulty", "easy"],
      ]);

      expect(prefs.get()).toEqual(defaultPrefs);

      prefs.setUserPref("theme", "high-contrast");
      expect(prefs.get()).toEqual(customThemePrefs);
    });

    it("returns a Map with the full set of user prefs: music", () => {
      const prefs = new Settings();
      const defaultPrefs = new Map([
        ["theme", "dark"],
        ["music", "trance"],
        ["difficulty", "easy"],
      ]);
      const customMusicPrefs = new Map([
        ["theme", "dark"],
        ["music", "off"],
        ["difficulty", "easy"],
      ]);

      expect(prefs.get()).toEqual(defaultPrefs);

      prefs.setUserPref("music", "off");
      expect(prefs.get()).toEqual(customMusicPrefs);
    });

    it("returns a Map with the full set of user prefs: difficulty", () => {
      const prefs = new Settings();
      const defaultPrefs = new Map([
        ["theme", "dark"],
        ["music", "trance"],
        ["difficulty", "easy"],
      ]);
      const customDifficultyPrefs = new Map([
        ["theme", "dark"],
        ["music", "trance"],
        ["difficulty", "nightmare"],
      ]);

      expect(prefs.get()).toEqual(defaultPrefs);

      prefs.setUserPref("difficulty", "nightmare");
      expect(prefs.get()).toEqual(customDifficultyPrefs);
    });

    it("returns a Map with the full set of user prefs (default and customized)", () => {
      const prefs = new Settings();
      const defaultPrefs = new Map([
        ["theme", "dark"],
        ["music", "trance"],
        ["difficulty", "easy"],
      ]);
      const customPrefs = new Map([
        ["theme", "high-contrast"],
        ["music", "off"],
        ["difficulty", "nightmare"],
      ]);

      expect(prefs.get()).toEqual(defaultPrefs);

      prefs.setUserPref("theme", "high-contrast");
      prefs.setUserPref("music", "off");
      prefs.setUserPref("difficulty", "nightmare");

      expect(prefs.get()).toEqual(customPrefs);
    });
  });
});
