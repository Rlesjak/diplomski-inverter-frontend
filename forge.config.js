module.exports = {
  packagerConfig: {
    icon: "./icon/target/icon",
    ignore: [
      ".vscode",
      ".gitignore",
      ".git",
      "forge.config.js",
      "README.md",
      "src",
      "mock_server",
      "node_modules",
      "public",
      "^/icon$",
      "vite.config.ts",
      "tsconfig.node.json",
      "tsconfig.json",
      "tsconfig.app.json",
      "tailwind.config.js",
      "postcss.config.js",
      "env.d.ts"
    ]
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
      config: {
      },
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
      },
    },
  ],
};
