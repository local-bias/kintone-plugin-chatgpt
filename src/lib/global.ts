import { detectGuestSpaceId } from '@konomi-app/kintone-utilities';

export const PLUGIN_ID = kintone.$PLUGIN_ID;
export const GUEST_SPACE_ID = detectGuestSpaceId() ?? undefined;

export const ENV = (process?.env?.NODE_ENV ?? 'production') as 'production' | 'development';
export const isProd = ENV === 'production';
export const isDev = ENV === 'development';

export const LANGUAGE = kintone.getLoginUser()?.language;

!isProd && console.log('[plugin] Global variables have been redefined');
