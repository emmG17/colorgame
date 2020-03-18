var numSquares = 6;
var colors;
var pickedColor;
var squares = document.querySelectorAll('.square');
var colorDisplay = document.querySelector('#colorDisplay');
var messageDisplay = document.querySelector('#message');
var title = document.querySelector('h1');
var resetBtn = document.querySelector('#reset');
var modeBtns = document.querySelectorAll('.mode');

function changeColors(color){
  for(var i = 0;i<squares.length;i++){
    squares[i].style.backgroundColor = color;
  }
}

function generateRandomColors(numColors){
  //make array
  var colors = [];
  //add numColors colors to array
  for (var i = 0; i<numColors;i++){
    colorRGB=randomColor();
    colors.push(colorRGB);
  }
  //return array
  return colors;
}

function randomColor(){
  r = Math.floor(Math.random() * 256);
  g = Math.floor(Math.random() * 256);
  b = Math.floor(Math.random() * 256);
  colorRGB = 'rgb('+ r +', '+ g +', '+ b +')';
  return colorRGB;
}

function pickColor(){
  var randomI = Math.floor(Math.random() * colors.length);
  return colors[randomI];
}

function reset(){
  colors = generateRandomColors(numSquares);
  // pick a target color
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  resetBtn.textContent = "New Colors";
  messageDisplay.textContent = '';
  for (var i = 0; i<squares.length;i++){
    if(colors[i]){
      squares[i].style.display = 'block';
      squares[i].style.backgroundColor = colors[i];
    }else{
      squares[i].style.display = 'none';
    }
  }
  title.style.backgroundColor = 'steelblue';

}

function setUpModeButtons(){
  for(var i = 0; i<modeBtns.length;i++){
    modeBtns[i].addEventListener('click',function() {
      modeBtns[0].classList.remove('selected');
      modeBtns[1].classList.remove('selected');
      this.classList.add('selected');
      this.textContent == 'Easy' ? numSquares = 3: numSquares = 6;
      reset();
    });
  }
}

function setUpSquares(){
  for (var i = 0; i<squares.length;i++){
    //add event listeners
    squares[i].addEventListener('click',function(){
      //grab color of clicked square
      var clickedColor = this.style.backgroundColor;
      //compare color to pickedColor
      if (clickedColor === pickedColor){
        messageDisplay.textContent = "Correct!";
        changeColors(clickedColor);
        title.style.backgroundColor = clickedColor;
        resetBtn.textContent = "Play Again?";
      }else{
        //fade square out
        this.style.backgroundColor = "rgb(34, 34, 34)";
        //write Try Again
        messageDisplay.textContent = "Try Again";
      }
    });
  }
}

function init() {
  setUpModeButtons();
  setUpSquares();
  reset();
}

resetBtn.addEventListener('click',function(){
  reset();
})

init();
