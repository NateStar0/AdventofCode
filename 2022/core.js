/*
    ADVENT OF CODE 2022

    By Nathan C (Nahoo / NateStar01)
*/

const fs = require('node:fs');
const path = require('node:path');

// Ensure we're passing the day to this file

if (process.argv.length < 3) 
{
    console.log('Usage: node ' + process.argv[1] + ' FILENAME');
    process.exit(1);
}

const processesPath = path.join(__dirname, 'processes');
const dataPath = path.join(__dirname, 'data');

const processPath = path.join(processesPath, `${process.argv[2]}.js`);
const currentDataPath = path.join(dataPath, `${process.argv[2]}.txt`);

const task = require(processPath);

fs.readFile(currentDataPath, 'utf8', (err, data) => 
{
    if (err) throw err;
    task.run(data.replace(/\r/g, ""));
});
