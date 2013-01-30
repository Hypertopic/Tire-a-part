function(head, req) {
  // !json templates.activity_html
  // !json templates.activity_plain
  // !code lib/mustache.js
  // !code localization.js

  var contentType;
  var headers = {};
  if (req.query.csv=="") {
    contentType = "plain";
    headers["Content-Disposition"] = "attachment;filename=activity.csv";
  } else {
    contentType = "html";
  }
  headers["Content-Type"] = "text/" + contentType + ";charset=utf-8";
  start({headers: headers});
  const order = {
    ACL: 0, ACLN: 1, ASCL: 2, BRE: 3, INV: 4, ACTI: 5, ACTN: 6,
    COM: 7, AFF: 8, OS: 9, OV: 10, DO:11 , TH:12, AP: 13
  };
  var types = [];
  for each (var t in localized().i_aeresTypeValues) {
    types.push({
      label: t.label,
      papers:[]
    });
  }
  while (row = getRow()) {
    var o = row.doc;
    if (!req.query.by || o['DC.creator'].indexOf(req.query.by)>=0) {
      types[order[o.aeresType]].papers.push({
        _id: o._id,
        creators: o["DC.creator"],
        title: o["DC.title"],
        ispartof: o["DC.relation.ispartof"],
        volume: o["DC.citation.volume"],
        issue: o["DC.citation.issue"],
        spage: o["DC.citation.spage"],
        epage: o["DC.citation.epage"],
        publisher: o["DC.publisher"],
        issued: o["DC.issued"],
        indexed: o.indexed,
        aeresType: o.aeresType
      });
    }
  }
  types = types.filter(function(t) {
    return t.papers.length>0;
  });
  return Mustache.to_html(templates["activity_" + contentType], {
    query: req.query,
    i18n: localized(),
    types: types
  });
}
