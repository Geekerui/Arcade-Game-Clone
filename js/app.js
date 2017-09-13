"use strict";
// 这是我们的玩家要躲避的敌人
var Enemy = function (x, y, speed) {
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
    if (this.x > 500) {
        this.x = -80;
    }
};

Enemy.prototype.getRandom = function () {
    return Math.floor((Math.random() + 0.3) * 300);
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function (x, y) {
//传入x，y坐标
    this.x = x;
    this.y = y;
    this.sprite = "images/char-boy.png";
};
Player.prototype.update = function (dt) {
//TODO

};
Player.prototype.render = function () {
//TODO
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (playerKeyCode) {
    var moveVerticalLength = 90;
    var moveHorizontalLength = 100;
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

};

//TODO  现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
var myEnemy1 = new Enemy(0, 60);
var myEnemy2 = new Enemy(0, 140);
var myEnemy3 = new Enemy(0, 220);
var allEnemies = [myEnemy1, myEnemy2, myEnemy3];
// 把玩家对象放进一个叫 player 的变量里面
var player = new Player(200, 400);


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
