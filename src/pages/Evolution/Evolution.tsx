import { useEffect, useState, useRef, useLayoutEffect } from "react";
import styles from "./Evolution.module.scss";

import {Sidebar} from "../../components/Sidebar";
import {HeaderAsset} from "../../components/HeaderAsset";

export interface SidebarProps {
  Account: any,
  Consumables:any,
  Thorium: any,
  Oxygen:any,
}

export const Evolution = ({Account, Consumables, Thorium, Oxygen}:SidebarProps) => {
  
  return (
    <div className="main" style={{padding:"0 8% 0 8%"}}>
    <Sidebar Account = {Account}/>
    <div style = {{overflow: "auto", width: "100%"}}>
    <HeaderAsset Consumables = {Consumables} Thorium = {Thorium} Oxygen = {Oxygen}/>
    <main className={styles.contents} >
      <h1 className="align-center">Evolution Coming Soon</h1>
    </main>
    </div>
    </div>
  );
};
