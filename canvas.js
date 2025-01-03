
class Utils {

    static smallScreenSizeBreakPoint = 576

    static edgeSize = document.body.offsetWidth > this.smallScreenSizeBreakPoint ? 25 : 20

    static canvasWidth = this.edgeSize * 10
    static canvasHeight = this.edgeSize * 20

    static scoreCanvasWidth = document.body.offsetWidth > this.smallScreenSizeBreakPoint ? this.edgeSize * 7 : this.edgeSize * 6
    static scoreCanvasHeight = this.edgeSize * 5

    static childCanvasWidth = this.edgeSize * 4
    static childCanvasHeight = this.edgeSize * 2

    static lineStartPositions = [...this.populateStartPositions(this.edgeSize*4)]
    static otherStartPositions = [...this.populateStartPositions(this.edgeSize*3)]
    static cubeStartPositions = [...this.populateStartPositions(this.edgeSize*2)]

    static populateStartPositions(figureWidth) {
        const maxOffset = this.canvasWidth - figureWidth
        const positions = []
        for (let i = 0; i <= maxOffset; i+= this.edgeSize) {
            positions.push(i)
        }
        return positions
    }

    static getRandomStartCoord(figureType) {
        if (figureType === 'line') {
            return this.lineStartPositions[Math.floor(Math.random() * this.lineStartPositions.length)]
        } else if (figureType === 'cube') {
            return this.cubeStartPositions[Math.floor(Math.random() * this.cubeStartPositions.length)]
        } else {
            return this.otherStartPositions[Math.floor(Math.random() * this.otherStartPositions.length)]
        }
    }

    static shuffle(array) {
        let currentIndex = array.length;
        while (currentIndex != 0) {
          let randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
    }

    static backgroundImages = [
        './Images/1.jpeg', 
        './Images/8.jpeg',  
        './Images/14.jpeg', 
        './Images/19.jpeg',
        './Images/16.jpeg', 
        './Images/20.webp', 
        './Images/23.jpeg', 
        './Images/24.jpeg', 
        './Images/25.jpeg',
        './Images/26.jpeg', 
        './Images/27.jpeg', 
        './Images/31.jpg',  
        './Images/39.jpeg', 
        './Images/Lo-Fi_1.gif',
        './Images/2.gif',
        './Images/32.gif',
        './Images/33.gif',
        './Images/34.gif',
        './Images/35.gif',
        './Images/36.gif',
    ]

    static backgroundImagesSmall = [
        './images-small/1.jpg',
        './images-small/2.gif',
        './images-small/3.jpeg',
        './images-small/4.jpeg',
        './images-small/5.jpeg',
        './images-small/6.jpeg',
        './images-small/7.jpeg',
        './images-small/8.jpeg',
        './images-small/10.gif',
        './images-small/11.gif',
        './images-small/12.gif',
        './images-small/13.gif',
        './images-small/14.gif',
    ]

    static setCanvasSize() {
        const canvas = document.getElementById("mainScreen")
        const childCanvas = document.getElementById("secondScreen")
        const scroreScreen = document.getElementById("scoreScreen")
        canvas.width = this.canvasWidth
        canvas.height = this.canvasHeight
        childCanvas.width = this.childCanvasWidth
        childCanvas.height = this.childCanvasHeight
        scroreScreen.height = this.scoreCanvasHeight
        scroreScreen.width = this.scoreCanvasWidth
        const childBlock = document.getElementById("child")
        const scroreBlock = document.getElementById("score")
        const musicNameBlock = document.querySelector(".music-name")
        if (document.body.offsetWidth > this.smallScreenSizeBreakPoint) {
            childBlock.style.right = `-${childCanvas.offsetWidth+50}px`
            scroreBlock.style.top = `${childCanvas.offsetHeight+50}px`
            scroreBlock.style.right = `-${scroreBlock.offsetWidth+50}px`
            musicNameBlock.style.top = '40px'
        } else {
            childBlock.style.top = `-${childCanvas.offsetHeight+10}px`
            scroreBlock.style.top = `-${scroreBlock.offsetHeight+10}px`
            musicNameBlock.style.top = '40px'
        }
    }

    static setBackgroundUrl() {
        const url = document.body.offsetWidth > this.smallScreenSizeBreakPoint 
        ? this.backgroundImages[Math.floor(Math.random()*this.backgroundImages.length)]
        : this.backgroundImagesSmall[Math.floor(Math.random()*this.backgroundImagesSmall.length)]
        document.querySelector('.background-overlay').style.backgroundImage = `url(${url})`
        document.querySelector('.background-overlay').style.backgroundSize = 'cover'
    }

    static changeOpacity(inputString, newOpacity) {
        const rgbaRegex = /^rgba?\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)$/;
        const match = inputString.match(rgbaRegex);
        const red = match[1];
        const green = match[2];
        const blue = match[3];
        return `rgba(${red},${green},${blue},${newOpacity})`
    }

