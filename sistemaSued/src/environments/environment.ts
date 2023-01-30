// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //URL:'http://192.168.5.252/apiSued/api/',
  //casa
  //URL:'http://192.168.1.106:7033/api/',
  
  //trabajo
  //URL: 'https://localhost:7033/api/',
  //desarrollo
  URL: 'http://10.125.31.15:7033/api/',
  //real
  //URL: 'http://10.125.31.149/api/',

  URLOci: 'https://policiadigital.chaco.gob.ar:9090/api_oci/',
  URLGeolocalizacion: 'https://api.geoapify.com/v1/geocode/search?text=',

  URLCivil: 'http://10.125.31.74/api_civil/',
  //URL: 'http://10.125.31.10:8888/api_oci/',

  //real
  //URLRegBus: 'https://policiadigital.chaco.gob.ar:9090/api_registroUsuario/',
  //desarrollo
  URLRegBus: 'http://10.125.31.74/api_registroUsuario/',

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
