import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import Gastos from './model/store/gastos';
import Annotations from './model/store/anotacoes';
import fs from 'fs';
import { GastosType, ImportFile } from './model/gastosType';
import { fileShow, fileWrite } from './database';
import LogServer from './service/logService';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('getAnnotations', async (event, arg) => {
  Annotations.getAnnotations(arg[0]).then(resp => {
    event.reply('getAnnotations', resp);
  })
  .catch(err => {
    LogServer.LogFile('getAnnotations ' + err, 'Error');
  });
});

ipcMain.on('insertAnnotations', async (event, arg) => {
  Annotations.insertAnnotations(arg[0], arg[1])
  .catch(err => {
    LogServer.LogFile('insertAnnotations ' + err, 'Error');
  });
});

ipcMain.on('deleteAnnotations', async (event, arg) => {
  Annotations.deleteAnnotations(arg[0])
  .catch(err => {
    LogServer.LogFile('deleteAnnotations '+err, 'Error');
  });
});

ipcMain.on('getData', async (event, arg) => {
  Gastos.getData().then(resp => {
    event.reply('getData', resp);
  })
  .catch(err => {
    LogServer.LogFile('getData '+err, 'Error');
  });
});

ipcMain.on('insertData', async (event, arg) => {
  Gastos.insertData(arg[0])
  .catch(err => {
    LogServer.LogFile('insertData '+err, 'Error');
  });
});

ipcMain.on('updateData', async (event, arg) => {
  Gastos.updateData(arg[0], arg[1])
  .catch(err => {
    LogServer.LogFile('updateData '+err, 'Error');
  });
});

ipcMain.on('editData', async (event, arg) => {
  Gastos.editData(arg[0]).then(() => {
    event.reply('editData', true);
  })
  .catch(err => {
    LogServer.LogFile('editData '+err, 'Error');
  });
});

ipcMain.on('deleteData', async (event, arg) => {
  Gastos.deleteData(arg[0])
  .catch(err => {
    LogServer.LogFile(err, 'Error');
  });
  Annotations.deleteAnnotationsPerGastos(arg[0])
  .catch(err => {
    LogServer.LogFile('deleteData '+err, 'Error');
  });
});

ipcMain.on('importFile', async (event, arg) => {
  fs.readFile(arg[0], 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      LogServer.LogFile(err.message, 'Error');
      return;
    }
  
    const jsonData = JSON.parse(data);
    const jsonArray: Array<ImportFile> = jsonData;

    jsonArray.forEach(element => {
      Gastos.importFile(element)
      .catch(err => {
        LogServer.LogFile('importFile '+err, 'Error');
      });
    });
  });
});

ipcMain.on('exportFile', async () => {
  Gastos.exportFile()
  .then((data: any) => {
    const items: Array<GastosType> = data;
    if (items.length > 0) {
      const jsonFile = JSON.stringify(data);
      fs.writeFile(`C:\\Users\\${process.env.USERNAME}\\Downloads\\gasto.json`, jsonFile, (err) => {});
    }
  })
  .catch(err => {
    LogServer.LogFile('exportFile '+err, 'Error');
  });
});

ipcMain.on('showConfigPath', async (event, arg) => {
  fileShow().then((resp) => {
    event.reply('showConfigPath', resp);
  })
  .catch(err => {
    LogServer.LogFile('showConfigPath(1) '+err, 'Error');
  });
});

ipcMain.on('showConfigPath', async (event, arg) => {
  fileWrite(arg[0])
  .catch(err => {
    LogServer.LogFile('showConfigPath(2) '+err, 'Error');
  });
});

ipcMain.on('Log', async (event, arg) => {
  LogServer.LogFile(arg[0], arg[1]);
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
