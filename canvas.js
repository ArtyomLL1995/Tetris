
class Utils {

    static edgeSize = 25

    static lineStartPositions = [0, this.edgeSize, this.edgeSize*2, this.edgeSize*3, this.edgeSize*4, this.edgeSize*5, this.edgeSize*6]
    static hookStartPositions = [0, this.edgeSize, this.edgeSize*2, this.edgeSize*3, this.edgeSize*4, this.edgeSize*5, this.edgeSize*6, this.edgeSize*7]
    static cubeStartPositions = [0, this.edgeSize, this.edgeSize*2, this.edgeSize*3, this.edgeSize*4, this.edgeSize*5, this.edgeSize*6, this.edgeSize*7, this.edgeSize*8]
    
    static getRandomStartCoord(figureType) {
        if (figureType === 'line') {
            return this.lineStartPositions[Math.floor(Math.random() * this.lineStartPositions.length)]
        } else if (figureType === 'cube') {
            return this.cubeStartPositions[Math.floor(Math.random() * this.cubeStartPositions.length)]
        } else {
            return this.hookStartPositions[Math.floor(Math.random() * this.hookStartPositions.length)]
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
        './Images/2.jpeg', 
        './Images/3.jpeg', 
        './Images/4.jpeg', 
        './Images/5.jpeg', 
        './Images/6.jpeg',
        './Images/8.jpeg', 
        './Images/9.jpeg',  
        './Images/13.jpeg', 
        './Images/14.jpeg', 
        './Images/19.jpeg',
        './Images/18.jpeg', 
        './Images/16.jpeg', 
        './Images/20.webp', 
        './Images/22.jpeg', 
        './Images/23.jpeg', 
        './Images/24.jpeg', 
        './Images/25.jpeg',
        './Images/26.jpeg', 
        './Images/27.jpeg', 
        './Images/28.jpeg', 
        './Images/29.jpeg', 
        './Images/31.jpg',  
        './Images/33.jpg',
        './Images/37.jpeg', 
        './Images/38.jpeg', 
        './Images/39.jpeg', 
        './Images/40.jpeg', 
        './Images/41.jpeg'
    ]

    static canvasWidth = this.edgeSize * 10
    static canvasHeight = this.edgeSize * 20

    static setCanvasSize() {
        const canvas = document.getElementById("mainScreen")
        const childCanvas = document.getElementById("secondScreen")
        const scroreScreen = document.getElementById("scoreScreen")
        canvas.width = this.canvasWidth
        canvas.height = this.canvasHeight
        childCanvas.width = this.edgeSize * 4
        childCanvas.height = this.edgeSize * 2
        scroreScreen.width = this.edgeSize * 10
        scroreScreen.height = this.edgeSize * 5
        const childBlock = document.getElementById("child")
        childBlock.style.right = `-${childCanvas.offsetWidth+50}px`
        const scroreBlock = document.getElementById("score")
        scroreBlock.style.top = `${childCanvas.offsetHeight+50}px`
        scroreBlock.style.right = `-${scroreBlock.offsetWidth+50}px`
    }

    static setBackgroundUrl() {
        const url = this.backgroundImages[Math.floor(Math.random()*this.backgroundImages.length)]
        document.body.style.backgroundImage = `url(${url})`
        document.body.style.backgroundSize = 'cover'
    }

    static changeOpacity(inputString, newOpacity) {
        const rgbaRegex = /^rgba?\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)$/;
        const match = inputString.match(rgbaRegex);
        const red = match[1];
        const green = match[2];
        const blue = match[3];
        const modifiedString = 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + newOpacity + ')';
        return modifiedString;
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
        './Music/phonk.mp3'
    ]

    static soundTrack
    static quickMoveSound
    static removeLinesSound
    static fallSound

    static playSoundTrack(index) {
        this.soundTrack?.stop()
        this.soundTrack = new Howl({
            src: [this.music[index]],
            html5: true,
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
        });

        const musicNameContainer = document.querySelector('.music-name')
        let songPath = this.music[index]
        songPath = songPath.substring('./Music/'.length);
        songPath = songPath.slice(0, -4);
        musicNameContainer.textContent = songPath

        this.soundTrack.play()
    } 

