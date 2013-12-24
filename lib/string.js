function normalize(string) {
  return string
    .replace(/[ÂÄÀ]/g, "A")
    .replace(/[âäà]/g, "a")
    .replace(/[ÉÊËÈ]/g, "E")
    .replace(/[éêëè]/g, "e")
    .replace(/[ÎÏ]/g, "I")
    .replace(/[îï]/g, "i")
    .replace(/[ÔÖ]/g, "O")
    .replace(/[ôö]/g, "o")
    .replace(/[ÛÜÙ]/g, "U")
    .replace(/[ûüù]/g, "u")
    .replace(/Ç/g, "C")
    .replace(/ç/g, "c")
    .replace(/Ñ/g, "N")
    .replace(/ñ/g, "n")
    .toUpperCase();
}

function isNormalized(string) {
  return /^[A-Z0-9 -]+$/.test(string);
}
