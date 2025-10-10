import crypto from "crypto";

/**
 * AES-256-GCM encryption for Mumu backend.
 * Ciphertext structure: [IV (12 bytes)] [AuthTag (16 bytes)] [Encrypted Data]
 */
const ALGO = "aes-256-gcm";
const IV_LEN = 12;

export function encryptField(value: string, secret: string) {
  const iv = crypto.randomBytes(IV_LEN);
  const cipher = crypto.createCipheriv(ALGO, Buffer.from(secret, "hex"), iv);
  const encrypted = Buffer.concat([
    cipher.update(value, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, encrypted]).toString("base64");
}

export function decryptField(payload: string, secret: string) {
  const data = Buffer.from(payload, "base64");
  const iv = data.subarray(0, IV_LEN);
  const tag = data.subarray(IV_LEN, IV_LEN + 16);
  const text = data.subarray(IV_LEN + 16);
  const decipher = crypto.createDecipheriv(
    ALGO,
    Buffer.from(secret, "hex"),
    iv,
  );
  decipher.setAuthTag(tag);
  const decrypted = Buffer.concat([decipher.update(text), decipher.final()]);
  return decrypted.toString("utf8");
}
