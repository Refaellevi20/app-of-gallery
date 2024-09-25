'use strict'

let gElCanvas
let gCtx
let gFontSize = 30

function initCanvas() {
    gElCanvas = document.getElementById('memeCanvas')
    gCtx = gElCanvas.getContext('2d')

    gCtx.textAlign = 'center'
    // showEditor()
    renderGallery()
    initMemeEditor()
    // addListeners()
    //* render
    renderMeme()
}

function initMemeEditor() {
    const imageUpload = document.getElementById('imageUpload')
    imageUpload.addEventListener('change', handleImageUpload)

    document.querySelector('.topText').addEventListener('input', (event) => {
        gMeme.topText = event.target.value
        renderMeme()
    })

    // document.querySelector('.bottomText').addEventListener('input', (event) => {
    //     gMeme.bottomText = event.target.value
    //     renderMeme()
    // })

    document.querySelector('.textColor').addEventListener('input', (renderMeme))
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

function onSwitchLine() {
    const memeLines = getMemeLines()
    const currentIndex = getCurrentLineIdx()
     //* last line
    //! memeLines.length - 1
    //* start from line 0 means the first
    //~ for example: if currentId = 2 and they are 3 lines => (memeLines.length = 3)
    //~ newId = (2+1) %3 = 0
    //^ in math is 3%3 = 9/100
    //& in conclotion when it come to the last line (memeLines.length - 1) it start from (line = 0)(first line)
    const newIndex = (currentIndex + 1) % memeLines.length
    selectLine(newIndex)
    renderMeme()
}

function onDeleteLine() {
    const currentIndex = getCurrentLineIdx()
    deleteLine(currentIndex) 
    renderMeme()
    flashMsg('line has been deleted!')
}

function onAddLine(text = 'second Line') {
    addLine(text)

    flashMsg('Line Added')
    const memeLines = getMemeLines()
   
    selectLine(memeLines.length - 1)
    renderMeme()
    drawRect()
    //! focus()
    //* Automatically focus the cursor on a specific input field when a form loads,
    //* allowing the user to start typing immediately.
    document.querySelector('.lineAdd').focus()

}



function onSetLineTxt(ev) {
    const txt = ev.target.value
    
    //!DOM
    setLineTxt(txt)

    //!MODAL
    renderMeme()
}

function onChangeFont(action, elFontInput) {
    switch (action) {
        case 'family':
            elFontInput.style.fontFamily = elFontInput.value
            document.querySelector('.lineAdd').style.fontFamily = elFontInput.value
            setLineFont(action, elFontInput.value)
            break;
        case 'size+':
            gFontSize += 2
            setLineFont(action)
            break;
        case 'size-':
            gFontSize -= 2
            setLineFont(action)
            break;
        default:
            break;
    }
    renderMeme()
}

function onAlign(action) {
    switch (action) {
        case 'left':
            alignTo('left')
            break;
        case 'center':
            alignTo('center')
            break;
        case 'right':
            alignTo('right')
            break;
        default:
            break;
    }
    renderMeme()
}

function alignTo(alignment) {
    gCtx.textAlign = alignment
}

function setLineFont(action, value) {
    if (action === 'family') {
        document.querySelector('.lineAdd').style.fontFamily = value
        gCtx.font = `${gFontSize}px ${value}`
    }
    renderMeme()
}

function renderMeme() {
    if (!gMeme.img.src) return

    //* Clear the canvas
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)

    //* uploaded image
    gCtx.drawImage(gMeme.img, 0, 0, gElCanvas.width, gElCanvas.height)

    //* style for text
    gCtx.font = `${gFontSize}px Impact`
    gCtx.fillStyle = document.querySelector('.textColor').value
    gCtx.strokeStyle = document.querySelector('.stokeColor').value
    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 2
    // gCtx.textAlign = 'center' 

    //  gCtx.textAlign = gCtx.textAlign || 'center'

    //* top
    gCtx.fillText(gMeme.topText.toUpperCase(), getXPosition(), 50)
    gCtx.strokeText(gMeme.topText.toUpperCase(), getXPosition(), 50)

    //* bottom text
    // gCtx.fillText(gMeme.bottomText.toUpperCase(), gElCanvas.width / 2, gElCanvas.height - 20)
    // gCtx.strokeText(gMeme.bottomText.toUpperCase(), gElCanvas.width / 2, gElCanvas.height - 20)
}

function getXPosition() {
    switch (gCtx.textAlign) {
        case 'left':
            return 10
        case 'right':
            return gElCanvas.width - 10
        case 'center':
        default:
            return gElCanvas.width / 2
    }
}

// function onSetLineTxt(ev) {
//     const txt = ev.target.value
//     const currentLine = gMeme.lines[gMeme.selectedLineIdx]
//     currentLine.text = txt
//     renderMeme()
// }

// function onSwitchLine() {
//     const memeLines = getMemeLines();
//     const newIndex = (gMeme.selectedLineIdx + 1) % memeLines.length
//     selectLine(newIndex)
//     document.querySelector('.lineText').value = memeLines[newIndex].text
//     renderMeme()
// }

// function selectLine(index) {
//     gMeme.selectedLineIdx = index
//     const currentLine = gMeme.lines[index]
//     document.querySelector('.lineText').value = currentLine.text
// }