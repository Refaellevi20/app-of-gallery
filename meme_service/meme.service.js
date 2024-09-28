'use strict'

//! never use VAR lol

let gLastLine = true
let gYPosition = 200

let gEmojis = []
let gEmojiPageIdx = 0
const PAGE_SIZE = 20

_createEmojis()

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

//* Create emojis 
function _createEmojis() {
    for (let i = 128512; i < 128591; i++) {
        gEmojis.push(String.fromCodePoint(i))
    }
    for (let i = 129296; i < 129356; i++) {
        gEmojis.push(String.fromCodePoint(i))
    }
}

//* Get the next page of emojis
function nextPage() {
    gEmojiPageIdx++
    if (gEmojiPageIdx * PAGE_SIZE >= gEmojis.length) {
        gEmojiPageIdx = 0
    }
    return gEmojiPageIdx
}

//* Get the previous page of emojis
function prevPage() {
    gEmojiPageIdx--
    if (gEmojiPageIdx < 0) {
        gEmojiPageIdx = Math.floor(gEmojis.length / PAGE_SIZE)
    }
    return gEmojiPageIdx
}


