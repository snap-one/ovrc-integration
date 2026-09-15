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
  type CryptoHashAlgorithmIdentifier =
    | CryptoDigestAlgorithmName
    | CryptoAlgorithmIdentifier;
  type CryptoKeyFormat =
    | "jwk"
    | "pkcs8"
    | "raw"
    | "raw-public"
    | "raw-secret"
    | "raw-seed"
    | "spki";
  type CryptoKeyType = "private" | "public" | "secret";
  type CryptoKeyUsage =
    | "decapsulateBits"
    | "decapsulateKey"
    | "decrypt"
    | "deriveBits"
    | "deriveKey"
    | "encapsulateBits"
    | "encapsulateKey"
    | "encrypt"
    | "sign"
    | "unwrapKey"
    | "verify"
    | "wrapKey";

  type CryptoDigestAlgorithmName =
    | "SHA-1"
    | "SHA-256"
    | "SHA-384"
    | "SHA-512"
    | "SHA3-256"
    | "SHA3-384"
    | "SHA3-512";

  type CryptoMlDsaAlgorithmName = "ML-DSA-44" | "ML-DSA-65" | "ML-DSA-87";

  type CryptoMlKemAlgorithmName =
    | "ML-KEM-512"
    | "ML-KEM-768"
    | "ML-KEM-1024";

  type CryptoHybridKemAlgorithmName =
    | "MLKEM768-P256"
    | "MLKEM768-X25519"
    | "MLKEM1024-P384";

  type CryptoKemAlgorithmName =
    | CryptoMlKemAlgorithmName
    | CryptoHybridKemAlgorithmName;

  type CryptoSubtleOperation =
    | "decapsulateBits"
    | "decapsulateKey"
    | "decrypt"
    | "deriveBits"
    | "deriveKey"
    | "digest"
    | "encapsulateBits"
    | "encapsulateKey"
    | "encrypt"
    | "exportKey"
    | "generateKey"
    | "getPublicKey"
    | "importKey"
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

  interface CryptoEncapsulatedBits {
    ciphertext: ArrayBuffer;
    sharedKey: ArrayBuffer;
  }

  interface CryptoEncapsulatedKey {
    ciphertext: ArrayBuffer;
    sharedKey: CryptoKey;
  }

  class SubtleCrypto {
    private constructor();
    static supports(
      operation: CryptoSubtleOperation,
      algorithm: CryptoAlgorithmIdentifier | CryptoAlgorithmParameters,
      additional?: unknown,
    ): boolean;
    getPublicKey(
      key: CryptoKey,
      keyUsages: readonly CryptoKeyUsage[],
    ): Promise<CryptoKey>;
    encapsulateBits(
      encapsulationAlgorithm: CryptoKemAlgorithmName | CryptoAlgorithmParameters,
      encapsulationKey: CryptoKey,
    ): Promise<CryptoEncapsulatedBits>;
    encapsulateKey(
      encapsulationAlgorithm: CryptoKemAlgorithmName | CryptoAlgorithmParameters,
      encapsulationKey: CryptoKey,
      sharedKeyAlgorithm: CryptoAlgorithmIdentifier | CryptoAlgorithmParameters,
      extractable: boolean,
      usages: readonly CryptoKeyUsage[],
    ): Promise<CryptoEncapsulatedKey>;
    decapsulateBits(
      decapsulationAlgorithm: CryptoKemAlgorithmName | CryptoAlgorithmParameters,
      decapsulationKey: CryptoKey,
      ciphertext: CryptoBufferSource,
    ): Promise<ArrayBuffer>;
    decapsulateKey(
      decapsulationAlgorithm: CryptoKemAlgorithmName | CryptoAlgorithmParameters,
      decapsulationKey: CryptoKey,
      ciphertext: CryptoBufferSource,
      sharedKeyAlgorithm: CryptoAlgorithmIdentifier | CryptoAlgorithmParameters,
      extractable: boolean,
      usages: readonly CryptoKeyUsage[],
    ): Promise<CryptoKey>;
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
