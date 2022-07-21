export const generateColor = (name) => {
  const hRange = [0, 360];
  const sRange = [35, 65];
  const lRange = [20, 50];

  const normalizeHash = (hash, min, max) => {
    return Math.floor((hash % (max - min)) + min);
  };

  const getHashOfString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    hash = Math.abs(hash);
    return hash;
  };

  const generateHSL = (xtring) => {
    const hash = getHashOfString(xtring);
    const h = normalizeHash(hash, hRange[0], hRange[1]);
    const s = normalizeHash(hash, sRange[0], sRange[1]);
    const l = normalizeHash(hash, lRange[0], lRange[1]);
    return [h, s, l];
  };

  const HSLtoString = (hsl) => {
    return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
  };

  return HSLtoString(generateHSL(name));
};
