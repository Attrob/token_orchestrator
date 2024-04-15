const express = require("express");
const app = express.Router();
const core = require("../core/core");

app.route("/v1/keys")
.post(core.generate_keys)
.get(core.get_key);

app.route("/v1/keys/:id")
.head(core.get_information)
.delete(core.remove_key)
.put(core.unblock_key);

app.route("/v1/keepalive/:id")
.put(core.keep_key_alive);

module.exports = app;