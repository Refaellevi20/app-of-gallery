function renderGallery() {
    const gallery = document.querySelector('.grid-container')
    const imgs = [
        { src: './img/team-1.png', alt: 'Dragon', description: 'Free Dragon' },
        { src: './img/team-2.png', alt: 'Knight', description: 'Fire Knight' }
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
