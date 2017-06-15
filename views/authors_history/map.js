function(o) {
  // !code lib/string.js
  if (o['DC.issued']) {
    var title = o['DC.title'].trimLeft().toLowerCase()
    var ispartof = o['DC.relation.ispartof'];
    var author = o['DC.creator'][0];
    var issued = o['DC.issued'];
    emit(['', title, author, issued], ispartof);
    emit([':by', title, author, issued], ispartof); // workaround for a rewrite bug
    for each (var c in o['DC.creator']) {
      emit([c.normalize(), title, author, issued], ispartof);
    }
    for each (var a in o.affiliation) {
      emit([a.normalize(), title, author, issued], ispartof);
    }
  }
}
