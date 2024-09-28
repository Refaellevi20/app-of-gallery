'use strict'

let gClickEditor = false

function onInit() {
    renderGallery()
    setupGalleryEvents()
    initCanvas()
    renderSavedMemes()
}



function setupGalleryEvents() {
    const gallery = document.querySelector('.grid-container')
    gallery.addEventListener('click', function (event) {
        if (event.target.classList.contains('clickable')) {
            const imgSrc = event.target.getAttribute('src')
            const description = event.target.getAttribute('data-description')
            showEditor(imgSrc, description)
            // onSave(imgSrc)
        }
    })
}

function showEditor(imgSrc) {
    const clickEditor = document.querySelector('.editor-section')
    const clickSearch = document.querySelector('.search-an-img')
    const gallery = document.querySelector('.gallery-section')
    const clickSave = document.querySelector('.gallery-save')
    //* Hide gallery and show editor
    gallery.style.display = 'none'
    clickSearch.style.display = 'none'
    clickEditor.style.display = 'block'
    clickSave.style.display = 'block'
    //* hide the editor and show the save
    // gallery.style.display = 'none'
    // clickSearch.style.display = 'none'
    // clickEditor.style.display = 'none'
    // clickSave.style.display = 'block'

    //* Set the image on the canvas
    setImg(imgSrc)
    renderMeme()
}

function onSave() {
    const clickEditor = document.querySelector('.editor-section')
    const savedMemesSection = document.querySelector('.saved-memes-section')

    //* Hide the editor 
    clickEditor.style.display = 'none'

    //* Show the saved memes 
    savedMemesSection.style.display = 'block'

    saveMemeImage()

    const savedMemesContainer = document.querySelector('.saved-memes-container')
    const newMeme = document.createElement('div')
    newMeme.innerText = "your meme has been saved"
    savedMemesContainer.appendChild(newMeme)
}

function setImg(imgSrc) {
    const img = new Image()
    img.src = imgSrc
    const canvas = document.getElementById('memeCanvas')
    const ctx = canvas.getContext('2d')

    img.onload = function () {
        gMeme.img = img
        // gElCanvas.width = img.width
        // gElCanvas.height = img.height
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        // renderMeme()
    }
}

//! the renderMeme in the memeController where is belongs

function saveMemeImage() {
    const canvas = document.getElementById('memeCanvas')
    const imgData = canvas.toDataURL("img/jpg")

    const meme = {
        imgData: imgData,
        topText: document.querySelector('.topText').value,
        // bottomText: document.querySelector('.bottomText').value
    }
    //? after those changes ? yes : no (does not matter) nut those only the changes i have right now
    saveMemeToStorage(meme)
}


function renderSavedMemes() {
    const savedMemesContainer = document.querySelector('.saved-memes-container')
    const memes = loadMemesFromStorage()

    //! have to render all the time becouse the user can change the img every sec
    //* Create saved memes
    const memesHTML = memes.map(meme => `
        <div class="saved-meme">
            <canvas src="${meme.imgData}" width="200" height="200"></canvas>
            <p>${meme.topText}</p>

        </div>
    `)
    savedMemesContainer.innerHTML = memesHTML.join('')
}

function showGallery() {
    document.querySelector('.gallery-section').style.display = 'block'
    document.querySelector('.saved-memes-section').style.display = 'none'
}

function showSaved() {
    document.querySelector('.gallery-section').style.display = 'none'
    document.querySelector('.saved-memes-section').style.display = 'block'
}

// const hoverModal = document.getElementById('hoverModal')

// document.querySelectorAll('.clickable').forEach(img => {
//     img.addEventListener('mouseover', function (event) {

//         const description = this.getAttribute('data-description')
//         hoverModal.innerHTML = description

//         //* Show the modal
//         hoverModal.style.display = 'block'

//         //* Position the modal 
//         hoverModal.style.top = event.pageY + 15 + 'px'
//         hoverModal.style.left = event.pageX + 15 + 'px'
//     })

//     img.addEventListener('mouseout', function () {
//         //* Hide the modal when the mouse leaves the image
//         hoverModal.style.display = 'none'
//     })

//     img.addEventListener('mousemove', function (event) {
//         hoverModal.style.top = event.pageY + 15 + 'px'
//         hoverModal.style.left = event.pageX + 15 + 'px'
//     })
// })
