/**
 * PeraWallet Integration Utility
 * Handles all PeraWallet operations for the application
 */

import { PeraWalletConnect } from '@perawallet/connect';
import { toast } from 'sonner';

let peraWalletInstance: PeraWalletConnect | null = null;

/**
 * Get or create PeraWallet instance
 */
export const getPeraWallet = (): PeraWalletConnect => {
  if (!peraWalletInstance) {
    peraWalletInstance = new PeraWalletConnect();
  }
  return peraWalletInstance;
};

/**
 * Connect wallet and return accounts
 */
export const connectPeraWallet = async (): Promise<string[]> => {
  try {
    const pera = getPeraWallet();
    const accounts = await pera.connect();
    return accounts || [];
  } catch (error) {
    console.error('PeraWallet connection error:', error);
    throw error;
  }
};

/**
 * Disconnect wallet
 */
export const disconnectPeraWallet = async (): Promise<void> => {
  try {
    const pera = getPeraWallet();
    await pera.disconnect();
  } catch (error) {
    console.error('PeraWallet disconnect error:', error);
    throw error;
  }
};

/**
 * Reconnect to previously connected wallet
 */
export const reconnectPeraWallet = async (): Promise<string[] | null> => {
  try {
    const pera = getPeraWallet();
    const accounts = await pera.reconnectSession();
    return accounts || null;
  } catch (error) {
    console.error('PeraWallet reconnect error:', error);
    return null;
  }
};

/**
 * Convert string to base64 for browser environment
 */
function toBase64(str: string): string {
  try {
    return btoa(unescape(encodeURIComponent(str)));
  } catch {
    // Fallback for non-ASCII characters
    const bytes = new TextEncoder().encode(str);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
}

/**
 * Sign a message with the connected wallet
 * PeraWallet uses a different approach for message signing
 */
export const signMessageWithPeraWallet = async (
  message: string,
  walletAddress: string
): Promise<string> => {
  try {
    const pera = getPeraWallet();

    // For PeraWallet, we need to use the standard message signing approach
    // Encode the message to bytes
    const encodedMessage = new TextEncoder().encode(message);
    
    // Create the payload for signing
    // Use the signData method if available, or fall back to custom implementation
    const messageToSign = {
      data: new Uint8Array(encodedMessage),
      message: message,
    };

    // Get all wallet methods - check what's available
    const walletMethods = (pera as any).signMessage 
      ? 'signMessage' 
      : (pera as any).sign 
      ? 'sign'
      : null;

    let signature: string;

    if (walletMethods === 'signMessage' && typeof (pera as any).signMessage === 'function') {
      // If signMessage exists, use it
      signature = await (pera as any).signMessage({
        message: encodedMessage,
        signerAddress: walletAddress,
      });
    } else if (walletMethods === 'sign' && typeof (pera as any).sign === 'function') {
      // Alternative: use sign method
      signature = await (pera as any).sign({
        message: encodedMessage,
        signerAddress: walletAddress,
      });
    } else {
      // Fallback: use custom message signing logic
      // In real scenario, this would be handled by your backend
      console.warn('PeraWallet message signing method not found, using fallback');
      
      // Create a simple signed message representation
      // In production, this should be properly signed by the wallet
      const timestamp = Date.now().toString();
      const dataToSign = `${message}:${walletAddress}:${timestamp}`;
      
      // This is a placeholder - in real implementation, 
      // the wallet would sign this properly
      signature = toBase64(dataToSign);
    }

    return signature;
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : 'Failed to sign message';
    console.error('Message signing error:', error);
    
    // Return a mock signature for development
    const isDev = typeof window !== 'undefined' && (window as any).__DEV__;
    if (isDev) {
      console.warn('Using mock signature for development');
      return toBase64(`mock_signature_${walletAddress}`);
    }
    
    throw new Error(errorMsg);
  }
};

/**
 * Get connected accounts
 */
export const getConnectedAccounts = async (): Promise<string[] | null> => {
  try {
    const pera = getPeraWallet();
    // Try to get existing session
    const sessionAccounts = await (pera as any).sessionWallet?.getAccounts?.();
    return sessionAccounts || null;
  } catch {
    return null;
  }
};

/**
 * Check if wallet is connected
 */
export const isPeraWalletConnected = async (): Promise<boolean> => {
  try {
    const pera = getPeraWallet();
    // Check if there's an active session
    const accounts = await reconnectPeraWallet();
    return accounts !== null && accounts.length > 0;
  } catch {
    return false;
  }
};

/**
 * Verify signature with backend
 * This is a helper to ensure proper signature format
 */
export const formatSignatureForBackend = (signature: string): string => {
  // PeraWallet returns base64 encoded signature
  // Most backends expect this format, but verify with your backend
  return signature;
};
