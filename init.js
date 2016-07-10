var cell= new Array();
var play=true;
var tt;

function cell_ex(){  
	this.selected=false;
	this.num=0;
	this.rbuttondown=false;
}


$(document).ready(function() {
	for(var i=0;i<6;i++){     //6行*6列
		cell[i] = new Array();
		for(var j=0;j<6;j++){
			cell[i][j]=new cell_ex();
		}
	}
	start();
	action();
});

function start(){
	for(var i=0;i<8;i++){ //在随机位置产生雷，产生不重复随机数的情况下是8个雷
		var row=Math.floor(Math.random() * 6);
		var col=Math.floor(Math.random() * 6);
		console.log("row="+row+",col="+col);
		cell[row][col].num=9;
	}
	
	for(var i=0;i<6;i++){
		for(var j=0;j<6;j++){
			if(cell[i][j].num<9){
			if((i-1)>=0&&(j-1)>=0&&cell[i-1][j-1].num==9)  cell[i][j].num++;
			if((i+1)<=5&&(j-1)>=0&&cell[i+1][j-1].num==9)  cell[i][j].num++;
			if((i-1)>=0&&(j+1)<=5&&cell[i-1][j+1].num==9)  cell[i][j].num++;
			if((i+1)<=5&&(j+1)<=5&&cell[i+1][j+1].num==9)  cell[i][j].num++;
			if((j-1)>=0&&cell[i][j-1].num==9)  cell[i][j].num++;
			if((j+1)<=5&&cell[i][j+1].num==9)  cell[i][j].num++;
			if((i-1)>=0&&cell[i-1][j].num==9)  cell[i][j].num++;
			if((i+1)<=5&&cell[i+1][j].num==9)  cell[i][j].num++;				
		    }	
			console.log("cell["+i+"]["+j+"].num="+cell[i][j].num);
		}
	}
}

function action(){
	$('td[id^="cell_"]').bind("contextmenu",function(e){//屏蔽鼠标右键出现的菜单
        return false;
     });
	 
	$('td[id^="cell_"]').mousedown(function(e){

		var id=$(this).attr('id');
		var digits=id.slice(5).split('_');  //获取到被点击格子的行和列
		console.log("i="+digits[0]+",j="+digits[1]);
		var row=digits[0],
			col=digits[1];
				
		if(e.button === 0) { //鼠标左键点击
			if(!cell[row][col].selected){
				cell[row][col].selected=true;
				
				if(cell[row][col].num===0){
					tt=0;
					showcell(row,col);
					nolandmine(row,col);
				}				
				else if(cell[row][col].num===9){
					for(var i=0;i<6;i++){
						for(var j=0;j<6;j++){
							showcell(i,j);
						}
					}
					gameover();
				}
				else{
					showcell(row,col);
				}
				
			}
			if(iswin()){
				alert("you win!");
			}
		
		}
    
		if(e.button === 2) {  //鼠标右键点击
			if(!cell[row][col].selected&&!cell[row][col].rbuttondown){
				$('#cell_'+row+'_'+col).html("<image src='./flag.png'>");
			}
			if(!cell[row][col].selected&&cell[row][col].rbuttondown){
				$('#cell_'+row+'_'+col).html("");
			}
			cell[row][col].rbuttondown=!cell[row][col].rbuttondown;
		}
	});
}



function showcell(i,j){
	//if(play){
		cell[i][j].selected=true;
		var number=cell[i][j].num;
		if(number===0){  //遇到0的将其周围全部显示
			$('#cell_'+i+'_'+j).css("background-color","#AAA");
		}
		if(number===9){
			$('#cell_'+i+'_'+j).html("<image src='./mine.png'>");
		}
		if(number!==0&&number!==9){
			$('#cell_'+i+'_'+j).text(cell[i][j].num);
		    $('#cell_'+i+'_'+j).css("background-color","#AAA");

		}
	//}
	
}
        

