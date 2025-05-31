const https = require("http");

const url = "http://127.0.0.1:58162/";

// Number of Replica - 1
runTest();

async function runTest() {
  console.log("Sending a single request");
  await sendMultipleRequest(url, 1);

  console.log("Sending 10 request");
  await sendMultipleRequest(url, 10);

  console.log("Sending 100 request");
  await sendMultipleRequest(url, 100);

  await console.log("Sending 200 request");
  sendMultipleRequest(url, 200);
}

/**
 * Sends multiple HTTP GET requests concurrently to the specified URL.
 * Collects the response times of all requests and generates a report.
 *
 * @param {string} url - The URL to send requests to.
 * @param {number} [noOfRequests=100] - The number of requests to send.
 * @returns {void} This function does not return a value.
 */
async function sendMultipleRequest(url, noOfRequests = 100) {
  const requestArray = [];
  for (let i = 1; i <= noOfRequests; i++) {
    requestArray.push(createSingleRequest(url));
  }
  const results = await Promise.allSettled(requestArray);
  const timeTaken = results.map((d) => d.value);
  generateReport(timeTaken);
}

/**
 * Sends a single HTTP GET request to the specified URL and measures response time.
 *
 * @param {string} url - The URL to send the request to.
 * @returns {Promise<number>} A promise that resolves with the time taken in milliseconds,
 * or 0 if the request failed.
 */
function createSingleRequest(url) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const req = https.get(url, { agent: false }, (res) => {
      res.on("data", () => {}); // consume response data to allow 'end' event to fire
      res.on("end", () => {
        const endTime = Date.now();
        resolve(endTime - startTime);
      });
      res.on("error", (err) => {
        console.log(err);
        resolve(0);
      });
    });

    req.on("error", (err) => {
      resolve(0); // still resolve to avoid crashing Promise.allSettled
    });
  });
}

/**
 * Generates a report summarizing the HTTP request results.
 * Logs total requests, number of failed and successful requests, and average response time.
 *
 * @param {number[]} [timeArray=[]] - An array of response times in milliseconds.
 * Zero values represent failed requests.
 * @returns {void} This function does not return a value.
 */
function generateReport(timeArray = []) {
  const successRequest = timeArray.filter((v) => v);
  const failedResults = timeArray.length - successRequest.length;
  const sum = successRequest.reduce((acc, val) => acc + val, 0);
  let avg = 0;
  if (successRequest.length) avg = sum / successRequest.length;

  console.log(`Total Request: ${timeArray.length}`);
  console.log(`Total Failed Request: ${failedResults}`);
  console.log(`Total Success Request: ${successRequest.length}`);
  console.log(`Average response time(ms): ${avg.toFixed(3)}`);
}
