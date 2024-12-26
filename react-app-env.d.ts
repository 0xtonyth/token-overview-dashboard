/// <reference types="react-scripts" />

type TokenDetails = {
  // Moralis API details
  token_data?: TokenData;
  token_pair_data?: TokenPairData[];

  // GeckoTerminal API details
  token_attributes?: TokenAttributes;
  token_info?: TokenInfo;

  // GoPlusLabs API details
  token_security?: TokenSecurity;
};

type TokenData = {
  // Moralis API details
  // https://deep-index.moralis.io/api/v2.2/erc20/metadata?chain={chain_id}&addresses%5B0%5D={token_address}
  address?: string;
  name?: string;
  symbol?: string;
  logo?: string | null;
  total_supply_formatted?: string;
  fully_diluted_valuation?: string;
  verified_contract?: boolean;
  security_score?: number;
  links?: {
    discord?: string;
    reddit?: string;
    telegram?: string;
    twitter?: string;
    website?: string;
  };
};

type TokenPairData = {
  // Moralis API details
  // https://deep-index.moralis.io/api/v2.2/erc20/{token_address}/pairs?chain={chain_id}&limit=10
  exchange_name?: string;
  exchange_logo?: string;
  pair_label?: string;
  pair_address?: string;
  usd_price_24hr_percent_change?: number;
  usd_price_24hr_usd_change?: number;
  liquidity_usd?: number;
  volume_24h_usd?: number;
};

type TokenAttributes = {
  // GeckoTerminal API details
  // https://api.geckoterminal.com/api/v2/networks/{network}/tokens/{token_address}
  price_usd?: string;
  fdv_usd?: string;
  total_reserve_in_usd?: string;
  volume_usd?: {
    h24?: string;
  };
  market_cap_usd?: string;
};

type TokenInfo = {
  // GeckoTerminal API details
  // https://api.geckoterminal.com/api/v2/networks/{network}/tokens/{token_address}/info
  description?: string;
  gt_score?: number;
};

type TokenSecurity = {
  // GoPlusLabs API details
  // https://api.gopluslabs.io/api/v1/token_security/{chain_id}?contract_addresses={contract_address}

  // Returns "1" if Yes; "0" if No.
  lp_total_supply?: string;
  holder_count?: string;
  is_in_dex?: string;
  buy_tax?: string; // Returns the buy tax of the token on a scale from 0 - 1. An empty string ("") means that the tax is unknown.
  sell_tax?: string; // Returns the sell tax of the token on a scale from 0 - 1. An empty string ("") means unknown.
  cannot_buy?: string;
  cannot_sell_all?: string;
  trust_list?: string;
  is_honeypot?: string;
  is_open_source?: string;
  is_proxy?: string;
  is_blacklisted?: string;
  transfer_pausable?: string;
  selfdestruct?: string;
  owner_change_balance?: string;
};

type PoolDetails = {
  // GeckoTerminal API details
  pool_data?: PoolData;

  // Moralis API details
  pool_info?: PoolInfo;

  base_token_info?: PoolTokenInfo;
  quote_token_info?: PoolTokenInfo;
};

type PoolData = {
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
};

type PoolInfo = {
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
};

type PoolTokenInfo = {
  // GeckoTerminal API details
  // https://api.geckoterminal.com/api/v2/networks/{network}/pools/{pool_address}?include=base_token%2C%20quote_token
  address?: string;
  name?: string;
  symbol?: string;
  image_url?: string;
};
