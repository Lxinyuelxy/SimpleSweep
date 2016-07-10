
# SimpleSweep

![截图](https://github.com/Lxinyuelxy/SimpleSweep/raw/master//jietu.PNG)


一个简易版6行*6列的扫雷，没有设置难度选择。这里有一个莫名其妙的坑就是在展开空白区域周围时（function nolandmine(row,col)），发现在递归的
过程的中两数字运算（i-1,i+1,j-1之类的）(如3+1)神不知鬼不觉得就变成了字符串("31"),进行parseInt会变成数字31，按理i和j一直都是数值，这里为
什么会出现字符串。望知道的人可以指点迷津一下，谢谢啦~
