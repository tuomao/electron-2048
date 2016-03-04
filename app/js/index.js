'use strict';

var electron=require('electron');
var ipcRenderer=electron.ipcRenderer;

//初始化config
var conf=require('./js/conf');
var cell_color_conf=conf.read_conf('cell_color');
console.log(cell_color_conf);

//初始化game
var Game=require('./js/game');
var game=new Game();

//找到网页的元素
var cells=document.querySelectorAll('td');
var target=document.querySelector('.target')
var menu=document.querySelector('.div_menu');
var rank=document.getElementById('rank');
var best_score_item=document.getElementById('best_score');
var score=document.querySelector('.score');



//初始化game的数据
game.init();
game.show_info();
update_cell_contents();

//初始化最佳成绩
var best_score=localStorage.getItem('best_score');
if(best_score===null){
    best_score=0;
}
best_score_item.textContent=best_score;


menu.addEventListener('click',function() {
   console.log('123'); 
   test_notifier();
});

function reset_best_score(score){
    if(score>best_score){
        best_score=score;
        localStorage.setItem('best_score',best_score);
        best_score_item.textContent=best_score;
    }
}

function test_notifier(){
    const notifier = require('node-notifier');
// String
notifier.notify('Message');

}

function update_view(){
    
    //更新cells里面的内容
    update_cell_contents();
    
    //更新得分
    game.compute_score();
    score.textContent=game.score
    
    //游戏已经成功
    if(game.success()){
        
        console.log('success');
    }
    
    
    //游戏失败
    if(game.fail()){
        reset_best_score(game.score);
        console.log('fail');
    }
    game.create_new_number();
}


// up
ipcRenderer.on('up',function(){
    game.up();
    update_view();
});

//down
ipcRenderer.on('down',function(){
    game.down();
    update_view();
});

//left
ipcRenderer.on('left',function(){
    game.left();
    update_view();
});

//right
ipcRenderer.on('right',function(){
    game.right();
    update_view();
});

function update_cell_contents(){
    for(var i=0;i<game.width;i++){
        for(var j=0;j<game.height;j++){
            var cell=cells[i*game.width+j];
            cell.textContent=game.data[i][j];
           
            if(typeof cell_color_conf[game.data[i][j]] === 'undefined'){
                cell.style['background-color']=cell_color_conf["default"]['background'];
                cell.style['color']=cell_color_conf["default"]['color'];
            }else{
                cell.style['background-color']=cell_color_conf[game.data[i][j]]['background'];
                cell.style['color']=cell_color_conf[game.data[i][j]]['color'];
            }
        }
    }
}