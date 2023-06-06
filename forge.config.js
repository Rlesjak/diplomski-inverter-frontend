module.exports = {
  packagerConfig: {
    icon: "./dist/icons/win/icon",
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
        options: {
          icon: "./dist/icons/win/icon.ico"
        }
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
      config: {
        options: {
          icon: "./dist/icons/mac/icon.icns"
        }
      },
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          icon: "./dist/icons/png/128x128.png"
        }
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        options: {
          icon: "./dist/icons/png/128x128.png"
        }
      },
    },
  ],
};
