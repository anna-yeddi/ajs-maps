/**
 * Method to export a set of available custom attack modes for a character.
 *
 * @param {Object} character        - a specific instance of Character class
 * @returns {Array[Object{String}]}
 */
export default function getAttackModes(character) {
  const attackModes = [];

  const allSpecials = [...character.special];

  for (const obj of allSpecials) {
    const id = obj?.id;
    const name = obj?.name;
    const icon = obj?.icon;
    let description = obj?.description;

    const isAttackMode = id && name && icon;
    if (isAttackMode) {
      if (!description) description = "Description is not available yet";
      attackModes.push({ id, name, icon, description });
    }
  }

  return attackModes;
}
