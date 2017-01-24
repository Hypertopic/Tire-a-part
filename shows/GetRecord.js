function(o, req) {
  var Mustache = require("lib/mustache");
  return Mustache.render(this.templates.GetRecord, {
    id: o._id,
    rev: o._rev,
    citation_epage: o['DC.citation.epage'],
    citation_issue: o['DC.citation.issue'],
    citation_spage: o['DC.citation.spage'],
    citation_volume: o['DC.citation.volume'],
    description_abstract: o['DC.description.abstract'],
    creator: o['DC.creator'],
    issued: o['DC.issued'],
    publisher: o['DC.publisher'],
    relation_ispartof: (o['DC.relation.ispartof']!='')?o['DC.relation.ispartof']:null,
    title: o['DC.title'],
    affiliation: o.affiliation,
    timestamp: o['timestamp']||"2016-09-01T00:00:00.000Z"
  });

}