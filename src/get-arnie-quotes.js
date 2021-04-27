const { httpGet } = require('./mock-http-interface');

const getMessage = (body) => JSON.parse(body).message;
const getSuccessQuote = (body) => {
  return { 'Arnie Quote': getMessage(body)}
}

const getFailureQuote = (body) => {
  return { 'FAILURE': getMessage(body)}
}

/**
 *
 * @param {string[]} urls The urls to be requested
 * @returns {Promise} A promise which resolves to a results array.
 */
const getArnieQuotes = async (urls = []) => {
  const promises = urls.map(async (url) => {
    try {
      const { status, body } = await httpGet(url);
      return status === 200 ? getSuccessQuote(body) : getFailureQuote(body);
    } catch (error) {
      return getFailureQuote(error);
    }
  });

  return Promise.all(promises);
};

module.exports = {
  getArnieQuotes,
};
