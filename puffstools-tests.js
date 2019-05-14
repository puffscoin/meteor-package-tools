Tinytest.add("PuffsTools.toWei", function(test) {
  // set BTC price
  PuffsTools.ticker.update("btc", {
    $set: {
      price: "0.01230"
    }
  });

  test.equal(PuffsTools.toWei(0.025, "btc"), "2032520325203252033");
  test.equal(PuffsTools.toWei(0.02554351, "btc"), "2076708130081300813");

  // set EUR price
  PuffsTools.ticker.update("eur", {
    $set: {
      price: "3.12344"
    }
  });

  test.equal(PuffsTools.toWei(6.247, "eur"), "2000038419178854084");
  test.equal(PuffsTools.toWei(6.24688, "eur"), "2000000000000000000");
  test.equal(
    PuffsTools.toWei("3.7481279999999999042", "eur"),
    "1199999999999999969"
  );
});

Tinytest.add("PuffsTools.formatNumber", function(test) {
  test.equal(
    PuffsTools.formatNumber("1000000000000000000", "0,0.0[00]"),
    "1,000,000,000,000,000,000.0"
  );
  test.equal(
    PuffsTools.formatNumber("11234565.4565432", "0,0.0[00]"),
    "11,234,565.457"
  );
});

Tinytest.add("PuffsTools.formatBalance", function(test) {
  // default to puffs
  if (Meteor.isClient) PuffsTools.setUnit("puffs");
  test.equal(
    PuffsTools.formatBalance("1000000000000000000", "0,0.0[00] unit"),
    "1.0 puffs"
  );

  // default to finney
  if (Meteor.isClient) {
    PuffsTools.setUnit("finney");
    test.equal(
      PuffsTools.formatBalance("1000000000000000000", "0,0.0[00] unit"),
      "1,000.0 finney"
    );

    test.equal(
      PuffsTools.formatBalance("100000000000000000", "0,0.0[00] UNIT"),
      "100.0 FINNEY"
    );
  }

  test.equal(
    PuffsTools.formatBalance("1000000000000000000", "0,0.0[00] unit", "gwei"),
    "1,000,000,000.0 gwei"
  );

  test.equal(
    PuffsTools.formatBalance("112345676543212345", "0,0.0[00] UNIT", "gwei"),
    "112,345,676.543 GWEI"
  );

  test.equal(
    PuffsTools.formatBalance("112345676543212345", "0,0.0[0000]", "gwei"),
    "112,345,676.54321"
  );

  // set BTC price
  PuffsTools.ticker.update("btc", {
    $set: {
      price: "0.01230"
    }
  });

  test.equal(
    PuffsTools.formatBalance("2000000000000000000", "0,0.0[00]", "btc"),
    "0.025"
  );
  test.equal(
    PuffsTools.formatBalance("2000000000000000000", "0,0.0[00] unit", "btc"),
    "0.025 btc"
  );
  test.equal(
    PuffsTools.formatBalance("2000000000000000000", "0,0.0[00]unit", "btc"),
    "0.025btc"
  );

  PuffsTools.ticker.update("btc", {
    $set: {
      price: "0.1"
    }
  });

  test.equal(
    PuffsTools.formatBalance(
      "1000000000000000000",
      "0,0.0000000000000000000",
      "btc"
    ),
    "0.1000000000000000056"
  );

  // set EUR price
  PuffsTools.ticker.update("eur", {
    $set: {
      price: "3.12344"
    }
  });

  test.equal(
    PuffsTools.formatBalance(
      "1200000000000000012",
      "0,0.0000000000000000000",
      "eur"
    ),
    "3.7481279999999999042"
  );
  test.equal(
    PuffsTools.formatBalance("2000000000000000000", "0,0.0[00]", "eur"),
    "6.247"
  );
  test.equal(
    PuffsTools.formatBalance("2000000000000000000", "0,0.0[00] UNIT", "eur"),
    "6.247 EUR"
  );
  test.equal(
    PuffsTools.formatBalance("2000000000000000000", "0,0.0[0000]UNIT", "eur"),
    "6.24688EUR"
  );

  PuffsTools.ticker.update("eur", {
    $set: {
      price: "1.00000"
    }
  });

  test.equal(
    PuffsTools.formatBalance(
      "1000000000000000000",
      "0,0.0000000000000000000",
      "eur"
    ),
    "1.0000000000000000000"
  );

  // reset
  if (Meteor.isClient) PuffsTools.setUnit("puffs");
});
