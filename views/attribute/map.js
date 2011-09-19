function (o) {
  for each (c in o['DC.creator']) {
    emit(["creator", c]);
  }
  if (o['DC.issued']) {
    emit(["issued", o['DC.issued']]);
  }
}
