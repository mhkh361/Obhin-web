import crypto from 'node:crypto';

const VAULT_SECRET = process.env.VAULT_SECRET_KEY || 'obhin-super-secure-vault-key-32-chars-long!';

// Always ensure 32-byte key for AES-256-GCM
function getDerivedKey(): Buffer {
  return crypto.createHash('sha256').update(VAULT_SECRET).digest();
}

export function encryptKey(plainText: string): { encryptedKey: string; iv: string; authTag: string } {
  const iv = crypto.randomBytes(12); // standard 96-bit IV for GCM
  const cipher = crypto.createCipheriv('aes-256-gcm', getDerivedKey(), iv);
  
  let encrypted = cipher.update(plainText, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag().toString('hex');
  
  return {
    encryptedKey: encrypted,
    iv: iv.toString('hex'),
    authTag,
  };
}

export function decryptKey(encryptedHex: string, ivHex: string, authTagHex: string): string {
  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    getDerivedKey(),
    Buffer.from(ivHex, 'hex')
  );
  
  decipher.setAuthTag(Buffer.from(authTagHex, 'hex'));
  
  let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}

export function maskKey(rawKey: string): string {
  if (!rawKey || rawKey.length < 8) return '••••••••';
  const prefix = rawKey.slice(0, 4);
  const suffix = rawKey.slice(-4);
  return `${prefix}••••••••${suffix}`;
}

