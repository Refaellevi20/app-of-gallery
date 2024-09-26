let gElCanvas
let gCtx
let gFontSize = 30
let gSelectedLineIdx = 0

const BAR_WIDTH = 50

function initCanvas() {
    gElCanvas = document.getElementById('memeCanvas')
    gCtx = gElCanvas.getContext('2d')

    gCtx.textAlign = 'center'
    renderGallery()
    initMemeEditor()
    renderMeme()
    // drawCharts()
}

function initMemeEditor() {
    const imageUpload = document.getElementById('imageUpload')
    imageUpload.addEventListener('change', handleImageUpload)

    document.querySelector('.topText').addEventListener('input', (event) => {
        gMeme.lines[gMeme.selectedLineIdx].text = event.target.value
        renderMeme()
    })

    // Add input event listeners for color changes
    document.querySelector('.textColor').addEventListener('input', (event) => {
        gMeme.lines[gMeme.selectedLineIdx].color = event.target.value
        renderMeme()
    })

    document.querySelector('.stokeColor').addEventListener('input', (event) => {
        gMeme.lines[gMeme.selectedLineIdx].strokeColor = event.target.value
        renderMeme()
    })

    //* Add event listener click every click
    gElCanvas.addEventListener('click', (ev) => {
        const clickedLineIdx = getLineIdx(ev.offsetX, ev.offsetY)
        if (clickedLineIdx !== -1) {
            selectLine(clickedLineIdx)
            renderMeme() 
        }
    })

    window.addEventListener('keydown', (event) => {
        if (gMeme.selectedLineIdx !== -1) { 
            if (event.key === 'ArrowUp') {
                moveLine('up')
            } else if (event.key === 'ArrowDown') {
                moveLine('down')
            }
        }
    })
}

function moveLine(direction) {
    const selectedLine = gMeme.lines[gMeme.selectedLineIdx]
    const moveAmount = 5

    if (direction === 'up' && selectedLine.yPosition > moveAmount) {
        selectedLine.yPosition -= moveAmount
    } else if (direction === 'down' && selectedLine.yPosition < gElCanvas.height - moveAmount) {
        selectedLine.yPosition += moveAmount
    }

    renderMeme()
}

function onDownLine() {
    if (gMeme.selectedLineIdx !== -1) {
        moveLine('down')
    }
}

function onUpLine() {
    if (gMeme.selectedLineIdx !== -1) {
        moveLine('up')
    }
}

function getLineIdx(x, y) {
    for (let i = 0; i < gMeme.lines.length; i++) {
        const line = gMeme.lines[i]
        const textWidth = gCtx.measureText(line.text).width
        const lineHeight = line.size
        const lineY = line.yPosition


        const isInXBounds = (x >= getXPosition(line.align) - textWidth / 2 - 10) &&
                            (x <= getXPosition(line.align) + textWidth / 2 + 10)
        const isInYBounds = (y >= lineY - lineHeight) && (y <= lineY + 5)

        if (isInXBounds && isInYBounds) {
            return i
        }
    }
    return -1
}

function selectLine(index) {
    gMeme.selectedLineIdx = index
    document.querySelector('.topText').value = gMeme.lines[index].text 
}

function handleImageUpload(event) {
    const reader = new FileReader()
    reader.onload = function (event) {
        gMeme.img.src = event.target.result
        gMeme.img.onload = function () {
            gElCanvas.width = gMeme.img.width
            gElCanvas.height = gMeme.img.height
            renderMeme()
        }
    }
    reader.readAsDataURL(event.target.files[0])
}

function onDeleteLine() {
    const currentIndex = gMeme.selectedLineIdx
    if (gMeme.lines.length > 1) { 
        deleteLine(currentIndex)
        flashMsg('Line has been deleted!')
    } else {
        flashMsg('At least one line is required!')
}
renderMeme()
}

function selectLine(index) {
    gMeme.selectedLineIdx = index
    document.querySelector('.topText').value = gMeme.lines[index].text // Update input value
}

function onAddLine(text = 'Second Line') {

    if (!text.trim()) {
        flashMsg('Line text cannot be empty!')
        return
    }

    addLine(text)
    flashMsg('Line Added')
    selectLine(gMeme.lines.length - 1)
    renderMeme()
}

