/**
 * @module ovrc:storage
 */
declare module "ovrc:storage" {
  /**
   * Retrieves the item from storage by the specified key.
   * If no item is found by the specified key, null is returned.
   */
  export function getItem(key: string): string | null;

  /**
   * Retrieves items by the specified keys from storage.
   * The returned array is guaranteed to have the same length
   * as the provided keys, with results returned in the same
   * order as the keys were specified. Values for keys that were
   * not found in storage will hold a null value.
   */
  export function getItems(keys: string[]): (string | null)[];

  /**
   * Sets the value of the item, specified by its key, in storage.
   */
  export function setItem(key: string, value: string): void;
}
