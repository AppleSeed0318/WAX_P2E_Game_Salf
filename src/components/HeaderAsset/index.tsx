import { useEffect, useState } from "react";

import "./headerasset.css";

export interface AssetProp {
  Consumables: any,
  Thorium: any,
  Oxygen: any,
}

export const HeaderAsset = ({Consumables, Thorium, Oxygen}: AssetProp) => {

  return (
    <div className = "asset-header">
      <ul>
        <li>
          <div>
            <img style={{width:"20%"}}src="/icon/IMG_2364.PNG"></img>
          </div>
          <div>
            {Consumables}
          </div>
        </li>
        <li>
          <div>
          <img style={{width:"20%"}}src="/icon/IMG_2359.PNG"></img>
          </div>
          <div>
            {Thorium}
          </div>
        </li>
        <li>
          <div>
          <img style={{width:"20%"}}src="/icon/IMG_2356.PNG"></img>
          </div>
          <div>
            {Oxygen}
          </div>
        </li>
      </ul>
    </div>
  );
};
