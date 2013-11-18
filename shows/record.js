function(o, req) {
  // !json templates.record_html
  // !json templates.record_html_form
  // !json templates.record_bibtex
  // !json settings
  // !code localization.js
  var Mustache = require("lib/mustache");

  function formatAttachments(attachments, paperID) {
    var result = [];
    for (a in attachments) {
      result.push({
        name: a,
        size: Math.round(attachments[a].length/104857.6)/10,
        url: paperID+"/"+a
      });
    }
    return result;
  }

  //TODO just one identifier?
  function getIdentifiers(host, path, attachments) {
    var result = [];
    var baseUrl = 'http://' + host + '/';
    for each (f in path) {
      baseUrl += f + '/';
    }
    for (var a in attachments) {
      result.push(baseUrl + a);
    }
    return result;
  }

  if (!o["DC.creator"]) {
    o["DC.creator"] = [];
  }
  if (!o.indexed) {
    o.indexed = [];
  }
  if (!o.affiliation) {
    o.affiliation = [];
  }
  if (req.query.bibtex=="") {
    return {
      headers: {
        "Content-Type": "application/x-bibtex",
        "Content-Disposition": "attachment;filename=record.bib"
      }, 
      body: Mustache.render(templates.record_bibtex, {
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
      })
    };
  }
  var template = "record_html" + ((req.query.form=="")?"_form":"");
  return Mustache.render(templates[template], {
    id: o._id,
    _rev: o._rev,
    url: o.url,
    abstract: o.abstract,
    aeresType: o.aeresType,
    raw_indexed: o.indexed,
    indexed: JSON.stringify(o.indexed),
    affiliation: JSON.stringify(o.affiliation),
    raw_affiliation: o.affiliation.filter(function(a) {
      return settings.groups.indexOf(a)>=0 || settings.programs.indexOf(a)>=0;
    }),
    creators: o["DC.creator"],
    title: o["DC.title"],
    ispartof: o["DC.relation.ispartof"],
    volume: o["DC.citation.volume"],
    issue: o["DC.citation.issue"],
    spage: o["DC.citation.spage"],
    epage: o["DC.citation.epage"],
    publisher: o["DC.publisher"],
    issued: o["DC.issued"],
    formatted_creators: o["DC.creator"].join(", "),
    identifiers: getIdentifiers(req.headers.Host, req.path, o._attachments),
    formatted_attachments: formatAttachments(o._attachments, o._id),
    raw_attachments: (o._attachments)?JSON.stringify(o._attachments):"{}",
    has_content: o.abstract || o._attachments,
    settings: settings,
    i18n: localized()
  });
}
