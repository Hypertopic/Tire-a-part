function (o) {
  for each (c in o.creator) {
    emit(["creator", c]);
  }
  emit(["issued", o.issued]);
}
