const COLORS =['RED', 'BLUE', 'YELLOW', 'ORANGE', 'GREY', 'BLACK', 'BROWN', 'GREEN'];
const NUMBERS = ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN'];
let randomColors = null;
let randomNumbers = null;

const getRandom = (prevRandom, length) => {
  const random = Math.random() * (length - 2) + 2;
  if (prevRandom === random) {
    getRandom()
  }
  prevRandom = random;
  return random;
}

const getColors = () => {
  return COLORS.slice(0, getRandom(randomColors, COLORS.length));
};

const getNumbers = () => {
  return NUMBERS.slice(0, getRandom(randomNumbers, NUMBERS.length));
}

const getItem = (name) => {
  return `<item><name>${name}</name><label>${name}</label></item>`;
};

const parser = new DOMParser();

const getExternalXml = (id) => {
  const data = {
    'colors': getColors,
    'numbers': getNumbers
  }
  if(data[id]) {
    const items = data[id]().map(color => getItem(color)).join('');
    return parser.parseFromString(`<root>${items}</root>`, 'text/xml');
  }
}

export const getExternalData = (model) => {
  let ids = model.match(/instance id\=\"([\w]*)\"/g);
  if(ids && ids.length > 0) {
    ids = ids.map(x => x.substring(13, x.length-1));
    return ids.map(id => ({id: id, xml: getExternalXml(id)}));
  }
  return undefined;
};
