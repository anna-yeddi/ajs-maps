import Character from "./characters/character.js";

/**
 * Allow a user to select a unique set of characters to play in each round.
 */
export default class Team {
  constructor() {
    this.members = new Set();
  }

  /**
   * Adds a selected Character instance to the Team.members,
   * avoiding any duplication.
   *
   * @param {Character} character
   */
  add(character) {
    if (this.members.has(character)) {
      throw new Error("This character is already a part of the team.");
    } else if (character instanceof Character) {
      this.members.add(character);
    }
  }

  /**
   * Adds all selected Character instances to the Team.members.
   *
   * @param  {...Character} characters
   */
  addAll(...characters) {
    characters.forEach((character) => {
      this.add(character);
    });
  }

  /**
   * Convert a Set of Character instances that makes a Team into an array.
   *
   * @returns {Array[Character]} teamArray
   */
  toArray() {
    const teamArray = [];
    teamArray.push(...this.members);

    return teamArray;
  }
}
