import crypto from 'crypto';

const aes_key = process.env.AES_KEY || "e1414cb5f37650b53418a8d774f0a33dc22c91b5784f80af29c76c0936cdd44e";
const hmac_key = process.env.HMAC_KEY || "31de98725ed7d331ee8c1ea3f7716a07307a12b4c3fc8745d607c88ff2440a38";

export function aes256Cbc(data: Buffer, iv: Buffer): Buffer {
  const key = Buffer.from(aes_key, 'hex');
  const aes = crypto.createCipheriv('aes-256-cbc', key, iv);
  aes.update(data);
  return aes.final();
}

export function sha256Hmac(data: string): string {
    const hasher = crypto.createHmac("sha256", Buffer.from(hmac_key, 'hex'));
    return hasher.update(data).digest("hex");
}