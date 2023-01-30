const genFileName = require('../../../../utils/gencode')

async function uploadFiles(req){
    const formidable = require('formidable');
    const fs = require('fs');
    const form = new formidable.IncomingForm();
 
    form.parse(req, (err, fields, files) => {
        const path = require('path');
        const oldpath = files.filetoupload.path;
        const newpath = path.join(__dirname, '..', genFileName());
        
        fs.renameSync(oldpath, newpath);
        return newpath;
    })
}

module.exports = uploadFiles;