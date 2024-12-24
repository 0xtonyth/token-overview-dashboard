import { AxiosResponse } from "axios";

import { axiosInstance } from "@/libs/axios/axiosInstance";

import PoolDashboard from "@/components/dashboard/pool-dashboard";

// export const dynamic = "force-dynamic";

export default async function PoolPage(context: any) {
  const MORALIS_API_KEY = process.env.NEXT_PUBLIC_MORALIS_API_KEY;
  const GECKOTERMINAL_API_URL = process.env.NEXT_PUBLIC_GECKOTERMINAL_API_URL;
  const MORALIS_API_URL = process.env.NEXT_PUBLIC_MORALIS_API_URL;

  const NETWORK = "eth";
  const CHAIN = "0x1";
  const CHAIN_ID = "1";
  const POOL_ADDRESS: string = context.params.poolAddress.toLowerCase();

  const headers = {
    headers: {
      accept: "application/json",
      "X-API-Key": MORALIS_API_KEY,
    },
  };

  let poolData: PoolData = {};
  let poolInfo: PoolInfo = {};
  let baseTokenInfo: PoolTokenInfo = {};
  let quoteTokenInfo: PoolTokenInfo = {};

  try {
    const [poolDataResponse, poolInfoResponse] = await Promise.all([
      axiosInstance.get(
        `${GECKOTERMINAL_API_URL}/networks/${NETWORK}/pools/${POOL_ADDRESS}?include=base_token%2C%20quote_token`
      ),
      axiosInstance.get(
        `${MORALIS_API_URL}/pairs/${POOL_ADDRESS}/stats?chain=${NETWORK}`,
        headers
      ),
    ]);

    if (poolDataResponse.status === 200) {
      poolData = poolDataResponse.data.data;
      baseTokenInfo = poolDataResponse.data.included[0].attributes;
      quoteTokenInfo = poolDataResponse.data.included[1].attributes;
    } else {
      console.log("Error fetching pool data from GeckoTerminal");
    }

    if (poolInfoResponse.status === 200) {
      poolInfo = poolInfoResponse.data;
    } else {
      console.log(`Error fetching pool info from Moralis`);
    }
  } catch (error: any) {
    console.log("Error during pool data fetching:", error.message);
  }

  let poolDetails: PoolDetails = {
    pool_data: poolData,
    pool_info: poolInfo,
    base_token_info: baseTokenInfo,
    quote_token_info: quoteTokenInfo,
  };

  return <PoolDashboard pool_details={poolDetails} />;
}
