const { moduleExists } = require('../utils');

module.exports = {
  description: 'Add a redux module',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'How should this module be called?',
      default: 'Module',
      validate: (value) => {
        if (/.+/.test(value)) {
          return !moduleExists(value) || 'A module with this name already exists';
        }

        return 'The name is required';
      },
    },
    {
      type: 'confirm',
      name: 'sagas',
      default: true,
      message: 'Shall the module execute sagas?',
    },
    {
      type: 'confirm',
      name: 'isEntity',
      defaut: true,
      message: 'Does the module represent an entity in the state?',
    },
  ],
  actions: (data) => {
    const actions = [
      {
        type: 'add',
        path: `../../src/modules/${data.name}/${data.name}.types.d.ts`,
        templateFile: `./module/types.d.ts.hbs`,
        abortOnFail: false,
      },
      {
        type: 'add',
        path: `../../src/modules/${data.name}/${data.name}.actions.ts`,
        templateFile: `./module/actions.ts.hbs`,
        abortOnFail: false,
      },
      {
        type: 'add',
        path: `../../src/modules/${data.name}/${data.name}.reducer.ts`,
        templateFile: `./module/reducer.ts.hbs`,
        abortOnFail: false,
      },
      {
        type: 'add',
        path: `../../src/modules/${data.name}/${data.name}.selectors.ts`,
        templateFile: `./module/selectors.ts.hbs`,
        abortOnFail: false,
      },
    ];

    if (data.sagas) {
      actions.push({
        type: 'add',
        path: `../../src/modules/${data.name}/${data.name}.saga.ts`,
        templateFile: `./module/saga.ts.hbs`,
        abortOnFail: false,
      });
    }

    return actions;
  },
};
