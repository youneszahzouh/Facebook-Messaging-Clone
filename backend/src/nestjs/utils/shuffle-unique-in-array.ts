export function shuffle(array: number[]) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
export function generateUniqueIntegers(
  min: number,
  max: number,
  count: number
): number[] {
  const numbers = Array.from({ length: max - min + 1 }, (_, i) => i + min);
  const shuffledNumbers = shuffle(numbers);
  return shuffledNumbers.slice(0, count);
}
