import { useEffect, useState, useRef, useLayoutEffect } from "react";
import styles from "./Collection.module.scss";
import { Grid, Box, Button } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';

import NFTCard from "../../components/NFTCard";

import Modal from '@mui/material/Modal';

import {Sidebar} from "../../components/Sidebar";
import {HeaderAsset} from "../../components/HeaderAsset";

export interface NFTProp {
  wax: any,
  walletSession: any,
  Assets: any,
  Account: any,
  setAssets: any,
  Consumables:any,
  Thorium: any,
  Oxygen:any,

}
export const Collection = ({ wax, walletSession, Assets, Account, setAssets, Consumables, Thorium, Oxygen }: NFTProp) => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const prefix_uri = "https://ipfs.infura.io/ipfs/";
  const stateFlag=true;
  const modal_style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80%",
    height: "80vh",
    overflow: "auto",
    padding: "40px",
    bgcolor: '#1a203c',
    color: 'white',
    border: '4px solid #000',
    boxShadow: 24,
    borderColor: '#ea923e',
    textAlign: "center",
    borderRadius: "16px",
    p: 4,
  };

  return (
    <div className="main" style={{padding:"0 8% 0 8%"}}>
    <Sidebar Account = {Account}/>
    <div style = {{overflow: "auto", width: "100%"}}>
    <HeaderAsset wax={wax} walletSession={walletSession} account = {Account} Consumables = {Consumables} Thorium = {Thorium} Oxygen = {Oxygen}/>

    <main className={styles.contents} >
      <h1 className="align-center">Collection (if the player has our NFTs)</h1>
      <div className={styles.page_contents}>
        <Box>
          <Grid container spacing={0} style={{justifyContent:"center"}}>
            {Assets.map((NFT: any) => (
              <>
                  <NFTCard 
                    key={NFT.data.img} 
                    state ={stateFlag}  
                    wax = {wax} 
                    walletSession={walletSession}
                    uri={prefix_uri+NFT.data.img} 
                    name={NFT.name} 
                    account={Account} 
                    assetID={NFT.asset_id}  
                    Assets = {Assets} 
                    setAssets = {setAssets}
                    setOxygen = {Oxygen}
                    setConsumables = {Consumables}
                    setThorium = {Thorium}
                  />
              </>
            ))}
            
          </Grid>
        </Box>
      </div>
    </main>
    </div>
    </div>
  );
};
