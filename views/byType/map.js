function(o) {
  const order = {
    "ACL":0,
    "ACLN":1,
    "ASCL":2,
    "BRE":3,
    "INV":4,
    "ACTI":5,
    "ACTN":6,
    "COM":7,
    "AFF":8,
    "AFF":9,
    "OS":10,
    "OV":11,
    "DO":12,
    "AP":13
  };
  emit([order[o.aeresType], o.issued], null);
}
