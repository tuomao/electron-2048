#electron-2048

electron-2048是一个基于[electron](https://github.com/atom/electron)的桌面版本的2048游戏。我也是初学基于nodejs和electron来写桌面应用程序，写该简单的游戏是为了对electron有一个简单的入门。

主要用到了electron的一下几个特征：

1. 快捷键[globalShortcut](https://github.com/atom/electron/blob/master/docs/api/global-shortcut.md)
2. 进程间通信，ipcMain和ipcRenderer，远程过程调用remote。
3. 基于浏览器的数据持久化localStroage。

界面截图：

![运行主界面](http://7xrjbo.com1.z0.glb.clouddn.com/hhh.png)

#快速使用
	
	git clone https://github.com/tuomao/electron-2048.git
	npm install
	npm start




