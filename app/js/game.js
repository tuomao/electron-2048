
function Game(){
    this.SUCCESS_NUMBER=2048;

    this.init=function(){
        this.width=4;
        this.height=4;
        this.score=0;//得分
        this.data=[];
        for(var i=0;i<this.height;i++){
            var temp=[];
            for (var j=0;j<this.width;j++){
                temp[j]=0;
            }
            this.data[i]=temp;
        }

        //一开始要初始化两个随机数
        this.create_new_number();
        this.create_new_number();
    }
    
    this.left=function(){
        
        for(var raw=0;raw<this.height;raw++){
            var col=0;
            var k=0;
            var flag=false;
            while(col<this.width){
                if(this.data[raw][col]!=0){
                    if(k>0 && this.data[raw][col]===this.data[raw][k-1] && flag===false){
                        this.data[raw][k-1]=this.data[raw][col]*2;
                        flag=true;
                    }
                    else{
                        this.data[raw][k]=this.data[raw][col];
                        k=k+1;
                    }
                }
                col=col+1;
            }
            for (var l=k;l<this.width;l++){
                this.data[raw][l]=0;
            }
        }
    }
    
    this.right=function(){
        for(var raw=0;raw<this.height;raw++){
            var col=this.width-1;
            var k=this.width-1;
            var flag=false;
            while(col>-1){
                if(this.data[raw][col]!=0){
                    if(k<this.width-1 && this.data[raw][col]===this.data[raw][k+1] && flag===false){
                        this.data[raw][k+1]=this.data[raw][col]*2;
                        flag=true;
                    }
                    else{
                        this.data[raw][k]=this.data[raw][col];
                        k=k-1;
                    }
                }
                col=col-1;
            }
            for (var l=0;l<k+1;l++){
                this.data[raw][l]=0;
            }
        }
    } 
      
    this.up=function(){
        for(var col=0;col<this.width;col++){
            var raw=0;
            var k=0;
            var flag=false;
            while(raw<this.height){
                if(this.data[raw][col]!=0){
                    if(k>0 && this.data[raw][col]===this.data[k-1][col] && flag===false){
                        this.data[k-1][col]=this.data[raw][col]*2;
                        flag=true;
                    }
                    else{
                        this.data[k][col]=this.data[raw][col];
                        k=k+1;
                    }
                }
                raw=raw+1;
            }
            for (var l=k;l<this.height;l++){
                this.data[l][col]=0;
            }
        }
    } 
    
    this.down=function(){
        
        for(var col=0;col<this.width;col++){
            var raw=this.height-1;
            var k=this.height-1;
            var flag=false;
            while(raw>-1){
                if(this.data[raw][col]!=0){
                    if(k<this.height-1 && this.data[raw][col]===this.data[k+1][col] && flag===false){
                        this.data[k+1][col]=this.data[raw][col]*2;
                        flag=true;
                    }
                    else{
                        this.data[k][col]=this.data[raw][col];
                        k=k-1;
                    }
                }
                raw=raw-1;
            }

            for (var l=0;l<k+1;l++){
                this.data[l][col]=0;
            }
        }
    } 
    
    /*
   返回新生成的数字所在的坐标，如果没有地方可以生成，就返回null
    */
    this.create_new_number=function(){
        
        // 选择一个未填充的块
        var unuse_item=[];
        for(var i=0;i<this.width;i++){
            for(var j=0;j<this.height;j++){
                if(this.data[i][j]===0){
                    unuse_item.push([i,j]);
                }
            }
        }
        
        // 如果还有空白的格子，就生成新的数字
        if(unuse_item.length>0){
            var choice_item=unuse_item[Math.floor(Math.random()*unuse_item.length)];
            
            // 生成随机数字
            var numbers=[2,4,8];
            var choice_number=numbers[Math.floor(Math.random()*numbers.length)];
            this.data[choice_item[0]][choice_item[1]]=choice_number;
            return choice_item;
        }
        return null;
    }
    
    // 判断游戏是否已经失败了
    this.fail=function(){
        for(var i=0;i<this.width;i++){
            for(var j=0;j<this.height;j++){
                if(this.data[i][j]===0){
                    return false;
                }else if(i<this.width-1 && this.data[i][j]===this.data[i+1][j]){
                    return false;
                }else if(this.height-1 && this.data[i][j]===this.data[i][j+1]){
                    return false;
                }
            }
        }
        return true;
    }
    
    //计算游戏的得分
    this.compute_score=function(){
        for (var i=0;i<this.width;i++){
            for(var j=0;j<this.height;j++){
                if(this.data[i][j]>this.score){
                    this.score=this.data[i][j];
                }
            }
        }
    }
    
    //判断游戏已经达成目标
    this.success=function(){
        if(this.score>=this.SUCCESS_NUMBER){
            return true;
        }
        return false;
    }
    

    this.show_info=function(){
        for(var i=0;i<this.width;i++){
            for(var j=0;j<this.height;j++){
                process.stdout.write(this.data[i][j]+' ');
            }
            process.stdout.write('\n');
        }
        process.stdout.write('\n');
    }

}

module.exports=Game;

//var game=new Game();
//game.init();
//game.data=[[8,0,0,8],[4,0,0,0],[4,2,4,0],[16,32,4,8]];
//game.show_info();
//
//
//var readline=require('readline');
//var rl = readline.createInterface({
//    input: process.stdin,
//    output: process.stdout
//});
//
//rl.on('line',function(cmd){
//    if(cmd=='w'){
//        game.up();
//        game.check();
//        game.create_new_number();
//        game.show_info();
//    }else if(cmd=='s'){
//
//        game.down();
//        game.check();
//        game.create_new_number();
//        game.show_info();
//    }else if(cmd=='a'){
//        game.left();
//        game.check();
//        game.create_new_number();
//        game.show_info();
//    }else if(cmd=='d'){
//        game.right();
//        game.check();
//        game.create_new_number();
//        game.show_info();
//    }
//});
