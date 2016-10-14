//
// What exactly will be logged on the console aster the
// execution of the following code?
//
const { EventEmitter } = require('events');

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
