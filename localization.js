// !json i18n 
    
function localized() {
  var available = "en";
  for each (var l in req.headers["Accept-Language"].split(",")) {
    var preferred = l.substring(0,2);
    if (i18n.hasOwnProperty(preferred)) {
      available = preferred;
      break;
    }
  }
  return i18n[available];
}

