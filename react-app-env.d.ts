/// <reference types="react-scripts" />

type TokenInfo = {
  // Moralis API details
  address: string;
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

  // GeckoTerminal API details
  attributes?: {
    // https://api.geckoterminal.com/api/v2/networks/{network}/tokens/{token_address}
    price_usd?: string;
    fdv_usd?: string;
    total_reserve_in_usd?: string;
    volume_usd?: {
      h24?: string;
    };
    market_cap_usd?: string;

    // https://api.geckoterminal.com/api/v2/networks/{network}/tokens/{token_address}/info
    description?: string;
    gt_score?: number;
  };

  token_security?: TokenSecurityInfo;
};

type TokenSecurityInfo = {
  // GoPlusLabs API details
  // https://api.gopluslabs.io/api/v1/token_security/{chain_id}?contract_addresses={contract_address}

  // Returns "1" if Yes; "0" if No.
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
