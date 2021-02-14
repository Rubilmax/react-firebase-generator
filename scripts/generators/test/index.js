const { componentExists, getComponentPath } = require('../utils');

module.exports = {
  description: 'Add a test to a component or a page',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What component do you want to test?',
      default: 'Form',
      validate: (value) => {
        if (/.+/.test(value)) {
          return componentExists(value) || 'There is no existing component or page with this name';
        }

        return 'The name is required';
      },
    },
  ],
  actions: (data) => {
    const path = getComponentPath(data.name);

    return [
      {
        type: 'add',
        path: `../../${path}/{{ properCase name }}.test.tsx`,
        templateFile: `./component/test.tsx.hbs`,
        abortOnFail: false,
      },
    ];
  },
};
