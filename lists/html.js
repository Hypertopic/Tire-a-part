function(head, req) {

  function sendTitle(paper) {
    send('<a href="' + paper._id + '/abstract">' + paper['DC.title'] + '</a>');
  }

  start({"headers":{"Content-Type" : "text/html;charset=utf-8"}});
  send('<html>');
  send('<head>');
  send('<link rel="stylesheet" type="text/css" href="included/main.css" />');
  send('<script src="script/jquery.js"></script>');
  send('<script type="text/javascript">');
  send('$(document).ready(function() {');
  send('  $.ajax({');
  send('    url: "attribute",');
  send('    type: "GET",');
  send('    dataType: "json",');
  send('    success: function(result) {');
  send('      $.each(result.rows, function(i, o) {');
  send('        if (o.key[0]=="issued" || o.value>1) {');
  send('          $("#" + o.key[0]).append(');
  send('            "<option>" + o.key[1] + "</option>"');
  send('          );');
  send('        }');
  send('      });');
  send('    }');
  send('  });');
  send('});');
  send('</script>');
  send('</head>');
  send('<body>');
  send('<div id="container">');
  send('<form id="header" class="menu" method="get">');
  send('<label>Publications de</label>&nbsp;');
  send('<select id="creator" name="by">');
  send('<option value="">tous</option>');
  send('</select>&nbsp;');
  send('<label>depuis</label>&nbsp;');
  send('<select id="issued" name="since"></select>&nbsp;');
  send('<button type="submit">Filtrer</button>');
  send('</form>');
  send('<div id="content">');
  var o, lastType;
  const label = {
    ACL: "Articles dans des revues répertoriées dans les bases de données internationales",
    ACLN: "Articles dans des revues non répertoriées",
    ASCL: "Articles dans des revues sans comité de lecture",
    BRE: "Brevets",
    INV: "Conférences données à l'invitation du comité d'organisation dans un congrés national ou international",
    ACTI: "Communications avec actes dans un congrès international",
    ACTN: "Communications avec actes dans un congrès",
    COM: "Communications orales sans actes dans un congrès",
    AFF: "Communications par affiche dans un congrès",
    OS: "Ouvrages scientifiques (ou chapitres de ces ouvrages)",
    OV: "Ouvrages de vulgarisation (ou chapitres de ces ouvrages)",
    DO: "Directions d'ouvrages ou de revues",
    AP: "Autres productions"
  };
  const SINCE = (req.query.since)?req.query.since:1900;
  while (row = getRow()) {
    var o = row.doc;
    if (o['DC.issued'] >= SINCE && (
      !req.query.by || o['DC.creator'].indexOf(req.query.by)>=0
    )) {
      if (o.aeresType!=lastType) {
        if (lastType) {
          send('</ol>');
        }
        send('<h1>');
        send(label[o.aeresType]);
        send('</h1>');
        send('<ol>');
        lastType = o.aeresType;
      }
      send('<li>');
      for each (var c in o['DC.creator']) {
        send(c + ", ");
      }
      send('<br/>');
      if (o['DC.relation.ispartof']) { // paper
        sendTitle(o);
        send('.<br/><i>');
        send(o['DC.relation.ispartof']);
      } else { // book
        send('<i>');
        sendTitle(o);
        send('.');
      }
      send('</i><br/>');
      if (o['DC.publisher']) {
        send(o['DC.publisher'] + ', ');
      }
      send(o['DC.issued']);
      send('.<br/>');
      for each (var i in o.indexed) {
        send('<img height="20" src="included/');
        send(i)
        send('.png" />');
      }
      send('</li>');
    }
  }
  send('</div>');
  send('<div id="footer" class="menu">');
  send('</div>');
  send('</div>');
  send('</body>');
  send('</html>');
}
