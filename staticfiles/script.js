const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');
const modeDiv = document.querySelectorAll('.mode')

const xNazwa = 'Gracz 1';
const oNazwa = 'Koronawirus';
const cNazwa = 'Gracz 2';

let gameIsLive = true;
let xIsNext = true;
let modeStatus = true;


const handleWin = (letter) => {
  gameIsLive = false;

  for(const cellDiv of cellDivs){

    if(cellDiv.classList[1]!='x'&&cellDiv.classList[1]!='o'&&cellDiv.classList[1]!='c')
    cellDiv.classList.add('end');
  }

  if (letter === 'x') {
    statusDiv.innerHTML = `${xNazwa} wygrał!`;
  } else {
    if(modeStatus===true){
    statusDiv.innerHTML = `<span>${oNazwa} wygrał!</span>`;}
    else{statusDiv.innerHTML = `<span>${cNazwa} wygrał!</span>`;}
  }
};

const bot = (randomCell) =>{

  if(randomCell.classList[1]==="x"||randomCell.classList[1]==='o'){
    randomCell=cellDivs[Math.floor(Math.random()*8)];
    bot(randomCell);
    }

  else randomCell.click();
    
};

const modeSwitch = (modeString) =>{

  if(modeString==='sp'){
    modeDiv[0].classList.add('choose')
    modeDiv[1].classList.remove('choose')
    handleReset()
  }
  else{
    modeDiv[1].classList.add('choose')
    modeDiv[0].classList.remove('choose')
    handleReset()
  }
}

const checkGameStatus = () => {
  const topLeft = cellDivs[0].classList[1];
  const topMiddle = cellDivs[1].classList[1];
  const topRight = cellDivs[2].classList[1];
  const middleLeft = cellDivs[3].classList[1];
  const middleMiddle = cellDivs[4].classList[1];
  const middleRight = cellDivs[5].classList[1];
  const bottomLeft = cellDivs[6].classList[1];
  const bottomMiddle = cellDivs[7].classList[1];
  const bottomRight = cellDivs[8].classList[1];


  if (topLeft && topLeft === topMiddle && topLeft === topRight) {
    handleWin(topLeft);
    cellDivs[0].classList.add('won');
    cellDivs[1].classList.add('won');
    cellDivs[2].classList.add('won');
  } else if (middleLeft && middleLeft === middleMiddle && middleLeft === middleRight) {
    handleWin(middleLeft);
    cellDivs[3].classList.add('won');
    cellDivs[4].classList.add('won');
    cellDivs[5].classList.add('won');
  } else if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight) {
    handleWin(bottomLeft);
    cellDivs[6].classList.add('won');
    cellDivs[7].classList.add('won');
    cellDivs[8].classList.add('won');
  } else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
    handleWin(topLeft);
    cellDivs[0].classList.add('won');
    cellDivs[3].classList.add('won');
    cellDivs[6].classList.add('won');
  } else if (topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle) {
    handleWin(topMiddle);
    cellDivs[1].classList.add('won');
    cellDivs[4].classList.add('won');
    cellDivs[7].classList.add('won');
  } else if (topRight && topRight === middleRight && topRight === bottomRight) {
    handleWin(topRight);
    cellDivs[2].classList.add('won');
    cellDivs[5].classList.add('won');
    cellDivs[8].classList.add('won');
  } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
    handleWin(topLeft);
    cellDivs[0].classList.add('won');
    cellDivs[4].classList.add('won');
    cellDivs[8].classList.add('won');
  } else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
    handleWin(topRight);
    cellDivs[2].classList.add('won');
    cellDivs[4].classList.add('won');
    cellDivs[6].classList.add('won');

  } else if (topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight) {
    gameIsLive = false;
    statusDiv.innerHTML = 'Remis!';
    
  } else {

    xIsNext = !xIsNext;
    if (xIsNext) {
      statusDiv.innerHTML = `${xNazwa} jest kolejny`;

    } else {
      
      if(modeStatus===true){
      statusDiv.innerHTML = `<span>${oNazwa} jest kolejny</span>`;
      randomCell=cellDivs[Math.floor(Math.random()*8)]; 
      bot(randomCell);}

      else{statusDiv.innerHTML = `<span>${cNazwa} jest kolejny</span>`;}
    }
    }
};


// event Handlers
const handleReset = () => {
  xIsNext = true;
  statusDiv.innerHTML = `${xNazwa} jest kolejny`;

 
  for (const cellDiv of cellDivs) {
    cellDiv.classList.remove('x');
    cellDiv.classList.remove('o');
    cellDiv.classList.remove('c');
    cellDiv.classList.remove('won');
    cellDiv.classList.remove('end');
  }
  gameIsLive = true;
};

const handleCellClick = (e) => {
  const classList = e.target.classList;

  if (!gameIsLive || classList[1] === 'x' || classList[1] === 'o' || classList[1]==='c') {
    return;
  }

  if (xIsNext) {
    classList.add('x');
    checkGameStatus();

  } else {

    if(modeStatus===true){
    classList.add('o');
    checkGameStatus();}

    else{
      classList.add('c');
      checkGameStatus();
    }
  }
};

const handleSwitchMode = (e) => {
  const classList = e.target.classList;
  const modeString = classList[1];

  if(modeString==='sp'){
    modeStatus = true;
    modeSwitch(modeString);
  }

  else{
    modeStatus=false;
    modeSwitch(modeString);
  }
};

resetDiv.addEventListener('click', handleReset);

for (const cellDiv of cellDivs) {
  cellDiv.addEventListener('click', handleCellClick);
}

for(const mode of modeDiv) {

  mode.addEventListener('click',handleSwitchMode);
 
}