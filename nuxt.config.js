export default {
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Lato&display=swap',
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Source+Code+Pro&display=swap',
      },
    ],
  },
  loading: { color: '#fff' },
  css: [],
  plugins: [],
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/tailwindcss', 'nuxt-ackee'],
  modules: ['@nuxtjs/axios', '@nuxt/content'],
  ackee: {
    server: process.env.ACKEE_SERVER || '',
    domainId: process.env.ACKEE_DOMAIN_ID || '',
    ignoreLocalhost: true,
    detailed: true,
  },
  build: {
    extend(config, ctx) {},
  },
}
