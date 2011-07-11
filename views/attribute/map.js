function (o) {
  for each (c in o['DC.creator']) {
    emit(["creator", c]);
  }
  emit(["issued", o['DC.issued']]);
}
