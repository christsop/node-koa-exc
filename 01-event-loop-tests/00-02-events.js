//
// What exactly will be logged on the console aster the
// execution of the following code?
//
const { EventEmitter } = require('events');

const watcher = new EventEmitter();

watcher.on('bird', (...birdKind) => {
  console.log(`Watcher: I just noticed birds of kinds: ${birdKind}`);
});

setTimeout(() => {
  watcher.emit('bird', 'Eagle', 'bluebird');
  setImmediate(() => {
    console.log('Immediate After I saw an Eagle and a bluebird');
  });
}, 1000);

setTimeout(() => {
  watcher.emit('bird', 'Java develper', 'C develper');
  process.nextTick(() => {
    console.log('A Tick Right After I saw a Java develper and a C develper');
    process.nextTick(() => {
      console.log('A Tick in Tick');
    });
  });
}, 1000);

setTimeout(() => {
  watcher.emit('bird', 'JS develper', 'Scala develper');
}, 1000);

setTimeout(() => {
  watcher.emit('bird', 'Dancer', 'Singer');
}, 1000);
