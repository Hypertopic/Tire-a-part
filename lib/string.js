String.prototype.normalize = function() {
  return this.toUpperCase()
    .replace(/[ÂÄÀ]/g, "A")
    .replace(/[ÉÊËÈ]/g, "E")
    .replace(/[ÎÏ]/g, "I")
    .replace(/[ÔÖ]/g, "O")
    .replace(/[ÛÜÙ]/g, "U")
    .replace(/Ç/g, "C")
    .replace(/Ñ/g, "N");
}

String.prototype.isNormalized = function() {
  return /^[A-Z0-9 -\.]+$/.test(this);
}

String.prototype.trimLeft = String.prototype.trimLeft || function() {
  return this.replace(/^\s+/,'');
};
