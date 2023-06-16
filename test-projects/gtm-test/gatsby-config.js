/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `gtm-test`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [{
      resolve: 'gatsby-plugin-iubenda-cookie-footer',
      options: {
        iubendaOptions: {"lang":"en","siteId":1565428,"cookiePolicyId":63938658, "consentOnContinuedBrowsing":false, "banner":{ "position":"top" } },
        googleTagManagerOptions: true
      },
    }],
}
