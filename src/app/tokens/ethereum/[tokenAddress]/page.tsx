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
  const CHAIN_ID = "1";
  const TOKEN_ADDRESS: string = context.params.tokenAddress.toLowerCase();

  const headers = {
    headers: {
      accept: "application/json",
      "X-API-Key": MORALIS_API_KEY,
    },
  };

  let tokenData: TokenData = {};
  let tokenPairData: TokenPairData[] = [];
  let tokenAttributes: TokenAttributes = {};
  let tokenInfo: TokenInfo = {};
  let tokenSecurity: TokenSecurity = {};

  try {
    const [
      tokenDataResponse,
      tokenPairDataResponse,
      tokenAttributesResponse,
      tokenInfoResponse,
      tokenSecurityResponse,
    ] = await Promise.all([
      axiosInstance.get(
        `${MORALIS_API_URL}/erc20/metadata?chain=${NETWORK}&addresses%5B0%5D=${TOKEN_ADDRESS}`,
        headers
      ),
      axiosInstance.get(
        `${MORALIS_API_URL}/erc20/${TOKEN_ADDRESS}/pairs?chain=${NETWORK}&limit=10`,
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

    if (tokenPairDataResponse.status === 200) {
      tokenPairData = tokenPairDataResponse.data.pairs;
    } else {
      console.log("Error fetching token pair data from Moralis");
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
    token_pair_data: tokenPairData,
    token_attributes: tokenAttributes,
    token_info: tokenInfo,
    token_security: tokenSecurity,
  };

  return (
    <>
      {tokenDetails.token_data?.address ? (
        <TokenDashboard token_details={tokenDetails} />
      ) : (
        <>
          <div className="-mt-14 flex min-h-screen flex-col items-center justify-center font-[family-name:var(--font-geist-mono)]">
            <h1 className="text-5xl font-extrabold">Error!</h1>
            <p className="text-center text-xl font-medium">
              Possible invalid token address.
            </p>
          </div>
        </>
      )}
    </>
  );
}
