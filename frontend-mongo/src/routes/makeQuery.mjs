const makeQuery = (params) => {
    const queryString = Object.keys(params)
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .join("&");
    return queryString;
  };

export { makeQuery };