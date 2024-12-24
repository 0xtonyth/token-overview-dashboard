import { AxiosResponse } from "axios";

import { axiosInstance } from "@/libs/axios/axiosInstance";

import TokenDashboard from "@/components/dashboard/token-dashboard";

// export const dynamic = "force-dynamic";

export default async function TokenPage(context: any) {
  const MORALIS_API_KEY = process.env.NEXT_PUBLIC_MORALIS_API_KEY;
  const GECKOTERMINAL_API_URL = process.env.NEXT_PUBLIC_GECKOTERMINAL_API_URL;
  const GOPLUSLABS_API_URL = process.env.NEXT_PUBLIC_GOPLUSLABS_API_URL;
  const MORALIS_API_URL = process.env.NEXT_PUBLIC_MORALIS_API_URL;

  const NETWORK = "eth";
  const CHAIN = "0x1";
  const CHAIN_ID = "1";
  // const TOKEN_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
  const TOKEN_ADDRESS: string = context.params.tokenAddress.toLowerCase();

  const headers = {
    headers: {
      accept: "application/json",
      "X-API-Key": MORALIS_API_KEY,
    },
  };

  let tokenData: TokenData = {};
  let tokenAttributes: TokenAttributes = {};
  let tokenInfo: TokenInfo = {};
  let tokenSecurity: TokenSecurity = {};

  try {
    const [
      tokenDataResponse,
      tokenAttributesResponse,
      tokenInfoResponse,
      tokenSecurityResponse,
    ] = await Promise.all([
      axiosInstance.get(
        `${MORALIS_API_URL}/erc20/metadata?chain=${NETWORK}&addresses%5B0%5D=${TOKEN_ADDRESS}`,
        headers
      ),
      axiosInstance.get(
        `${GECKOTERMINAL_API_URL}/networks/${NETWORK}/tokens/${TOKEN_ADDRESS}`
      ),
      axiosInstance.get(
        `${GECKOTERMINAL_API_URL}/networks/${NETWORK}/tokens/${TOKEN_ADDRESS}/info`
      ),
      axiosInstance.get(
        `${GOPLUSLABS_API_URL}/token_security/${CHAIN_ID}?contract_addresses=${TOKEN_ADDRESS}`
      ),
    ]);

    if (tokenDataResponse.status === 200) {
      tokenData = tokenDataResponse.data[0];
    } else {
      console.log("Error fetching token metadata from Moralis");
    }

    if (tokenAttributesResponse.status === 200) {
      tokenAttributes = tokenAttributesResponse.data.data.attributes;
    } else {
      console.log(`Error fetching token attributes from GeckoTerminal`);
    }

    if (tokenInfoResponse.status === 200) {
      tokenInfo = tokenInfoResponse.data.data.attributes;
    } else {
      console.log(`Error fetching token info from GeckoTerminal`);
    }

    if (tokenSecurityResponse.status === 200) {
      tokenSecurity = tokenSecurityResponse.data.result[TOKEN_ADDRESS];
    } else {
      console.log(`Error fetching token security data from GoPlusLabs`);
    }
  } catch (error: any) {
    console.log("Error during token data fetching:", error.message);
  }

  let tokenDetails: TokenDetails = {
    token_data: tokenData,
    token_attributes: tokenAttributes,
    token_info: tokenInfo,
    token_security: tokenSecurity,
  };

  return <TokenDashboard token_details={tokenDetails} />;
}
