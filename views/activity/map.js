function(o) {
  // !code lib/string.js
  // !json settings.categories
  function getRank(category) {
    return settings.categories.length - settings.categories.indexOf(category) - 1;
  }
  function emitFilteredAndSorted(filter, record) {
    emit([
      filter,
      getRank(record.aeresType), record['DC.issued'], record['DC.title']
    ]);
  }
  if (o['DC.issued']) {
    emitFilteredAndSorted('', o);
    emitFilteredAndSorted(':by', o); // workaround for a rewrite bug
    for each (var creator in o['DC.creator']) {
      emitFilteredAndSorted(creator.normalize(), o);
    }
    for each (var a in o.affiliation) {
      emitFilteredAndSorted(a.normalize(), o);
    }
  }
}
