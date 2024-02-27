const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
        baseUrl: 'http://localhost:5173',
        supportFile: false,
        experimentalStudio: true,
        viewportHeight: 1080,
        viewportWidth: 1920
    },
})