const { serviceExists } = require('../utils');

module.exports = {
  description: 'Add a service',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'How should this service be called?',
      default: 'Service',
      validate: (value) => {
        if (/.+/.test(value)) {
          return !serviceExists(value) || 'A service or page with this name already exists';
        }

        return 'The name is required';
      },
    },
  ],
  actions: () => [
    {
      type: 'add',
      path: `../../src/services/{{camelCase name}}.ts`,
      templateFile: `./service/service.ts.hbs`,
      abortOnFail: false,
    },
    {
      type: 'add',
      path: `../../src/services/__test__/{{camelCase name}}.test.ts`,
      templateFile: `./service/service.test.ts.hbs`,
      abortOnFail: false,
    },
  ],
};
