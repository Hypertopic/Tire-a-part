function(o) {
  // !code lib/string.js
  for each (var author in o['DC.creator']) {
    if (author) {
      var fullname = author.normalize(),
        n = fullname.indexOf(" "),
        surname = fullname.slice(n+1),
        firstname = fullname.slice(0, n);
      emit(['', surname, firstname]);
      emit([':by', surname, firstname]); // workaround for a rewrite bug
      for each (var a in o.affiliation) {
        emit([a.normalize(), surname, firstname]);
      }
      for each (var coauthor in o['DC.creator']) {
        emit([coauthor.normalize(), surname, firstname]);
      }
    }
  }
}
