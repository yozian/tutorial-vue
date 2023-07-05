/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

import router from '../router';
import vuetify from './vuetify';
// Plugins
import { loadFonts } from './webfontloader';

export function registerPlugins (app) {
  loadFonts()
  app
    .use(vuetify)
    .use(router);

    app.config.errorHandler = (err, vm, info) => {
      console.error(err, vm, info);
      alert(err.message);
    }

}
