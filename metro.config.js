const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Adiciona suporte para extensões de arquivo específicas da web
// Isso diz ao Metro para preferir arquivos como 'index.web.js' quando estiver empacotando para a web.
config.resolver.sourceExts.push('web.js', 'web.ts', 'web.tsx');

module.exports = config;