    static allowBackgroundChange = false

    static startGame() {
        if (this.allowBackgroundChange) {
            Utils.setBackgroundUrl()
        } else {
            this.allowBackgroundChange = true
        }
        document.querySelector('.game-over-screen').style.display = 'none'
        this.shuffle(MusicPlayer.music)
        Canvas.filledCoordsMap.clear()
        Canvas.SPEED = Canvas.startSpeed
        Canvas.level = 1
        Canvas.lines = 0
        Canvas.points = 0
        Canvas.initializeNewFigure()
        Canvas.redrawCanvas()
        MusicPlayer.playSoundTrack(0) 
    }

    static setBestResult(newBestResult) {
        const bestResults = [...this.getBestResults().split(','), newBestResult].sort((a, b) => b - a).filter(num => num > 0)
        if (bestResults.length > 10) {
            bestResults.pop()
        }
        localStorage.setItem('tetris_best_results', bestResults.join(','))
    }

    static getBestResults() {
        let bestResults = localStorage.getItem('tetris_best_results')
        if (!bestResults) {
            localStorage.setItem('tetris_best_results', 0)
            bestResults = localStorage.getItem('tetris_best_results')
        }
        return bestResults
    }

    static renderBestResults() {
        const bestResults = this.getBestResults()
        const bestResultsContainer = document.querySelector('.best-results-container')
        bestResultsContainer.innerHTML = ''
        bestResultsContainer.textContent = 'Best Results:'
        bestResults.split(',').forEach(bestResult => {
            const div = document.createElement('div')
            div.textContent = bestResult
            bestResultsContainer.appendChild(div)
        })
    }
}

class MusicPlayer {

    static music = [
        './Music/Lawrence Walther & Gelch - Sunset Lookers.mp3',
        './Music/Azido 88, Lawrence Walther - Terrapin Groove.mp3',
        './Music/softy, Lawrence Walther - Park Bench.mp3',
        './Music/Tibeauthetraveler x Lawrence Walther - Memory Lane.mp3',
        './Music/softy, Lawrence Walther - Where We Met.mp3',
        './Music/softy, Lawrence Walther - Footsteps in the Snow.mp3',
        './Music/let-it-go.mp3',
        './Music/sunset-vibes.mp3',
        './Music/fat-chillin.mp3',
        './Music/retro-hip-hop.mp3',
        './Music/lofi-girl-dreams.mp3',
        './Music/the-best-jazz-club-in-new-orleans.mp3',
        './Music/ciudades.mp3',
        './Music/galaxy-echo.mp3',
        './Music/jazzy-background-beat.mp3',
        './Music/80x-lo-fi-jazz.mp3',
        './Music/ogi-feel-the-beat-chillest.mp3',
        './Music/seduction-jazz.mp3',
        './Music/once-in-paris.mp3',
        './Music/quiet-stars.mp3',
        './Music/phonk.mp3',
        './Music/Kid Kio, Mantrick, Lawrence Walther - Sandcastle.mp3',
        './Music/Lawrence Walther - Floating, Drifting ft. Less Gravity.mp3',
        './Music/Lawrence Walther, Less Gravity - Just One Wish.mp3',
        './Music/Lawrence Walther, Less Gravity - That Dream About Flying.mp3',
        './Music/Lawrence Walther, Miramare, Yestalgia - Nowhere to Go.mp3',
        './Music/Lawrence Walther, mtch., Prithvi - Memories.mp3',
        './Music/Lawrence Walther, Shierro, Yestalgia - Souvenir.mp3',
        './Music/Lawrence Walther, Yestalgia - I\'d Like You to Stay.mp3',
        './Music/Lawrence Walther, Yestalgia - Rain Falls.mp3',
        './Music/Lawrence Walther, Yestalgia, Shierro - Pillow Talk.mp3',
        './Music/Less Gravity, Lawrence Walther - Futurebound.mp3',
        './Music/Shierro, Lawrence Walther - Empty Page.mp3',
        './Music/Shierro, Lawrence Walther - Moonflower.mp3',
        './Music/softy, Lawrence Walther - Daytrip.mp3',
        './Music/softy, Lawrence Walther - Falling Rain.mp3',
        './Music/softy, Lawrence Walther - Kites & Clouds.mp3',
        './Music/softy, Lawrence Walther - Silk.mp3',
        './Music/Sweet Medicine, Lawrence Walther - From Coast to Coast.mp3',
        './Music/Sweet Medicine, Lawrence Walther - Ocean Girl.mp3',
        './Music/Yestalgia, Lawrence Walther, Shierro - Azimuth.mp3',
        './Music/Yestalgia, Lawrence Walther, Shierro - Garden of Dreams.mp3',
        './Music/yosev, Lawrence Walther, Louk - Tanger.mp3'
    ]

    static soundTrack
    static quickMoveSound
    static removeLinesSound
    static fallSound

