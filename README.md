# gatsby-plugin-iubenda-cookie-footer

Quickly add the Iubenda's cookie policy banner to your Gatsby site. Optionally, it integrates the
Iubenda acceptance with Google Tag Manager.

[![Build Status](https://travis-ci.com/NoriSte/gatsby-plugin-iubenda-cookie-footer.svg?branch=master)](https://travis-ci.com/NoriSte/gatsby-plugin-iubenda-cookie-footer)
[![Build Cron](https://img.shields.io/badge/build%20cron-weekly-44cc11.svg)](https://travis-ci.com/NoriSte/gatsby-plugin-iubenda-cookie-footer)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)
<br />
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FNoriSte%2Fgatsby-plugin-iubenda-cookie-footer.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FNoriSte%2Fgatsby-plugin-iubenda-cookie-footer?ref=badge_shield)
[![Open Source
Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)

## Install

`npm install --save gatsby-plugin-iubenda-cookie-footer`

## What this plugin does

- it adds the Iubenda cookie footer
- (optional) it integrates the Iubenda's acceptance with Google Tag Manager, that means:
  - it pushes the `iubenda_consent_given` event to the Google Tag Manager (GTM) data layer
  - it pushes the `iubenda_consent_given` event to the GTM data layer when the user navigates to the
    different routes
  - it allows you to customize both the GTM event pushed and the GTM data layer name

#### What this plugin does not

- it doesn't add the Google Tag Manager script (see the
  [gatsby-plugin-google-tagmanager](https://www.gatsbyjs.org/packages/gatsby-plugin-google-tagmanager/)
  for that)

## How to use

### Basic usage

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: 'gatsby-plugin-iubenda-cookie-footer',
    options: {
      iubendaOptions: {"lang":"en","siteId":XXXXX,"cookiePolicyId":YYYYY, /* ... */ },
    }
  }
]
```

You can copy/paste the `iubendaOptions` from the Iubenda embed script:

![Where to find the iubendaOptions](https://raw.githubusercontent.com/NoriSte/gatsby-plugin-iubenda-cookie-footer/master/assets/iubenda-options-shadow.png)

### Usage with Google Tag Manager

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: 'gatsby-plugin-iubenda-cookie-footer',
    options: {
    iubendaOptions: {"lang":"en","siteId":XXXXX,"cookiePolicyId":YYYYY, /* ... */ },
    // optional, if present, a Google Tag Manager event ("iubenda_consent_given") is triggered
    googleTagManagerOptions: true
  }
]
```

The user acceptance is pushed to the GTM data layers as explained [by the official Iubenda guide](https://www.iubenda.com/en/help/1235-how-to-use-google-tag-manager-to-simplify-the-adoption-of-cookie-law-requirements).

### Usage with Google Tag Manager and custom event/dataLayer name

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: 'gatsby-plugin-iubenda-cookie-footer',
    options: {
    iubendaOptions: {"lang":"en","siteId":XXXXX,"cookiePolicyId":YYYYY, /* ... */ },
    // optional, if present, the Google Tag Manager callback is added
    googleTagManagerOptions: {
        // optional, default to "iubenda_consent_given"
        eventName: "custom_iubenda_event_name",
        // optional, default to "dataLayer"
        dataLayerName: "customDataLayerName"
    }
  }
]
```

## Contributing

PR or issues are welcome 👋

#### Notes

- if you want to work on the plugin sources, remember that you need to `npm run build` on the root
  then, in every test project, you need to run `npm run plugin:link` to locally use it
- a nicer testing solution could be to leverage the Travis jobs/envs instead of running them synchronously

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://twitter.com/NoriSte"><img src="https://avatars0.githubusercontent.com/u/173663?v=4" width="100px;" alt=""/><br /><sub><b>Stefano Magni</b></sub></a><br /><a href="#ideas-NoriSte" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/NoriSte/gatsby-plugin-iubenda-cookie-footer/commits?author=NoriSte" title="Code">💻</a> <a href="https://github.com/NoriSte/gatsby-plugin-iubenda-cookie-footer/commits?author=NoriSte" title="Tests">⚠️</a> <a href="https://github.com/NoriSte/gatsby-plugin-iubenda-cookie-footer/commits?author=NoriSte" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/pm990320"><img src="https://avatars0.githubusercontent.com/u/6690208?v=4" width="100px;" alt=""/><br /><sub><b>Patrick Menlove</b></sub></a><br /><a href="https://github.com/NoriSte/gatsby-plugin-iubenda-cookie-footer/issues?q=author%3Apm990320" title="Bug reports">🐛</a> <a href="https://github.com/NoriSte/gatsby-plugin-iubenda-cookie-footer/commits?author=pm990320" title="Code">💻</a> <a href="https://github.com/NoriSte/gatsby-plugin-iubenda-cookie-footer/pulls?q=is%3Apr+reviewed-by%3Apm990320" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/NoriSte/gatsby-plugin-iubenda-cookie-footer/commits?author=pm990320" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
