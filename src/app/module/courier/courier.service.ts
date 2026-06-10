import {
  TokenResponse,
  CreateOrderPayload,
  OrderResponse,
  OrderInfoResponse,
  PricePlanPayload,
  PricePlanResponse,
  City,
  Zone,
  Area,
  StoreListResponse,
  CreateStorePayload,
  BulkOrderPayload,
} from "./courier.interface";

export class CourierService {
  private base_url: string;
  private client_id: string;
  private client_secret: string;
  private username: string;
  private password: string;
  private grant_type: string;
  private access_token: string | null = null;
  private refresh_token: string | null = null;
  private token_expires_at = 0;

  constructor(
    client_id: string,
    client_secret: string,
    base_url: string,
    username: string,
    password: string,
  ) {
    this.base_url = base_url;
    this.client_id = client_id;
    this.client_secret = client_secret;
    this.username = username;
    this.password = password;
    this.grant_type = "password";
  }

  private isTokenExpired(): boolean {
    return Date.now() >= this.token_expires_at;
  }

  private async getAccessToken(): Promise<TokenResponse> {
    const payload = {
      client_id: this.client_id,
      client_secret: this.client_secret,
      grant_type: this.grant_type,
      username: this.username,
      password: this.password,
    };
    const res = await fetch(`${this.base_url}/aladdin/api/v1/issue-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to get access token");
    }
    return res.json();
  }

  private async refreshAccessToken(): Promise<TokenResponse> {
    const payload = {
      client_id: this.client_id,
      client_secret: this.client_secret,
      grant_type: "refresh_token",
      refresh_token: this.refresh_token,
    };
    const res = await fetch(`${this.base_url}/aladdin/api/v1/issue-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to refresh token");
    }
    return res.json();
  }

  private async ensureToken(): Promise<string> {
    if (this.access_token && !this.isTokenExpired()) {
      return this.access_token;
    }

    try {
      if (this.refresh_token) {
        const data = await this.refreshAccessToken();
        this.access_token = data.access_token;
        this.refresh_token = data.refresh_token;
        this.token_expires_at = Date.now() + data.expires_in * 1000;
        return this.access_token;
      }
    } catch {
      this.refresh_token = null;
    }

    const data = await this.getAccessToken();
    this.access_token = data.access_token;
    this.refresh_token = data.refresh_token;
    this.token_expires_at = Date.now() + data.expires_in * 1000;
    return this.access_token;
  }

  private async request<T>(
    method: string,
    path: string,
    body?: unknown,
    customHeaders?: Record<string, string>,
  ): Promise<T> {
    const token = await this.ensureToken();

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...customHeaders,
    };

    const opts: RequestInit = { method, headers };
    if (body && method !== "GET") {
      opts.body = JSON.stringify(body);
    }

    const res = await fetch(`${this.base_url}${path}`, opts);
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || `Request failed: ${res.status}`);
    }
    return res.json();
  }

  async createStore(
    data: CreateStorePayload,
  ): Promise<{
    message: string;
    type: string;
    code: number;
    data: { store_name: string };
  }> {
    return this.request("POST", "/aladdin/api/v1/stores", data);
  }

  async createOrder(data: CreateOrderPayload): Promise<OrderResponse> {
    return this.request("POST", "/aladdin/api/v1/orders", data);
  }

  async createBulkOrder(
    data: BulkOrderPayload,
  ): Promise<{ message: string; type: string; code: number; data: boolean }> {
    return this.request("POST", "/aladdin/api/v1/orders/bulk", data);
  }

  async getOrderInfo(consignment_id: string): Promise<OrderInfoResponse> {
    return this.request("GET", `/aladdin/api/v1/orders/${consignment_id}/info`);
  }

  async getStores(): Promise<StoreListResponse> {
    return this.request("GET", "/aladdin/api/v1/stores");
  }

  async getCities(): Promise<{
    message: string;
    type: string;
    code: number;
    data: { data: City[] };
  }> {
    return this.request("GET", "/aladdin/api/v1/city-list");
  }

  async getZones(
    city_id: number,
  ): Promise<{
    message: string;
    type: string;
    code: number;
    data: { data: Zone[] };
  }> {
    return this.request("GET", `/aladdin/api/v1/cities/${city_id}/zone-list`);
  }

  async getAreas(
    zone_id: number,
  ): Promise<{
    message: string;
    type: string;
    code: number;
    data: { data: Area[] };
  }> {
    return this.request("GET", `/aladdin/api/v1/zones/${zone_id}/area-list`);
  }

  async priceCalculation(data: PricePlanPayload): Promise<PricePlanResponse> {
    return this.request("POST", "/aladdin/api/v1/merchant/price-plan", data);
  }
}
