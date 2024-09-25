function onMouseClick(event) {
    if (event.target.classList.contains('clickable')) {
        const description = event.target.getAttribute('data-description')
        flashMsg('You clicked: ' + description)
    }
}

function flashMsg(msg) {
    const el = document.querySelector('.user-msg')
    el.innerText = msg
    el.classList.add('open')
    setTimeout(() => el.classList.remove('open'), 3000)
}
