const express = require("express");
const nunjucks = require("nunjucks");

const config = require("../config");

function runPreviewServer() {
  const app = express();

  const templatesPath = config.templatesPath;
  const previewPort = config.previewPort;

  nunjucks.configure(templatesPath, {
    autoescape: true,
    express: app,
    watch: true
  });

  function prepareTemplateContext(data) {
    const page = data.fields.reduce((result, field) => {
      return Object.assign({}, result, {
        [field.id]: field.defaultValue
      });
    }, {});

    return {
      page
    };
  }

  app.get("/", function(req, res) {
    const templateID = req.params.templateID;

    res.send(
      `You have to specify templateID in URL path: localhost:${previewPort}/templateID`
    );
  });

  app.get("/:templateID", function(req, res) {
    const templateID = req.params.templateID;

    res.render(
      `${templateID}.html`,
      prepareTemplateContext(require(`${templatesPath}/${templateID}.json`))
    );
  });

  app.listen(previewPort, function() {
    console.log(`Templates Preview mode listening on port ${previewPort}!`);
  });
}

module.exports = {
  runPreviewServer
};
