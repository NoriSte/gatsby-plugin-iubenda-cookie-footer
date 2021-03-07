/**
* Implement Gatsby's Browser APIs in this file.
*
* See: https://www.gatsbyjs.org/docs/browser-apis/
*/

import { getGTMDataLayerName, getGTMEventName, isGTMEnabled } from "./utils";

/**
 * https://www.iubenda.com/en/help/1205-how-to-configure-your-cookie-solution-advanced-guide#api
 */
const isIubendaConsentGiven = () => 
  window &&
  window._iub &&
  window._iub.cs &&
  window._iub.cs.api &&
  window._iub.cs.api.isConsentGiven &&
  window._iub.cs.api.isConsentGiven()

export const onRouteUpdate = (apiCallbackContext, options) => {
  // The Iubenda's cookie footer acceptance works like a charm except for the client-side browsing.
  // Even if the banner prompts the users that "You agree to the use of cookies by closing or
  // dismissing this banner, by scrolling this page, by clicking a link or BY CONTINUING TO BROWSE
  // OTHERWISE." the Iubenda's script doesn't push the `iubenda_consent_given` on every HTML5
  // history change and so, you can't track it with Google Tag Manager / Google Analytics as
  // explained here
  // https://www.iubenda.com/en/help/1235-how-to-use-google-tag-manager-to-simplify-the-adoption-of-cookie-law-requirements
  // That's why we need to trigger it manually.

  // if the `apiCallbackContext.prevLocation` is null it means that the user didn't leverage the
  // HTML5 history but, instead, he's landed here. The standard user landing behavior is tracked
  // correctly by Iubenda.

  // by checking for isConsentGiven(), this plugin can be fully compliant when
  // consentOnContinuedBrowsing is not enabled, thus being GDPR compliant
  if(isGTMEnabled(options) && apiCallbackContext.prevLocation && isIubendaConsentGiven()) {
    window[getGTMDataLayerName(options)].push({ 'event': getGTMEventName(options) });
  }
}
