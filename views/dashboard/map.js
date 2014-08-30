function(o) {
  // !code lib/string.js
  // !json settings.categories
  function getRank(category) {
    return settings.categories.indexOf(category) + 1;
  }
  function emitFilteredAndSorted(filter, record) {
    emit([
      filter,
      record['DC.issued'],
      getRank(record.aeresType)
    ]);
  }
  if (o['DC.issued']) {
    emitFilteredAndSorted('', o);
    emitFilteredAndSorted(':by', o); // workaround for a rewrite bug
    for each (var creator in o['DC.creator']) {
      emitFilteredAndSorted(normalize(creator), o);
    }
    for each (var a in o.affiliation) {
      emitFilteredAndSorted(normalize(a), o);
    }
  }
}
