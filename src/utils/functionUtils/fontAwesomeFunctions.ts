import { IconType, IconName } from '@/models/icons/fontawesome/iconsDictionary';

/**
 * The function `getIconTypes` returns an array of all values of the `IconType` enum.
 *
 * @returns Returns an array of all values of the `IconType` enum.
 */
export const getIconTypeValues = (): IconType[] => {
  const iconTypeValues: IconType[] = Object.values(IconType).map(
    iconTypeValue => iconTypeValue
  );

  return iconTypeValues;
};

/**
 * The function `getIconNameValues` returns an array of all values of the `IconName` enum
 *
 * @returns The function `getIconNameValues` returns an array of all values of the `IconName` enum.
 */
export const getIconNameValues = (): IconName[] => {
  const iconNameValues: IconName[] = Object.values(IconName).map(
    iconNameValue => iconNameValue
  );

  return iconNameValues;
};
