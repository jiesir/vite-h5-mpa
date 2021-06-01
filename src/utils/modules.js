const fs = require('fs-extra');
const { resolve } = require('path');

const pathResolve = (dir) => {
    return resolve(__dirname, dir);
}

const isExist = (path, list) => {
    let result = false;
    list.some(function (i) {
        if (i.path == path) {
            result = true
            return true;
        }
        result = false
    })
    return result;
}

const fileList = [];
const basePath = '../pages';
const modulesDir = fs.readdirSync(pathResolve(basePath));
modulesDir.forEach((module) => {
    let modulesChildsDir = fs.readdirSync(pathResolve(`${basePath}/${module}`));
    if (modulesChildsDir.length > 0) {
        modulesChildsDir.splice(modulesChildsDir.indexOf('page.json'), 1);
        modulesChildsDir.forEach((child) => {
            let modulesChildsPagesDir = fs.readdirSync(pathResolve(`${basePath}/${module}/${child}`));
            if (modulesChildsPagesDir.length > 0) {
                modulesChildsPagesDir.forEach((page) => {
                    if (!isExist(`${module}/${child}`, fileList)) {
                        fileList.push({ path: `${module}/${child}`, list: [`${page}`] });
                    } else {
                        fileList.forEach((item) => {
                            if (`${module}/${child}` == item.path) {
                                item.list.push(`${page}`)
                            }
                        })
                    }
                })
            }
        })
    }
})

module.exports = {
    module: fileList
}