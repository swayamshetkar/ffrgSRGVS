/**
 * API Client for Backend Communication
 * Handles all API requests for video platform
 */

const API_BASE_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:8000/api';

interface ListVideosResponse {
  id: string;
  title: string;
  description: string;
  creator_id: string;
  creator_name: string;
  created_at: string;
  views: number;
  ipfs_hash: string;
}

interface TrackViewPayload {
  video_id: string;
  watch_seconds: number;
  wallet: string;
  device_fingerprint: string;
}

interface UploadResponse {
  id: string;
  ipfs_hash: string;
  title: string;
  creator_id: string;
}

class APIClient {
  private getAuthHeader(): { 'Content-Type': string; 'Authorization'?: string } {
    const token = localStorage.getItem('access_token');
    const headers: any = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  /**
   * Get challenge for wallet authentication
   */
  async getChallenge(walletAddress: string): Promise<{ message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/challenge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wallet_address: walletAddress }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error getting challenge:', error);
      throw error;
    }
  }

  /**
   * Sign up with wallet
   */
  async signup(payload: {
    wallet_address: string;
    signature: string;
    message: string;
    username: string;
    role: 'creator' | 'viewer' | 'advertiser';
  }): Promise<{ access_token: string; user: any }> {
    try {
      // Log the payload being sent for debugging
      console.log('Sending signup request:', {
        wallet_address: payload.wallet_address,
        message: payload.message,
        signature: payload.signature.substring(0, 20) + '...',
        username: payload.username,
        role: payload.role,
      });

      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      const responseData = await response.json().catch(() => ({}));
      
      if (!response.ok) {
        console.error('Signup error response:', responseData);
        throw new Error(responseData.detail || responseData.error || `HTTP error! status: ${response.status}`);
      }
      
      console.log('Signup successful');
      return responseData;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  }

  /**
   * Login with wallet
   */
  async login(payload: {
    wallet_address: string;
    signature: string;
    message: string;
  }): Promise<{ access_token: string; user: any }> {
    try {
      // Log the payload being sent for debugging
      console.log('Sending login request:', {
        wallet_address: payload.wallet_address,
        message: payload.message,
        signature: payload.signature.substring(0, 20) + '...',
      });

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      const responseData = await response.json().catch(() => ({}));
      
      if (!response.ok) {
        console.error('Login error response:', responseData);
        throw new Error(responseData.detail || responseData.error || `HTTP error! status: ${response.status}`);
      }
      
      console.log('Login successful');
      return responseData;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  }

  /**
   * Get current user info
   */
  async getMe(): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: this.getAuthHeader(),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw error;
    }
  }

  /**
   * Get balance (requires auth)
   */
  async getBalance(): Promise<{ balance: number }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/balance`, {
        method: 'GET',
        headers: this.getAuthHeader(),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching balance:', error);
      return { balance: 0 };
    }
  }
  /**
   * List videos with pagination
   */
  async listVideos(offset: number = 0, limit: number = 20): Promise<ListVideosResponse[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/videos?offset=${offset}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching videos:', error);
      throw error;
    }
  }

  /**
   * Get a specific video by ID
   */
  async getVideo(videoId: string): Promise<ListVideosResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/videos/${videoId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching video:', error);
      throw error;
    }
  }

  /**
   * Upload a video
   */
  async uploadVideo(formData: FormData): Promise<UploadResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/videos/upload`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error uploading video:', error);
      throw error;
    }
  }

  /**
   * Track a video view
   */
  async trackView(payload: TrackViewPayload): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/analytics/track-view`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error tracking view:', error);
      throw error;
    }
  }

  /**
   * Get analytics for a video
   */
  async getVideoAnalytics(videoId: string): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/analytics/videos/${videoId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw error;
    }
  }

  /**
   * Create an ad campaign
   */
  async createCampaign(payload: any): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/campaigns/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating campaign:', error);
      throw error;
    }
  }

  /**
   * Get user campaigns
   */
  async getUserCampaigns(walletAddress: string): Promise<any[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/campaigns?wallet=${walletAddress}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      throw error;
    }
  }

  /**
   * Get user videos
   */
  async getUserVideos(walletAddress: string): Promise<ListVideosResponse[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/videos/user/${walletAddress}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching user videos:', error);
      throw error;
    }
  }

  /**
   * Get settlement info
   */
  async getSettlements(walletAddress: string): Promise<any> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/settlements/${walletAddress}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching settlements:', error);
      throw error;
    }
  }
}

export const apiClient = new APIClient();
