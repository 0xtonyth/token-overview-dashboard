/**
 * @file types/pool.d.ts
 * @description Defines the Pool interface for handling pool-related data
 */

export interface IPoolDetails {
  // GeckoTerminal API details
  pool_data?: PoolData;

  // Moralis API details
  pool_info?: PoolInfo;

  base_token_info?: PoolTokenInfo;
  quote_token_info?: PoolTokenInfo;
}

export interface IPoolData {
  // GeckoTerminal API details
  // https://api.geckoterminal.com/api/v2/networks/{network}/pools/{pool_address}?include=base_token%2C%20quote_token
  attributes?: {
    address?: string;
    name?: string;
    base_token_price_usd?: string;
    quote_token_price_usd?: string;
    fdv_usd?: string;
    market_cap_usd?: string;
    price_change_percentage?: {
      h24?: string;
    };
    transactions?: {
      h24?: {
        buys?: number;
        sells?: number;
        buyers?: number;
        sellers?: number;
      };
    };
    volume_usd?: {
      m5?: string;
      h1?: string;
      h6?: string;
      h24?: string;
    };
  };
}

export interface IPoolInfo {
  // Moralis API details
  // https://deep-index.moralis.io/api/v2.2/pairs/{token_address}/stats?chain={chain_id}
  pairAddress?: string;
  pairLabel?: string;
  exchange?: string;
  exchangeAddress?: string;
  exchangeLogo?: string;
  exchangeUrl?: string;
  totalLiquidityUsd?: string;
  pricePercentChange?: {
    "24h"?: number;
  };
  liquidityPercentChange?: {
    "24h"?: number;
  };
}

export interface IPoolTokenInfo {
  // GeckoTerminal API details
  // https://api.geckoterminal.com/api/v2/networks/{network}/pools/{pool_address}?include=base_token%2C%20quote_token
  address?: string;
  name?: string;
  symbol?: string;
  image_url?: string;
}
