const display = document.querySelector('.display')
const avgSpeed = document.querySelector('.avg')
const maxSpeed = document.querySelector('.max')
const input = document.querySelector('.input')
const completedText = document.querySelector('.completed')
const incompleteText = document.querySelector('.incomplete')
const hiddenText = document.querySelector('.hidden-text')
let keyStrokes = 0
let numOfCalculations = 0
let sumOfSpeeds = 0
let i = 0
let hasStarted
let prevValue
let startTime
let endTime

function onStart() {
  hasStarted = true

  setInterval(() => {
    const calculatedSpeed = (keyStrokes * 60) / 5
    // const calculatedSpeed = keyStrokes * (1 / 250) * 60 * 60 * 10
    display.innerHTML = calculatedSpeed
    if (calculatedSpeed > +maxSpeed.innerHTML) {
      maxSpeed.innerHTML = calculatedSpeed
    }

    if (keyStrokes !== 0) {
      numOfCalculations++
      sumOfSpeeds += calculatedSpeed
      avgSpeed.innerHTML = sumOfSpeeds / numOfCalculations
    }

    keyStrokes = 0
  }, 1000)
}
function onChange(event) {
  if (!hasStarted) {
    return
  }
  const keys =
    'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890!.?, '.split(
      ''
    )
  console.log(event.target.value.length, prevValue?.length)

  prevValue = event.target.value
  // if (keys.find((it) => it === event.key)) {
  keyStrokes++
  changeText(event)
  // }
}

function changeText(event) {
  if (!startTime) {
    startTime = Date.now()
  }
  if (hiddenText.innerHTML.includes(event.target.value)) {
    completedText.innerHTML = event.target.value
    incompleteText.innerHTML = hiddenText.innerHTML.replace(
      event.target.value,
      ''
    )
  }

  if (incompleteText.innerHTML.trim() === '') {
    alert('Completed')
    const timeTaken = Date.now() - startTime
    const timeTakenInMin = timeTaken / 1000 / 60
    const numOfWords = hiddenText.innerHTML.split(' ').length
    const wpm = numOfWords / timeTakenInMin
    alert(`Speed = ${wpm} wpm`)
  }
}
