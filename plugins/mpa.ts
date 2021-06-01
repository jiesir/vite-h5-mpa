import fs from 'fs-extra'
import path from 'path';
import type { ResolvedConfig } from 'vite'

const resolve = (p: string) => path.resolve(process.cwd(), p);

async function readHtmlTemplate(templatePath: string) {
    return await fs.readFile(templatePath, { encoding: 'utf8' })
}

async function getHtmlContent(
    templatePath: string,
    pageName: string,
) {
    let content = ''
    const entryJsPath = (() => {
        return `/src/pages${pageName}/main.ts`
    })()
    try {
        content = await readHtmlTemplate(templatePath)
    } catch (e) {
        console.error(e)
    }
    content = content.replace(
        '</body>',
        `  <script type="module" src="${entryJsPath}"></script>\n</body>`,
    )
    const html = content
    return html
}


export const mpa = (userOptions: Object = {}) => {
    const options = {
        pages: {},
        ...userOptions
    };
    let config: ResolvedConfig;
    return {
        name: 'mpa:build',
        configResolved(resolvedConfig) {
            config = resolvedConfig
        },

        configureServer(server) {
            return () => {
                server.middlewares.use(async (req, res, next) => {
                    if (!req.url.includes('.html')) {
                        return next()
                    }
                    let url = req.url
                    const pageName = (() => {
                        return url.split('.')[0]
                    })()
                    const templatePath = resolve('index.html');
                    const content = await getHtmlContent(
                        templatePath,
                        pageName,
                    )
                    res.end(content)
                })
            }
        },

        resolveId(id) {
            if (id.endsWith('.html')) {
                const arr = id.split('\\');
                return arr.join('/');
            }
            return null
        },

        async load(id) {
            if (id.endsWith('.html')) {
                // console.warn("##############", id)
                const pageArr = id.indexOf("/") != -1 ? id.split('/') : id.split('\\');
                const page = pageArr[pageArr.length - 1];
                const pageName = page.split('.')[0];
                const templatePath = resolve('index.html');
                const outDir = config.build.outDir;
                const outArr = outDir.split('/');
                const res = await getHtmlContent(
                    templatePath,
                    `/${outArr[outArr.length - 2]}/${outArr[outArr.length - 1]}/${pageName}`,
                );
                return `${res}`
            }
            return null
        },
    }
}