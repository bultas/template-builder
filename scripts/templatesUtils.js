
const fs = require('fs');

const config = require('../config');
const templatesPath = config.templatesPath;
const templatesDistPath = config.templatesDistPath;


function getTemplateIDfromFilename(filename) {
    return filename.split('.')[0];
}

function checkDirOrCreate(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }
}

function saveTemplateDistDataToDistFolder(templateID, templateDistData) {

    checkDirOrCreate(templatesDistPath);

    fs.writeFileSync(
        `${templatesDistPath}/${templateID}.json`,
        JSON.stringify(templateDistData)
    );

}

function buildTemplateDistData(templateID) {

    const templateString = fs.readFileSync(`${templatesPath}/${templateID}.html`);
    const templateStringMinified = templateString.toString().replace(/\n|\r|    /g, "");

    const templateData = require(`${templatesPath}/${templateID}.json`)

    const templateDistData = Object.assign(
        {},
        templateData,
        {
            template: templateStringMinified
        }
    )

    saveTemplateDistDataToDistFolder(templateID, templateDistData);

}

function getTemplateIDsFromFilenames(filenames) {
    const templateIDsSet = filenames.reduce((result, filename) => {

        // HOTFIX for ignore mac .DS_Store files
        if (filename[0] !== '.') {
            return result.add(getTemplateIDfromFilename(filename));
        }
        return result;

    }, new Set());

    return [...templateIDsSet];
}

function buildTemplatesDist() {
    const templateIDs = getTemplateIDsFromFilenames(
        fs.readdirSync(templatesPath)
    );

    templateIDs.forEach((templateID) => {
        buildTemplateDistData(templateID)
    });
}

function watchTemplateChanges() {
    fs.watch(config.templatesPath, (event, filename) => {
        console.log(`${event} ${filename}`);
        if (event === 'change' && filename) {
            buildTemplateDistData(
                getTemplateIDfromFilename(filename)
            )
        }

    });
}


module.exports = {
    watchTemplateChanges,
    buildTemplatesDist
}
