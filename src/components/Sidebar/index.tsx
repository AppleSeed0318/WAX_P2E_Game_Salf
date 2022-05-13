import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./sidebar.css";

export interface NFTProp {
  wax: any,
  Assets: any,
  Account: any,
}

export interface SideProp {
  Account: any,
}

export const Sidebar = ({ Account }: SideProp) => {

  return (
    <div className="sidebar">
      <div className="logo">
        <img src="/image/logo.PNG" />
        <h2>{Account}</h2>
        <h3><Link to={`/login`}>Logout</Link></h3>
      </div>

      <div className="category">
        <ul>
          <li><Link to={`/inventory`}>Inventory         <img style={{ width: "20%" }} src="/icon/IMG_2363.PNG"></img>
          </Link></li>
          <li><Link to={`/collection`}>Collection          <img style={{ width: "20%" }} src="/icon/IMG_2358.PNG"></img>
          </Link></li>
          <li><Link to={`/territory`}>Territory          <img style={{ width: "20%" }} src="/icon/IMG_2357.PNG"></img>
          </Link></li>
          <li><Link to={`/evolution`}>Evolution          <img style={{ width: "20%" }} src="/icon/IMG_2360.PNG"></img>
          </Link></li>
          <li><Link to={`/breeding`}>Breeding          <img style={{ width: "20%" }} src="/icon/IMG_2362.PNG"></img>
          </Link></li>
          <li><Link to={`/bank`}>Bank<img style={{ width: "20%" }} src="/icon/IMG_2361.PNG"></img></Link></li>
        </ul>
      </div>
    </div>
  );
};
