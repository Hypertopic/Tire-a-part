function(o) {
  const order = {
    "ACL":13,
    "ACLN":12,
    "ASCL":11,
    "BRE":10,
    "INV":9,
    "ACTI":8,
    "ACTN":7,
    "COM":6,
    "AFF":5,
    "AFF":4,
    "OS":3,
    "OV":2,
    "DO":1,
    "AP":0
  };
  emit([order[o.aeresType], o.issued], null);
}
