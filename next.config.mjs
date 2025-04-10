const isProd = process.env.NODE_ENV === 'production';

const config = {
  output: 'export',
  basePath: isProd ? '/zenada' : '',
  assetPrefix: isProd ? '/zenada/' : '',
  images: {
    unoptimized: true,
  },
};

export default config;
