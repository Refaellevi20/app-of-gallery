const imgs = [
    { src: '/img/2.jpg', alt: 'Dragon', description: 'Free Dragon' },
    { src: './img/003.jpg', alt: 'Knight', description: 'Fire Knight' },
    { src: './img/004.jpg', alt: 'Ice Warrior', description: 'Ice Warrior' },
    { src: './img/005.jpg', alt: 'Storm Rider', description: 'Storm Rider' },
    { src: './img/8.jpg', alt: 'Shadow Assassin', description: 'Shadow Assassin' },
    { src: './img/5.jpg', alt: 'Angry Dragon', description: 'Angry Dragon' },
    { src: './img/006.jpg', alt: 'Guardian of the North', description: 'Guardian of the North 8' },
    { src: './img/9.jpg', alt: 'King of the North', description: 'The King of the North' },
    { src: './img/12.jpg', alt: 'Black Evil', description: 'Black Evil' },
    { src: './img/19.jpg', alt: 'Behind the Wall', description: 'Behind the Wall' },
    { src: './img/leo.jpg', alt: 'World Burning with Evil', description: 'A World Burning with Evil' },
    { src: './img/meme1.jpg', alt: 'The Greatest Queen', description: 'The Greatest Queen' },
    { src: './img/Oprah-You-Get-A.jpg', alt: 'The Winter', description: 'The Winter' },
    { src: './img/patrick.jpg', alt: 'Important Players', description: 'The Important Players' },
    { src: './img/X-Everywhere.jpg', alt: 'The Enchanted Island', description: 'The Enchanted Island' }
]

//* looking by data 

function renderGallery(imgsToRender = imgs) {
    const gallery = document.querySelector('.grid-container')
    const imgHTML = imgsToRender.map(img => `
        <img src="${img.src}" alt="${img.alt}" class="clickable" data-description="${img.description}">
    `) 
    gallery.innerHTML = imgHTML.join('')
}

//* lower the big words

function onSetFilterBy(filter) {
    const lowerCaseFilter = filter.toLowerCase()
    const filteredImgs = imgs.filter(img =>
        img.description.toLowerCase().includes(lowerCaseFilter)
    )
    renderGallery(filteredImgs)
}

renderGallery()

