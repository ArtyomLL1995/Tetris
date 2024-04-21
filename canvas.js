
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
        './Music/jazzy-background-beat.mp3'
    ]

    static backgroundImages = [
        './Images/1.jpeg', 
        './Images/2.jpeg', 
        './Images/3.jpeg', 
        './Images/4.jpeg', 
        './Images/5.jpeg', 
        './Images/6.jpeg',
        './Images/8.jpeg', 
        './Images/9.jpeg', 
        './Images/12.jpeg', 
        './Images/13.jpeg', 
        './Images/14.jpeg', 
        './Images/15.jpeg', 
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
        './Images/32.jpg', 
        './Images/33.jpg',
        './Images/34.jpg', 
        './Images/37.jpeg', 
        './Images/38.jpeg', 
        './Images/39.jpeg', 
        './Images/40.jpeg', 
        './Images/41.jpeg', 
        './Images/42.jpeg',
        './Images/43.png'
    ]

    static soundTrack
    static quickMoveSound
    static removeLinesSound
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
}

class musicPlayer {
    static initializeMusic(index) {
        Utils.soundTrack?.stop()
        Utils.soundTrack = new Howl({
            src: [Utils.music[index]],
            html5: true,
            volume : .5,
            onend : () => {
                if (index === Utils.music.length-1) {
                    setTimeout(() => {
                        musicPlayer.initializeMusic(0)
                    }, 1000)
                } else {
                    setTimeout(() => {
                        musicPlayer.initializeMusic(index+=1)
                    }, 1000)
                }
            }
        });

        const musicNameContainer = document.querySelector('.music-name')
        let songPath = Utils.music[index]
        songPath = songPath.substring('./Music/'.length);
        songPath = songPath.slice(0, -4);
        musicNameContainer.textContent = songPath

        Utils.soundTrack.play()
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
    
    static colors = ['#7DFA92', '#FFCF56', '#7CE577', '#7F0799', '#FF570A', '#3993DD', '#20A4F3', '#FF0080']
   
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
    static canvasWidth = Utils.canvasWidth
    static canvasHeight = Utils.canvasHeight
    static filledCoordsMap = new Map()
    static filledCoordsSorted = []
    static keyDirections = { 37: 'left', 38: 'up', 39: 'right', 40: 'down'}
    static currentFigure
    static nextFigure = FigureForms.getRandomFigure()
    static nextColor = FigureForms.getRandomColor()
    static currentColor
    static points = 0
    static level = 1
    static startSpeed =  1000
    static SPEED = this.startSpeed

    static initializeFigure() {
        this.currentFigure = this.nextFigure
        this.nextFigure = FigureForms.getRandomFigure()
        this.currentColor = this.nextColor
        this.nextColor = FigureForms.getRandomColor()
        const type = FigureForms.allFiguresMap.get(this.currentFigure)
        const startOffset = Utils.getRandomStartCoord(type)
        const newFigureCoords = this.currentFigure.map(obj => {
            return {x : obj.x + startOffset, y: obj.y}
        })
        const figure = new Figure(newFigureCoords, this.nextFigure, type, this.currentColor, this.nextColor)
        figure.initializeListener()
        figure.moveDown()
    }
}

class Figure {

    figurePosition = 'right'
    startAnimationTime = null
    createNewFigure = false
    direction
    quickMoveInterval = null
    pressTimer
    activeFigure
    nextFigureCoords
    type
    color

    constructor(newFigureCoords, nextFigureCoords, type, color, nextColor) {
        this.type = type
        this.activeFigure = newFigureCoords
        this.nextFigureCoords = nextFigureCoords
        this.color = color
        this.nextColor = nextColor
    }

    initializeListener() {
        document.addEventListener('keydown', this.moveFigure.bind(this))
        document.addEventListener('keyup', this.handleKeyUp.bind(this))
    }
   
