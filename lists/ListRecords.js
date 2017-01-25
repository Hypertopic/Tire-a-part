function(head, req) { 
  var row = getRow();
  var publication = [];
  var Mustache = require("lib/mustache");
    if (!row){
        return 'no data'
    }
    while(row=getRow()){
      var o = row.value;
        publication.push({
            id: o.id,
            rev: o.rev,
            citation_epage: o.citation_epage,
            citation_issue: o.citation_issue,
            citation_spage: o.citation_spage,
            citation_volume: o.citation_volume,
            description_abstract: o.description_abstract,
            creator: o.creator,
            issued: o.issued,
            publisher: o.publisher,
            relation_ispartof: (o.relation_ispartof!='')?o.relation_ispartof:null,
            title: o.title,
            affiliation: o.affiliation,
            timestamp: o.timestamp||"2016-09-01T00:00:00.000Z"
        });
    }
    var publications = {
      "publication" : publication
    }
    return Mustache.render(this.templates.ListRecords, publications);
}