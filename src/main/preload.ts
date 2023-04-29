import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

type Gastos = 'getData' | 'insertData' | 'updateData' | 'editData' | 'deleteData';
type Annotations = 'getAnnotations' | 'insertAnnotations' | 'deleteAnnotations';
type ImportAndExport = 'importFile' | 'exportFile';
type Config = 'showConfigPath' | 'saveConfigPath';

export type Channels = Gastos | Annotations | ImportAndExport | Config;

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
