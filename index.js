#!/home/kade/.nvm/versions/node/v10.15.1/bin/node
'use strict';

const fs = require('fs');
const transformer = require('./transformer/circuits-data-drop-off');

const reportDir = process.argv[2] || './testreportdir' ;
const templateFile = fs.readFileSync('./template.html').toString();

const transform = (rawDelimitedJSON) => {
    const rawJSONInput = rawDelimitedJSON.split('\n');
    // A crude way of validating the results came from autocannon

    const keyNames = new Set();
    const resultsArray = [];

    rawJSONInput.forEach((rawJSON) => {
        let j;
        try {
            const p = JSON.parse(rawJSON);
            j = p;
        } catch(e) {
            // console.log(`Failed to Parse ${rawJSON}`, e);
            j = null;
        }
        // A crude way of validating the results came from autocannon

        if (!j || !j.url || !j.requests) {
            return;
        }

        keyNames.add(Object.keys(j));
        resultsArray.push(j);
    })

    return transformer(keyNames, resultsArray);
}

const createReport = (reportFileName, results, i) => {
    const outfile = `${process.cwd()}/output/${reportFileName}${i}.html`;
    console.log('GENERATING REPORT: ', outfile, ' Open in any browser!');
    const xform = transform(results);
    const resultsStr = JSON.stringify(xform.dataArray);
    const seriesStr = JSON.stringify(xform.series);
    const vAxesStr = JSON.stringify(xform.vAxes);
    let report = templateFile.replace(/\/\*\* {{PUT ARRAY HERE}} \*\//, resultsStr);
    report = report.replace(/\/\*\* {{PUT SERIES OBJECT HERE}} \*\//, seriesStr)
    report = report.replace(/\/\*\* {{PUT VAXES OBJECT HERE}} \*\//, vAxesStr)
    fs.writeFileSync(outfile, report);
};

if (reportDir && templateFile) {
    const reports = fs.readdirSync(reportDir);

    reports.forEach((reportFileName, i) => {
        fs.watch(`${reportDir}/${reportFileName}`, null, (eventType) => {
            if (eventType === 'change') {
                fs.readFile(`${reportDir}/${reportFileName}`, null, (err, res) => {
                    if (err) {
                        return;
                    }
                    
                    createReport(reportFileName, res.toString(), i);
                });
            }  else {
                process.exit(0);
            }
        })
    });
};

