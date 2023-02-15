import crypto from 'crypto';

const hmac_key = process.env.HMAC_KEY || "31de98725ed7d331ee8c1ea3f7716a07307a12b4c3fc8745d607c88ff2440a38";

export function sha256Hmac(data: string): string {
    const hasher = crypto.createHmac("sha256", Buffer.from(hmac_key, 'hex'));
    return hasher.update(data).digest("hex");
}