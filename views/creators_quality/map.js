function(o) {
  // !code lib/string.js
  for each (var author in o['DC.creator']) {
    if (author) {
      var name_parts = author.normalize().split(' '),
        firstname = name_parts.shift(),
        surname = name_parts.join(' ');
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
