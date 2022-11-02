import * as Realm from 'realm-web';

const REALM_APP_ID = process.env.VUE_APP_LE_CITRON_PRESSE_REALM_APP_ID;
export const app = new Realm.App({ id: REALM_APP_ID });
export const credentials = Realm.Credentials.anonymous();
