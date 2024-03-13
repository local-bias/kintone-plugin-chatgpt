import {
  filterFieldProperties,
  getAppId,
  getFormFields,
  kintoneAPI,
} from '@konomi-app/kintone-utilities';

/** kintoneアプリに初期状態で存在するフィールドタイプ */
const DEFAULT_DEFINED_FIELDS: kintoneAPI.FieldPropertyType[] = [
  'RECORD_NUMBER',
  'UPDATED_TIME',
  'CREATOR',
  'CREATED_TIME',
  'CATEGORY',
  'MODIFIER',
  'STATUS',
];

export const getFieldProperties = async (
  params: { app?: string | number; preview?: boolean } = {}
): Promise<kintoneAPI.FieldProperties> => {
  const { app = getAppId(), preview = false } = params;
  if (!app) {
    throw new Error('アプリのフィールド情報が取得できませんでした');
  }
  const { properties } = await getFormFields({ app, preview });
  return properties;
};

export const getUserDefinedFields = async (
  params: { preview?: boolean } = {}
): Promise<kintoneAPI.FieldProperties> => {
  const { preview } = params;
  const properties = await getFieldProperties({ preview });
  return omitFieldProperties(properties, DEFAULT_DEFINED_FIELDS);
};

/**
 * APIから取得したフィールド情報から、指定したフィールドタイプを除いたフィールド一覧を返却します
 *
 * @param properties APIから取得したフィールド情報
 * @param omittingTypes 除外するフィールドタイプ
 * @returns 指定したフィールドタイプを除いた一覧
 */
export const omitFieldProperties = (
  properties: kintoneAPI.FieldProperties,
  omittingTypes: kintoneAPI.FieldPropertyType[]
): kintoneAPI.FieldProperties => {
  return filterFieldProperties(properties, (property) => !omittingTypes.includes(property.type));
};
