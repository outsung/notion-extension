export const replaceURLParameters = (config: any) => {
  const urlParams = config.urlParams as Record<string, string> | undefined;
  let url = config.url;

  if (urlParams !== undefined) {
    url = config.url.replace(/:(\w+)\/?/g, (matched: any, key: any) => {
      const keyName = key.replace(/[:/]/g, '');
      return matched.replace(`:${key}`, urlParams[keyName]);
    });
  }

  return { ...config, url };
};
