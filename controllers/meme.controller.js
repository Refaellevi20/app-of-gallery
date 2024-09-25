
let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.getElementById('memeCanvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
    initMemeEditor()
    //* render
    renderMeme()
}

function initMemeEditor() {
    const imageUpload = document.getElementById('imageUpload')
    imageUpload.addEventListener('change', handleImageUpload)

    document.querySelector('.topText').addEventListener('input', (event) => {
        setLineTxt(event.target.value, gMeme.bottomText)
        renderMeme()
    })

    document.querySelector('.bottomText').addEventListener('input', (event) =>{
        setLineTxt(event.target.value, gMeme.bottomText)
        renderMeme()
    })

    document.querySelector('.textColor').addEventListener('input', (renderMeme) )
}


function handleImageUpload(event) {
    const reader = new FileReader()
    reader.onload = function (event) {
        gMeme.img.src = event.target.result
        gMeme.img.onload = function () {
            gElCanvas.width = gMeme.img.width
            gElCanvas.height = gMeme.img.height
            renderMeme()
        }
    }
    reader.readAsDataURL(event.target.files[0])
}

function renderMeme() {
    if (!gMeme.img.src) return

    //* Clear the canvas
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)

    //* uploaded image
    gCtx.drawImage(gMeme.img, 0, 0, gElCanvas.width, gElCanvas.height)

    //* style for text
    gCtx.font = '40px Impact'
    gCtx.fillStyle = document.getElementById('textColor').value
    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 2
    gCtx.textAlign = 'center'

    //* top
    gCtx.fillText(gMeme.topText.toUpperCase(), gElCanvas.width / 2, 50)
    gCtx.strokeText(gMeme.topText.toUpperCase(), gElCanvas.width / 2, 50)

    //* bottom text
    gCtx.fillText(gMeme.bottomText.toUpperCase(), gElCanvas.width / 2, gElCanvas.height - 20)
    gCtx.strokeText(gMeme.bottomText.toUpperCase(), gElCanvas.width / 2, gElCanvas.height - 20)
}
