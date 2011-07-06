function(head, req) {
  start({"headers":{"Content-Type" : "text/html;charset=utf-8"}});
  send('<html>');
  send('<head>');
  send('<script src="script/jquery.js"></script>');
  send('<script type="text/javascript">');
  send('$(document).ready(function() {');
  send('  $.ajax({');
  send('    url: "attribute",');
  send('    type: "GET",');
  send('    dataType: "json",');
  send('    success: function(result) {');
  send('      $.each(result.rows, function(i, o) {');
  send('        $("#" + o.key[0]).append(');
  send('          "<option>" + o.key[1] + "</option>"');
  send('        );');
  send('      });');
  send('    }');
  send('  });');
  send('});');
  send('</script>');
  send('</head>');
  send('<body>');
  send('<form method="get">');
  send('<label>Publications de</label>');
  send('<select id="creator" name="by">');
  send('<option></option>');
  send('</select>');
  send('<label>depuis</label>');
  send('<select id="issued" name="since"></select>');
  send('<button type="submit">Filtrer</button>');
  send('</form>');
  var o, lastType;
  const label = {
    ACL: "Articles dans des revues répertoriées dans les bases de données internationales",
    ACLN: "Article dans des revues non répertoriées",
    ASCL: "Articles dans des revues sans comité de lecture",
    BRE: "Brevets",
    INV: "Conférences données à l'invitation du comité d'organisation dans un congrés national ou international",
    ACTI: "Communications avec actes dans un congrès international",
    ACTN: "Communications avec actes dans un congrès",
    COM: "Communications orales sans actes dans un congrès",
    AFF: "Communications par affiche dans un congrès",
    OS: "Ouvrages scientifiques (ou chapitre de ces ouvrages)",
    OV: "Ouvrages de vulgarisation (ou chapitre de ces ouvrages)",
    DO: "Directions d'ouvrages ou de revues",
    AP: "Autres productions (logiciels enregistrés, traductions, comptes rendus d'ouvrages, rapports de projets internationaux, guides techniques)"
  };
  const SINCE = (req.query.since)?req.query.since:1900;
  while (row = getRow()) {
    var o = row.doc;
    if (o.issued >= SINCE) {
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
      for each (var c in o.creator) {
        send(c + ", ");
      }
      send('<br/>');
      if (o.bibliographicCitation) {
        if (o._attachments) { // paper with attachment
          send('<a href="');
          //TODO only once
          for (a in o._attachments) {
            send(o._id + "/" + a);
          }
          send('">');
          send(o.title);
          send('</a>');
        } else { // paper without attachment
            send(o.title);
        }
        send('.<br/><i>');
        send((o.url)
          ? '<a href="' + o.url + '">' + o.bibliographicCitation + '</a>'
          : o.bibliographicCitation
        );
      } else { // book
        send('<i>');
        send((o.url)
          ? '<a href="' + o.url + '"/>' + o.title + '</a>'
          : o.title
        );
        send('.');
      }
      send('</i><br/>');
      send(o.publisher);
      send(', ');
      send(o.issued);
      send('.<br/>');
      for each (var i in o.indexed) {
        send('<img height="20" src="image/');
        send(i)
        send('.png" />');
      }
      send('</li>');
    }
  }
  send('</body>');
  send('</html>');
}
