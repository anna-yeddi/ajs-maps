import Team from "../team.js";
import Character from "../characters/character.js";

describe("Team class", () => {
  const bowman = new Character("Jane", "Bowman");
  const bowperson = new Character("Xane", "Bowman");
  const wizard = new Character("Jill", "Wizard");
  const zombie = new Character("Jack", "Zombie");

  let smallTeam, fullTeam;

  beforeEach(() => {
    smallTeam = new Team();
    smallTeam.members.add(wizard);
    fullTeam = new Team();
    fullTeam.members.add(wizard).add(bowman).add(bowperson).add(zombie);
  });

  it("is an object", () => {
    const team = new Team();

    expect(typeof team).toBe("object");
  });

  describe("add() method", () => {
    it("can add members to the team", () => {
      const team = new Team();

      expect(team.members.size).toBe(0);

      team.add(wizard);

      expect(team.members.size).toBe(1);
      expect(team).toEqual(smallTeam);

      team.add(bowman);
      team.add(bowperson);
      team.add(zombie);

      expect(team.members.size).toBe(4);
      expect(team).toEqual(fullTeam);
    });

    it("can add only unique members to the team", () => {
      const team = new Team();

      expect(team.members.size).toBe(0);

      team.add(wizard);
      expect(() => team.add(wizard)).toThrow(
        "This character is already a part of the team."
      );

      expect(team.members.size).toBe(1);
      expect(team).toEqual(smallTeam);

      team.add(bowman);
      team.add(bowperson);
      team.add(zombie);
      expect(() => team.add(bowman).toThrow(new Error()));
      expect(() => team.add(bowperson).toThrow(new Error()));
      expect(() => team.add(zombie).toThrow(new Error()));

      expect(team.members.size).toBe(4);
      expect(team).toEqual(fullTeam);
    });

    it("would not overwrite previous members of the team", () => {
      const team = new Team();

      team.add(wizard);

      expect(team.members.size).toBe(1);
      expect(team).toEqual(smallTeam);

      team.add(bowman);
      team.add(bowperson);
      team.add(zombie);

      expect(team.members.size).toBe(4);
      expect(team.members.has(wizard)).toBeTruthy();
      expect(team).toEqual(fullTeam);
    });

    it("would not add a non-Character member to the team", () => {
      const team = new Team();

      team.add({ foo: "bar" });

      expect(team.members.size).toBe(0);
    });
  });

  describe("addAll() method", () => {
    it("can add multiple members to the team", () => {
      const team = new Team();

      expect(team.members.size).toBe(0);

      team.addAll(wizard, bowman, bowperson, zombie);

      expect(team.members.size).toBe(4);
      expect(team).toEqual(fullTeam);
    });

    it("can add only one member to the team", () => {
      const team = new Team();

      team.addAll(wizard);

      expect(team.members.size).toBe(1);
      expect(team).toEqual(smallTeam);
    });

    it("would not overwrite previous members of the team", () => {
      const team = new Team();

      team.addAll(wizard);

      expect(team.members.size).toBe(1);
      expect(team).toEqual(smallTeam);

      team.addAll(bowman, bowperson, zombie);

      expect(team.members.size).toBe(4);
      expect(team).toEqual(fullTeam);
    });

    it("would not add a non-Character members to the team", () => {
      const team = new Team();

      expect(team.members.size).toBe(0);

      team.addAll(wizard, { foo: "bar" }, bowman, bowperson, zombie);

      expect(team.members.size).toBe(4);
      expect(team).toEqual(fullTeam);
    });
  });

  describe("toArray() method", () => {
    it("creates an array from the Set", () => {
      const team = new Team();
      team.add(wizard);

      const expectedSmallArr = [wizard];
      const expectedFullArr = [wizard, bowman, bowperson, zombie];

      const arr = team.toArray();

      expect(typeof arr).toBe("object");
      expect(arr.length).toBe(1);
      expect(arr[0]).toEqual(wizard);
      expect(arr).toEqual(expectedSmallArr);

      team.addAll(bowman, bowperson, zombie);
      const fullArr = team.toArray();

      expect(team.members.size).toBe(4);
      expect(fullArr.length).toBe(4);
      expect(fullArr[0]).toEqual(wizard);
      expect(fullArr[1]).toEqual(bowman);
      expect(fullArr[2]).toEqual(bowperson);
      expect(fullArr[3]).toEqual(zombie);
      expect(fullArr).toEqual(expectedFullArr);
    });
  });
});
