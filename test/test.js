var cabinet = require ("../cabinet.js");

counter = 0;
cabinet.sync("counter");
counter++;
console.log (counter); // Should increment every time you run the script
