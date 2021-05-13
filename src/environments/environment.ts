// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  oauthServerUrl: 'http://103.228.202.217:86/oauth/',
  resourceBaseUrl: 'http://103.228.202.217:86/admin/',
  resourceBasePartnerUrl: 'http://103.228.202.217:86/partner/',
  atomBaseUrl: 'http://103.228.202.217:86/atom/',
  clientId: 'partnerClient',
  clientSecret: 'secret',
  oauthTokenPath: 'oauth/token',
  oauthCheckTokenPath: 'oauth/check_token',
  ssoEnable: false,
  partnerWebSite: 'http://www.google.com',
  clientApiToken: "PARTNER_WEB"
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
