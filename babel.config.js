module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@/utils': './src/utils',
          '@/config': './src/config',
          '@/navigator': './src/navigator',
          '@/models': './src/models',
          '@/pages': './src/pages',
          '@/assets': './src/assets',
          '@/components': './src/components',
        },
      },
    ],
  ],
};
