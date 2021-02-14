const fs = require('fs');
const path = require('path');

const getSubComponents = (dir) =>
  fs.readdirSync(dir).reduce((acc, dirPath) => {
    const componentsPath = path.join(dir, dirPath, 'components');
    const pagesPath = path.join(dir, dirPath, 'pages');

    return {
      ...acc,
      [dirPath]: path.join(dir, dirPath),
      ...(fs.existsSync(componentsPath) ? getSubComponents(componentsPath) : {}),
      ...(fs.existsSync(pagesPath) ? getSubComponents(pagesPath) : {}),
    };
  }, {});

const components = { ...getSubComponents('src/components'), ...getSubComponents('src/pages') };
const modules = fs.readdirSync('src/modules');
const services = fs.readdirSync('src/services');

module.exports = {
  componentExists: (component) => Object.keys(components).includes(component),
  moduleExists: (module) => modules.includes(module),
  serviceExists: (service) => services.includes(service),
  getComponentPath: (component) => components[component],
};