    static playSoundTrack(index) {
        this.soundTrack?.stop()
        this.soundTrack = new Howl({
            src: [this.music[index]],
            volume : .5,
            onend : () => {
                if (index === this.music.length-1) {
                    setTimeout(() => {
                        this.playSoundTrack(0)
                    }, 1000)
                } else {
                    setTimeout(() => {
                        this.playSoundTrack(index+=1)
                    }, 1000)
                }
            }
        })
        this.soundTrack.play()
        document.querySelector('.music-name').textContent = this.music[index].substring('./Music/'.length).slice(0, -4)
    } 

    static playFallSound() {
        this.fallSound?.stop()
        this.fallSound = new Howl({
            src: ['sounds/quick_4.wav'],
            volume: .3
        })
        this.fallSound.play()
    }

    static playQuickMoveAudio() {
        this.quickMoveSound?.stop();
        this.quickMoveSound = new Howl({
            src: ['sounds/quick_10.mp3'],
            volume : .1
        });
        this.quickMoveSound.play();
    }

    static playRemoveLinesAudio() {
        this.removeLinesSound?.stop()
        this.removeLinesSound = new Howl({
            src: ['sounds/quick_5.wav'],
            volume : .6,
            rate : 1
        });
        this.removeLinesSound.play();
    }

}

class FigureForms {

    static cube = [{x : 0, y : 0}, {x : Utils.edgeSize, y : 0}, {x : 0, y : Utils.edgeSize}, {x : Utils.edgeSize, y : Utils.edgeSize}]
    static line = [{x : 0, y : 0}, {x : Utils.edgeSize, y : 0}, {x : (Utils.edgeSize*2), y : 0}, {x : (Utils.edgeSize*3), y : 0}]
    static pyramid = [{x : Utils.edgeSize, y : 0}, {x : 0, y : Utils.edgeSize}, {x : Utils.edgeSize, y : Utils.edgeSize}, {x : (Utils.edgeSize*2), y : Utils.edgeSize}]
    static hookLeft = [{x : 0, y : 0}, {x : 0, y : Utils.edgeSize}, {x : Utils.edgeSize, y : Utils.edgeSize}, {x : (Utils.edgeSize*2), y : Utils.edgeSize}]
    static hookRight = [{x : (Utils.edgeSize*2), y : 0}, {x : 0, y : Utils.edgeSize}, {x : Utils.edgeSize, y : Utils.edgeSize}, {x : (Utils.edgeSize*2), y : Utils.edgeSize}]
    static zigzagLeft = [{x : 0, y : 0}, {x : Utils.edgeSize, y : 0}, {x : Utils.edgeSize, y : Utils.edgeSize}, {x : (Utils.edgeSize*2), y : Utils.edgeSize}]
    static zigzagRight = [{x : Utils.edgeSize, y : 0}, {x : (Utils.edgeSize*2), y : 0}, {x : 0, y : Utils.edgeSize}, {x : Utils.edgeSize, y : Utils.edgeSize}]
    
    static colors = [
        'rgba(125, 250, 146, 1)', 
        'rgba(255, 207, 86, 1)', 
        'rgba(124, 229, 119, 1)', 
        'rgba(127, 7, 153, 1)', 
        'rgba(255, 87, 10, 1)', 
        'rgba(57, 147, 221, 1)', 
        'rgba(32, 164, 243, 1)', 
        'rgba(255, 0, 128, 1)'
    ]
   
    static allFiguresMap = new Map([
        [this.line, 'line'],
        [this.cube, 'cube'],
        [this.pyramid, 'pyramid'],
        [this.hookLeft, 'hookLeft'],
        [this.hookRight, 'hookRight'],
        [this.zigzagLeft, 'zigzagLeft'],
        [this.zigzagRight, 'zigzagRight']
    ])
    
    static getRandomFigure() {
        return Array.from(this.allFiguresMap.keys())[Math.floor(Math.random() * Array.from(this.allFiguresMap.keys()).length)]
    }

    static getRandomColor() {
        return this.colors[Math.floor(Math.random() * this.colors.length)]
    }
}

class Canvas {

    static ctx = document.getElementById("mainScreen").getContext("2d")
    static childCtx = document.getElementById("secondScreen").getContext("2d")
    static scoreScreenCtx = document.getElementById("scoreScreen").getContext('2d')
    static filledCoordsMap = new Map()
    static keyDirections = { 37: 'left', 38: 'up', 39: 'right', 40: 'down', 32: 'space' }
    static currentFigureCoords
    static nextFigureCoords = FigureForms.getRandomFigure()
    static nextColor = FigureForms.getRandomColor()
    static currentColor
    static lines = 0
    static points = 0
    static level = 1
    static startSpeed =  1000
    static SPEED = this.startSpeed
    static currentFigure
    static canvasRequestAnimationFrameId

