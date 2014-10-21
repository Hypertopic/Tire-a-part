function(o) {
  // !code lib/string.js
  if (o['DC.issued']) {
    var title = o['DC.title'].trimLeft().toLowerCase()
      ispartof = o['DC.relation.ispartof'];
    emit(['', title], ispartof);
    emit([':by', title], ispartof); // workaround for a rewrite bug
    for each (var c in o['DC.creator']) {
      emit([c.normalize(), title], ispartof);
    }
    for each (var a in o.affiliation) {
      emit([a.normalize(), title], ispartof);
    }
  }
}
