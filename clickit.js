// DOM elements
const container = document.querySelector('.container')
const buttons = container.querySelector('.buttons')
const scores = document.querySelector('.scores')
const span = buttons.querySelector('span')
const h1 = document.querySelector('h1')
const total = document.querySelector('#clicked')
const red = document.querySelector('#red_clicked')
const grey = document.querySelector('#grey_clicked')

//Canvas elements
const canvas = document.querySelector('canvas')
const width = canvas.width = window.innerWidth
const height = canvas.height = window.innerHeight
let ctx = canvas.getContext('2d')

//Variable game elements
let randomX;
let randomY;
let new_total = 0
let new_red = 0
let new_grey = 0
let changed = 0
let color;
let squares = []

//Creating start button
const start = document.createElement('button')
start.innerHTML = 'Start Game'
start.style.width = '150px'
start.style.height = '30px'
start.style.backgroundColor = 'darkblue'
start.style.color = 'white'
buttons.insertBefore(start, span)

//Game begins on start click
start.addEventListener('click', () => {
  //Creates quit button
  const quit = document.createElement('button')
  const br = document.createElement('br')
  buttons.appendChild(br)
  quit.innerHTML = 'Quit Game'
  quit.style.backgroundColor = 'turquoise'
  quit.style.width = '125px'
  quit.style.height = '30px'
  quit.style.borderColor = 'black'
  buttons.insertBefore(quit, br)
  let timeout = parseFloat(document.querySelector('#timeout').value)*1000

  //Function to remove square
  const kill = (x, y) => {
    ctx.fillStyle = 'grey'
    ctx.fillRect(x, y, 30, 30)
  }

  //Function to create square
  const generate_random_coordinates = () => {
    randomX = Math.round((Math.random()*width)/32)*32
    randomY = Math.round((Math.random()*(height-170))/32)*32
    ctx.fillStyle = 'red'
    ctx.fillRect(randomX, randomY, 30, 30)
    kill_it = window.setInterval(kill, timeout, randomX, randomY)

  }

  //Js class to structure square
  class Tile {
    constructor(x, y, color, number) {
      this.x = x;
      this.y = y;
      this.color = color;
    }

    create() {
      ctx.fillStyle = this.color
      ctx.fillRect(this.x, this.y, 30, 30)
    }

  }

  //Creates squares grid
  for (let y = 0; y < height-170; y += 32) {
    for (let i = 0; i < width; i += 32) {
      let square = new Tile(i, y, 'grey')
      square.create()
      squares.push([square])
    }
  }

  //Creates red flashing square
  changing = window.setInterval(generate_random_coordinates, timeout)

  //Allows user to click red grid
  canvas.addEventListener('click', e => {
    if (changed === 0) {
      new_total += 1
      total.innerHTML = `Total Squares Clicked: ${new_total}`
      for (let squareset of squares) {
        //If user clicks red square
        if (((Math.round(e.pageX/32)*32) == randomX || ((Math.round(e.pageX/32)*32)-32 == randomX) || ((Math.round(e.pageX/32)*32)+32 == randomX))) {
        new_red += 1
        red.innerHTML = `Red Squares Clicked: ${new_red}`
        break;

        //If user clicks grey square
        } else {
          new_grey += 1
          grey.innerHTML = `Grey Squares Clicked: ${new_grey}`
          break;
        }
      }
    }
  })

  //Exits game if user clicks quit button
  quit.addEventListener('click', () => {
    clearInterval(changing)
    changed = 1
    //Creates and displays score
    const score = document.createElement('strong')
    if (new_total === 0) {
      score.innerHTML = `<br><br>Score: 0/0 (0%)`

    } else {
      score.innerHTML = `<br><br>Score: ${new_red} / ${new_total} (${(new_red/new_total)*100}%)`

    }
    scores.appendChild(score)

  })
})