    static initializeNewFigure() {

        if (this.currentFigure) {
            this.currentFigure.removeListeners()
            this.currentFigure.activeFigure = null
            this.currentFigure.nextFigureCoords = null
            clearInterval(this.currentFigure.quickMoveInterval)
            cancelAnimationFrame(this.currentFigure.requestAnimationFrameId)
            this.currentFigure = null
        }
        
        this.currentFigureCoords = this.nextFigureCoords
        this.nextFigureCoords = FigureForms.getRandomFigure()
        this.currentColor = this.nextColor
        this.nextColor = FigureForms.getRandomColor()
        const type = FigureForms.allFiguresMap.get(this.currentFigureCoords)
        const startOffset = Utils.getRandomStartCoord(type)

        const newFigureCoords = this.currentFigureCoords.map(obj => {
            return {x : obj.x + startOffset, y: obj.y}
        })

        this.currentFigure = new Figure(newFigureCoords, type, this.currentColor)

        if (this.currentFigure.collisionCheck(newFigureCoords)) {
            Utils.setBestResult(this.points)
            Utils.renderBestResults()
            document.querySelector('.game-over-screen').style.display = 'flex'
            cancelAnimationFrame(this.canvasRequestAnimationFrameId)
        } else {
            this.currentFigure.initializeListener()
            this.currentFigure.moveDown()
            this.currentFigure.calculateShadowCoords()
            Canvas.childCtx.clearRect(0,0,Utils.childCanvasWidth,Utils.childCanvasHeight)
            this.drawNextFigure()
        }
    }

    static drawNextFigure() {
        this.nextFigureCoords.forEach(figure => {
            Canvas.childCtx.fillStyle = this.nextColor
            Canvas.childCtx.fillRect(figure.x, figure.y, Utils.edgeSize, Utils.edgeSize)
        })
    }

    static drawFallenFigures() {
        Array.from(this.filledCoordsMap.keys()).forEach(figure => {
            this.ctx.fillStyle = this.filledCoordsMap.get(figure)
            this.ctx.fillRect(figure.x, figure.y, Utils.edgeSize, Utils.edgeSize)
        })
    }

    static drawScore() {
        this.scoreScreenCtx.clearRect(0, 0, Utils.scoreCanvasWidth, Utils.scoreCanvasHeight)
        this.scoreScreenCtx.fillStyle = 'white'
        if (document.body.offsetWidth > Utils.smallScreenSizeBreakPoint) {
            this.scoreScreenCtx.font = '25px Jersey_25'
            this.scoreScreenCtx.fillText('LEVEL ' + this.level, 0, 20)
            this.scoreScreenCtx.fillText('Lines ' + this.lines, 0, 60)
            this.scoreScreenCtx.fillText('Points ' + this.points, 0, 100)
        } else {
            this.scoreScreenCtx.font = '20px Jersey_25'
            this.scoreScreenCtx.fillText('LEVEL ' + this.level, 0, 40)
            this.scoreScreenCtx.fillText('Lines ' + this.lines, 0, 70)
            this.scoreScreenCtx.fillText('Points ' + this.points, 0, 100)
        }
    }

    static redrawCanvas() {
        this.ctx.clearRect(0,0, Utils.canvasWidth, Utils.canvasHeight)
        this.drawFallenFigures()
        this.drawScore()
        this.currentFigure.drawFigure()
        this.currentFigure.drawShadowFigure()
        this.canvasRequestAnimationFrameId = requestAnimationFrame(() => this.redrawCanvas())
    }
}

class Figure {

    figurePosition = 'right'
    startMoveDownAnimationTime
    startChangeColorAnimationTime
    createNewFigureTimeOutId
    direction
    quickMoveInterval
    requestAnimationFrameId
    createNewFigureTimeout
    pressTimer
    shadowFigure = []
    activeFigure
    type
    color
    boundKeyUp
    boundHeyDown
    allowChangeColor = true
    createNewFigureTimeOffset = 800

    constructor(newFigureCoords, type, color) {
        this.type = type
        this.activeFigure = newFigureCoords
        this.color = color
        this.boundHeyDown = this.moveFigure.bind(this)
        this.boundKeyUp = this.handleKeyUp.bind(this)
    }

    removeListeners() {
        document.removeEventListener('keydown', this.boundHeyDown);
        document.removeEventListener('keyup', this.boundKeyUp);
    }

    initializeListener() {
        document.addEventListener('keydown', this.boundHeyDown)
        document.addEventListener('keyup', this.boundKeyUp)
    }
   
