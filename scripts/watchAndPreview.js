

const templatesUtils = require('./templatesUtils')
templatesUtils.buildTemplatesDist()
templatesUtils.watchTemplateChanges();

require('./previewServer').runPreviewServer();
