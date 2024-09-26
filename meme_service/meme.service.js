'use strict'

//! never use VAR lol

let gLastLine = true
let gYPosition = 200

let gMeme = {
    img: new Image(),
    lines: [
        {
            text: 'Top Text',
            size: 30,
            align: 'center',
            color: 'white',
            strokeColor: 'black',
            fontFamily: 'impact',
            yPosition: 50
        }
    ],
    selectedLineIdx: 0,
}

function addLine(text) {
    if(gLastLine){
        gLastLine = false
    }else {
        gYPosition -= 20
    }
    gMeme.lines.push({
        text:text,
        // text: '',
        size: gFontSize,
        align: 'center',
        color: 'white',
        strokeColor: 'black',
        fontFamily: 'impact',
        yPosition: gYPosition
    })
}

function getMeme() {
    return gMeme
}

function selectLine(index) {
    gMeme.selectedLineIdx = index
    document.querySelector('.topText').value = gMeme.lines[index].text
}

function onSwitchLine() {
    const memeLines = getMemeLines()
    const newIndex = (gMeme.selectedLineIdx + 1) % memeLines.length
    selectLine(newIndex)
    renderMeme()
}


function deleteLine(index) {
    gMeme.lines.splice(index, 1)
    if (gMeme.selectedLineIdx >= gMeme.lines.length) {
        gMeme.selectedLineIdx = gMeme.lines.length - 1
        if (gMeme.lines.length === 0) {
            addLine('New Text')
            flashMsg('no more lines, a new line has been added.')
        }
        renderMeme()
    }
}

function setImg(imgSrc) {
    gMeme.img.src = imgSrc
}

function saveMemeToStorage() {
    const memes = loadFromStorage('savedMemes') || new Array()
    const { push } = memes
    push.call(memes, gMeme)
    saveToStorage('savedMemes', memes)
}

function loadMemesFromStorage() {
    return loadFromStorage('savedMemes') || new Array()
}

function getMemeLines() {
    return gMeme.lines
}


function drawRect(line) {
    const textWidth = gCtx.measureText(line.text).width
    const x = getXPosition(line.align)
    const y = line.yPosition

    gCtx.strokeStyle = 'blue'
    gCtx.strokeRect(x - textWidth / 2 - 10, y - line.size, textWidth + 25, line.size + 10)
}

