const componentGenerator = require('./component/index');
const moduleGenerator = require('./module/index');
const actionGenerator = require('./action/index');
const containerGenerator = require('./container/index');
const serviceGenerator = require('./service/index');
const testGenerator = require('./test/index');

module.exports = (plop) => {
  plop.setGenerator('Component', componentGenerator);
  plop.setGenerator('Module', moduleGenerator);
  plop.setGenerator('Action', actionGenerator);
  plop.setGenerator('Service', serviceGenerator);
  plop.setGenerator('Container', containerGenerator);
  plop.setGenerator('Test', testGenerator);
};
