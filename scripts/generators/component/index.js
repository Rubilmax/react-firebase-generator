const { componentExists } = require('../utils');

module.exports = {
  description: 'Add a component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'How should this component be called?',
      default: 'Form',
      validate: (value) => {
        if (/.+/.test(value)) {
          return !componentExists(value) || 'A component or page with this name already exists';
        }

        return 'The name is required';
      },
    },
    {
      type: 'input',
      name: 'path',
      message: 'Where should it be created (path relative to root directory)?',
      default: 'src/components',
    },
    {
      type: 'confirm',
      name: 'hasContainer',
      default: true,
      message: 'Shall you wrap it with an HOC?',
    },
    {
      type: 'confirm',
      name: 'wantConnect',
      default: true,
      message: 'Do you want to connect your component to redux?',
      when: (data) => data.hasContainer,
    },
    {
      type: 'confirm',
      name: 'wantMemo',
      default: true,
      message: 'Do you want to memoize props?',
      when: (data) => data.hasContainer,
    },
  ],
  actions: (data) => {
    const actions = [];

    if (data.hasContainer) {
      actions.push({
        type: 'add',
        path: `../../${data.path}/{{properCase name}}/{{properCase name}}.container.ts`,
        templateFile: `./component/container.ts.hbs`,
        abortOnFail: true,
      });
    }

    return actions.concat([
      {
        type: 'add',
        path: `../../${data.path}/{{properCase name}}/{{properCase name}}.component.tsx`,
        templateFile: `./component/component.tsx.hbs`,
        abortOnFail: true,
      },
      {
        type: 'add',
        path: `../../${data.path}/{{properCase name}}/{{properCase name}}.hooks.ts`,
        templateFile: `./component/hooks.ts.hbs`,
        abortOnFail: true,
      },
      {
        type: 'add',
        path: `../../${data.path}/{{properCase name}}/{{properCase name}}.style.ts`,
        templateFile: `./component/style.ts.hbs`,
        abortOnFail: true,
      },
      {
        type: 'add',
        path: `../../${data.path}/{{properCase name}}/{{properCase name}}.test.tsx`,
        templateFile: `./component/test.tsx.hbs`,
        abortOnFail: true,
      },
      {
        type: 'add',
        path: `../../${data.path}/{{properCase name}}/index.ts`,
        templateFile: `./component/index.ts.hbs`,
        abortOnFail: true,
      },
    ]);
  },
};
