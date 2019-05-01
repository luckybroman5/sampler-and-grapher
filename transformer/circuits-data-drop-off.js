const get = require('lodash.get');

const allWeCareAbout = [
    // 'sampleNum',
    'finish',
    // 'latency.average'
    'throughput.total',
    'title',
];

module.exports = (keyNames, lines) => {
    // Filter the values we care about
    const returnArray = [
        allWeCareAbout,
    ]

    const series = {
        0: {targetAxisIndex: 0},
        1: {targetAxisIndex: 1}
    };
    const vAxes = {
        // Adds titles to each axis.
        0: {title: 'Bytes Read (Higher is Better)'},
        1: {title: 'Complete Network Isolation from Video (Y/N)'},
    };

    lines.forEach((val, i) => {
        const resultRow = [];
        if(allWeCareAbout[0] === 'sampleNum') resultRow.push(i)
        allWeCareAbout.forEach((key) => {
            let overrideVal;
            if (key === 'sampleNum') {
                return;
            }
            if (key === 'title') {
                overrideVal = val[key] === 'screens-control' ? 0 : 1;
            }
            let k =  get(val, key);
            if (typeof k === 'undefined' && typeof overrideVal === 'undefined') k = -1;
            if (typeof overrideVal !== 'undefined') k = overrideVal;
            resultRow.push(k);
        })

        returnArray.push(resultRow);
    });

    return {
        dataArray: returnArray,
        series,
        vAxes,
    };
};
