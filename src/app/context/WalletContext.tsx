import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface WalletContextType {
  isConnected: boolean;
  walletAddress: string | null;
  balance: number;
  connect: () => Promise<void>;
  disconnect: () => void;
  network: string;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState(0);
  const [network, setNetwork] = useState('Testnet');

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('wallet_connected');
    if (saved === 'true') {
      setIsConnected(true);
      setWalletAddress('TX8...9X2'); // Mock address
      setBalance(1245.50);
    }
  }, []);

  const connect = async () => {
    // Simulate connection delay
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsConnected(true);
        setWalletAddress('TX8...9X2');
        setBalance(1245.50);
        localStorage.setItem('wallet_connected', 'true');
        toast.success('Wallet connected successfully');
        resolve();
      }, 1000);
    });
  };

  const disconnect = () => {
    setIsConnected(false);
    setWalletAddress(null);
    setBalance(0);
    localStorage.removeItem('wallet_connected');
    toast.info('Wallet disconnected');
  };

  return (
    <WalletContext.Provider value={{ isConnected, walletAddress, balance, connect, disconnect, network }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
