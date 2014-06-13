function(head, req) {
  // !json templates.activity_html
  // !code localization.js
  // !code lib/string.js
  // !code lib/record.js
  // !json settings
  var Mustache = require("lib/mustache");
  const BY = req.query.by;
  const SINCE = req.query.since;

  if (BY && !isNormalized(BY)) {
    start({
      code: 302,
      headers: {Location: "?by=" + normalize(BY)}
    });
    return "Redirecting...";
  }

  if (req.query.bibtex=="") {
    start({
      headers: {
        "Content-Type": "application/x-bibtex",
        "Content-Disposition": "attachment;filename=activity"
          + (BY ? "_by_" + BY.replace(/ /g, "_") : "")
          + (SINCE ? "_since_" + SINCE : "")
          + ".bib"
      }
    });
    while (row = getRow()) {
      var o = row.doc;
      if (!SINCE || SINCE<=o['DC.issued']) {
        send(toBibtex(o));
      }
    }
    return;
  }
  start({
    headers: {"Content-Type": "text/html;charset=utf-8"}
  });
  const typeLabels = localized().i_aeresTypeValues;
  var types = [];
  var lastType = null;
  var typeData = null;
  while (row = getRow()) {
    var o = row.doc;
    if (o.aeresType && (!SINCE || SINCE<=o['DC.issued'])) {
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
  var programs = [];
  for each (p in settings.programs) {
    programs.push({key: normalize(p), value: p});
  }
  return Mustache.to_html(templates["activity_html"], {
    query: req.query,
    i18n: localized(),
    groups: settings.groups,
    programs: programs,
    types: types
  });
}
