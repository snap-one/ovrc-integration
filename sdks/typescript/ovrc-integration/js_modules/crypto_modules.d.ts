declare module "crypto" {
  export namespace webcrypto {
    export type BufferSource = CryptoBufferSource;
    export type KeyFormat = CryptoKeyFormat;
    export type KeyType = CryptoKeyType;
    export type KeyUsage = CryptoKeyUsage;
    export type AlgorithmIdentifier = CryptoAlgorithmIdentifier;
    export type HashAlgorithmIdentifier = CryptoHashAlgorithmIdentifier;
    export type NamedCurve = string;
    export type BigInteger = Uint8Array;

    export type Algorithm = CryptoAlgorithm;

    export type AlgorithmParameters = CryptoAlgorithmParameters;

    export interface AesCbcParams extends Algorithm {
      iv: BufferSource;
    }

    export interface AesCtrParams extends Algorithm {
      counter: BufferSource;
      length: number;
    }

    export interface AesDerivedKeyParams extends Algorithm {
      length: number;
    }

    export interface AesGcmParams extends Algorithm {
      additionalData?: BufferSource;
      iv: BufferSource;
      tagLength?: number;
    }

    export interface AesKeyAlgorithm extends KeyAlgorithm {
      length: number;
    }

    export interface AesKeyGenParams extends Algorithm {
      length: number;
    }

    export interface EcKeyAlgorithm extends KeyAlgorithm {
      namedCurve: NamedCurve;
    }

    export interface EcKeyGenParams extends Algorithm {
      namedCurve: NamedCurve;
    }

    export interface EcKeyImportParams extends Algorithm {
      namedCurve: NamedCurve;
    }

    export interface EcdhKeyDeriveParams extends Algorithm {
      public: CryptoKey;
    }

    export interface EcdsaParams extends Algorithm {
      hash: HashAlgorithmIdentifier;
    }

    export interface Ed448Params extends Algorithm {
      context?: BufferSource;
    }

    export interface HkdfParams extends Algorithm {
      hash: HashAlgorithmIdentifier;
      info: BufferSource;
      salt: BufferSource;
    }

    export interface HmacImportParams extends Algorithm {
      hash: HashAlgorithmIdentifier;
      length?: number;
    }

    export interface HmacKeyAlgorithm extends KeyAlgorithm {
      hash: KeyAlgorithm;
      length: number;
    }

    export interface HmacKeyGenParams extends Algorithm {
      hash: HashAlgorithmIdentifier;
      length?: number;
    }

    export type KeyAlgorithm = CryptoKeyAlgorithm;

    export interface Pbkdf2Params extends Algorithm {
      hash: HashAlgorithmIdentifier;
      iterations: number;
      salt: BufferSource;
    }

    export interface RsaHashedImportParams extends Algorithm {
      hash: HashAlgorithmIdentifier;
    }

    export interface RsaHashedKeyAlgorithm extends RsaKeyAlgorithm {
      hash: KeyAlgorithm;
    }

    export interface RsaHashedKeyGenParams extends RsaKeyGenParams {
      hash: HashAlgorithmIdentifier;
    }

    export interface RsaKeyAlgorithm extends KeyAlgorithm {
      modulusLength: number;
      publicExponent: BigInteger;
    }

    export interface RsaKeyGenParams extends Algorithm {
      modulusLength: number;
      publicExponent: BigInteger;
    }

    export interface RsaOaepParams extends Algorithm {
      label?: BufferSource;
    }

    export interface RsaOtherPrimesInfo {
      d?: string;
      r?: string;
      t?: string;
    }

    export interface RsaPssParams extends Algorithm {
      saltLength: number;
    }

    export type JsonWebKey = globalThis.JsonWebKey;
    export type CryptoKey = globalThis.CryptoKey;
    export type CryptoKeyPair = globalThis.CryptoKeyPair;
    export type SubtleCrypto = globalThis.SubtleCrypto;
    export type Crypto = globalThis.Crypto;
  }

  export const Crc32: CryptoChecksumConstructor;
  export const Crc32c: CryptoChecksumConstructor;
  export const Md5: CryptoHashConstructor;
  export const Sha1: CryptoHashConstructor;
  export const Sha256: CryptoHashConstructor;
  export const Sha384: CryptoHashConstructor;
  export const Sha512: CryptoHashConstructor;
  export const createHash: typeof globalThis.crypto.createHash;
  export const createHmac: typeof globalThis.crypto.createHmac;
  export const crypto: Crypto;
  export const getRandomValues: typeof globalThis.crypto.getRandomValues;
  export const randomBytes: typeof globalThis.crypto.randomBytes;
  export const randomFill: typeof globalThis.crypto.randomFill;
  export const randomFillSync: typeof globalThis.crypto.randomFillSync;
  export const randomInt: typeof globalThis.crypto.randomInt;
  export const randomUUID: typeof globalThis.crypto.randomUUID;
  export const webcrypto: Crypto;

  const defaultExport: {
    readonly Crc32: typeof Crc32;
    readonly Crc32c: typeof Crc32c;
    readonly Md5: typeof Md5;
    readonly Sha1: typeof Sha1;
    readonly Sha256: typeof Sha256;
    readonly Sha384: typeof Sha384;
    readonly Sha512: typeof Sha512;
    readonly createHash: typeof createHash;
    readonly createHmac: typeof createHmac;
    readonly crypto: typeof crypto;
    readonly getRandomValues: typeof getRandomValues;
    readonly randomBytes: typeof randomBytes;
    readonly randomFill: typeof randomFill;
    readonly randomFillSync: typeof randomFillSync;
    readonly randomInt: typeof randomInt;
    readonly randomUUID: typeof randomUUID;
    readonly webcrypto: typeof webcrypto;
  };
  export default defaultExport;
}

declare module "ovrc:crypto" {
  export * from "crypto";
  export { default } from "crypto";
}
