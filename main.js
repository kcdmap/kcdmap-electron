const {app, BrowserWindow, shell, Menu} = require('electron');
const path = require("node:path");

class Menus {
  static #len = 0;
  static #aboutWindow = null; // AboutWindow örneğini saklayacak alan

  static AboutWindow() {
    if (Menus.#aboutWindow) {
      // Zaten açık bir pencere varsa, o pencereyi ön planda yap
      Menus.#aboutWindow.focus();
      return;
    }

    Menus.assert();
    Menus.#len += 1;

    Menus.#aboutWindow = new BrowserWindow({
      width: 400,
      height: 200,
      title: 'About',
      icon: path.join(__dirname, "app", "icons", "png", "info.png"),
      modal: true,
      parent: BrowserWindow.getFocusedWindow(),
      resizable: false,
      minimizable: false,
      maximizable: false,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js')
      }
    });

    Menus.#aboutWindow.loadFile(path.join(__dirname, "about.html"));

    Menus.#aboutWindow.webContents.setWindowOpenHandler(({ url }) => {
      if (url.startsWith('https:')) {
        shell.openExternal(url);
      }
      return { action: 'deny' };
    });
    
    Menus.#aboutWindow.setMenu(null);

    Menus.#aboutWindow.on('closed', () => {
      Menus.#aboutWindow = null; // Pencere kapatıldığında referansı temizle
      Menus.#len -= 1;
    });
  }

  static close() {
    if (Menus.#aboutWindow) {
      Menus.#aboutWindow.close();
    }
  }

  static assert() {
    if (Menus.#len > 0) {
      throw new Error(
        `Maximum number of windows reached ${Menus.#len}`
      );
    }
  }

  static get length() {
    return Menus.#len;
  }
}

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, "assets", "icons", "png", "256x256.png"),
        webPreferences: {
            //preload: path.join(__dirname, "preload.js"),
            nodeIntegration: false
        }
    });
    
    
    win.loadFile(path.join(__dirname, "index.html"));
    //win.loadURL("https://kingdomcomemap.vercel.app");

    win.webContents.setWindowOpenHandler(({ url }) => {
      // Only allow https external links
      if (url.startsWith('https:')) {
          shell.openExternal(url)
      }
      return { action: 'deny' }
    });
}

app.whenReady().then(() => {
    createWindow()


    const menu = Menu.buildFromTemplate([
      {
        label: 'Kingdom Come Map',
        submenu: [
          {
            label: 'About',
            click() {
              Menus.assert();
              Menus.AboutWindow();
            }
          },
          { role: 'quit' },
          { role: 'toggleDevTools' }
        ]
      }
    ]);

    Menu.setApplicationMenu(menu);
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
      }
    })
  })

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
})