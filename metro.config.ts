// Learn more https://docs.expo.io/guides/customizing-metro
import { getDefaultConfig } from 'expo/metro-config';

const config = getDefaultConfig(__dirname);
config.resolver = {
  ...config.resolver,
  unstable_enablePackageExports: false,
};
config.resolver.blockList = [
  /[\\/]templates[\\/].*/,
  ...(Array.isArray(config.resolver.blockList) 
    ? config.resolver.blockList 
    : [config.resolver.blockList].filter(Boolean))
];
config.watchFolders = [...(config.watchFolders || [])];

module.exports = config;

