import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import * as waxjs from "@waxio/waxjs/dist";


import { LoginPage } from "../pages/LoginPage/LoginPage";
import { Main } from "../pages/Main";
import { Inventory } from "../pages/Inventory";
import { Collection } from "../pages/Collection";
import { Territory } from "../pages/Territory";
import { Evolution } from "../pages/Evolution";
import { Breeding } from "../pages/Breeding";
import { Bank } from "../pages/Bank";

import {Sidebar} from "../components/Sidebar";
import {HeaderAsset} from "../components/HeaderAsset";


export const App = () => {
  const [NFTs, setNFT] = useState([]);
  const [Assets, setAssets] = useState([]);
  const [showunNFTs, setShowunNFTs] = useState([]);

  const [stakedNFTs, setStakedNFTs] = useState([]);
  const [Account, setAccount] = useState("Wallet Address");
  const [Oxygen, setOxygen] = useState(0);
  const [Consumables, setConsumables] = useState(0);
  const [Thorium, setThorium] = useState(0);
  const [loginFlag, setLogin] = useState(true);
  const [balance, setBalance] = useState("");
  const [nickname, setNickname] = useState("");
  const [walletSession,  setWalletSession] = useState(null);

  const endpoint_uri = "https://wax.greymass.com";
  const wax = new waxjs.WaxJS({
    rpcEndpoint: endpoint_uri
  });

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage wax = {wax} setWalletSession={setWalletSession} setAssets = {setAssets} setAccount = {setAccount} setOxygen = {setOxygen} setConsumables={setConsumables} setThorium={setThorium}/>} />\
            <Route path="/login" element={<LoginPage wax = {wax} setWalletSession={setWalletSession}  setAssets = {setAssets} setAccount = {setAccount} setOxygen = {setOxygen} setConsumables={setConsumables} setThorium={setThorium}/>} />
            <Route path="/inventory" element={<Inventory 
              Oxygen = {Oxygen} 
              setOxygen = {setOxygen}
              Consumables = {Consumables} 
              setConsumables = {setConsumables}
              Thorium = {Thorium} 
              setThorium = {setThorium}
              wax = {wax} 
              walletSession = {walletSession}
              Assets = {Assets} 
              Account = {Account} 
              setAssets = {setAssets} 
              showunNFTs={showunNFTs} 
              setShowunNFTs={setShowunNFTs} 
            />} />
            <Route path="/collection" element={<Collection 
              wax = {wax} 
              walletSession={walletSession}
              Assets = {Assets} 
              Account = {Account} 
              setAssets = {setAssets}
              Oxygen = {Oxygen} 
              Consumables = {Consumables} 
              Thorium = {Thorium} 
            />} />
            <Route path="/territory" element={<Territory Oxygen = {Oxygen} Consumables = {Consumables} Thorium = {Thorium} Account = {Account}/>} />
            <Route path="/evolution" element={<Evolution Oxygen = {Oxygen} Consumables = {Consumables} Thorium = {Thorium} Account = {Account}/>} />
            <Route path="/breeding" element={<Breeding Oxygen = {Oxygen} Consumables = {Consumables} Thorium = {Thorium} Account = {Account}/>} />
            <Route path="/bank" element={<Bank Oxygen = {Oxygen} Consumables = {Consumables} Thorium = {Thorium} Account = {Account}/>} />
          </Routes>
      </BrowserRouter>
      {/*
      <div className = "main">
        <Sidebar Account = {Account}/>
        <div style = {{overflow: "auto", width: "100%"}}>
        <HeaderAsset Consumables = {0} Thorium = {0} Oxygen = {0}/>
        <BrowserRouter>
            <Routes>
              <Route path="/inventory" element={<Inventory wax = {wax} Assets = {Assets} Account = {Account}/>} />
              <Route path="/collection" element={<Collection wax = {wax} Assets = {Assets} Account = {Account}/>} />
              <Route path="/territory" element={<Territory/>} />
              <Route path="/evolution" element={<Evolution/>} />
              <Route path="/breeding" element={<Breeding/>} />
              <Route path="/bank" element={<Bank/>} />
            </Routes>
        </BrowserRouter>
        </div>
      </div>*/}
    </>
  );
};
