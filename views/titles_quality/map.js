function(o) {
  // !code lib/string.js
  if (o['DC.issued']) {
    var title = o['DC.title'].trim().toLowerCase(),
      ispartof = o['DC.relation.ispartof'];
    emit(['', title], ispartof);
    emit([':by', title], ispartof); // workaround for a rewrite bug
    for each (var c in o['DC.creator']) {
      emit([normalize(c), title], ispartof);
    }
    for each (var a in o.affiliation) {
      emit([normalize(a), title], ispartof);
    }
  }
}
