module.exports = {
  description: 'Add a redux action',
  prompts: [
    {
      type: 'input',
      name: 'moduleName',
      message: 'What module does this action belongs to?',
    },
    {
      type: 'input',
      name: 'actionName',
      message: 'What is the name of the action?',
    },
  ],
  actions: (data) => {
    const actions = [
      {
        type: 'append',
        path: `../../src/modules/${data.moduleName}/${data.moduleName}.actions.ts`,
        templateFile: './action/actions.ts.hbs',
        abortOnFail: true,
      },
    ];

    return actions;
  },
};
