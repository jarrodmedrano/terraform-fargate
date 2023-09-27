/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
const msalConfig = {
  auth: {
    clientId: "543a40e5-4257-401f-a7d0-6121fcaf9376",
    authority:
      "https://login.microsoftonline.com/b88658a2-3b92-44e0-a5e7-25c225fd4ea7",
    redirectUri: "<APP_URL>",
  },
  cache: {
    cacheLocation: "localStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

// Add here the endpoints and scopes for the web API you would like to use.
const apiConfig = {
  uri: `http://ecsdemo-281397146.us-east-2.elb.amazonaws.com//api`, // e.g. http://localhost:5000/api
  scopes: ["api://01ad74b5-0404-40c6-aaa1-8aea8d2c063e/access_as_user"], // e.g. ["scp1", "scp2"]
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
const loginRequest = {
  scopes: ["openid", "profile"],
};

/**
 * Scopes you add here will be used to request a token from Azure AD to be used for accessing a protected resource.
 * To learn more about how to work with scopes and resources, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
const tokenRequest = {
  scopes: [...apiConfig.scopes],
};

// exporting config object for jest
if (typeof exports !== "undefined") {
  module.exports = {
    msalConfig: msalConfig,
  };
}