    moveFigure(event) {
        const eventKeyCode = Canvas.keyDirections[event.keyCode]
        if (eventKeyCode === 'right') this.direction = 'right'
        else if (eventKeyCode === 'left') this.direction = 'left'
        else if (eventKeyCode === 'up') this.direction = 'up'
        else if (eventKeyCode === 'down') this.direction = 'down'
        else if (eventKeyCode === 'space') this.direction = 'down'

        if (eventKeyCode !== 'space' && this.changeFigureCoords(this.direction)) {
            MusicPlayer.playQuickMoveAudio()
        }
        if (eventKeyCode !== 'up' && !this.pressTimer) {
            this.pressTimer = setTimeout(() => {
                if (eventKeyCode === 'down') {
                    this.quickMoveInterval = this.quickMove(20) 
                } else if (eventKeyCode === 'space') {     
                    this.quickMoveInterval = this.quickMove(5) 
                    this.shadowFigure = []
                    MusicPlayer.playFallSound()
                } else if (eventKeyCode === 'right' || eventKeyCode === 'left') {
                    this.quickMoveInterval = this.quickMove(40) 
                }
            }, 25)
        }
    }

    quickMove(speed) {
        clearInterval(this.quickMoveInterval)
        return setInterval(() => {
            if (this.changeFigureCoords(this.direction)) {
                if (this.direction !== 'down') {
                    MusicPlayer.playQuickMoveAudio()
                } else {
                    Canvas.points += 1
                } 
            } 
        }, speed)
    }

    handleKeyUp() {
        clearInterval(this.quickMoveInterval)
        clearTimeout(this.pressTimer)
        this.quickMoveInterval = null
        this.pressTimer = null
    }

    drawFigure() {
        this.activeFigure.forEach(figure => {
            Canvas.ctx.fillStyle = this.color
            Canvas.ctx.fillRect(figure.x, figure.y, Utils.edgeSize, Utils.edgeSize)
        })
    }

    drawShadowFigure() {
        if (this.shadowFigure[0]?.y > this.activeFigure[0]?.y + Utils.edgeSize) {
            this.shadowFigure.forEach(coord => {
                Canvas.ctx.fillStyle = 'rgba(225, 215, 220, 0.5)';
                Canvas.ctx.fillRect(coord.x, coord.y, Utils.edgeSize, Utils.edgeSize);
            });
        } 
    }
    
