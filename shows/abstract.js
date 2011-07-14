function(o, req) {

  function sendMeta(key, value) {
    if (isArray(value)) {
      for each (v in value) {
        send('\n<meta name="' + key + '" content="' + v + '" />');
      }
    } else {
      send('\n<meta name="' + key + '" content="' + value + '" />');
    }
  }

  function sendInput(key, value, type) {
    if (!value) {
      value = '';
    }
    send('\n<input id="' + key + '" type="' + type + '" value="' + value 
      + '" size="80" />'
    );
  }

  function sendLabeledTextInput(label, key, value) {
      send('\n<tr>');
      send('<th>' + label + '</th>');
      send('<td>');
      sendInput(key, value, 'text');
      send('</td>');
      send('</tr>');
  }

  function sendOption(value, text, selectedValue) {
    send('<option ' + ((value===selectedValue)?'selected="true" ':'') 
      + 'value="' + value + '">' + text + '</option>'
    );
  }

  function sendLabeledTextArea(label, key, value) {
    send('\n<tr>');
    send('<th>Résumé</th>');
    send('\n<td>');
    if (!value) {
      value = '';
    }
    send('\n<textarea cols="80" rows="12" type="text" id="' + key + '">' + value
      + '</textarea>'
    );
    send('</td>');
    send('</tr>');
  }

  function startsWith(whole, part) {
    return whole.substring(0, part.length) === part;
  }

  send('<html>');
  send('<head>');
  send('<link rel="stylesheet" type="text/css" href="../included/main.css" />');
  for (var key in o) {
    if (startsWith(key, 'DC.')) {
      sendMeta(key, o[key]);
    }
  }
  var folder = 'http://' + req.headers.Host + '/';
  for each (f in req.path) {
    folder += f + '/';
  }
  for (var a in o._attachments) {
    sendMeta("DC.identifier", folder + a);
  }
  send('</head>');
  send('<body>');
  send('<div id="container">');
  send('<div id="header" class="menu"><a href="..">Retour</a></div>');
  send('<form id="content">');
  sendInput('_id', o._id, 'hidden');
  sendInput('_rev', o._rev, 'hidden');
  send('<table>');
  sendLabeledTextInput('Auteurs', 'DC.creator', o['DC.creator']);
  sendLabeledTextInput('Titre', 'DC.title', o['DC.title']);
  sendLabeledTextInput(
    'In', 'DC.relation.ispartof', o['DC.relation.ispartof']
  );
  sendLabeledTextInput('Éditeur', 'DC.publisher', o['DC.publisher']);
  sendLabeledTextInput('Année', 'DC.issued', o['DC.issued']);
  sendLabeledTextInput("URL chez l'éditeur", 'url', o.url);
  sendLabeledTextInput('Indexé par', 'indexed', o.indexed);
  send('\n<tr>');
  send('<th>Type (AERES)</th>');
  send('<td>');
  send('\n<select id="aeresType">');
  sendOption('ACL',"Articles dans des revues répertoriées dans les bases de données internationales", o.aeresType);
  sendOption('ACLN', "Articles dans des revues non répertoriées", o.aeresType);
  sendOption('ASCL', "Articles dans des revues sans comité de lecture", o.aeresType);
  sendOption('BRE', "Brevets", o.aeresType);
  sendOption('INV', "Conférences données à l'invitation du comité d'organisation dans un congrés national ou international", o.aeresType);
  sendOption('ACTI', "Communications avec actes dans un congrès international", o.aeresType);
  sendOption('ACTN', "Communications avec actes dans un congrès", o.aeresType);
  sendOption('COM', "Communications orales sans actes dans un congrès", o.aeresType);
  sendOption('AFF', "Communications par affiche dans un congrès", o.aeresType);
  sendOption('OS', "Ouvrages scientifiques (ou chapitres de ces ouvrages)", o.aeresType);
  sendOption('OV', "Ouvrages de vulgarisation (ou chapitres de ces ouvrages)", o.aeresType);
  sendOption('DO', "Directions d'ouvrages ou de revues", o.aeresType);
  sendOption('AP', "Autres productions", o.aeresType);
  send('</select>');
  send('</td>');
  send('</tr>');
  sendLabeledTextArea('Résumé', 'abstract', o.abstract);
  send('<tr>');
  send('<th>Tirés à part</th>');
  send('<td><ul>');
  for (a in o._attachments) {
    send('<li><a href="' + a + '">' + a + '</a> ('
      + Math.round(o._attachments[a].length/104857.6)/10 + ' Mo)</li>'
    );
  }
  send('</ul></td>');
  send('</tr>');
  send('</table>');
  send('</form>');
  send('<form id="footer" class="menu" enctype="multipart/form-data" method="post">');
  send('<input type="hidden" name="_rev" value="'+o._rev+'" />');
  send('<input id="uploader" type="file" name="_attachments" />');
  send('<button type="submit">Déposer</button>');
  send('</form>');
  send('</div>');
  send('</body>');
  send('</html>');
}

