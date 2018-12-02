const container = document.querySelector('.container')
const start = document.querySelector('#start')
const h1 = document.querySelector('h1')
const total = document.querySelector('#clicked')
const red = document.querySelector('#red_clicked')
const grey = document.querySelector('#grey_clicked')
const canvas = document.querySelector('canvas')
const width = canvas.width = window.innerWidth
const height = canvas.height = window.innerHeight
let ctx = canvas.getContext('2d')
let randomX;
let randomY;
let new_total = 0
let new_red = 0
let new_grey = 0
let changed = 0
let color;

start.addEventListener('click', () => {
  start.innerHTML = 'Quit Game'
  start.className = 'quit'
  let timeout = parseFloat(document.querySelector('#timeout').value)*1000

  const kill = (x, y) => {
    ctx.fillStyle = 'grey'
    ctx.fillRect(x, y, 30, 30)
  }

  const generate_random_coordinates = () => {
    randomX = Math.round((Math.random()*width)/32)*32
    randomY = Math.round((Math.random()*(height-170))/32)*32
    ctx.fillStyle = 'red'
    ctx.fillRect(randomX, randomY, 30, 30)
    kill_it = window.setInterval(kill, timeout, randomX, randomY)

  }

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

  squares = []

  for (let y = 0; y < height-170; y += 32) {
    for (let i = 0; i < width; i += 32) {
      let square = new Tile(i, y, 'grey')
      square.create()
      squares.push([square])
    }
  }

  changing = window.setInterval(generate_random_coordinates, timeout)

  canvas.addEventListener('click', e => {
    if (changed === 0) {
      new_total += 1
      total.innerHTML = `Total Squares Clicked: ${new_total}`
      for (let squareset of squares) {
        if (((Math.round(e.pageX/32)*32) == randomX || ((Math.round(e.pageX/32)*32)-32 == randomX) || ((Math.round(e.pageX/32)*32)+32 == randomX))) {
        new_red += 1
        red.innerHTML = `Red Squares Clicked: ${new_red}`
        break;


        } else {
          new_grey += 1
          grey.innerHTML = `Grey Squares Clicked: ${new_grey}`
          break;
        }
      }
    }
  })

  quit[0].addEventListener('click', () => {
    if (start.innerHTML === 'Quit Game') {
      clearInterval(changing)
      changed = 1
      const score = document.createElement('strong')
      if (new_total === 0) {
        score.innerHTML = `<br><br>Score: 0/0 (0%)`

      } else {
        score.innerHTML = `<br><br>Score: ${new_red} / ${new_total} (${(new_red/new_total)*100}%)`

      }

      container.appendChild(score)
    }
  })
})