    turnFigure(type, coordsCopy) {
        if (coordsCopy.length > 0) {
            let newPosition
            if (type === 'line') {
                if (this.figurePosition === 'right') {
                    let x = coordsCopy[1].x
                    let y = coordsCopy[1].y - Utils.edgeSize * 2
                    coordsCopy.forEach(coord => {
                        coord.x = x
                        coord.y = y
                        y += Utils.edgeSize
                    })
                    newPosition = 'top'
                }   else {
                    let y = coordsCopy[2].y
                    let x = coordsCopy[2].x - Utils.edgeSize
                    coordsCopy.forEach(coord => {
                        coord.x = x
                        coord.y = y
                        x += Utils.edgeSize
                    })
                    newPosition = 'right'
                }
            } else if (type === 'pyramid') {
                if (this.figurePosition === 'right') {
                    coordsCopy[3].x = this.activeFigure[3].x - Utils.edgeSize
                    coordsCopy[3].y = this.activeFigure[3].y + Utils.edgeSize
                    newPosition = 'top'
                } else if (this.figurePosition === 'top') {
                    coordsCopy[0].x = this.activeFigure[0].x + Utils.edgeSize
                    coordsCopy[0].y = this.activeFigure[0].y + Utils.edgeSize
                    newPosition = 'left'
                } else if (this.figurePosition === 'left') {
                    coordsCopy[1].x = this.activeFigure[1].x + Utils.edgeSize
                    coordsCopy[1].y = this.activeFigure[1].y - Utils.edgeSize
                    newPosition = 'down'
                } else if (this.figurePosition === 'down') {
                    coordsCopy[0].x = this.activeFigure[1].x
                    coordsCopy[0].y = this.activeFigure[1].y
                    coordsCopy[1].x = this.activeFigure[1].x - Utils.edgeSize
                    coordsCopy[1].y = this.activeFigure[1].y + Utils.edgeSize
                    coordsCopy[3].x = this.activeFigure[0].x
                    coordsCopy[3].y = this.activeFigure[0].y
                    newPosition = 'right'
                }
            } else if (type === 'hookLeft') {
                if (this.figurePosition === 'right') {
                    coordsCopy[0].x = this.activeFigure[0].x + Utils.edgeSize
                    coordsCopy[3].x = this.activeFigure[3].x - Utils.edgeSize
                    coordsCopy[3].y = this.activeFigure[3].y - (Utils.edgeSize * 2)
                    newPosition = 'top'
                } else if (this.figurePosition === 'top') {
                    coordsCopy[1].y = this.activeFigure[1].y - Utils.edgeSize
                    coordsCopy[3].x = this.activeFigure[3].x - (Utils.edgeSize * 2)
                    coordsCopy[3].y = this.activeFigure[3].y + Utils.edgeSize
                    newPosition = 'left'
                } else if (this.figurePosition === 'left') {
                    coordsCopy[2].x = this.activeFigure[2].x - Utils.edgeSize
                    coordsCopy[3].x = this.activeFigure[3].x + Utils.edgeSize
                    coordsCopy[3].y = this.activeFigure[3].y + (Utils.edgeSize * 2)
                    newPosition = 'down'
                } else if (this.figurePosition === 'down') {
                    coordsCopy[0].x = this.activeFigure[0].x - Utils.edgeSize
                    coordsCopy[1].y = this.activeFigure[1].y + Utils.edgeSize
                    coordsCopy[2].x = this.activeFigure[2].x + Utils.edgeSize
                    coordsCopy[3].x = this.activeFigure[3].x + (Utils.edgeSize * 2)
                    coordsCopy[3].y = this.activeFigure[3].y - Utils.edgeSize
                    newPosition = 'right'
                }
            } else if (type === 'hookRight') {
                if (this.figurePosition === 'right') {
                    coordsCopy[2].y = this.activeFigure[2].y - Utils.edgeSize  
                    coordsCopy[1].x = this.activeFigure[1].x + (Utils.edgeSize * 2)
                    coordsCopy[1].y = this.activeFigure[1].y + Utils.edgeSize 
                    newPosition = 'top'
                } else if (this.figurePosition === 'top') {
                    coordsCopy[1].x = this.activeFigure[1].x - Utils.edgeSize
                    coordsCopy[1].y = this.activeFigure[1].y - Utils.edgeSize
                    coordsCopy[3].x = this.activeFigure[3].x + Utils.edgeSize
                    coordsCopy[3].y = this.activeFigure[3].y - Utils.edgeSize
                    newPosition = 'left'
                } else if (this.figurePosition === 'left') {
                    coordsCopy[0].y = this.activeFigure[0].y + Utils.edgeSize
                    coordsCopy[3].x = this.activeFigure[3].x - (Utils.edgeSize * 2)
                    coordsCopy[3].y = this.activeFigure[3].y - Utils.edgeSize
                    newPosition = 'down'
                } else if (this.figurePosition === 'down') {
                    coordsCopy[0].y = this.activeFigure[0].y - Utils.edgeSize
                    coordsCopy[1].x = this.activeFigure[1].x - Utils.edgeSize
                    coordsCopy[2].y = this.activeFigure[2].y + Utils.edgeSize
                    coordsCopy[3].y = this.activeFigure[3].y + (Utils.edgeSize * 2)
                    coordsCopy[3].x = this.activeFigure[3].x + Utils.edgeSize
                    newPosition = 'right'
                }
            } else if (type === 'zigzagLeft') {
                if (this.figurePosition === 'right') {
                    coordsCopy[2].x = this.activeFigure[2].x - Utils.edgeSize
                    coordsCopy[3].x = this.activeFigure[3].x - Utils.edgeSize
                    coordsCopy[3].y = this.activeFigure[3].y - (Utils.edgeSize * 2)
                    newPosition = 'top'
                } else if (this.figurePosition === 'top') {
                    coordsCopy[2].x = this.activeFigure[2].x + Utils.edgeSize
                    coordsCopy[3].x = this.activeFigure[3].x + Utils.edgeSize
                    coordsCopy[3].y = this.activeFigure[3].y + (Utils.edgeSize * 2)
                    newPosition = 'right'
                }
            } else if (type === 'zigzagRight') {
                if (this.figurePosition === 'right') {
                    coordsCopy[1].x = this.activeFigure[1].x - (Utils.edgeSize * 2)
                    coordsCopy[1].y = this.activeFigure[1].y - Utils.edgeSize
                    coordsCopy[2].y = this.activeFigure[2].y - Utils.edgeSize
                    newPosition = 'top'
                } else if (this.figurePosition === 'top') {
                    coordsCopy[1].x = this.activeFigure[1].x + (Utils.edgeSize * 2)
                    coordsCopy[1].y = this.activeFigure[1].y + Utils.edgeSize
                    coordsCopy[2].y = this.activeFigure[2].y + Utils.edgeSize
                    newPosition = 'right'
                }
            }
            if (!this.collisionCheck(coordsCopy)) {
                this.figurePosition = newPosition
                this.activeFigure = [...coordsCopy]
                this.calculateShadowCoords()
            }
        }
    }

    changeColorAnimation() {

        const duration = this.createNewFigureTimeOffset
        const gap = 0.5
        const date = new Date

        let opacity = 1

        if (!this.startChangeColorAnimationTime) {
            this.startChangeColorAnimationTime = date.getTime()
        }

        const elapsedTime = date.getTime() - this.startChangeColorAnimationTime;

        if (elapsedTime <= duration / 2) {
            opacity = 1 - (0.9 * elapsedTime) / (duration / 2)
            if (opacity < gap) {
                this.color = Utils.changeOpacity(this.color, gap)
            } else {
                this.color = Utils.changeOpacity(this.color, opacity)
            }
        } else {
            opacity = 0.1 + (0.9 * (elapsedTime - duration / 2)) / (duration / 2)
            if (opacity < gap) {
                this.color = Utils.changeOpacity(this.color, gap)
            } else {
                this.color = Utils.changeOpacity(this.color, opacity)
            }
        }

        if (elapsedTime < duration) {
            requestAnimationFrame(() => this.changeColorAnimation())
        } else {
            this.startChangeColorAnimationTime = null;
        }
    }

