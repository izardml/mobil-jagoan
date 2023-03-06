var myRoad
var leftField
var rightField

var myCar
var myObstacles = []

function startGame() {
    myGameArea.start()

    myRoad = new component(400, 1366, 'gray', 412, 0)
    leftField = new component(412, 1366, 'greenyellow', 0, 0)
    rightField = new component(212, 1366, 'greenyellow', 812, 0)

    myCar = new component(80, 160, 'red', 522, 1100)
}

var myGameArea = {
    canvas: document.createElement('canvas'),
    start: function() {
        this.canvas.width = 1024
        this.canvas.height = 1366
        this.canvas.style.backgroundColor = '#252525'
        this.context = this.canvas.getContext('2d')
        document.body.insertBefore(this.canvas, document.body.childNodes[0])
        this.frameNo = 0
        this.interval = setInterval(updateGameArea, 20)

        window.addEventListener('keydown', function(e) {
            myGameArea.keys = (myGameArea.keys || [])
            myGameArea.keys[e.keyCode] = true
        })
        window.addEventListener('keyup', function(e) {
            myGameArea.keys[e.keyCode] = false
        })
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    stop: function() {
        clearInterval(this.interval)
    }
}

function component(width, height, color, x, y) {
    this.width = width
    this.height = height
    this.x = x
    this.y = y
    this.update = function() {
        ctx = myGameArea.context
        ctx.fillStyle = color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x
        var myright = this.x + (this.width)
        var mytop = this.y
        var mybottom = this.y + (this.height)
        var otherleft = otherobj.x
        var otherright = otherobj.x + (otherobj.width)
        var othertop = otherobj.y
        var otherbottom = otherobj.y + (otherobj.height)
        var crash = true
        if((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false
        }
        return crash
    }
}

function updateGameArea() {
    for(i = 0; i < myObstacles.length; i++) {
        if(myCar.crashWith(myObstacles[i])) {
            myGameArea.stop()
        }
    }

    myGameArea.clear()
    myGameArea.frameNo++

    if(myGameArea.frameNo == 1 || everyinterval(80)) {
        var random = Math.floor(Math.random() * 4)
        x = [422, 522, 622, 722]

        myObstacles.push(new component(80, 160, 'green', x[random], -160))
    }

    myRoad.update()
    leftField.update()
    rightField.update()

    if(myGameArea.keys && myGameArea.keys[37]) { myCar.x -= 8 }
    if(myGameArea.keys && myGameArea.keys[39]) { myCar.x += 8 }
    
    for(i = 0; i < myObstacles.length; i++) {
        myObstacles[i].y += 5 * 2
        myObstacles[i].update()
    }

    myCar.update()
}

function everyinterval(n) {
    if((myGameArea.frameNo / n) % 1 == 0) {
        return true
    }
    return false
}