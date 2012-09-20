function(o, req) {
  // !json templates.abstract
  // !code lib/mustache.js

  function formatCreators(creators) {
    var s = "";
    for each (var c in creators) {
      s += c + ", ";
    }
    return s.substring(0, s.length-2);
  } 

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

  var data = {
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
    formatted_creators: formatCreators(o["DC.creator"]),
    identifiers: getIdentifiers(req.headers.Host, req.path, o._attachments),
    formatted_attachments: formatAttachments(o._attachments, o._id),
    raw_attachments: (o._attachments)?JSON.stringify(o._attachments):"{}"
  }
  return Mustache.to_html(templates.abstract, data);  
}
