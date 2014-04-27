function toBibtex(o) {
  // !json templates.record_bibtex
  return Mustache.render(templates.record_bibtex, {
    type: (o.ispartof)?"inproceedings":(o.publisher)?"book":"misc",
    id: o._id,
    abstract: o.abstract,
    ee: o.url,
    publisher: o["DC.publisher"],
    booktitle: o["DC.relation.ispartof"],
    volume: o["DC.citation.volume"],
    number: o["DC.citation.issue"],
    pages: o["DC.citation.spage"]+"--"+o["DC.citation.epage"],
    author: o["DC.creator"].join(" and "),
    title: o["DC.title"],
    year: o["DC.issued"]
  });
}
