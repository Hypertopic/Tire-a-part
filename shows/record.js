function(o, req) {
  // !json templates.record_html
  // !json templates.record_bibtex
  // !code lib/mustache.js
  // !code localization.js
  

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
  if (req.query.bibtex=="") {
    return {
      headers: {
        "Content-Type": "application/x-bibtex",
        "Content-Disposition": "attachment;filename=record.bib"
      }, 
      body: Mustache.to_html(templates.record_bibtex, {
        type: (o.ispartof)?"inproceedings":(o.publisher)?"book":"misc",
        id: o._id,
        abstract: o.abstract,
        publisher: o["DC.publisher"],
        booktitle: o["DC.relation.ispartof"],
        author: o["DC.creator"].join(" and "),
        title: o["DC.title"],
        year: o["DC.issued"]
      })
    };
  }
  return Mustache.to_html(templates.record_html, {
    _rev: o._rev,
    url: o.url,
    abstract: o.abstract,
    aeresType: o.aeresType,
    indexed: JSON.stringify(o.indexed),
    creators: o["DC.creator"],
    title: o["DC.title"],
    ispartof: o["DC.relation.ispartof"],
    publisher: o["DC.publisher"],
    issued: o["DC.issued"],
    formatted_creators: o["DC.creator"].join(", "),
    identifiers: getIdentifiers(req.headers.Host, req.path, o._attachments),
    formatted_attachments: formatAttachments(o._attachments, o._id),
    raw_attachments: (o._attachments)?JSON.stringify(o._attachments):"{}",
    i18n: localized()
  });
}
