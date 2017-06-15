function (o) {
  for each (c in o['DC.creator']) {
    var i = c.indexOf(" ");
    emit(["creator", c.slice(i+1), c.slice(0,i)]);
  }
  if (o['DC.issued']) {
    emit(["issued", o['DC.issued']]);
  }
}
