module.exports = {
  templates: {
    default: {
      includeDate: false,
    },
  },
  source: {
    include: ['src'],
  },
  opts: {
    destination: 'out1',
    readme: 'README.md',
    recurse: true,
  },
};
