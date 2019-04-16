import React from "react";
import { getGTMDataLayerName, getGTMEventName, isGTMEnabled } from "./utils";

export const onPreRenderHTML = ({
  getPostBodyComponents,
  replacePostBodyComponents,
}, options) => {
  // the cookiePolicyId option is required
  if(!options || !options.iubendaOptions) {
    throw new Error("gatsby-plugin-iubenda-cookie-footer: Missing `options.iubendaOptions`");
  }

  if(isGTMEnabled(options)) {
    // see https://www.iubenda.com/en/help/1235-how-to-use-google-tag-manager-to-simplify-the-adoption-of-cookie-law-requirements
    options.iubendaOptions.callback = `onConsentGiven: function() { ${getGTMDataLayerName(options)}.push({ 'event': '${getGTMEventName(options)}' }); }`
  }

  const bodyComponents = getPostBodyComponents();
  bodyComponents.push(
    React.createElement('div', {
      // see https://github.com/gatsbyjs/gatsby/issues/6299
      key:"gatsby-plugin-iubenda-cookie-footer",
      dangerouslySetInnerHTML: {__html: `
<script type="text/javascript" src="//cdn.iubenda.com/cs/tcf/stub.js"></script><script type="text/javascript">
var _iub = _iub || [];
_iub.csConfiguration = ${JSON.stringify(options.iubendaOptions)};
</script><script type="text/javascript" src="//cdn.iubenda.com/cs/iubenda_cs.js" charset="UTF-8" async> </script>
    `}})
    );

  // WARNING: if multiple plugins implement this API it’s the last plugin that “wins”.
  // See https://www.gatsbyjs.org/docs/ssr-apis/
  replacePostBodyComponents(bodyComponents);
}
