module.exports = {
  templates: {
    default: {
      includeDate: false,
    },
    systemName: 'Electrode Native Navigation',
    systemSummary: 'Electrode Native solution for React Native navigation',
    systemLogo: 'ern_logo_80.png',
    systemColor: '#183055',
    includeDate: false,
    collapseSymbols: false,
  },
  source: {
    include: ['src'],
  },
  opts: {
    destination: 'public',
    readme: 'README.md',
    recurse: true,
    template: 'node_modules/foodoc/template',
  },
};