    moveFigure(event) {
        const context = this
        const eventKeyCode = event.keyCode
        if (Canvas.keyDirections[eventKeyCode] === 'right') this.direction = 'right'
        else if (Canvas.keyDirections[eventKeyCode] === 'left') this.direction = 'left'
        else if (Canvas.keyDirections[eventKeyCode] === 'up') this.direction = 'up'
        else if (Canvas.keyDirections[eventKeyCode] === 'down') this.direction = 'down'
        this.changeFigureCoords(this.direction)
        if (this.direction !== 'up' && !this.pressTimer) {
            this.pressTimer = setTimeout(function() {
                context.quickMoveInterval = context.direction === 'down' ? context.quickMove(20) : context.quickMove(40)
            }, 25)
        }
        this.playQuickMoveAudio()
    }

    playQuickMoveAudio() {
        Utils.quickMoveSound?.stop();
        Utils.quickMoveSound = new Howl({
            src: ['sounds/quick_10.mp3'],
            volume : .5
        });
        Utils.quickMoveSound.play();
    }

    playRemoveLinesAudio() {
        Utils.removeLinesSound?.stop()
        Utils.removeLinesSound = new Howl({
            src: ['sounds/quick_5.wav'],
            volume : 1,
            rate : 1
        });
        Utils.removeLinesSound.play();
    }

    quickMove(speed) {
        clearInterval(this.quickMoveInterval)
        return setInterval(() => {
            this.changeFigureCoords(this.direction)
            if (this.direction !== 'down') {
                //this.playQuickMoveAudio()
            }
        }, speed)
    }

    handleKeyUp() {
        clearInterval(this.quickMoveInterval)
        clearTimeout(this.pressTimer)
        this.quickMoveInterval = null
        this.pressTimer = null
    }

    drawScore() {
        Canvas.scoreScreenCtx.clearRect(0,0,200,200)
        Canvas.scoreScreenCtx.font = '30px Jersey_25'
        Canvas.scoreScreenCtx.fillStyle = 'white'
        Canvas.scoreScreenCtx.fillText('LEVEL ' + Canvas.level, 0, 20, 200)
        Canvas.scoreScreenCtx.fillText('Points ' + Canvas.points, 0, 60, 200)
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

    drawFallenFigures() {
        Array.from(Canvas.filledCoordsMap.keys()).forEach(figure => {
            Canvas.ctx.fillStyle = Canvas.filledCoordsMap.get(figure)
            Canvas.ctx.fillRect(figure.x, figure.y, Utils.edgeSize, Utils.edgeSize)
        })
    }
    
    turnFigure(type) {
        const coordsCopy = this.activeFigure.map(figurepart => {
            return {...figurepart}
        })
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
                this.assignActiveFigure(coordsCopy)
            }
        }
    }

    assignActiveFigure(coordsCopy) {
        for (let i = 0; i < coordsCopy.length; i++) {
            this.activeFigure[i].x = coordsCopy[i].x
            this.activeFigure[i].y = coordsCopy[i].y
        }
    }

    redrawCanvas() {
        Canvas.ctx.clearRect(0,0, Canvas.canvasWidth, Canvas.canvasHeight)
        Canvas.childCtx.clearRect(0,0,130,100)
        this.drawNextFigure()
        this.drawFallenFigures()
        this.drawScore()
        this.drawFigure()
        this.drawShadowFigure()
    }

    moveDown() {

        const date = new Date
        this.redrawCanvas()

        if (!this.startAnimationTime) {
            this.startAnimationTime = date.getTime()
        } 

        if (date.getTime() - this.startAnimationTime > Canvas.SPEED) {
            if (!this.changeFigureCoords('down')) {
                this.createNewFigure = true
            } else {
                this.startAnimationTime = null
            }
        }

        if (this.createNewFigure) {
            if (this.activeFigure[0].y <= 0) {
                this.gameOver()
            } else {
                this.activeFigure.forEach(figure => {
                    Canvas.filledCoordsMap.set(figure, this.color)
                })
                this.activeFigure.length = 0
                Canvas.filledCoordsSorted = Array.from(Canvas.filledCoordsMap.keys()).sort((a,b) => a.y - b.y)
                this.tetrisCheck()
                Canvas.initializeFigure()
            }
        } else {
            requestAnimationFrame(() => this.moveDown())
        }
    }

