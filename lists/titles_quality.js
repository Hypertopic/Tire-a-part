function(head, req) {  
  // !code localization.js
  // !code lib/string.js
  // !json settings
  var Mustache = require("lib/mustache");
  start({
    headers: {"Content-Type": "text/html;charset=utf-8"}
  });
  var references =[];
  var row;
  while (row = getRow()) {
    references.push({
      title: row.key[1],
      ispartof: row.value,
      id: row.id
    });
  }
  var programs = [];
  for each (p in settings.programs) {
    programs.push({key: normalize(p), value: p});
  }
  return Mustache.to_html(this.templates.titles_quality, {
    query: req.query,
    i18n: localized(),
    groups: settings.groups,
    programs: programs,
    references: references
  }, this.templates.partials);
}
