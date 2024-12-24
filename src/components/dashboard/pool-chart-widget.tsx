"use client";

import { memo } from "react";

type Props = {
  address: string;
};

const PoolChartWidget = ({ address }: Props) => {
  return (
    <>
      <iframe
        id="dextools-widget"
        title="DEXTools Trading Chart"
        width="100%"
        height="420"
        src={`https://dextools.io/widget-chart/en/ether/pe-light/${address}?theme=dark&chartType=2&chartResolution=30&drawingToolbars=false`}
      ></iframe>
    </>
  );
};

export default memo(PoolChartWidget);
