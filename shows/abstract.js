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

  function sendCheckbox(name, value, selectedValues) {
    send('\n<input type="checkbox" name="' + name + '" value="' + value + '"'
      + ((selectedValues && selectedValues.indexOf(value)!=-1)?' checked':''
      ) + ' />' + value + '&nbsp;'
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

  function toString(array) {
    var s = "";
    for each (var c in array) {
      s += c + ", ";
    }
    return s.substring(0, s.length-2);
  } 

  send('<html>');
  send('<head>');
  send('<title>Publication (notice)</title>');
  send('<link rel="stylesheet" type="text/css" href="included/main.css" />');
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
  send('<script src="script/jquery.js"></script>');
  send('<script type="text/javascript">');
  send('function save() {');
  send('  var data = {');
  send('    "_rev": $("#rev").val(),');
  send('    "DC.creator": $("#creator").val().split(", "),');
  send('    "DC.title": $("#title").val(),');
  send('    "DC.relation.ispartof": $("#ispartof").val(),');
  send('    "DC.publisher": $("#publisher").val(),');
  send('    "DC.issued": parseInt($("#issued").val()),');
  send('    "url": $("#url").val(),');
  send('    "indexed": $("input[name=\'indexed\']:checked").map(function(){');
  send('      return $(this).val();');
  send('    }).get(),');
  send('    "aeresType": $("#aeresType").val(),');
  send('    "abstract": $("#abstract").val()');
  send('  };');
  send('  $.ajax({');
  send('    url: "",');
  send('    type: "PUT",');
  send('    dataType: "json",');
  send('    contentType: "application/json",');
  send('    data: JSON.stringify(data),');
  send('    success: function(result) {');
  send('      $("#rev").val(result.rev);');
  send('    }');
  send('  });');
  send('}');
  send('</script>');
  send('</head>');
  send('<body>');
  send('<div id="container">');
  send('<div class="menu">');
  send('<a href=".">Retour</a>');
  send('<a id="help" href="https://github.com/benel/Tire-a-part/issues">?&nbsp;</a>');
  send('</div>');
  send('<form id="content">');
  send('<table>');
  sendInput('rev', o._rev, "hidden");
  sendLabeledTextInput('Auteurs', 'creator', toString(o['DC.creator']));
  sendLabeledTextInput('Titre', 'title', o['DC.title']);
  sendLabeledTextInput('In', 'ispartof', o['DC.relation.ispartof']);
  sendLabeledTextInput('Éditeur', 'publisher', o['DC.publisher']);
  sendLabeledTextInput('Année', 'issued', o['DC.issued']);
  sendLabeledTextInput("URL chez l'éditeur", 'url', o.url);
  send('\n<tr>');
  send('<th>Indexé par</th>');
  send('<td>');
  sendCheckbox('indexed', 'AERES', o.indexed);
  sendCheckbox('indexed', 'ISI', o.indexed);
  sendCheckbox('indexed', 'ACM', o.indexed);
  sendCheckbox('indexed', 'DBLP', o.indexed);
  sendCheckbox('indexed', 'INIST', o.indexed);
  send('</td>');
  send('</tr>');
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
    send('<li><a href="' + o._id + '/' + a + '">' + a + '</a> ('
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
  send('<button type="button" onclick="save()">Enregistrer</button>');
  send('</form>');
  send('</div>');
  send('</body>');
  send('</html>');
}

