const { EventEmitter } = require('events');

//
// The EventEmitter class is a synchronous implementation of the
// Publish–subscribe design pattern.
//

const watcher = new EventEmitter();

watcher.on('Ah!!! a bird', (firstBird, secondBird) => {
  console.log(`Watcher - Ah!!! a bird: of kind ${firstBird}`);
});

watcher.on('Ah!!! a bird', (firstBird, secondBird) => {
  console.log(`Watcher - Ah!!! a bird: of kind ${secondBird}`);
});

const fireEvent = () => {
  console.log('Before emitting "Ah!!! a bird"');
  watcher.emit('Ah!!! a bird', 'Eagle', 'bluebird');
  console.log('After emitting "Ah!!! a bird"');
};

fireEvent();
