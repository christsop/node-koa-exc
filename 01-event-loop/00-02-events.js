const { EventEmitter } = require('events');

const watcher = new EventEmitter();

watcher.on('bird', (...birdKind) => {
  console.log(`Watcher: I just noticed a bird of kind ${birdKind}`);
});

watcher.on('s/w develper', (...birdKind) => {
  console.log(`Watcher: I just noticed a s/w developer of kind ${birdKind}`);
});

setTimeout(() => {
  watcher.emit('bird', 'Eagle', 'bluebird');
}, 2000);

setTimeout(() => {
  watcher.emit('s/w develper', 'elm', 'javascript');
}, 1000);
