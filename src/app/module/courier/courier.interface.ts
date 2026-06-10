export interface TokenPayload {
  client_id: string;
  client_secret: string;
  grant_type: string;
  username: string;
  password: string;
}

export interface RefreshTokenPayload {
  client_id: string;
  client_secret: string;
  grant_type: string;
  refresh_token: string;
}

export interface TokenResponse {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

export interface CreateOrderPayload {
  store_id: number;
  merchant_order_id?: string;
  recipient_name: string;
  recipient_phone: string;
  recipient_secondary_phone?: string;
  recipient_address: string;
  recipient_city?: number;
  recipient_zone?: number;
  recipient_area?: number;
  delivery_type: number;
  item_type: number;
  special_instruction?: string;
  item_quantity: number;
  item_weight: string;
  item_description?: string;
  amount_to_collect: number;
}

export interface OrderResponse {
  message: string;
  type: string;
  code: number;
  data: {
    consignment_id: string;
    merchant_order_id: string;
    order_status: string;
    delivery_fee: number;
  };
}

export interface OrderInfoResponse {
  message: string;
  type: string;
  code: number;
  data: {
    consignment_id: string;
    merchant_order_id: string;
    order_status: string;
    order_status_slug: string;
    updated_at: string;
    invoice_id: string | null;
  };
}

export interface PricePlanPayload {
  store_id: string;
  item_type: number;
  delivery_type: number;
  item_weight: number;
  recipient_city: number;
  recipient_zone: number;
}

export interface PricePlanResponse {
  message: string;
  type: string;
  code: number;
  data: {
    price: number;
    discount: number;
    promo_discount: number;
    plan_id: number;
    cod_enabled: number;
    cod_percentage: number;
    additional_charge: number;
    final_price: number;
  };
}

export interface City {
  city_id: number;
  city_name: string;
}

export interface Zone {
  zone_id: number;
  zone_name: string;
}

export interface Area {
  area_id: number;
  area_name: string;
  home_delivery_available: boolean;
  pickup_available: boolean;
}

export interface Store {
  store_id: string;
  store_name: string;
  store_address: string;
  is_active: number;
  city_id: string;
  zone_id: string;
  hub_id: string;
  is_default_store: boolean;
  is_default_return_store: boolean;
}

export interface StoreListResponse {
  message: string;
  type: string;
  code: number;
  data: {
    data: Store[];
    total: number;
    current_page: number;
    per_page: number;
    total_in_page: number;
    last_page: number;
    path: string;
    to: number;
    from: number;
    last_page_url: string;
    first_page_url: string;
  };
}

export interface CreateStorePayload {
  name: string;
  contact_name: string;
  contact_number: string;
  secondary_contact?: string;
  otp_number?: string;
  address: string;
  city_id: number;
  zone_id: number;
  area_id: number;
}

export interface BulkOrderPayload {
  orders: CreateOrderPayload[];
}
