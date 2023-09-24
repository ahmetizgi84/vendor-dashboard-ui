export type TResponseWrapper = {
  data: TLoginData;
  message: string;
  success: boolean;
};

export type TLoginData = {
  token: string;
  user: TLoginUser;
};

export type TLoginUser = {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  name: string;
  surname: string;
  email: string;
  email_verified_at: null;
  info: TLoginInfo;
};

export type TLoginInfo = {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  user_id: number;
  user_type: string;
  phone: string | null;
  company_type: string | null;
  product_category: string | null;
  tax_number: string | null;
  refference_code: string | null;
  country: string | null;
  region: string | null;
  shopware_oauth_token: string | null;
  shop_status: boolean;
};
