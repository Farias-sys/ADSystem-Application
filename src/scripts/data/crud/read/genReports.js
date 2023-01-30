// @Author: Farias-sys
// Last-update: 21/12/2022 by Farias-sys
// File description: Generate a few reports in pdf for user to download


var pdf = require("html-pdf");
var path = require('path')
var express = require('express');


function genPdf(){
    let content = "Teste"
    const path_archive = path.join(__dirname, 'temp/report.pdf')

    const result = pdf.create(content, {}).toFile(path_archive, (err, res)=> {
        if(err){
            console.log("Error")
        } else{
            console.log("Funcionou")
        }
    })
    return path_archive
}

async function genReport(query, req, res){

    const path_archive = genPdf()
    await res.download(path_archive)

    switch (query.target) {
        case "transactions":
            
            break;
    
        default:
            break;
    }
}

module.exports = genReport