import React from "react";
import { getGTMDataLayerName, getGTMEventName, isGTMEnabled } from "./utils";

export const onRenderBody = ({
  setPostBodyComponents
}, options) => {
  // the cookiePolicyId option is required
  if(!options || !options.iubendaOptions) {
    throw new Error("gatsby-plugin-iubenda-cookie-footer: Missing `options.iubendaOptions`");
  }

  let callback = "";
  if(isGTMEnabled(options)) {
    const gtmDataLayerName = getGTMDataLayerName(options);
    // see https://www.iubenda.com/en/help/1235-how-to-use-google-tag-manager-to-simplify-the-adoption-of-cookie-law-requirements
    callback = `{onConsentGiven: function() { if(!${gtmDataLayerName}){ ${gtmDataLayerName} = [] } ${gtmDataLayerName}.push({ 'event': '${getGTMEventName(options)}' }); }}`
  }

  setPostBodyComponents([
    React.createElement('div', {
      // see https://github.com/gatsbyjs/gatsby/issues/6299
      key:"gatsby-plugin-iubenda-cookie-footer",
      dangerouslySetInnerHTML: {
		__html: `${buildScriptsFromIubendaOptions(
		  options.iubendaOptions,
		  callback
        )}
		<script type="text/javascript" src="//cdn.iubenda.com/cs/iubenda_cs.js" charset="UTF-8" async> </script>
    `}})
    ]
  );
}

const buildScriptsFromIubendaOptions = (iubendaOptions, callback) => {
  const options = Array.isArray(iubendaOptions)
    ? iubendaOptions
    : [iubendaOptions];

  let fromIubendaOptionsScriptsStr = "";
  options.forEach(item => {
    fromIubendaOptionsScriptsStr += `<script type="text/javascript" src="//cdn.iubenda.com/cs/tcf/stub.js"></script><script type="text/javascript">
        var _iub = _iub || []; _iub.csConfiguration = ${JSON.stringify(item)};
        ${callback ? `_iub.csConfiguration.callback = ${callback};` : ""}
        </script>`;
  });
};
