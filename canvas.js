class Utils {
    static edgeSize = 25
    static startPositions = [0, this.edgeSize, this.edgeSize*2, this.edgeSize*3, this.edgeSize*4, this.edgeSize*5, this.edgeSize*6, this.edgeSize*7]
    static getRandomStartCoord() {
        return this.startPositions[Math.floor(Math.random() * this.startPositions.length)]
    }
}

class FigureForms {

    static cube = [{x : 0, y : -(Utils.edgeSize*2)}, {x : Utils.edgeSize, y : -(Utils.edgeSize*2)}, {x : 0, y : -Utils.edgeSize}, {x : Utils.edgeSize, y : -Utils.edgeSize}]
    static line = [{x : 0, y : -(Utils.edgeSize)}, {x : Utils.edgeSize, y : -(Utils.edgeSize)}, {x : (Utils.edgeSize*2), y : -(Utils.edgeSize)}, {x : (Utils.edgeSize*3), y : -(Utils.edgeSize)}]
    static pyramid = [{x : Utils.edgeSize, y : -(Utils.edgeSize*2)}, {x : 0, y : -(Utils.edgeSize)}, {x : Utils.edgeSize, y : -(Utils.edgeSize)}, {x : (Utils.edgeSize*2), y : -(Utils.edgeSize)}]
    static hookLeft = [{x : 0, y : -(Utils.edgeSize*2)}, {x : 0, y : -(Utils.edgeSize)}, {x : Utils.edgeSize, y : -(Utils.edgeSize)}, {x : (Utils.edgeSize*2), y : -(Utils.edgeSize)}]
    static hookRight = [{x : (Utils.edgeSize*2), y : -(Utils.edgeSize*2)}, {x : 0, y : -(Utils.edgeSize)}, {x : Utils.edgeSize, y : -(Utils.edgeSize)}, {x : (Utils.edgeSize*2), y : -(Utils.edgeSize)}]
    static zigzagLeft = [{x : 0, y : -(Utils.edgeSize*2)}, {x : Utils.edgeSize, y : -(Utils.edgeSize*2)}, {x : Utils.edgeSize, y : -(Utils.edgeSize)}, {x : (Utils.edgeSize*2), y : -(Utils.edgeSize)}]
    static zigzagRight = [{x : Utils.edgeSize, y : -(Utils.edgeSize*3)}, {x : (Utils.edgeSize*2), y : -(Utils.edgeSize*3)}, {x : 0, y : -(Utils.edgeSize*2)}, {x : Utils.edgeSize, y : -(Utils.edgeSize*2)}]
    
    static colors2Level = ['rgb(125, 250, 146)', 'rgb(57, 250, 90)', 'rgb(15, 209, 47)', 'rgb(242, 134, 10)', 'rgb(247, 194, 134)', 'rgb(100, 168, 245)', 'rgb(153, 197, 247)']
   
    static allFiguresMap = new Map()
    
    static getRandomFigure() {
        this.allFiguresMap.set(this.line, 'line')
        this.allFiguresMap.set(this.cube, 'cube')
        this.allFiguresMap.set(this.pyramid, 'pyramid')
        this.allFiguresMap.set(this.hookLeft, 'hookLeft')
        this.allFiguresMap.set(this.hookRight, 'hookRight')
        this.allFiguresMap.set(this.zigzagLeft, 'zigzagLeft')
        this.allFiguresMap.set(this.zigzagRight, 'zigzagRight')
        return Array.from(this.allFiguresMap.keys())[Math.floor(Math.random() * Array.from(this.allFiguresMap.keys()).length)]
    }

    static getRandomColor() {
        const colors = this.colors2Level
        return colors[Math.floor(Math.random() * colors.length)]
    }
}


class Canvas {
    static canvas = document.getElementById("mainScreen")
    static ctx = this.canvas.getContext("2d")
    static child = document.getElementById("secondScreen")
    static childCtx = this.child.getContext("2d")
    static scoreScreen = document.getElementById("scoreScreen")
    static scoreScreenCtx = this.scoreScreen.getContext('2d')
    static canvasWidth = 275
    static canvasHeight = 500
    static filledCoordsMap = new Map()
    static filledCoordsSorted = []
    static filledCoordsSortedStr = []
    static keyDirections = { 37: 'left', 38: 'up', 39: 'right', 40: 'down'}
    static movingFigure
    static direction = 'down'
    static currentFigure
    static nextFigure = FigureForms.getRandomFigure()
    static nextColor = FigureForms.getRandomColor(this.level)
    static currentColor
    static points = 0
    static level = 1
    static startSpeed = 500
    static SPEED = this.startSpeed