    gameOver() {
        Canvas.ctx.globalAlpha = 0.5
        Canvas.ctx.fillStyle = 'grey'
        Canvas.ctx.fillRect(0, 0, Canvas.canvasWidth, Canvas.canvasHeight)
        Canvas.ctx.globalAlpha = 1
        Canvas.ctx.font = 'bold 24px Jersey'
        Canvas.ctx.fillStyle = 'white'
        Canvas.ctx.fillText('GAME', 90, 220, 200)
        Canvas.ctx.fillText('OVER', 90, 260, 200)
    }

    changeFigureCoords(direction) {
        let allowChangeCoords
        const coordsCopy = this.activeFigure.map(figure => {
            return {...figure}
        })
        switch (direction) {
            case 'down': 
                coordsCopy.forEach(figure => figure.y += Utils.edgeSize)
            break
            case 'up': 
                this.turnFigure(this.type)
            break
            case 'right': 
                coordsCopy.forEach(figure => figure.x += Utils.edgeSize)      
            break
            case 'left':  
                coordsCopy.forEach(figure => figure.x -= Utils.edgeSize)  
            break
        }
        if (!this.collisionCheck(coordsCopy) && direction !== 'up') {
            this.assignActiveFigure(coordsCopy)
            allowChangeCoords = true
        }
        return allowChangeCoords
    }

    drawShadowFigure() {
        const shadowCoords = this.calculateShadowCoords()
        if (shadowCoords[0].y > this.activeFigure[0].y + Utils.edgeSize) {
            shadowCoords.forEach(coord => {
                Canvas.ctx.fillStyle = 'rgba(225, 215, 220, 0.5)';
                Canvas.ctx.fillRect(coord.x, coord.y, Utils.edgeSize, Utils.edgeSize);
            });
        } 
    }

    calculateShadowCoords() {
        const shadowCoords = this.activeFigure.map(figure => {
            return {...figure}
        })
        while(!this.collisionCheck(shadowCoords)) {
            shadowCoords.forEach(coord => coord.y += Utils.edgeSize)
        }
        shadowCoords.forEach(coord => coord.y -= Utils.edgeSize)
        return shadowCoords
    }

    collisionCheck(nextFigurePositions) {
        for (let i = 0; i < nextFigurePositions.length; i++) {
            if (nextFigurePositions[i].y > Canvas.canvasHeight - Utils.edgeSize) {
                return true
            } else if (nextFigurePositions[i].x < 0 || nextFigurePositions[i].x > Canvas.canvasWidth - Utils.edgeSize) {
                return true
            } else if (Canvas.filledCoordsSorted.length > 0) {
                for (let j = 0; j < Canvas.filledCoordsSorted.length; j++) {
                    if (Canvas.filledCoordsSorted[j].y === nextFigurePositions[i].y && 
                        Canvas.filledCoordsSorted[j].x === nextFigurePositions[i].x) {
                        return true
                    }
                }
            }
        }
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
            if (value.length === Canvas.canvasWidth / Utils.edgeSize) {
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
            }, totalFuntTime);
            this.playRemoveLinesAudio()
        }

        Canvas.filledCoordsSorted = Array.from(Canvas.filledCoordsMap.keys()).sort((a,b) => a.y - b.y)
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
    Utils.shuffle(Utils.music)
    Canvas.initializeFigure()
    setTimeout(() => {
        musicPlayer.initializeMusic(0)
    }, 1000) 
}

Utils.setBackgroundUrl()
Utils.setCanvasSize()
