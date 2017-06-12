String.prototype.normalize = function() {
  return this.toUpperCase()
    .trimLeft()
    .trimRight()
    .replace(/\s+/g, " ")
    .replace(/[ÂÄÀÁÃ]/g, "A")
    .replace(/[ÉÊËÈ]/g, "E")
    .replace(/[ÎÏ]/g, "I")
    .replace(/[ÔÖÓ]/g, "O")
    .replace(/[ÛÜÙÚ]/g, "U")
    .replace(/Ý/g, "Y")
    .replace(/Ç/g, "C")
    .replace(/[ÑŃ]/g, "N");
}

String.prototype.isNormalized = function() {
  return /^[A-Z0-9 -\.]+$/.test(this);
}

String.prototype.trimLeft = String.prototype.trimLeft || function() {
  return this.replace(/^\s+/,'');
};

String.prototype.trimRight = String.prototype.trimRight || function() {
  return this.replace(/\s+$/,'');
};
