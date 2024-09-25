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


function onImgSelect(event) {
    if (event.target.classList.contains('clickable')) {
        const imgSrc = event.target.getAttribute('src')
        setImg(imgSrc)
        renderMeme()
    }
}

//* move the selected img to canvas
document.querySelector('.grid-container').addEventListener('click', onImgSelect)
