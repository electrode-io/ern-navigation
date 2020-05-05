module.exports = {
  templates: {
    default: {
      includeDate: false,
    },
    systemName: 'Electrode Native Navigation',
    systemSummary: 'Electrode Native solution for React Native navigation',
    systemColor: '#183055',
    includeDate: false,
  },
  source: {
    include: ['src'],
  },
  opts: {
    destination: 'docs',
    readme: 'README.md',
    recurse: true,
    template: 'node_modules/foodoc/template',
  },
};