    moveDown() {

        const date = new Date

        if (!this.startMoveDownAnimationTime) {
            this.startMoveDownAnimationTime = date.getTime()
        } 

        if (date.getTime() - this.startMoveDownAnimationTime > Canvas.SPEED) {
            if (!this.changeFigureCoords('down') && !this.createNewFigureTimeOutId) {
                this.createNewFigureTimeOutId = setTimeout(() => this.createNewFigure(), this.createNewFigureTimeOffset) 
                if (this.allowChangeColor) {
                    this.changeColorAnimation()
                    this.allowChangeColor = false
                }
            } else {
                this.startMoveDownAnimationTime = null
            }
        }
        this.requestAnimationFrameId = requestAnimationFrame(() => this.moveDown())
    }

    createNewFigure() {
        if (this.activeFigure) {
            if (!this.changeFigureCoords('down')) {
                this.activeFigure.forEach(figure => {
                    Canvas.filledCoordsMap.set(figure, this.color)
                })
                this.activeFigure.length = 0
                this.tetrisCheck() 
            } else {
                this.allowChangeColor = true
                this.startChangeColorAnimationTime = null
                this.startMoveDownAnimationTime = null
                this.createNewFigureTimeOutId = null
            }
        }
    }

    changeFigureCoords(direction) {
        let allowChangeCoords
        if (this.activeFigure) {
            const coordsCopy = this.activeFigure.map(figure => {
                return {...figure}
            })
            switch (direction) {
                case 'down': 
                    coordsCopy.forEach(figure => figure.y += Utils.edgeSize)
                break
                case 'up': 
                    this.turnFigure(this.type, coordsCopy)
                break
                case 'right': 
                    coordsCopy.forEach(figure => figure.x += Utils.edgeSize)      
                break
                case 'left':  
                    coordsCopy.forEach(figure => figure.x -= Utils.edgeSize)  
                break
            }
            if (!this.collisionCheck(coordsCopy)) {
                if (direction !== 'up') {
                    this.activeFigure = [...coordsCopy]
                    allowChangeCoords = true
                }
                if (direction === 'left' || direction === 'right') {
                    this.calculateShadowCoords()
                }
            }
        }
        return allowChangeCoords
    }

    calculateShadowCoords() {
        const shadowCoords = this.activeFigure.map(figure => {
            return {...figure}
        })
        let counter = 0 // Without counter goes into infinite loop for some reason
        while(!this.collisionCheck(shadowCoords) && counter < Utils.canvasHeight / Utils.edgeSize) {
            counter++
            shadowCoords.forEach(coord => coord.y += Utils.edgeSize)
        }
        shadowCoords.forEach(coord => coord.y -= Utils.edgeSize)
        this.shadowFigure = shadowCoords
    }

    collisionCheck(nextFigurePositions) {
        let collision
        const filledCoords = Array.from(Canvas.filledCoordsMap.keys())
        for (let i = 0; i < nextFigurePositions.length; i++) {
            if (collision) break
            if (nextFigurePositions[i].y > Utils.canvasHeight - Utils.edgeSize) {
                collision = true
                break
            } else if (nextFigurePositions[i].x < 0 || nextFigurePositions[i].x > Utils.canvasWidth - Utils.edgeSize) {
                collision = true
                break
            } else if (filledCoords.length > 0) {
                for (let j = 0; j < filledCoords.length; j++) {
                    if (filledCoords[j].y === nextFigurePositions[i].y && 
                        filledCoords[j].x === nextFigurePositions[i].x) {
                        collision = true
                        break
                    }
                }
            }
        }
        if (collision && this.direction === 'down' && this.allowChangeColor) {
            this.allowChangeColor = false
            this.changeColorAnimation()
            if (!this.createNewFigureTimeOutId) {
                this.createNewFigureTimeOutId = setTimeout(() => this.createNewFigure(), this.createNewFigureTimeOffset) 
            }
        }
        return collision
    }

