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
  const typeLabels = localized().i_aeresTypeValues;
  var types = [];
  var lastType = null;
  var typeData = null;
  while (row = getRow()) {
    var o = row.doc;
    if (!req.query.since || req.query.since<=o['DC.issued']) {
      if (o.aeresType != lastType) {
        if (lastType) {
          types.push(typeData);
        }
        lastType = o.aeresType;
        typeData = {
          label: typeLabels[typeLabels.length-1-row.key[1]].label,
          papers: []
        };
      }
      typeData.papers.push({
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
  if (typeData) {
    types.push(typeData);
  }
  return Mustache.to_html(templates["activity_" + contentType], {
    query: req.query,
    i18n: localized(),
    types: types
  });
}
