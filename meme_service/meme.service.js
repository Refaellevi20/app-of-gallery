


let gMeme = {
    img: new Image(),
    topText: '',
    bottomText: ''
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

