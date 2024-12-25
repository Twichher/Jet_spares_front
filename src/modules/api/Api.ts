/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface JetOrderInfo {
  /**
   * Пункт выдачи
   * @maxLength 255
   */
  pick_up_point: string;
}

export interface JetOrderSpareCount {
  /**
   * Количество
   * @min -2147483648
   * @max 2147483647
   */
  count: string;
}

export interface Spare {
  /** Id spare */
  id_spare?: number;
  /**
   * Url spare
   * @minLength 1
   * @default "no url"
   */
  url_spare?: string;
  /**
   * Название
   * @minLength 1
   * @maxLength 255
   */
  name_spare: string;
  /** Описание */
  description_spare?: string | null;
  /** Статус */
  status_spare?: 0 | 1;
  /**
   * Цена
   * @format decimal
   */
  price_spare: string;
}

export interface UserLogin {
  /**
   * Username
   * @minLength 1
   * @maxLength 150
   */
  username: string;
  /**
   * Password
   * @minLength 1
   * @maxLength 128
   */
  password: string;
}

export interface UserPrivate {
  /** ID */
  id?: number;
  /**
   * Password
   * @minLength 1
   * @maxLength 128
   */
  password?: string;
  /**
   * Last login
   * @format date-time
   */
  last_login?: string | null;
  /** Is superuser */
  is_superuser?: boolean;
  /**
   * Username
   * @minLength 1
   * @maxLength 150
   */
  username?: string;
  /**
   * Last name
   * @minLength 1
   * @maxLength 150
   */
  last_name?: string;
  /**
   * Email
   * @minLength 1
   * @maxLength 254
   */
  email?: string;
  /** Is staff */
  is_staff?: boolean;
  /** Is active */
  is_active?: boolean;
  /**
   * Date joined
   * @format date-time
   */
  date_joined?: string;
  /**
   * First name
   * @minLength 1
   * @maxLength 150
   */
  first_name?: string;
}

export interface UserReg {
  /**
   * Username
   * @minLength 1
   * @maxLength 150
   */
  username: string;
  /**
   * Email
   * @minLength 1
   * @maxLength 254
   */
  email: string;
  /**
   * First name
   * @minLength 1
   * @maxLength 150
   */
  first_name: string;
  /**
   * Last name
   * @minLength 1
   * @maxLength 150
   */
  last_name: string;
  /**
   * Password
   * @minLength 1
   * @maxLength 128
   */
  password: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:8000" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://localhost:8000
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  myadmin = {
    /**
     * No description
     *
     * @tags myadmin
     * @name MyadminAllOrdersList
     * @request GET:/myadmin/all_orders/
     * @secure
     */
    myadminAllOrdersList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/myadmin/all_orders/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags myadmin
     * @name MyadminAllUsersList
     * @request GET:/myadmin/all_users/
     * @secure
     */
    myadminAllUsersList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/myadmin/all_users/`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  orders = {
    /**
     * No description
     *
     * @tags orders
     * @name OrdersListList
     * @request GET:/orders/list/
     * @secure
     */
    ordersListList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orders/list/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name OrdersAddInfoUpdate
     * @request PUT:/orders/{id}/add_info/
     * @secure
     */
    ordersAddInfoUpdate: (id: string, data: JetOrderInfo, params: RequestParams = {}) =>
      this.request<JetOrderInfo, any>({
        path: `/orders/${id}/add_info/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name OrdersDeleteDelete
     * @request DELETE:/orders/{id}/delete/
     * @secure
     */
    ordersDeleteDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orders/${id}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name OrdersFormByAdminerUpdate
     * @request PUT:/orders/{id}/form_by_adminer/
     * @secure
     */
    ordersFormByAdminerUpdate: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orders/${id}/form_by_adminer/`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name OrdersFormByCreaterUpdate
     * @request PUT:/orders/{id}/form_by_creater/
     * @secure
     */
    ordersFormByCreaterUpdate: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orders/${id}/form_by_creater/`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name OrdersInfoList
     * @request GET:/orders/{id}/info/
     * @secure
     */
    ordersInfoList: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orders/${id}/info/`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  orderspare = {
    /**
     * No description
     *
     * @tags orderspare
     * @name OrderspareDeleteDelete
     * @request DELETE:/orderspare/{opk}/delete/{spk}/
     * @secure
     */
    orderspareDeleteDelete: (opk: string, spk: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orderspare/${opk}/delete/${spk}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags orderspare
     * @name OrderspareNewCountUpdate
     * @request PUT:/orderspare/{opk}/new_count/{spk}/
     * @secure
     */
    orderspareNewCountUpdate: (opk: string, spk: string, data: JetOrderSpareCount, params: RequestParams = {}) =>
      this.request<JetOrderSpareCount, any>({
        path: `/orderspare/${opk}/new_count/${spk}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  spares = {
    /**
     * No description
     *
     * @tags spares
     * @name SparesListList
     * @request GET:/spares/list/
     * @secure
     */
    sparesListList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/spares/list/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags spares
     * @name SparesNewCreate
     * @request POST:/spares/new/
     * @secure
     */
    sparesNewCreate: (data: Spare, params: RequestParams = {}) =>
      this.request<Spare, any>({
        path: `/spares/new/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags spares
     * @name SparesAddInfoUpdate
     * @request PUT:/spares/{id}/add_info/
     * @secure
     */
    sparesAddInfoUpdate: (id: string, data: Spare, params: RequestParams = {}) =>
      this.request<Spare, any>({
        path: `/spares/${id}/add_info/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags spares
     * @name SparesAddNewPicCreate
     * @request POST:/spares/{id}/add_new_pic/
     * @secure
     */
    sparesAddNewPicCreate: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/spares/${id}/add_new_pic/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags spares
     * @name SparesDeleteDelete
     * @request DELETE:/spares/{id}/delete/
     * @secure
     */
    sparesDeleteDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/spares/${id}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags spares
     * @name SparesInfoList
     * @request GET:/spares/{id}/info/
     * @secure
     */
    sparesInfoList: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/spares/${id}/info/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags spares
     * @name SparesToOrderCreate
     * @request POST:/spares/{id}/to_order/
     * @secure
     */
    sparesToOrderCreate: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/spares/${id}/to_order/`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags user
     * @name UserLoginCreate
     * @request POST:/user/login/
     * @secure
     */
    userLoginCreate: (data: UserLogin, params: RequestParams = {}) =>
      this.request<UserLogin, any>({
        path: `/user/login/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserLogoutCreate
     * @request POST:/user/logout/
     * @secure
     */
    userLogoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user/logout/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserPrivateUpdate
     * @request PUT:/user/private/
     * @secure
     */
    userPrivateUpdate: (data: UserPrivate, params: RequestParams = {}) =>
      this.request<UserPrivate, any>({
        path: `/user/private/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserRegisterCreate
     * @request POST:/user/register/
     * @secure
     */
    userRegisterCreate: (data: UserReg, params: RequestParams = {}) =>
      this.request<UserReg, any>({
        path: `/user/register/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserWhoamiList
     * @request GET:/user/whoami/
     * @secure
     */
    userWhoamiList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user/whoami/`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
}
