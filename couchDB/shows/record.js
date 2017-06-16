function(o, req) {
  // !code localization.js
  // !code lib/record.js
  var Mustache = require("lib/mustache");
  var settings = this.settings;

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

  function urlencode(data) {
    return data.replace(/ /g, '%20');
  }

  //TODO just one identifier?
  function getIdentifiers(host, path, attachments) {
    var result = [];
    var baseUrl = 'http://' + host + '/';
    for each (f in path) {
      baseUrl += f + '/';
    }
    for (var a in attachments) {
      result.push(baseUrl + urlencode(a));
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
      body: toBibtex(o)
    };
  }
  var template = "record_html" + ((req.query.form=="")?"_form":"");
  return Mustache.render(this.templates[template], {
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
    identifiers: getIdentifiers(req.headers.Host, [o._id], o._attachments),
    formatted_attachments: formatAttachments(o._attachments, o._id),
    raw_attachments: (o._attachments)?JSON.stringify(o._attachments):"{}",
    has_content: o.abstract || o._attachments,
    settings: settings,
    bibtexType: JSON.stringify(settings.bibtexType),
    i18n: localized()
  });
}
