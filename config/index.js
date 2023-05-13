const config = {
  projectName: 'myApp',
  date: '2023-5-2',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [
    [
      "taro-plugin-dynamic-import-weapp",
      {
        // 指定一个子目录为动态加载的目录名称, 方便区分静态代码和动态代码, 默认 "dynamic-import"
        dynamicImportFolderName: "dynamic-import",
        // 开发模式下启动的开发服务器端口, 默认自动分配端口
        port: 5000,
        // 指定动态加载链接 prefix, 默认 "http://127.0.0.1:默认端口/"
        publicPath: "http://192.168.1.5:5000/",
      },
    ],
  ],
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'react',
  compiler: 'webpack4',
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  rn: {
    appName: 'taroDemo',
    postcss: {
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
      }
    }
  }
}

module.exports = function (merge) {
  let str = './dev'
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require(`${str}`))
  }
  return merge({}, config, require('./prod'))
}
