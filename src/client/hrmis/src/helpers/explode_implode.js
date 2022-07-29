/**
 *
 * @param {string} divider - divider symbol
 * @param {array} array -
 * @returns - a string
 */
export const implodeArray = (divider, array) => {
  let ITEM_STRING = "";

  if (array?.length > 0) {
    array?.forEach((item) => {
      ITEM_STRING = ITEM_STRING + item + divider;
    });
  }

  return ITEM_STRING;
};

export const explodeArray = (divider, value) => {
  return value.split(divider);
};
