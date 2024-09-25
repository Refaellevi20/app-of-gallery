
let gMeme = {
    img: new Image(),
    lines: [
        {
            
            text: 'Top Text',
            size: 30,
            align: 'center',
            color: 'white',
            strokeColor: 'black',
            yPosition: 50 
        },
        {
           
            text: 'Bottom Text',
            size: 30,
            align: 'center',
            color: 'white',
            strokeColor: 'black',
            yPosition: 400 
        }
    ],
    selectedLineIdx: 0,
}

function addLine(text) {
    gMeme.lines.push({
        text: text,
        size: gFontSize,
        align: 'center',
        color: document.querySelector('.textColor').value
    })
}

// let gMeme = {
//     img: new Image(),
//     topText: 'wetge',
//     bottomText: '',
//     textColor: 'white',
//     strokeColor: 'black'
// }

function getMeme() {
    return gMeme
}

// function setLineTxt(topText, bottomText) {
//     gMeme.topText = topText
//     gMeme.bottomText = bottomText
// }

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
    gCtx.strokeRect(x - textWidth / 2 - 10, y - line.size, textWidth + 20, line.size + 10);
}

