export {};

declare global {
  type CryptoBinaryLike = string | ArrayBuffer | QuickJS.ArrayBufferView;
  type CryptoBinaryToTextEncoding = "base64" | "hex";
  type CryptoUUID = `${string}-${string}-${string}-${string}-${string}`;

  interface CryptoHash {
    update(data: CryptoBinaryLike): this;
    digest(): Buffer;
    digest(encoding: CryptoBinaryToTextEncoding): string;
  }

  interface CryptoHmac {
    update(data: CryptoBinaryLike): this;
    digest(): Buffer;
    digest(encoding: CryptoBinaryToTextEncoding): string;
  }

  interface CryptoHashConstructor {
    prototype: CryptoHash;
    new (secret?: CryptoBinaryLike): CryptoHash;
  }

  interface CryptoChecksum {
    update(data: CryptoBinaryLike): this;
    digest(): number;
  }

  interface CryptoChecksumConstructor {
    prototype: CryptoChecksum;
    new (): CryptoChecksum;
  }

  type CryptoBufferSource = ArrayBuffer | QuickJS.ArrayBufferView;
  type CryptoRandomFillBuffer = ArrayBuffer | QuickJS.ArrayBufferView;
  type CryptoAlgorithmIdentifier = string | CryptoAlgorithm;
  type CryptoHashAlgorithmIdentifier = CryptoAlgorithmIdentifier;
  type CryptoKeyFormat = "jwk" | "pkcs8" | "raw" | "spki";
  type CryptoKeyType = "private" | "public" | "secret";
  type CryptoKeyUsage =
    | "decrypt"
    | "deriveBits"
    | "deriveKey"
    | "encrypt"
    | "sign"
    | "unwrapKey"
    | "verify"
    | "wrapKey";

  interface CryptoAlgorithm {
    name: string;
  }

  interface CryptoAlgorithmParameters extends CryptoAlgorithm {
    [key: string]: unknown;
  }

  interface CryptoKeyAlgorithm extends CryptoAlgorithm {
    [key: string]: unknown;
  }

  interface JsonWebKey {
    alg?: string;
    crv?: string;
    d?: string;
    dp?: string;
    dq?: string;
    e?: string;
    ext?: boolean;
    k?: string;
    key_ops?: string[];
    kty?: string;
    n?: string;
    oth?: Array<Record<string, string>>;
    p?: string;
    q?: string;
    qi?: string;
    use?: string;
    x?: string;
    y?: string;
  }

  class CryptoKey {
    private constructor();
    readonly type: CryptoKeyType;
    readonly extractable: boolean;
    readonly algorithm: CryptoKeyAlgorithm;
    readonly usages: readonly CryptoKeyUsage[];
  }

  interface CryptoKeyPair {
    privateKey: CryptoKey;
    publicKey: CryptoKey;
  }

  class SubtleCrypto {
    private constructor();
    decrypt(
      algorithm: CryptoAlgorithmIdentifier | CryptoAlgorithmParameters,
      key: CryptoKey,
      data: CryptoBufferSource,
    ): Promise<ArrayBuffer>;
    deriveBits(
      algorithm: CryptoAlgorithmIdentifier | CryptoAlgorithmParameters,
      baseKey: CryptoKey,
      length: number,
    ): Promise<ArrayBuffer>;
    deriveKey(
      algorithm: CryptoAlgorithmIdentifier | CryptoAlgorithmParameters,
      baseKey: CryptoKey,
      derivedKeyAlgorithm: CryptoAlgorithmIdentifier | CryptoAlgorithmParameters,
      extractable: boolean,
      keyUsages: readonly CryptoKeyUsage[],
    ): Promise<CryptoKey>;
    digest(
      algorithm: CryptoHashAlgorithmIdentifier,
      data: CryptoBufferSource,
    ): Promise<ArrayBuffer>;
    encrypt(
      algorithm: CryptoAlgorithmIdentifier | CryptoAlgorithmParameters,
      key: CryptoKey,
      data: CryptoBufferSource,
    ): Promise<ArrayBuffer>;
    exportKey(format: "jwk", key: CryptoKey): Promise<JsonWebKey>;
    exportKey(
      format: Exclude<CryptoKeyFormat, "jwk">,
      key: CryptoKey,
    ): Promise<ArrayBuffer>;
    generateKey(
      algorithm: CryptoAlgorithmIdentifier | CryptoAlgorithmParameters,
      extractable: boolean,
      keyUsages: readonly CryptoKeyUsage[],
    ): Promise<CryptoKey | CryptoKeyPair>;
    importKey(
      format: "jwk",
      keyData: JsonWebKey,
      algorithm: CryptoAlgorithmIdentifier | CryptoAlgorithmParameters,
      extractable: boolean,
      keyUsages: readonly CryptoKeyUsage[],
    ): Promise<CryptoKey>;
    importKey(
      format: Exclude<CryptoKeyFormat, "jwk">,
      keyData: CryptoBufferSource,
      algorithm: CryptoAlgorithmIdentifier | CryptoAlgorithmParameters,
      extractable: boolean,
      keyUsages: readonly CryptoKeyUsage[],
    ): Promise<CryptoKey>;
    sign(
      algorithm: CryptoAlgorithmIdentifier | CryptoAlgorithmParameters,
      key: CryptoKey,
      data: CryptoBufferSource,
    ): Promise<ArrayBuffer>;
    unwrapKey(
      format: CryptoKeyFormat,
      wrappedKey: CryptoBufferSource,
      unwrappingKey: CryptoKey,
      unwrapAlgorithm: CryptoAlgorithmIdentifier | CryptoAlgorithmParameters,
      unwrappedKeyAlgorithm: CryptoAlgorithmIdentifier | CryptoAlgorithmParameters,
      extractable: boolean,
      keyUsages: readonly CryptoKeyUsage[],
    ): Promise<CryptoKey>;
    verify(
      algorithm: CryptoAlgorithmIdentifier | CryptoAlgorithmParameters,
      key: CryptoKey,
      signature: CryptoBufferSource,
      data: CryptoBufferSource,
    ): Promise<boolean>;
    wrapKey(
      format: CryptoKeyFormat,
      key: CryptoKey,
      wrappingKey: CryptoKey,
      wrapAlgorithm: CryptoAlgorithmIdentifier | CryptoAlgorithmParameters,
    ): Promise<ArrayBuffer>;
  }

  class Crypto {
    private constructor();
    readonly subtle: SubtleCrypto;
    createHash(algorithm: string): CryptoHash;
    createHmac(algorithm: string, key: CryptoBinaryLike): CryptoHmac;
    getRandomValues<T extends QuickJS.ArrayBufferView>(typedArray: T): T;
    randomBytes(size: number): Buffer;
    randomFill<T extends CryptoRandomFillBuffer>(
      buffer: T,
      callback: (err: Error | null, buf: T) => void,
    ): void;
    randomFill<T extends CryptoRandomFillBuffer>(
      buffer: T,
      offset: number,
      callback: (err: Error | null, buf: T) => void,
    ): void;
    randomFill<T extends CryptoRandomFillBuffer>(
      buffer: T,
      offset: number,
      size: number,
      callback: (err: Error | null, buf: T) => void,
    ): void;
    randomFillSync<T extends CryptoRandomFillBuffer>(
      buffer: T,
      offset?: number,
      size?: number,
    ): T;
    randomInt(max: number): number;
    randomInt(min: number, max: number): number;
    randomUUID(): CryptoUUID;
  }

  var crypto: Crypto;
}
