


let gMeme = {
    img: new Image(),
    topText: '',
    bottomText: '',
    textColor: 'white',
    strokeColor: 'black'
}

function getMeme() {
    return gMeme
}

function setLineTxt(topText, bottomText) {
    gMeme.topText = topText
    gMeme.bottomText = bottomText
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

