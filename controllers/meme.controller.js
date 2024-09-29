'use strict'

let gElCanvas
let gCtx
let gFontSize = 30
let gSelectedLineIdx = 0
let isDragging = false
let gStartY = 0
let gStartX = 0
// let gSelectedEmoji = ''

let selectedFont = 'impact'

const TOUCH_EVS = ['touchmove', 'touchstart', 'touchend']

function initCanvas() {
    gElCanvas = document.getElementById('memeCanvas')
    gCtx = gElCanvas.getContext('2d')

    gCtx.textAlign = 'center'
    renderGallery()
    initMemeEditor()
    renderEmojis()
    resizeCanvas()
    renderMeme()
}

function initMemeEditor() {
    const imageUpload = document.getElementById('imageUpload')
    imageUpload.addEventListener('change', handleImageUpload)

    document.querySelector('.topText').addEventListener('input', (event) => {
        gMeme.lines[gMeme.selectedLineIdx].text = event.target.value
        renderMeme()
    })

    //* Add input event listeners for color changes
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
            // renderEmojis()
        }
    })

      //* Adding dragging event listeners
      gElCanvas.addEventListener('mousedown', onDown)
      gElCanvas.addEventListener('mousemove', onMouseMove)
      gElCanvas.addEventListener('mouseup', onMouseUp)
  
      gElCanvas.addEventListener('touchstart', onDown)
      gElCanvas.addEventListener('touchmove', onMouseMove)
      gElCanvas.addEventListener('touchend', onMouseUp)

    window.addEventListener('keydown', (event) => {
        if (gMeme.selectedLineIdx !== -1) {
            if (event.key === 'ArrowUp') {
                moveLine('up')
            } else if (event.key === 'ArrowDown') {
                moveLine('down')
            }
        }
    })
    // renderEmojis()
}

function onMouseMove(ev) {
    const pos = getEvPos(ev)

    if (isDragging) {
        const selectedLine = gMeme.lines[gMeme.selectedLineIdx]
        selectedLine.yPosition = pos.y - gStartY
        renderMeme()
    } 
}

function onDown(ev) {
    //* Get the ev pos from mouse or touch
    const pos = getEvPos(ev)

    // Check if a line was clicked, otherwise check for the circle
    const clickedLineIdx = getLineIdx(pos.x, pos.y)
    if (clickedLineIdx !== -1) {
        selectLine(clickedLineIdx)
        isDragging = true
        gStartY = pos.y - gMeme.lines[gMeme.selectedLineIdx].yPosition
        document.body.style.cursor = 'grabbing'
        return
    }
}

function onMouseUp() {
    isDragging = false
    setTexDrag(false) 
    document.body.style.cursor = 'default'
}

function getEvPos(ev) {

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        //* Prevent triggering the mouse screen dragging event
        ev.preventDefault()
        //* Gets the first touch point
        ev = ev.changedTouches[0]
        //* Calc the right pos according to the touch screen
        pos = {
            x: ev.clientX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.clientY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
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

function onSwitchLine() {
    const memeLines = getMemeLines()
    const newIndex = (gMeme.selectedLineIdx + 1) % memeLines.length
    selectLine(newIndex)
    renderMeme()
}
//
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

function onAlign(action, gSelectedLineIdx) {
    console.log(gSelectedLineIdx)

    if (gMeme.selectedLineIdx === -1) return
    // console.log(gMeme.selectedLineIdx)

    const selectedLine = gMeme.lines[gMeme.selectedLineIdx]
    selectedLine.align = action

    switch (action) {
        case 'left':
            gMeme.lines[gMeme.selectedLineIdx].textAlign = 'left'
            // gCtx.textAlign = 'left'
            break
        case 'center':
            gMeme.lines[gMeme.selectedLineIdx].textAlign = 'center'
            break
        case 'right':
            gMeme.lines[gMeme.selectedLineIdx].textAlign = 'right'
            break
        default:
            gMeme.lines[gMeme.selectedLineIdx].textAlign = 'center'
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


function onFamilyFont(action) {
    const validFonts = ['impact', 'edu', 'roboto']

    if (validFonts.includes(action)) {
        gMeme.lines[gMeme.selectedLineIdx].fontFamily = action
    } else {
        gMeme.lines[gMeme.selectedLineIdx].fontFamily = '   Impact';
    }

    renderMeme()
}

//! another way
// function onFamilyFont(action) {
//     switch (action) {

//         default:
//             gMeme.lines[gMeme.selectedLineIdx].fontFamily = 'impact'
//             break
//         case 'edu':
//             gMeme.lines[gMeme.selectedLineIdx].fontFamily = action
//             break
//         // case 'roboto':
//         //     gMeme.lines[gMeme.selectedLineIdx].fontFamily = action
//         //     break
//     }
//     renderMeme()
// }

///////////////////////////////////

function renderMeme() {
    if (!gMeme.img.src) return

    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.drawImage(gMeme.img, 0, 0, gElCanvas.width, gElCanvas.height)

    gMeme.lines.forEach((line, idx) => {
        gCtx.font = `${line.size}px ${line.fontFamily}`
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

function onMove(ev) {
    const { isDrag } = getCircle()
    if (!isDrag) return

    const pos = getEvPos(ev)
    //* Calc the delta, the diff we moved
    const dx = pos.x - gLastPos.x
    const dy = pos.y - gLastPos.y
    moveCircle(dx, dy)
    //* Save the last pos so we will remember where we`ve been and move accordingly
    gLastPos = pos
    //* The canvas (along with the circle) is rendered again after every move
    renderMeme()
    // renderCircle()
}

function onUp() {
    setTexDrag(false)
    document.body.style.cursor = 'grab'
}

//* Get the current page of emojis
function getEmojis() {
    let startIdx = gEmojiPageIdx * PAGE_SIZE
    return gEmojis.slice(startIdx, startIdx + PAGE_SIZE)
}

//* Render emojis
function renderEmojis() {
    const emojis = getEmojis()
    const elEmojisModule = document.querySelector('.emojis-module')
    const strHTMLs = emojis.map(emoji => 
        `<button onclick="onEmojiClick(event, '${emoji}')" class="emoji-item">${emoji}</button>`
    )
    elEmojisModule.innerHTML = strHTMLs.join('')
}

//* Toggle emoji
function onEmojiSelect(elEmoji) {
    const elEmojisModule = elEmoji.querySelector('.module-wrapper')
    elEmojisModule.classList.toggle('open')
}

//* Handle emoji click and prevent event 
function onEmojiClick(ev, emoji) {
    ev.stopPropagation()

    onAddLine(emoji)
}

//* Handle next page click
function onNextPage(ev) {
    ev.stopPropagation()
    nextPage()
    renderEmojis()
}

//* Handle previous page click
function onPrevPage(ev) {
    ev.stopPropagation()
    prevPage()
    renderEmojis()
}

