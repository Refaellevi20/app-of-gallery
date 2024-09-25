'use strict'

let gClickEditor = false

function onInit() {
    renderGallery()
    setupGalleryEvents()
    initCanvas()
    renderSavedMemes()
}

function renderGallery() {
    const gallery = document.querySelector('.grid-container')
    const imgs = [
        { src: './img/team-1.png', alt: 'Dragon', description: 'Free Dragon' },
        { src: './img/team-2.png', alt: 'Knight', description: 'Fire Knight' },
        { src: './img/team-3.png', alt: 'Ice Warrior', description: 'Ice Warrior' },
        { src: './img/team-4.png', alt: 'Storm Rider', description: 'Storm Rider' },
        { src: './img/team-5.jpg', alt: 'Shadow Assassin', description: 'Shadow Assassin' },
        { src: './img/team-7.png', alt: 'Angry Dragon', description: 'Angry Dragon' },
        { src: './img/team-8.png', alt: 'Guardian of the North', description: 'Guardian of the North 8' },
        { src: './img/team-9.png', alt: 'King of the North', description: 'The King of the North' },
        { src: './img/bander-1.jpg', alt: 'Black Evil', description: 'Black Evil' },
        { src: './img/bander-2.jpg', alt: 'Behind the Wall', description: 'Behind the Wall' },
        { src: './img/bander-3.png', alt: 'World Burning with Evil', description: 'A World Burning with Evil' },
        { src: './img/bander-4.png', alt: 'The Greatest Queen', description: 'The Greatest Queen' },
        { src: './img/bander-5.png', alt: 'The Winter', description: 'The Winter' },
        { src: './img/bander-6.png', alt: 'Important Players', description: 'The Important Players' },
        { src: './img/bander-7.png', alt: 'The Enchanted Island', description: 'The Enchanted Island' }
    ]

    const imgHTML = imgs.map(img => `
        <img src="${img.src}" alt="${img.alt}" class="clickable" data-description="${img.description}">
    `)
    gallery.innerHTML = imgHTML.join('')
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
        renderMeme()
    }
}

//! the renderMeme in the memeController where is belongs

function saveMemeImage() {
    const canvas = document.getElementById('memeCanvas')
    const imgData = canvas.toDataURL("img/png")

    const meme = {
        imgData: imgData,
        topText: document.querySelector('.topText').value,
        bottomText: document.querySelector('.bottomText').value
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
            <p>${meme.bottomText}</p>
        </div>
    `)
    savedMemesContainer.innerHTML = memesHTML.join('')
}