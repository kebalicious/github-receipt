// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2025-05-21',
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content'
  ],
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.js'
  },
  content: {
    // Content module configuration
    highlight: {
      theme: 'github-dark',
      preload: ['json', 'js', 'ts', 'html', 'css', 'vue']
    },
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3
      }
    }
  }
})