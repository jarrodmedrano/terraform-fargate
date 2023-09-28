function callApi(endpoint, token) {
  const headers = new Headers();
  const bearer = `Bearer ${token}`;

  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers: headers,
  };

  response.replaceChildren();

  logMessage("Calling API...");

  fetch(endpoint, options)
    .then((resp) => {
      console.log(resp);
      return resp.json();
    })
    .then((resp) => {
      if (resp) {
        logMessage(
          "API response: " + "\n\n" + JSON.stringify(resp, undefined, 0) + "\n"
        );
      }
      return resp;
    })
    .catch((err) => {
      logMessage("API failed");
      console.error(err);
    });
}

async function callTheFakeApi(endpoint) {
  try {
    const headers = new Headers();

    const options = {
      method: "GET",
      headers: headers,
    };
    const resp = await fetch(endpoint, options);
    const newResp = await new Response(resp.body).text();
    return newResp;
  } catch (error) {
    console.log("error", error);
  }
}

function callFakeApi(endpoint) {
  const headers = new Headers();

  const options = {
    method: "GET",
    headers: headers,
  };

  response.replaceChildren();

  logMessage("Calling API...");

  fetch(endpoint, options)
    .then((resp) => {
      return resp.json();
    })
    .then((resp) => {
      console.log("resp", resp);

      if (resp) {
        logMessage(
          "API response: " + "\n\n" + JSON.stringify(resp, undefined, 0) + "\n"
        );
      }
      return resp;
    })
    .catch((err) => {
      logMessage("API failed");
      console.error(err);
    });
}

function checkApiHealth() {
  console.log("the url", apiConfig.uri);
  // const newer = apiConfig.uri.replace(/https:/g, "http:");
  // console.log("newer", newer);
  callTheFakeApi(`${apiConfig.uri}/check`)
    .then((response) => {
      console.log("calling fake api response", response);
    })
    .catch((error) => {
      console.error("calling fake api errors", error);
    });
}
