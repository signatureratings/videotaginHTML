const video = document.querySelector('.viewer')
const player = document.querySelector('.player')
const progress = document.querySelector('.progress')
const progressbar = document.querySelector('.progress-filled')
const toggle = document.querySelector('.toggle')
const skipbuttons = document.querySelectorAll('[data-skip]')
const ranges = document.querySelectorAll('.player-slider')
const text = document.querySelector('.icon')
const controls = document.querySelector('.player-controls')
/** */
function togglePlay() {
  if (video.paused) {
    video.play()
  } else {
    video.pause()
  }
}
function updateButton() {
  const icon = video.paused ? 'play.svg' : 'pause.svg'
  text.setAttribute('src', icon)
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate() {
  video[this.name] = this.value
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 700
  progressbar.style.width = `${percent}px`
}

function drag(e) {
  const dragtime = (e.offsetX / progress.offsetWidth) * video.duration
  video.currentTime = dragtime
}
/** */
video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)

video.addEventListener('timeupdate', handleProgress)
toggle.addEventListener('click', togglePlay)
skipbuttons.forEach((button) => button.addEventListener('click', skip))
ranges.forEach((range) => range.addEventListener('change', handleRangeUpdate))
ranges.forEach((range) =>
  range.addEventListener('mousemove', handleRangeUpdate)
)

progress.addEventListener('click', drag)
let mousedown = false
progress.addEventListener('mousemove', (e) => {
  if (mousedown) {
    drag(e)
  }
})
progress.addEventListener('mousedown', () => (mousedown = true))
progress.addEventListener('mouseup', () => (mousedown = false))
