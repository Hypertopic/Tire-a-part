function(o) {
  // !code lib/string.js
  for each (var author in o['DC.creator']) {
    if (author) {
      var fullname = normalize(author),
        n = fullname.indexOf(" "),
        surname = fullname.slice(n+1),
        firstname = fullname.slice(0, n);
      emit(['', surname, firstname]);
      emit([':by', surname, firstname]); // workaround for a rewrite bug
      for each (var a in o.affiliation) {
        emit([normalize(a), surname, firstname]);
      }
      for each (var coauthor in o['DC.creator']) {
        emit([normalize(coauthor), surname, firstname]);
      }
    }
  }
}
