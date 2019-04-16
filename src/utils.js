
export const isGTMEnabled = options => {
  if(!options || !options.googleTagManagerOptions) {
    return false;
  }
  return true;
};

export const getGTMDataLayerName = options => {
  if(!options || !options.googleTagManagerOptions || !options.googleTagManagerOptions.dataLayerName) {
    return "dataLayer";
  }
  return options.googleTagManagerOptions.dataLayerName;
};

export const getGTMEventName = options => {
  if(!options || !options.googleTagManagerOptions || !options.googleTagManagerOptions.eventName) {
    return "iubenda_consent_given";
  }
  return options.googleTagManagerOptions.eventName;
};