    static playFallSound() {
        this.fallSound?.stop()
        this.fallSound = new Howl({
            src: ['sounds/punch.wav'],
            volume: 1
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
            volume : 1,
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

    static colorOpacity = 1
    
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
   
    static allFiguresMap = new Map()

    static populateFiguresMap() {
        if (this.allFiguresMap.size === 0) {
            this.allFiguresMap
            .set(this.line, 'line')
            .set(this.cube, 'cube')
            .set(this.pyramid, 'pyramid')
            .set(this.hookLeft, 'hookLeft')
            .set(this.hookRight, 'hookRight')
            .set(this.zigzagLeft, 'zigzagLeft')
            .set(this.zigzagRight, 'zigzagRight')
        }
    }
    
    static getRandomFigure() {
        this.populateFiguresMap()
        return Array.from(this.allFiguresMap.keys())[Math.floor(Math.random() * Array.from(this.allFiguresMap.keys()).length)]
    }

    static getRandomColor() {
        return this.colors[Math.floor(Math.random() * this.colors.length)]
    }
}

class Canvas {

    static canvas = document.getElementById("mainScreen")
    static ctx = this.canvas.getContext("2d")
    static child = document.getElementById("secondScreen")
    static childCtx = this.child.getContext("2d")
    static scoreScreen = document.getElementById("scoreScreen")
    static scoreScreenCtx = this.scoreScreen.getContext('2d')
    static filledCoordsMap = new Map()
    static keyDirections = { 37: 'left', 38: 'up', 39: 'right', 40: 'down', 32: 'space' }
    static currentFigureCoords
    static nextFigureCoords = FigureForms.getRandomFigure()
    static nextColor = FigureForms.getRandomColor()
    static currentColor
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

        this.currentFigure = new Figure(newFigureCoords, this.nextFigureCoords, type, this.currentColor, this.nextColor)

        if (this.currentFigure.collisionCheck(newFigureCoords)) {
            console.log('game over')
            this.gameOver()
        } else {
            this.currentFigure.initializeListener()
            this.currentFigure.moveDown()
            this.currentFigure.calculateShadowCoords()
            Canvas.childCtx.clearRect(0,0,130,100)
            this.currentFigure.drawNextFigure()
        }
    }

    static drawFallenFigures() {
        Array.from(this.filledCoordsMap.keys()).forEach(figure => {
            this.ctx.fillStyle = this.filledCoordsMap.get(figure)
            this.ctx.fillRect(figure.x, figure.y, Utils.edgeSize, Utils.edgeSize)
        })
    }

    static drawScore() {
        this.scoreScreenCtx.clearRect(0,0,200,200)
        this.scoreScreenCtx.font = '30px Jersey_25'
        this.scoreScreenCtx.fillStyle = 'white'
        this.scoreScreenCtx.fillText('LEVEL ' + this.level, 0, 20, 200)
        this.scoreScreenCtx.fillText('Points ' + this.points, 0, 60, 200)
    }

    static redrawCanvas() {
        this.ctx.clearRect(0,0, Utils.canvasWidth, Utils.canvasHeight)
        this.drawFallenFigures()
        this.drawScore()
        this.currentFigure.drawFigure()
        this.currentFigure.drawShadowFigure()
        this.canvasRequestAnimationFrameId = requestAnimationFrame(() => this.redrawCanvas())
    }

    static gameOver() {
        document.querySelector('.game-over-screen').style.display = 'flex'
    }
}

class Figure {

    figurePosition = 'right'
    startMoveDownAnimationTime
    startChangeColorAnimationTime
    direction
    quickMoveInterval
    requestAnimationFrameId
    createNewFigureTimeout
    pressTimer
    shadowFigure = []
    activeFigure
    nextFigureCoords
    type
    color
    boundKeyUp
    boundHeyDown

    constructor(newFigureCoords, nextFigureCoords, type, color, nextColor) {
        this.type = type
        this.activeFigure = newFigureCoords
        this.nextFigureCoords = nextFigureCoords
        this.color = color
        this.nextColor = nextColor
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
        const context = this
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
            this.pressTimer = setTimeout(function() {
                if (eventKeyCode === 'down') {
                    context.quickMoveInterval = context.quickMove(20) 
                } else if (eventKeyCode === 'space') {     
                    context.quickMoveInterval = context.quickMove(5) 
                    context.shadowFigure = []
                    MusicPlayer.playFallSound()
                } else if (eventKeyCode === 'right' || eventKeyCode === 'left') {
                    context.quickMoveInterval = context.quickMove(40) 
                }
            }, 25)
        }
    }

    quickMove(speed) {
        clearInterval(this.quickMoveInterval)
        return setInterval(() => {
            if (this.changeFigureCoords(this.direction) && this.direction !== 'down') {
                MusicPlayer.playQuickMoveAudio()
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

    drawNextFigure() {
        this.nextFigureCoords.forEach(figure => {
            Canvas.childCtx.fillStyle = this.nextColor
            Canvas.childCtx.fillRect(figure.x, figure.y, Utils.edgeSize, Utils.edgeSize)
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

        const duration = 500
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

    createNewFigureTimeOutId

    moveDown() {

        const date = new Date

        if (!this.startMoveDownAnimationTime) {
            this.startMoveDownAnimationTime = date.getTime()
        } 

        if (date.getTime() - this.startMoveDownAnimationTime > Canvas.SPEED) {
            if (!this.changeFigureCoords('down') && !this.createNewFigureTimeOutId) {
                this.createNewFigureTimeOutId = setTimeout(() => this.createNewFigure(), 500) 
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
            if (!this.collisionCheck(coordsCopy) && direction !== 'up') {
                this.activeFigure = [...coordsCopy]
                allowChangeCoords = true
            }
            if (direction === 'left' || direction === 'right') {
                this.calculateShadowCoords()
            }
        }
        return allowChangeCoords
    }

    calculateShadowCoords() {
        const shadowCoords = this.activeFigure.map(figure => {
            return {...figure}
        })
        let counter = 0
        while(!this.collisionCheck(shadowCoords) && counter < 20) {
            counter++
            shadowCoords.forEach(coord => coord.y += Utils.edgeSize)
        }
        shadowCoords.forEach(coord => coord.y -= Utils.edgeSize)
        this.shadowFigure = shadowCoords
    }

    allowChangeColor = true

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
                this.createNewFigureTimeOutId = setTimeout(() => this.createNewFigure(), 500) 
            }
        }
        return collision
    }

    tetrisCheck() {

        const allRows = {}
        let moveDownFor = 0
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
                moveDownFor += Utils.edgeSize
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
        const totalFuntTime = funcInterval * Utils.edgeSize

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
            }, totalFuntTime);
            MusicPlayer.playRemoveLinesAudio()
        } else {
            Canvas.initializeNewFigure()
        }

        Canvas.points += this.calculatePoints(moveDownFor)
        Canvas.level = (Math.ceil(Canvas.points / 5000) === 0 ? 1 : Math.ceil(Canvas.points / 5000))
        Canvas.SPEED = Canvas.startSpeed - (50 * (Canvas.level - 1))

    }

    calculatePoints(moveDownFor) {
        let points
        if (moveDownFor === (4 * Utils.edgeSize)) points = moveDownFor * 40
        else if (moveDownFor === (3 * Utils.edgeSize)) points = moveDownFor * 30
        else if (moveDownFor === (2 * Utils.edgeSize)) points = moveDownFor * 20
        else points = moveDownFor * 10
        return points
    }
}

function startGame() {
    document.querySelector('.game-over-screen').style.display = 'none'
    Utils.shuffle(MusicPlayer.music)
    Canvas.filledCoordsMap.clear()
    Canvas.initializeNewFigure()
    Canvas.redrawCanvas()
    setTimeout(() => {
        MusicPlayer.playSoundTrack(0)
    }, 1000) 
}

Utils.setBackgroundUrl()
Utils.setCanvasSize()
