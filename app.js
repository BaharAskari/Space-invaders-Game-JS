const grid = document.querySelector('.grid')
currentShooterIndex = 202
const resultDisplay = document.getElementById('result')
let width = 15
let direction = +1
let invadersId
let goingRight = true
let aliensRemoved = []
let result = 0

for (let i = 0; i < 255; i++){
  const square = document.createElement('div')
  grid.appendChild(square)
}

//array of squares
const squares = Array.from(document.querySelectorAll('.grid div'))


//indexes that invadors will be in
const alienIvaders = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
  30, 31, 32, 33, 34, 35, 36, 37, 38, 39
]

function draw() {
  for (let i = 0; i < alienIvaders.length; i++){
    if (!aliensRemoved.includes(i)) {
      squares[alienIvaders[i]].classList.add('invader')

    }
  }
}

draw()

function remove() {
  for (let i = 0; i < alienIvaders.length; i++){
    squares[alienIvaders[i]].classList.remove('invader')
  }
}

//shooter
squares[currentShooterIndex].classList.add('shooter')

//moving the shooter

function moveShooter(e) {
  squares[currentShooterIndex].classList.remove('shooter')
  switch (e.key) {
    case 'ArrowLeft':
      if (currentShooterIndex % width !== 0) currentShooterIndex -= 1
      break
    case 'ArrowRight':
      if (currentShooterIndex % width < width - 1) currentShooterIndex += 1
      break
  }
  squares[currentShooterIndex].classList.add('shooter')
}

document.addEventListener('keydown', moveShooter)

//move Invaders

function moveInvaders() {
  const letEdge = alienIvaders[0] % width === 0
  const rightEdge = alienIvaders[alienIvaders.length - 1] % width === width - 1
  remove()
 
  if (rightEdge && goingRight) {
    for (let i = 0; i < alienIvaders.length; i++){
      alienIvaders[i] += width +1
      direction = -1
      goingRight = false
    }
  }

  if (letEdge && !goingRight) {
    for (let i = 0; i < alienIvaders.length; i++){
      alienIvaders[i] += width -1
      direction = 1
      goingRight = true
    }
  }


  for (let i = 0; i < alienIvaders.length; i++){
    alienIvaders[i] += direction
  }
  draw()

  if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
    resultDisplay.innerHTML = 'GAME OVER'
    clearInterval(invadersId)
  }

  for (let i = 0; i < alienIvaders.length; i++){
    if (alienIvaders[i] > squares.length ) {
      resultDisplay.innerHTML = "GAME OVER"
      clearInterval(invadersId)
    }
  }
  if (aliensRemoved.length === alienIvaders.length) {
    resultDisplay.innerHTML = "YOU WIN"
    clearInterval(invadersId)
  }
}

invadersId = setInterval(moveInvaders, 300)

//shootimg toward invaders

function shoot(e) {
  let laserId
  let currentLaserIndex = currentShooterIndex
  function moveLaser() {
    squares[currentLaserIndex].classList.remove('laser')
    currentLaserIndex -= width
    squares[currentLaserIndex].classList.add('laser')

    if (squares[currentLaserIndex].classList.contains('invader')) {
      squares[currentLaserIndex].classList.remove('laser')
      squares[currentLaserIndex].classList.remove('invader')
      squares[currentLaserIndex].classList.add('boom')

      setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 300)
      clearInterval(laserId)

      const alienRemoved = alienIvaders.indexOf(currentLaserIndex) 
      aliensRemoved.push(alienRemoved)
      result++
      resultDisplay.innerHTML = result
    }

  }

   switch (e.key) {
      case 'ArrowUp':
        laserId = setInterval(moveLaser, 100)
    }
}

document.addEventListener('keydown' , shoot)










































