    tetrisCheck() {

        // Refactor this and rewrite to requestAnimationFrame

        const allRows = {}
        let linesToRemove = 0
        let lowKey = []

        Array.from(Canvas.filledCoordsMap.keys()).forEach(coord => {
            if (allRows[coord.y] === undefined) allRows[coord.y] = [coord]
            else {
                allRows[coord.y].push(coord)
            }
        })

        for (const [key, value] of Object.entries(allRows)) {
            if (value.length === Utils.canvasWidth / Utils.edgeSize) {
                value.forEach(v => Canvas.filledCoordsMap.delete(v))
                lowKey.push(key)
                linesToRemove += 1
            }
        }

        const moveDownArr = []

        Array.from(Canvas.filledCoordsMap.keys()).forEach(coord => {
            lowKey.forEach(key => {
                if (coord.y < key) {
                    moveDownArr.push(coord)
                } 
            })
        })

        const funcInterval = 5
        const totalFuncTime = funcInterval * Utils.edgeSize

        if (moveDownArr.length > 0) {

            const intervalId = setInterval(() => {
                moveDownArr.forEach(coord => {
                    coord.y += 1; 
                });
            }, funcInterval)
    
            setTimeout(() => {
                clearInterval(intervalId);
                moveDownArr.forEach(coord => {
                    if (coord.y % Utils.edgeSize !== 0) {
                        coord.y += Utils.edgeSize - coord.y % Utils.edgeSize
                    }
                });
                Canvas.initializeNewFigure()
                this.calculatePoints(linesToRemove)
            }, totalFuncTime);

            MusicPlayer.playRemoveLinesAudio()

        } else {
            Canvas.points += 15
            Canvas.initializeNewFigure()
        }
    }

    calculatePoints(linesToRemove) {
        const currentLevel = Canvas.level
        let points
        if (linesToRemove === 4) points = 1500
        else if (linesToRemove === 3) points = 700
        else if (linesToRemove === 2) points = 300
        else if (linesToRemove === 1) points = 100
        Canvas.lines += linesToRemove
        Canvas.points += points
        Canvas.level = Math.ceil(Canvas.lines / 10)
        if (currentLevel !== Canvas.level) {
            if (Canvas.level <= 5) {
                Canvas.SPEED -= 100
            } else if (Canvas.level > 5 && Canvas.level <= 15) {
                Canvas.SPEED -= 50
            } else {
                Canvas.SPEED -= 10
            }
        }
    }
}

class TouchEventsHandler {

    static startSlideCoordY
    static startSlideCoordX
    static startXCoord
    static startYCoord
    static touchStartTime
    static prevTouchMoveCoord
    static moveGap = 20
    static moveDownGap = 10
    
    static handleTouchStart(event) {
        this.startSlideCoordY = event.changedTouches[0].pageY
        this.startSlideCoordX = event.changedTouches[0].pageX
        this.startXCoord = event.changedTouches[0].pageX
        this.startYCoord = event.changedTouches[0].pageY
        const date = new Date()
        this.touchStartTime = date.getTime()
    }
    
    static handleTouchMove(event) {
        event.preventDefault()
        const currentXCoord = event.changedTouches[0].pageX
        const currentYCoord = event.changedTouches[0].pageY
        if (currentXCoord - this.startXCoord > this.moveGap) {
            Canvas.currentFigure?.changeFigureCoords('right')
            MusicPlayer.playQuickMoveAudio()
            this.startXCoord = currentXCoord
        } else if (currentXCoord - this.startXCoord < -this.moveGap) {
            Canvas.currentFigure?.changeFigureCoords('left')
            MusicPlayer.playQuickMoveAudio()
            this.startXCoord = currentXCoord
        } else if (currentYCoord - this.startYCoord > this.moveDownGap) {
            Canvas.currentFigure?.changeFigureCoords('down')
            this.startYCoord = currentYCoord
        }
    }
    
    static handleTouchEnd(event) {
        event.preventDefault()
        const date = new Date()
        const currentTime = date.getTime()
        const currentXCoord = event.changedTouches[0].pageX
        const currentYCoord = event.changedTouches[0].pageY 

        if (
            currentTime - this.touchStartTime < 150                      && 
            Math.abs(currentXCoord - this.startSlideCoordX) < 10         &&
            Math.abs(currentYCoord - this.startSlideCoordY) < 10
        ) 
        {
            Canvas.currentFigure?.changeFigureCoords('up')

        } else if (
            currentYCoord - this.startSlideCoordY > 15           && 
            currentYCoord - this.startSlideCoordY < 150          && 
            currentTime - this.touchStartTime > 50               && 
            currentTime - this.touchStartTime < 200              &&
            Canvas.currentFigure.shadowFigure.length > 0
        ) 
        {   

            Canvas.currentFigure.activeFigure = [...Canvas.currentFigure.shadowFigure]
            Canvas.currentFigure.shadowFigure = []
            Canvas.points += 50
            MusicPlayer.playFallSound()
        }
    }

    static assignListeners() {
        document.addEventListener('touchstart', this.handleTouchStart.bind(this))
        document.addEventListener('touchmove', this.handleTouchMove.bind(this))
        document.addEventListener('touchend', this.handleTouchEnd.bind(this))
    }
}

TouchEventsHandler.assignListeners()
Utils.setBackgroundUrl()
Utils.setCanvasSize()
Utils.renderBestResults()
Utils.startGame()
