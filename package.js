Package.describe({
  name: "puffscion:tools",
  summary: "Helper functions for dapps",
  version: "1.1.0",
  git: "http://github.com/puffscoin/meteor-package-tools"
});

Package.onUse(function(api) {
  api.versionsFrom("1.0");
  api.use("underscore", ["client", "server"]);
  api.use("mongo", ["client", "server"]);
  api.use("http", ["client", "server"]);

  api.use("spacebars", "client");
  api.use("templating", "client");
  api.use("tracker", "client");

  //api.use('numeral:numeral@1.5.3', ['client', 'server']);
  api.use("3stack:bignumber@2.0.0", "client");

  api.use("puffscoin:web3@1.0.0-beta.33", ["client", "server"]);
  api.use("frozeman:persistent-minimongo@0.1.8", "client");
  api.use("frozeman:storage@0.1.8", "client");

  api.export(["PuffsTools"], ["client", "server"]);

  api.addFiles("puffstools.js", ["client", "server"]);
  api.addFiles("ticker.js", ["client", "server"]);

  api.addFiles("globalHelpers.js", "client");
});

Package.onTest(function(api) {
  api.use("tinytest");
  api.use("puffscoin:tools");
  api.addFiles("puffstools-tests.js", ["client", "server"]);
});
