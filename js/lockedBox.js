// We have a box with a lock. There is an array in the box, but you can get at it only when the box is unlocked. Directly accessing the private _content property is forbidden.

// Write a function called withBoxUnlocked that takes a function value as argument, unlocks the box, runs the function, and then ensures that the box is locked again before returning, regardless of whether the argument function returned normally or threw an exception.

const box = {
  locked: true,
  unlock() {
    this.locked = false;
  },
  lock() {
    this.locked = true;
  },
  _content: [],
  get content() {
    if (this.locked) throw new Error('Locked!');
    return this._content;
  },
};

const withBoxUnlocked = body => {
  let locked;
  if (box.locked) {
    locked = true;
    box.unlock();
  }
  try {
    body();
  } finally {
    if (locked) box.lock();
  }
};

withBoxUnlocked(() => {
  box.content.push('gold piece');
  console.log(box.content);
});

try {
  withBoxUnlocked(() => {
    throw new Error('Pirates on the horizon! Abort!');
  });
} catch (e) {
  console.log('Error raised: ' + e);
}
console.log(box.locked);
// → true

box.unlock();
withBoxUnlocked(() => {
  console.log('this should stay unlocked');
  box.content.push('chocolate chicken');
  console.log(box.content);
});
console.log(box.locked);
// false
