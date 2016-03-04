/**
 * Created by tuomao on 2016/3/2.
 */
'use strict'

var electron=require('electron');
var app=electron.app;
var BrowserWindow=electron.BrowserWindow;
var ipcMain=electron.ipcMain;
var globalShortcut=electron.globalShortcut;

var main_window=null;

global.__base=__dirname+'/';

app.on('ready',function(){
    
    main_window=new BrowserWindow({
        height:680,
        resizable:true,
        width:460
    });
    
   
    console.log('123');
    main_window.loadURL('file://'+__dirname+'/app/index.html');
    
    main_window.on('focus',function(){
        set_global_shortcuts();
    });
    main_window.on('blur',function(){
       globalShortcut.unregisterAll(); 
    });
    
    set_global_shortcuts();
    main_window.webContents.openDevTools();
    //test_tray();
    test_notifier();
});


function test_tray(){
  const Menu = electron.Menu;
  const Tray = electron.Tray;
  var path=require('path');
  var appIcon = new Tray(path.join(__dirname,'app/res/img/app-icon.png'));
  
  var contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ]);
  appIcon.setToolTip('This is my application.');
  appIcon.setContextMenu(contextMenu);
}


function set_global_shortcuts(){
    
    globalShortcut.register('Up',function(){
        main_window.webContents.send('up');
    });
    globalShortcut.register('Down',function(){
        main_window.webContents.send('down')
    });
    globalShortcut.register('Left',function(){
        main_window.webContents.send('left')
    });
    globalShortcut.register('Right',function(){
        main_window.webContents.send('right')
    });
    
}

app.on('window-all-closed', function() {
    app.quit();
});