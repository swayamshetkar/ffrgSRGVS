// API Service for FastAPI Backend Integration

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export interface ApiError {
  detail: string | string[];
  status?: number;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private getAuthToken(): string | null {
    return localStorage.getItem('access_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let errorData: ApiError = { detail: 'Unknown error' };
      try {
        errorData = await response.json();
      } catch {
        errorData = { detail: response.statusText };
      }
      const error = new Error(
        typeof errorData.detail === 'string'
          ? errorData.detail
          : errorData.detail.join(', ')
      );
      (error as any).status = response.status;
      throw error;
    }

    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  }

  // Auth endpoints
  async getChallenge(walletAddress: string): Promise<{ message: string }> {
    return this.request('/auth/challenge', {
      method: 'POST',
      body: JSON.stringify({ wallet_address: walletAddress }),
    });
  }

  async signup(payload: {
    wallet_address: string;
    signature: string;
    message: string;
    username: string;
    role: 'creator' | 'viewer' | 'advertiser';
  }): Promise<{ access_token: string; token_type: string }> {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async login(payload: {
    wallet_address: string;
    signature: string;
    message: string;
  }): Promise<{ access_token: string; token_type: string }> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async getMe(): Promise<any> {
    return this.request('/auth/me', { method: 'GET' });
  }

  // Videos endpoints
  async uploadVideo(formData: FormData): Promise<any> {
    const url = `${this.baseUrl}/videos/upload`;
    const headers: HeadersInit = {};

    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        typeof error.detail === 'string'
          ? error.detail
          : error.detail.join(', ')
      );
    }

    return response.json();
  }

  async listVideos(skip: number = 0, limit: number = 20): Promise<any[]> {
    return this.request(`/videos/list?skip=${skip}&limit=${limit}`, {
      method: 'GET',
    });
  }

  async getMyVideos(skip: number = 0, limit: number = 20): Promise<any[]> {
    return this.request(`/videos/me?skip=${skip}&limit=${limit}`, {
      method: 'GET',
    });
  }

  async getVideo(videoId: string): Promise<any> {
    return this.request(`/videos/${videoId}`, { method: 'GET' });
  }

  // Views endpoints
  async trackView(payload: {
    video_id: string;
    watch_seconds: number;
    wallet: string;
    device_fingerprint: string;
  }): Promise<any> {
    const headers: HeadersInit = {
      'x-device-fingerprint': payload.device_fingerprint,
    };
    return this.request('/views/track', {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });
  }

  // Ads (Video) endpoints
  async createVideoAd(formData: FormData): Promise<any> {
    const url = `${this.baseUrl}/ads/create`;
    const headers: HeadersInit = {};

    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        typeof error.detail === 'string'
          ? error.detail
          : error.detail.join(', ')
      );
    }

    return response.json();
  }

  async getActiveAds(): Promise<any[]> {
    return this.request('/ads/active', { method: 'GET' });
  }

  async getMyAds(): Promise<any[]> {
    return this.request('/ads/me', { method: 'GET' });
  }

  async withdrawAdCampaign(campaignId: string): Promise<any> {
    return this.request(`/ads/campaign/${campaignId}/withdraw`, {
      method: 'POST',
    });
  }

  // Ads (Banner) endpoints
  async createBannerAd(payload: {
    tier: string;
    fixed_price: number;
    start_date: string;
    end_date: string;
    image_url?: string;
  }): Promise<any> {
    return this.request('/ads/banner/create', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async getActiveBannerAds(): Promise<any[]> {
    return this.request('/ads/banner/active', { method: 'GET' });
  }

  async getMyBannerAds(): Promise<any[]> {
    return this.request('/ads/banner/me', { method: 'GET' });
  }

  async getAdsSummary(): Promise<any> {
    return this.request('/ads/summary', { method: 'GET' });
  }

  // Settlement endpoints
  async getSettlements(limit: number = 100): Promise<any[]> {
    return this.request(`/settlement/?limit=${limit}`, { method: 'GET' });
  }

  async triggerVideoSettlement(): Promise<any> {
    return this.request('/settlement/trigger', { method: 'POST' });
  }

  async triggerBannerSettlement(): Promise<any> {
    return this.request('/settlement/trigger-banner', { method: 'POST' });
  }

  async getSettlementSummary(): Promise<any> {
    return this.request('/settlement/summary', { method: 'GET' });
  }

  // Wallets endpoints
  async getBalance(): Promise<{ balance: number; token: string }> {
    return this.request('/wallets/balance', { method: 'GET' });
  }

  async getPlatformBalance(): Promise<{ balance: number }> {
    return this.request('/wallets/platform-balance', { method: 'GET' });
  }

  // Health check
  async healthCheck(): Promise<any> {
    return this.request('/', { method: 'GET' });
  }
}

export const apiClient = new ApiClient();
