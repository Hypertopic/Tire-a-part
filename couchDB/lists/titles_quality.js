function(head, req) {  
  // !code localization.js
  // !code lib/string.js
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
  for each (p in this.settings.programs) {
    programs.push({key: p.normalize(), value: p});
  }
  return Mustache.to_html(this.templates.titles_quality, {
    query: req.query,
    i18n: localized(),
    groups: this.settings.groups,
    programs: programs,
    references: references
  }, this.templates.partials);
}
