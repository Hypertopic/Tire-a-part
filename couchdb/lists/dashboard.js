function(head, req) {
  const BY = req.query.by;
  const SINCE = req.query.since;
  start({
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment;filename=references"
        + (BY ? "_by_" + BY.replace(/ /g, "_") : "")
        + (SINCE ? "_since_" + SINCE : "")
        + ".csv"
    }
  });
  var row;
  var lastYear = null;
  var data = this.settings.categories.slice();
  data.unshift("");
  while (row = getRow()) {
    var year = row.key[1];
    if (!SINCE || SINCE<=year) {
      if (year != lastYear) {
        send(data.join(";") + "\n");
        lastYear = year;
        data = [year];
      }
      data[row.key[2]] = row.value;
    }
  }
  send(data.join(";") + "\n");
}
