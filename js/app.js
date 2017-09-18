"use strict";
var CELL_WIDTH = 101;//每一个方块的宽度
var CELL_HEIGHT = 83;//每一个方块的高度
var k = 12;          //用于校准敌人在方块中的上下位置的系数

// 这是我们的玩家要躲避的敌人
var Enemy = function (x, y) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x = x;
    this.y = y;
    this.speed = this.getRandom();
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = "images/enemy-bug.png";
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function (dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += this.speed * dt;
    if (this.x > 600) {//敌人从右侧超出屏幕后
        this.x = -80;//从左侧回到地图中继续跑动
    }
    this.checkCollisions(player);//检查敌人有没有碰到玩家
};

Enemy.prototype.getRandom = function () {
    return Math.floor((Math.random() + 0.3) * 200);
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//玩家被敌人碰到后的检查机制
Enemy.prototype.checkCollisions = function (player) {
    if (Math.abs(player.x - this.x) < 70 && player.y - k === this.y) {//昆虫位置加上图片宽度检测图片是否与玩家重合
        if (player.lives > 1) {
            player.lives -= 1;
            document.querySelector(".lives").innerHTML = "Lives: " + player.lives;
            player.reset();
        } else {
            alert("GAME OVER");
            player.lives = 3;//恢复生命值
            player.score = 0;//得分清零
            document.querySelector(".lives").innerHTML = "Lives: " + player.lives;
            document.querySelector(".score").innerHTML = "Score: " + player.score;
            player.reset();//开始下一轮游戏
        }
    }
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function (x, y) {
    //传入x，y坐标
    this.x = x;
    this.y = y;
    this.sprite = "images/char-boy.png"; //玩家图片
    this.lives = 3;   //玩家生命数量
    this.score = 0; //玩家得分
};
Player.prototype.update = function () {
    //超出边界的检查
    this.outOfArea();
};
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (playerKeyCode) {
    var moveVerticalLength = CELL_HEIGHT;//每次纵向移动是一个地面方块的长度
    var moveHorizontalLength = CELL_WIDTH;//每次横向移动是一个地面方块的宽度
//    响应键盘指示移动小人
    switch (playerKeyCode) {
        case "left":
            this.x -= moveHorizontalLength;
            break;
        case "up":
            this.y -= moveVerticalLength;
            break;
        case "right":
            this.x += moveHorizontalLength;
            break;
        case "down":
            this.y += moveVerticalLength;
            break;
    }
    //观察每次移动坐标
    // console.log("POSITION:__X" + this.x + "POSITION:__Y" + this.y);
};

//防止玩家走出边界机制
Player.prototype.outOfArea = function () {
    if (this.x + CELL_WIDTH > CELL_WIDTH * 5) {//已经超越右边界
        this.x = 0;//穿越屏幕到达左边界
    }
    if (this.x < 0) {//已经超越左边界
        this.x = CELL_WIDTH * 4;//屏幕穿越到达右边界
    }
    if (this.y + CELL_HEIGHT > CELL_HEIGHT * 5) {//阻止玩家穿越下边界
        this.y = CELL_WIDTH * 4;
    }
    if (this.y <= 0) {
        // 过河成功后显示分数和生命剩余数量
        this.score += 100;
        document.querySelector(".score").innerHTML = "Score: " + this.score;
        this.reset();
    }
};

//重置玩家位置
Player.prototype.reset = function () {
    this.x = CELL_WIDTH * 2;
    this.y = CELL_HEIGHT * 4.7;
};

//随机数用来随机产生屏幕外敌人位置
var getRandomInt = function (min, max) {
    min = Math.ceil(Math.random());
    max = Math.floor(Math.random());
    return Math.floor(Math.random() * (max - min + 1) + min);
};
//  现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
//将敌人放置于方块中间，因此初始位置以72为准减掉一个系数
var myEnemy1 = new Enemy(0, 72 - k);
var myEnemy2 = new Enemy(0, 72 - k + CELL_HEIGHT);
var myEnemy3 = new Enemy(0, 72 - k + CELL_HEIGHT * 2);
var myEnemy4 = new Enemy(-getRandomInt(0, 20), 72 - k);
var myEnemy5 = new Enemy(-getRandomInt(0, 40), 72 - k + CELL_HEIGHT);
var myEnemy6 = new Enemy(-getRandomInt(0, 60), 72 - k + CELL_HEIGHT * 2);
var allEnemies = [myEnemy1, myEnemy2, myEnemy3, myEnemy4, myEnemy5, myEnemy6];

// 把玩家对象放进一个叫 player 的变量里面，传入Player起始位置
//地图宽度为方块X坐标序号，起始位置位于X轴中间
//地图长度为每块砖长度乘以系数，起始位置位于Y轴最顶端
var player = new Player(CELL_WIDTH * (5 - 1) / 2, CELL_HEIGHT * 4.7);

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});