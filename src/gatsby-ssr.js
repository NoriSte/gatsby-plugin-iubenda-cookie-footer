import React from "react";
import { getGTMDataLayerName, getGTMEventName, isGTMEnabled } from "./utils";

export const onPreRenderHTML = ({
  getPostBodyComponents,
  replacePostBodyComponents,
}, options) => {
  // the cookiePolicyId option is required
  if(!options || !options.cookiePolicyId) {
    throw new Error("gatsby-plugin-iubenda-cookie-footer: Missing `options.cookiePolicyId`");
  }
  // the cookiePolicyId option is siteId
  if(!options || !options.siteId) {
    throw new Error("gatsby-plugin-iubenda-cookie-footer: Missing `options.siteId`");
  }

  let callback = "";
  if(isGTMEnabled(options)) {
    // see https://www.iubenda.com/en/help/1235-how-to-use-google-tag-manager-to-simplify-the-adoption-of-cookie-law-requirements
    callback = `"callback": { onConsentGiven: function() { ${getGTMDataLayerName(options)}.push({ 'event': '${getGTMEventName(options)}' }); }}`
  }

  const bodyComponents = getPostBodyComponents();
  bodyComponents.push(
    React.createElement('div', {
      // see https://github.com/gatsbyjs/gatsby/issues/6299
      key:"gatsby-plugin-iubenda-cookie-footer",
      dangerouslySetInnerHTML: {__html: `
<script type="text/javascript" src="//cdn.iubenda.com/cs/tcf/stub.js"></script><script type="text/javascript">
var _iub = _iub || [];
_iub.csConfiguration = {"cookiePolicyId":${options.cookiePolicyId},"siteId":${options.siteId},"lang":"${options.lang || "en"}",${options.enableCMP ? `"enableCMP":true,` : ""} ${callback} };
</script><script type="text/javascript" src="//cdn.iubenda.com/cs/iubenda_cs.js" charset="UTF-8" async> </script>
    `}})
    );

  // WARNING: if multiple plugins implement this API it’s the last plugin that “wins”.
  // See https://www.gatsbyjs.org/docs/ssr-apis/
  replacePostBodyComponents(bodyComponents);
}