function nolandmine(row,col){
	tt++;
	var i=row,j=col;
	showcell(i,j);
	console.log("iiiii="+i+",jjjj="+j);
	
    var a=parseInt(i-1), b=parseInt(j-1);//一个莫名其妙的坑就是两数字运算(如3+1)神不知鬼不觉得就变成了字符串("31"),然后parseInt会变成数字31
	a=Math.floor(a/10+a%10);b=Math.floor(b/10+b%10);
	console.log(tt+".i-1="+(a)+",j-1="+(b));
	console.log(typeof (a)+","+typeof (b));
	if((a)>=0&&(b)>=0&&!cell[a][b].selected){
		showcell(a,b);
		if(cell[a][b].num===0){
			nolandmine(a,b);
		}		
	}
	
	a=parseInt(i+1); b=parseInt(j-1);
	a=Math.floor(a/10+a%10);b=Math.floor(b/10+b%10);
	console.log(tt+".i+1="+(a)+",j-1="+(b));
	console.log(typeof (a)+","+typeof (b));
	if((a)<=5&&(b)>=0&&!cell[a][b].selected){   
		showcell(a,b);
		if(cell[a][b].num===0){
			nolandmine(a,b);
		}	
	}
	
	a=parseInt(i-1); b=parseInt(j+1);
	a=Math.floor(a/10+a%10);b=Math.floor(b/10+b%10);
	console.log(tt+".i-1="+(a)+",j+1="+(b));
	console.log(typeof (a)+","+typeof (b));
	if((a)>=0&&(b)<=5&&!cell[a][b].selected){     
		showcell(a,b);
		if(cell[a][b].num===0){
			nolandmine(a,b);
		}	
	}
	
	a=parseInt(i+1); b=parseInt(j+1);
	a=Math.floor(a/10+a%10);b=Math.floor(b/10+b%10);
	console.log(tt+".i+1="+(a)+",j+1="+(b));
	console.log(typeof (a)+","+typeof (b));
	if((a)<=5&&(b)<=5&&!cell[a][b].selected){      
		showcell(a,b);
		if(cell[a][b].num===0){
			nolandmine(a,b);
		}		
	}
	
	a=parseInt(i); b=parseInt(j-1);
	a=Math.floor(a/10+a%10);b=Math.floor(b/10+b%10);
	console.log(tt+".i="+(a)+",j-1="+(b));
	console.log(typeof (a)+","+typeof (b));
	if((b)>=0&&!cell[a][b].selected){
		showcell(a,b);
		if(cell[a][b].num===0){
			nolandmine(a,b);
		}	
	}
	
	a=parseInt(i); b=parseInt(j+1);
	a=Math.floor(a/10+a%10);b=Math.floor(b/10+b%10);
	console.log(tt+".i="+(a)+",j+1="+(b));
	console.log(typeof (a)+","+typeof (b));
	if((b)<=5&&!cell[a][b].selected){
		showcell(a,b);
		if(cell[a][b].num===0){
			nolandmine(a,b);
		}	
	}
	
	a=parseInt(i-1); b=parseInt(j);
	a=Math.floor(a/10+a%10);b=Math.floor(b/10+b%10);
	console.log(tt+".i-1="+(a)+",j="+(b));
	console.log(typeof (a)+","+typeof (b));
	if((a)>=0&&!cell[a][b].selected){
		showcell(a,b);
		if(cell[a][b].num===0){
			nolandmine(a,b);
		}	
	}
	
	a=parseInt(i+1); b=parseInt(j);
	a=Math.floor(a/10+a%10);b=Math.floor(b/10+b%10);
	console.log(tt+".i+1="+(a)+",j="+(b));
	console.log(typeof (a)+","+typeof b);
	if((a)<=5&&!cell[a][b].selected){
		showcell(a,b);
		if(cell[a][b].num===0){
			nolandmine(a,b);
		}	
	}
}

function gameover(){
	play=false;
	setTimeout(function(){alert("you lose!")},500);
}

function iswin(){
	if(play){
		for(var i=0;i<6;i++){
			for(var j=0;j<6;j++){
				if(cell[i][j].num===9) continue;
				else{
					if(cell[i][j].selected===false){
						return false;
					}
				}
			
			}
		}
		return true;
	}
	else return false;	
}
