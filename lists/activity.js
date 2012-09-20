function(head, req) {
  // !json templates.activity_html
  // !json templates.activity_plain
  // !code lib/mustache.js
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
    COM: 7, AFF: 8, OS: 9, OV: 10, DO:11 , AP: 12
  };
  var data = {
    query: req.query,
    types:[
      {label: "Articles dans des revues répertoriées dans les bases de données internationales", papers:[]},
      {label: "Articles dans des revues non répertoriées", papers:[]},
      {label: "Articles dans des revues sans comité de lecture", papers:[]},
      {label: "Brevets", papers:[]},
      {label: "Conférences données à l'invitation du comité d'organisation dans un congrés national ou international", papers:[]},
      {label: "Communications avec actes dans un congrès international", papers:[]},
      {label: "Communications avec actes dans un congrès", papers:[]},
      {label: "Communications orales sans actes dans un congrès", papers:[]},
      {label: "Communications par affiche dans un congrès", papers:[]},
      {label: "Ouvrages scientifiques (ou chapitres de ces ouvrages)", papers:[]},
      {label: "Ouvrages de vulgarisation (ou chapitres de ces ouvrages)", papers:[]},
      {label: "Directions d'ouvrages ou de revues", papers:[]},
      {label: "Autres productions", papers:[]}
    ]
  };
  while (row = getRow()) {
    var o = row.doc;
    if (!req.query.by || o['DC.creator'].indexOf(req.query.by)>=0) {
      data.types[order[o.aeresType]].papers.push({
        _id: o._id,
        creators: o["DC.creator"],
        title: o["DC.title"],
        ispartof: o["DC.relation.ispartof"],
        publisher: o["DC.publisher"],
        issued: o["DC.issued"],
        indexed: o.indexed,
        aeresType: o.aeresType
      });
    }
  }
  data.types = data.types.filter(function(t) {
    return t.papers.length>0;
  });
  return Mustache.to_html(templates["activity_" + contentType], data);
}
