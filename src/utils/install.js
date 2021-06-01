import { createApp } from 'vue';
import { setupLoader } from '@/utils/loader';
import { setupConsole } from '@/utils/console';
import { setupStore } from '@/utils/store';
import { getSessionStorage, deleteSessionStorage } from "@/utils/bridge";
import { parseParams } from "@/utils/tools";
import "@/styles/index.less";


export async function render(App, Obj = {}) {
    const app = createApp(App);
    // loader
    setupLoader(app);
    // console
    setupConsole();
    // store
    setupStore(app);

    const params = parseParams(location.href)
    const info = await getSessionStorage(params.pid)
    window.App.params = Object.assign({}, JSON.parse(info))
    deleteSessionStorage(params.pid)

    const Arrs = Object.keys(Obj);
    if (Arrs.length !== 0) {
        Arrs.forEach(arr => {
            app.use(Obj[arr])
        });
    }
    return app.mount('#app')
}