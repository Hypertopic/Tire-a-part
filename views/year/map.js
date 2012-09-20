function(o) {
  if (o['DC.issued']) {
    emit([JSON.stringify(o['DC.issued'])]);
  }
}
