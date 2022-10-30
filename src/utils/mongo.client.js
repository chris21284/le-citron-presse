import * as Realm from 'realm-web';

const REALM_APP_ID = 'application-lecitronpresse-ocyhn';//process.env.LE_CITRON_PRESSE_REALM_APP_ID;
export const app = new Realm.App({ id: REALM_APP_ID });
export const credentials = Realm.Credentials.anonymous();