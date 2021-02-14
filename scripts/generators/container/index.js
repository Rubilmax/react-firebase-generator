const { componentExists, getComponentPath } = require('../utils');

module.exports = {
  description: 'Add a container to a component or a page',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What component do you want to wrap?',
      default: 'Form',
      validate: (value) => {
        if (/.+/.test(value)) {
          return componentExists(value) || 'There is no existing component or page with this name';
        }

        return 'The name is required';
      },
    },
    {
      type: 'confirm',
      name: 'wantConnect',
      default: true,
      message: 'Do you want to connect your component to redux?',
    },
    {
      type: 'confirm',
      name: 'wantMemo',
      default: true,
      message: 'Do you want to memoize props?',
    },
  ],
  actions: (data) => {
    const path = getComponentPath(data.name);

    return [
      {
        type: 'add',
        path: `../../${path}/{{ properCase name }}.container.ts`,
        templateFile: `./component/container.ts.hbs`,
        abortOnFail: false,
      },
      {
        type: 'add',
        path: `../../${path}/index.ts`,
        templateFile: `./container/index.ts.hbs`,
        force: true,
      },
      {
        type: 'append',
        path: `../../${path}/{{ properCase name }}.component.tsx`,
        templateFile: `./container/component.tsx.hbs`,
        force: true,
      },
    ];
  },
};
