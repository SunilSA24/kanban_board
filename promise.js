'use strict';

import { promises as fsPromises } from 'fs';


let redFile = fsPromises.readFile('f1.txt');

redFile.then((data) => {
    console.log(data.toString());
}).catch((err) => {
    console.log(err);
});