    static initializeFigure() {
        const startOffset = Utils.getRandomStartCoord()
        this.currentFigure = this.nextFigure
        this.nextFigure = FigureForms.getRandomFigure()
        this.currentColor = this.nextColor
        this.nextColor = FigureForms.getRandomColor(this.level)
        const type = FigureForms.allFiguresMap.get(this.currentFigure)
        const newFigureCoords = JSON.parse(JSON.stringify(this.currentFigure)).map(obj => {
            return {x : obj.x + startOffset, y: obj.y}
        })
        const nextFigureCoords = this.changeNextFigureCoords()
        const figure = new Figure(newFigureCoords, nextFigureCoords, type, this.currentColor, this.nextColor)
        figure.initializeListener()
        figure.moveDown(this.direction)
    }

    static changeNextFigureCoords() {
        return JSON.parse(JSON.stringify(this.nextFigure)).map(coord => {
           return {x : coord.x, y : coord.y += 80} 
        })
    }
}

class Figure {
    figurePosition = 'right'
    startAnimationTime = null
    createNewFigure = false
    collision = false
    direction
    //animationFrameId
    constructor(newFigureCoords, nextFigureCoords, type, color, nextColor) {
        this.type = type
        this.activeFigure = newFigureCoords
        this.nextFigureCoords = nextFigureCoords
        this.color = color
        this.nextColor = nextColor
    }

    initializeListener() {
        document.addEventListener('keydown', this.moveFigure.bind(this))
    }
   
    moveFigure(event) {
        const eventKeyCode = event.keyCode
        if (Canvas.keyDirections[eventKeyCode] === 'right') this.direction = 'right'
        else if (Canvas.keyDirections[eventKeyCode] === 'left') this.direction = 'left'
        else if (Canvas.keyDirections[eventKeyCode] === 'up') this.direction = 'up'
        else if (Canvas.keyDirections[eventKeyCode] === 'down') this.direction = 'down'
        this.moveSide(this.direction)  
    }

    drawScore() {
        Canvas.scoreScreenCtx.clearRect(0,0,200,200)
        Canvas.scoreScreenCtx.font = '24px verdana'
        Canvas.scoreScreenCtx.fillStyle = 'white'
        Canvas.scoreScreenCtx.fillText('LEVEL ' + Canvas.level, 10, 20, 200)
        Canvas.scoreScreenCtx.fillText('Points ' + Canvas.points, 10, 60, 200)
    }

    drawFigure() {
        this.activeFigure.forEach(figure => {
            Canvas.ctx.fillStyle = this.color
            Canvas.ctx.strokeStyle = 'black'
            Canvas.ctx.fillRect(figure.x, figure.y, Utils.edgeSize, Utils.edgeSize)
            Canvas.ctx.strokeRect(figure.x, figure.y, Utils.edgeSize, Utils.edgeSize)
        })
    }

    drawNextFigure() {
        this.nextFigureCoords.forEach(figure => {
            Canvas.childCtx.fillStyle = this.nextColor
            Canvas.childCtx.strokeStyle = 'black'
            Canvas.childCtx.fillRect(figure.x, figure.y, Utils.edgeSize, Utils.edgeSize)
            Canvas.childCtx.strokeRect(figure.x, figure.y, Utils.edgeSize, Utils.edgeSize)
        })
    }

