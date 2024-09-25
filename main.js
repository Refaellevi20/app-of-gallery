function onInit() {
    console.log('Gallery and Editor are ready!')
    initMemeEditor()
}

//* Meme Editor
const imageUpload = document.getElementById('imageUpload')
const memeCanvas = document.getElementById('memeCanvas')
const ctx = memeCanvas.getContext('2d')
const topTextInput = document.getElementById('topText')
const bottomTextInput = document.getElementById('bottomText')
const textColorInput = document.getElementById('textColor')
const downloadBtn = document.getElementById('downloadBtn')

let img = new Image()

function initMemeEditor() {
    imageUpload.addEventListener('change', handleImageUpload)
    topTextInput.addEventListener('input', drawMeme)
    bottomTextInput.addEventListener('input', drawMeme)
    textColorInput.addEventListener('input', drawMeme)
    downloadBtn.addEventListener('click', downloadMeme)
}

function handleImageUpload(event) {
    const reader = new FileReader()
    reader.onload = function(event) {
        img.src = event.target.result
        img.onload = function() {
            memeCanvas.width = img.width
            memeCanvas.height = img.height
            drawMeme()
        }
    }
    reader.readAsDataURL(event.target.files[0])
}

function drawMeme() {
    ctx.drawImage(img, 0, 0, memeCanvas.width, memeCanvas.height)
    ctx.font = '40px Impact'
    ctx.fillStyle = textColorInput.value
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 2
    ctx.textAlign = 'center'

    // Top text
    ctx.fillText(topTextInput.value.toUpperCase(), memeCanvas.width / 2, 50)
    ctx.strokeText(topTextInput.value.toUpperCase(), memeCanvas.width / 2, 50)

    // Bottom text
    ctx.fillText(bottomTextInput.value.toUpperCase(), memeCanvas.width / 2, memeCanvas.height - 20)
    ctx.strokeText(bottomTextInput.value.toUpperCase(), memeCanvas.width / 2, memeCanvas.height - 20)
}

function downloadMeme() {
    const link = document.createElement('a')
    link.download = 'meme.png'
    link.href = memeCanvas.toDataURL()
    link.click()
}

function onMouseClick(event) {
    if (event.target.classList.contains('clickable')) {
        const description = event.target.getAttribute('data-description')
        flashMsg('You clicked: ' + description)
    }
}

function flashMsg(msg) {
    const el = document.querySelector('.user-msg')

    el.innerText = msg
    el.classList.add('open')
    setTimeout(() => el.classList.remove('open'), 3000)
}