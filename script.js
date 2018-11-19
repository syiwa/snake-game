var canvas = document.getElementById("canvas");
canvas.width = 450;
canvas.height = 450;

bg = canvas.getContext("2d");
bg.fillStyle = "black";
bg.clearRect(0, 0, canvas.width, canvas.height);

var step = 5;
var direction = "right";
var snake = [
    [50,200, direction],
    [39,200, direction],
    [28,200, direction],
];
var snakeBody = [];
var moveMemory = [];
var isStarted = false;

function drawRect(width,height,positionX, positionY, color){
    var rect = canvas.getContext("2d");
    rect.fillStyle = color;
    rect.fillRect(positionX,positionY, width, height);

    return rect;
}

function random(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawSnake(){
    for(let body of snake){
       snakeBody.push(drawRect(10,10,body[0],body[1],"green"));
    }
}

function onKeyboard(e) {
    var code = e.keyCode;
    switch (code) {
        case 37: turnSnake("left"); break; //Left key
        case 38: turnSnake("up"); break; //Up key
        case 39: turnSnake("right"); break; //Right key
        case 40: turnSnake("down"); break; //Down key
    }
}

function turnSnake(to){
    if(
        !(direction == 'left' && to == 'right') &&
        !(direction == 'right' && to == 'left') &&
        !(direction == 'up' && to == 'down') &&
        !(direction == 'down' && to == 'up')
    ){
        direction = to;
        snake[0][2] = direction;
        if(!isStarted){
            start();
        }
    }
}

function go(body, index, direction){
    if(index == 0){
        body[2] = direction;

    }else{
        let nextDirection;
        if(moveMemory.length - index - 1 >= 0){
            nextDirection = moveMemory[moveMemory.length - index - 1];
        }else{
            nextDirection = newBody[2];
        }
        body[2] = nextDirection;
    }
    newBody = body;
    switch(body[2]){
        case 'right': {
            var newBody = [
                body[0] + step,
                body[1],
                body[2]
            ];
        }break;
        
        case 'left': {
            var newBody = [
                body[0] - step,
                body[1],
                body[2]
            ];
        }break;

        case 'up': {
            var newBody = [
                body[0],
                body[1] - step,
                body[2]
            ];
        }break;

        case 'down': {
            var newBody = [
                body[0],
                body[1] + step,
                body[2]
            ];
        }break;
    };

    if(newBody[0] > canvas.width + step){
        newBody[0] = (step * -1) - index;
    }

    if(newBody[1] > canvas.height + step){
        newBody[1] = (step * -1) - index;
    }

    if(newBody[0] < 0 - step){
        newBody[0] = (step + canvas.width) + index;
    }

    if(newBody[1] < 0 - step){
        newBody[1] = (step + canvas.height) + index;
    }

    snakeBody[index].clearRect(body[0], body[1], 10, 10);

    snakeBody[index].fillStyle = "green";
    snakeBody[index].fillRect(newBody[0],newBody[1],10,10);

    snake[index] = newBody;

    if(index < snake.length - 1){
        setTimeout(go(snake[index + 1],index + 1, null),500);
    }
}

function runTheSnake(){
    moveMemory.push(snake[0][2]);
    go(snake[0],0, snake[0][2]);
}

function start(){
    isStarted = true;
    
    setInterval(runTheSnake, 100);
};

(function(){
    var food = drawRect(10,10, random(1,canvas.width), random(1, canvas.height),"red");
    drawSnake();

    window.addEventListener('keydown',this.onKeyboard,false);
}());