function toBibtex(o) {
  // !json templates.record_bibtex
  // !json settings.bibtexType
  var data = {
    type: settings.bibtexType[o.aeresType],
    id: o._id,
    abstract: o.abstract,
    ee: o.url,
    publisher: o["DC.publisher"],
    booktitle: o["DC.relation.ispartof"],
    volume: o["DC.citation.volume"],
    number: o["DC.citation.issue"],
    pages: o["DC.citation.spage"],
    author: o["DC.creator"].join(" and "),
    title: o["DC.title"],
    year: o["DC.issued"]
  };
  if (o["DC.citation.epage"]) {
    data.pages +=  "--" + o["DC.citation.epage"];
  }
  switch (data.type) {
    case "incollection":
      if (!data.booktitle) data.type = "book";
      break;
    case "article":
      data.journal = data.booktitle;
      delete data.booktitle;
  }
  return Mustache.render(templates.record_bibtex, data);
}
