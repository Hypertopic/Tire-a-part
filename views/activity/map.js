function(o) {
  // !code lib/string.js
  // !json settings.order
  function emitFilteredAndSorted(filter, record) {
    emit([filter, settings.order[record.aeresType], record['DC.issued']]);
  }
  if (o['DC.issued']) {
    emitFilteredAndSorted('', o);
    emitFilteredAndSorted(':by', o); // workaround for a rewrite bug
    for each (var creator in o['DC.creator']) {
      emitFilteredAndSorted(toASCII(creator), o);
    }
    for each (var a in o.affiliation) {
      emitFilteredAndSorted(toASCII(a), o);
    }
  }
}
