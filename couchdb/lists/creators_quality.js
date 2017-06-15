function(head, req) {  
  // !code localization.js
  // !code lib/string.js
  var Mustache = require("lib/mustache");
  start({
    headers: {"Content-Type": "text/html;charset=utf-8"}
  });
  var creators =[];
  var row;
  while (row = getRow()) {
    creators.push({
      surname: row.key[1],
      firstname: row.key[2],
      count: row.value
    });
  }
  var programs = [];
  for each (p in this.settings.programs) {
    programs.push({key: p.normalize(), value: p});
  }
  return Mustache.to_html(this.templates.creators_quality, {
    query: req.query,
    i18n: localized(),
    groups: this.settings.groups,
    programs: programs,
    creators: creators
  }, this.templates.partials);
}
