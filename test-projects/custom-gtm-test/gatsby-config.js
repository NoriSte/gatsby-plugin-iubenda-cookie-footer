/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `custom-gtm-test`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [{
      resolve: 'gatsby-plugin-iubenda-cookie-footer',
      options: {
        iubendaOptions: {"lang":"en","siteId":1565428,"cookiePolicyId":63938658, "banner":{ "position":"top" } },
        googleTagManagerOptions: {
          eventName: "custom_iubenda_event_name",
          dataLayerName: "customDataLayerName"
        }
      },
    }],
}