function onAlign(action) {
    const selectedLine = gMeme.lines[gMeme.selectedLineIdx]
    selectedLine.align = action

    switch (action) {
        case 'left':
            gCtx.textAlign = 'left'
            break
        case 'center':
            gCtx.textAlign = 'center'
            break
        case 'right':
            gCtx.textAlign = 'right'
            break
        default:
            gCtx.textAlign = 'center'
            break
    }

    renderMeme()
}

function onChangeFont(action) {
    switch (action) {
        case 'family':
            gMeme.lines[gMeme.selectedLineIdx].fontFamily = elFontInput.value
            break
        case 'size+':
            gMeme.lines[gMeme.selectedLineIdx].size += 2
            break
        case 'size-':
            gMeme.lines[gMeme.selectedLineIdx].size -= 2
            break
    }
    renderMeme()
}

// function onAlign(action) {
//     gCtx.textAlign = action
//     renderMeme()
// }

function renderMeme() {
    if (!gMeme.img.src) return

    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.drawImage(gMeme.img, 0, 0, gElCanvas.width, gElCanvas.height)
  
    gMeme.lines.forEach((line, idx) => {
        gCtx.font = `${line.size}px Impact`
        gCtx.fillStyle = line.color
        gCtx.strokeStyle = line.strokeColor
        gCtx.lineWidth = 2

        //* Draw the text
        const x = getXPosition(line.align)
        const y = line.yPosition

        //* draw the colors
        gCtx.fillText(line.text, x, y)
        gCtx.strokeText(line.text, x, y)

        //* Draw frame only if this is the selected line
        if (idx === gMeme.selectedLineIdx) {
            drawFrameAroundSelectedLine(line)
        }
    })
}

function drawFrameAroundSelectedLine(line) {
    const textWidth = gCtx.measureText(line.text).width
    //* font size
    const lineHeight = line.size 
    const x = getXPosition(line.align)
    const y = line.yPosition

    //* Draw frame around text
    gCtx.strokeStyle = 'white'
    gCtx.lineWidth = 2

    gCtx.setLineDash([5, 5])

    //*padding
    const frameX = x - textWidth / 2 - 10  
    const frameY = y - lineHeight + 5      

    //* Frame around the text who was selected
    gCtx.strokeRect(frameX, frameY, textWidth + 20, lineHeight + 10) 
   
    gCtx.setLineDash([])
    // gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function getXPosition(alignment) {
    switch (alignment) {
        case 'left':
            return 10
        case 'right':
            return gElCanvas.width - 10
        case 'center':
        default:
            return gElCanvas.width / 2
    }
}

if (line.yPosition < lineHeight) line.yPosition = lineHeight
if (line.yPosition > gElCanvas.height - lineHeight) line.yPosition = gElCanvas.height - lineHeight


// function drawCharts() {
//     const barSpace = 25
//     gStars.forEach((star, idx) => {
//         star.x = (idx + 1) * (BAR_WIDTH + barSpace)
//         star.y = gElCanvas.height - star.rate

//         gCtx.fillStyle = star.color
//         gCtx.fillRect(star.x, star.y, BAR_WIDTH, star.rate)

//     })
// }

// function onMouseClick(ev) {
//     // console.log('ev:', ev)
//     const { offsetX, offsetY, clientX, clientY } = ev
//     const clickedStar = gStars.find(star => {
//         return (
//             offsetX >= star.x && offsetX <= star.x + BAR_WIDTH &&
//             offsetY >= star.y
//         )
//     })
//     // console.log('clickedStar:', clickedStar)
//     if (clickedStar) {
//         openModal(clickedStar.name, clickedStar.rate, clientX, clientY)
//     } else {
//         closeModal()
//     }
// }

// function openModal(starName, starRate, x, y) {
//     const elModal = document.querySelector('.modal')
//     elModal.innerText = `Star: ${starName} has ${starRate} rating`
//     elModal.hidden = false
//     elModal.style.top = y + 'px'
//     elModal.style.left = x + 'px'
// }

// function closeModal() {
//     document.querySelector('.modal').hidden = true
// }

// function getRandomColor() {
//     const letters = '0123456789ABCDEF'
//     let color = '#'
//     for (var i = 0 i < 6 i++) {
//         color += letters[Math.floor(Math.random() * 16)]
//     }
//     return color
// }