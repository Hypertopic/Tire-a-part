function normalize(string) {
  return string.toUpperCase()
    .replace(/[ÂÄÀ]/g, "A")
    .replace(/[ÉÊËÈ]/g, "E")
    .replace(/[ÎÏ]/g, "I")
    .replace(/[ÔÖ]/g, "O")
    .replace(/[ÛÜÙ]/g, "U")
    .replace(/Ç/g, "C")
    .replace(/Ñ/g, "N");
}

function isNormalized(string) {
  return /^[A-Z0-9 -\.]+$/.test(string);
}

String.prototype.trimLeft = String.prototype.trimLeft || function() {
  return this.replace(/^\s+/,'');
};