    drawFallenFigures() {
        Array.from(Canvas.filledCoordsMap.keys()).forEach(figure => {
            Canvas.ctx.fillStyle = Canvas.filledCoordsMap.get(figure)
            Canvas.ctx.strokeStyle = 'black'
            Canvas.ctx.fillRect(figure.x, figure.y, Utils.edgeSize, Utils.edgeSize)
            Canvas.ctx.strokeRect(figure.x, figure.y, Utils.edgeSize, Utils.edgeSize)
        })
    }

    
    turnFigure(type) {
        const coordsCopy = JSON.parse(JSON.stringify(this.activeFigure))
        if (coordsCopy.length > 0) {
            let newPosition
            if (type === 'line') {
                if (this.figurePosition === 'right') {
                    let x = coordsCopy[1].x
                    let y = coordsCopy[1].y - Utils.edgeSize * 2
                    coordsCopy.map(coord => {
                        coord.x = x
                        coord.y = y
                        y += Utils.edgeSize
                    })
                    newPosition = 'top'
                }   else {
                    let y = coordsCopy[2].y
                    let x = coordsCopy[2].x - Utils.edgeSize
                    coordsCopy.map(coord => {
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
            if (!this.collisionCheck('turn', coordsCopy) && !this.hitWallCheck('turn', coordsCopy)) {
                for (let i = 0; i < coordsCopy.length; i++) {
                    this.activeFigure[i].x = coordsCopy[i].x
                    this.activeFigure[i].y = coordsCopy[i].y
                }
                this.figurePosition = newPosition
            }
        }
    }

    moveDown() {
        const date = new Date
        if (!this.startAnimationTime) this.startAnimationTime = date.getTime()
        Canvas.childCtx.clearRect(0,0,300,100)
        Canvas.ctx.clearRect(0, 0, 300, 500)
        this.drawFallenFigures()
        this.drawNextFigure()
        this.drawScore()
        this.drawFigure()
        if (date.getTime() - this.startAnimationTime > Canvas.SPEED) {
            if (this.collision) {
                this.collisionCheck('down', this.activeFigure)
                if (this.collision) this.createNewFigure = true
            } 
            if (!this.createNewFigure) {
                this.startAnimationTime = null
                this.collisionCheck('down', this.activeFigure)
                this.changeFigureCoords('down') 
            }
        }
        if (!this.createNewFigure) {
            requestAnimationFrame(() => this.moveDown());
        } else {
            if (this.activeFigure[0].y <= 0) {
                console.log('Game over')
                this.gameOver()
            } else {
                this.activeFigure.forEach(figure => {
                    Canvas.filledCoordsMap.set(figure, this.color)
                })
                this.activeFigure.length = 0
                Canvas.filledCoordsSorted = Array.from(Canvas.filledCoordsMap.keys()).sort((a,b) => a.y - b.y)
                Canvas.filledCoordsSortedStr = Canvas.filledCoordsSorted.map(coord => JSON.stringify(coord))
                Canvas.initializeFigure()
                this.tetrisCheck()
            }
        }
    }

    gameOver() {
        Canvas.ctx.globalAlpha = 0.5
        Canvas.ctx.fillStyle = 'grey'
        Canvas.ctx.fillRect(0, 0, Canvas.canvasWidth, Canvas.canvasHeight)
        Canvas.ctx.globalAlpha = 1
        Canvas.ctx.font = 'bold 24px verdana'
        Canvas.ctx.fillStyle = 'white'
        Canvas.ctx.fillText('GAME', 100, 220, 200)
        Canvas.ctx.fillText('OVER', 100, 260, 200)
    }

    moveSide(direction) {
        this.activeFigure.forEach(figure => {
            Canvas.ctx.clearRect(figure.x, figure.y, Utils.edgeSize, Utils.edgeSize) 
        })
        this.changeFigureCoords(direction)
        this.drawFigure()
    }

    changeFigureCoords(direction) {
        switch (direction) {
            case 'down': if (!this.collisionCheck('down', this.activeFigure)) this.activeFigure.map(figure => figure.y += Utils.edgeSize)
            break
            case 'up': this.turnFigure(this.type)
            break
            case 'right': if (!this.hitWallCheck(direction, this.activeFigure) && !this.collision) this.activeFigure.map(figure => figure.x += Utils.edgeSize)            
            break
            case 'left':  if (!this.hitWallCheck(direction, this.activeFigure) && !this.collision) this.activeFigure.map(figure => figure.x -= Utils.edgeSize)
            break
        }
    }

    collisionCheck(direction, coords) {
        let collision
        const filledCoords = Canvas.filledCoordsSorted
        for (let i = 0; i < coords.length; i++) {
            if (collision === true) break
            for (let j = 0; j < filledCoords.length; j++) {
                if (coords[i].y + Utils.edgeSize === filledCoords[j].y && coords[i].x === filledCoords[j].x) {
                    collision = true
                    break 
                }
            }
            if (coords[i].y + Utils.edgeSize === Canvas.canvasHeight) {
                collision = true
                break 
            }
        }
        if (collision) {
            if (direction === 'down') this.collision = true
            return true
        } 
        return false
    }

    hitWallCheck(direction, coords) {
        let collision = false
        const filledCoordsStr = Canvas.filledCoordsSortedStr
        for (let i = 0; i < coords.length; i++) {
            if (direction === 'left' && coords[i].x === 0 || 
            direction === 'right' && coords[i].x === Canvas.canvasWidth - Utils.edgeSize ||
            direction === 'turn' && (coords[i].x < 0 || coords[i].x >= Canvas.canvasWidth)) {

            
            collision = true
            break
            } else if (Canvas.filledCoordsSorted[0] && coords[i].y >= Canvas.filledCoordsSorted[0].y) {
                if (direction === 'left' && filledCoordsStr.includes(JSON.stringify({x:coords[i].x - Utils.edgeSize, y: coords[i].y})) || 
                    direction === 'right' && filledCoordsStr.includes(JSON.stringify({x:coords[i].x + Utils.edgeSize, y: coords[i].y}))) {
                        
                    collision = true
                    break   
                }
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
            if (value.length === Canvas.canvasWidth / Utils.edgeSize) {
                value.forEach(v => Canvas.filledCoordsMap.delete(v))
                lowKey.push(key)
                moveDownFor += Utils.edgeSize
            }
        }

        Array.from(Canvas.filledCoordsMap.keys()).forEach(coord => {
            if (coord.y !== Canvas.canvasHeight - Utils.edgeSize) {
                lowKey.forEach(key => {
                    if (coord.y < key) coord.y += Utils.edgeSize
                })
            }
        })
        
        Canvas.filledCoordsSorted = Array.from(Canvas.filledCoordsMap.keys()).sort((a,b) => a.y - b.y)
        Canvas.filledCoordsSortedStr = Canvas.filledCoordsSorted.map(coord => JSON.stringify(coord))
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

Canvas.initializeFigure()




  



