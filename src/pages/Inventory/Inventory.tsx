import { useEffect, useState, useRef, useLayoutEffect } from "react";
import styles from "./Inventory.module.scss";
import { Grid, Box, Button } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";

import NFTCard from "../../components/NFTCard";
import { SlideView } from "../../components/SlideView";
import { StakePanel } from "../../components/StakePanel";

import { Sidebar } from "../../components/Sidebar";
import { HeaderAsset } from "../../components/HeaderAsset";

import Modal from '@mui/material/Modal';

export interface NFTProp {
  Oxygen: any,
  setOxygen: any,
  Consumables: any,
  setConsumables: any,
  Thorium: any,
  setThorium: any,
  wax: any,
  walletSession: any,
  Assets: any,
  Account: any,
  setAssets: any,
  showunNFTs: any,
  setShowunNFTs: any,
}
export const Inventory = ({  
  Oxygen, 
  setOxygen, 
  Consumables, 
  setConsumables, 
  Thorium, 
  setThorium, 
  wax, 
  walletSession, 
  Assets, 
  Account, 
  setAssets, 
  showunNFTs, 
  setShowunNFTs
}: NFTProp) => {


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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


  let nfts: any = [
    // (<img src="/image/nft/nft-forest-2.png" />),
    // (<img src="/image/nft/nft-snake-2.png" />),
    // (<img src="/image/nft/nft-snake-1.png" />),
    // (<img src="/image/nft/nft-forest-1.png" />),
    // (<img src="/image/nft/nft-forest-2.png" />),
    // (<img src="/image/nft/nft-snake-2.png" />),
    // (<img src="/image/nft/nft-snake-1.png" />),
  ];

  let ids: any = [];

  let flag = 0;
  let stateFloag = true;
  flag = 1;
  var src = "https://ipfs.atomichub.io/ipfs/";
  const contract_owner_name = "mudplanetoff";
  const collection = "mudplanetoff";
  const prefix_uri = "https://ipfs.infura.io/ipfs/";

  useEffect(() => {
    main();
  }, [Account]);

  for (const data of Assets) {
    let img1: any = data.data.img;
    let img_src = (<img src={`https://ipfs.atomichub.io/ipfs/${img1}`} />);
    nfts.push(img_src);
    ids.push(data.asset_id);
  }
  const main = async () => {

    if (Account) {
      let assets = await GetAssets();
      if (assets.length != 0) {
        let totalNFTs: any = [];
        totalNFTs = await PopulateData(assets);
        console.log("send total NFTs", totalNFTs);
        setShowunNFTs(totalNFTs);
      }
    }
  }
  const GetAssets = async () => {
    let results = [];
    var path = "atomicassets/v1/assets?collection_name=" + collection + "&owner=" + contract_owner_name + "&page=1&limit=1000&order=desc&sort=asset_id";
    const response = await fetch("https://" + "wax.api.atomicassets.io/" + path, {
      headers: {
        "Content-Type": "text/plain"
      },
      method: "POST",
    });
    const body = await response.json();
    if (body.data.length != 0)
      results = body.data;
    return results;
  }

  const PopulateData = async (assets: any) => {
    // console.log("assets", assets);
    let totalNFTs: any = [];

    console.log("populate data = ", assets.length, assets);

    // var src = "https://ipfs.atomichub.io/ipfs/";

    const result = await wax.rpc.get_table_rows({
      json: true,
      code: contract_owner_name,
      scope: contract_owner_name,
      table: "stakers",
      reverse: false,
      show_payer: false
    });

    console.log("table rows = ", result);

    for (let i = 0; i < result.rows.length; i++) {
      if (result.rows[i].username == Account) {
        for (let j = 0; j < result.rows[i].productionMachine.length; j++) {
          for (const data of assets) {
            console.log("assets data = = ", result.rows[i].productionMachine[j].nfts[0], data.asset_id);

            if (result.rows[i].productionMachine[j].nfts[0] == data.asset_id) {
              // let img_src = src + data.data.img;
              totalNFTs.push(data);
            }
          }
        }
      }
    }
    console.log("totalNFTs", totalNFTs);
    // setNFT(totalNFTs);
    return totalNFTs;
  }


  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



  const onStake = (asset_id: any) => {
    console.log("select asset_id = ", asset_id);
    stake(asset_id);
  }

  const stake = async (asset_id: any) => {

    var id_list = [];
    id_list.push(asset_id);

    if (!walletSession || Account == "") {
      console.log('* Login first *');
    }
    try {
      const result = await walletSession.transact({
        actions: [{
          account: "atomicassets",
          name: 'transfer',
          authorization: [{
            actor: Account,
            permission: 'active',
          }],
          data: {
            from: Account,
            to: contract_owner_name,
            asset_ids: id_list,
            memo: 'snake',
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30
      });

      if (result) {

      }
      else {
        console.log("result value is null, stake request faild!!!");
      }

    } catch (e) {
      console.log("An error is occured in stake");
    }
  }

  const unstake = async (asset_id: any) => {

    var id_list = [];
    id_list.push(parseInt(asset_id));

    if (!walletSession || Account == "") {
      console.log('* Login first *');
    }
    try {
      const result = await walletSession.transact({
        actions: [{
          account: contract_owner_name,
          name: 'unstake',
          authorization: [{
            actor: Account,
            permission: 'active',
          }],
          data: {
            username: Account,
            unstakeID: id_list,
            memo: 'Oil',
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30
      });

    } catch (e) {
      console.log("An error is occured in unstake");
      console.log(e);
    }
  }

  const claim = async (asset_id: any) => {

    var id_list = [];
    id_list.push(parseInt(asset_id));

    if (!walletSession || Account == "") {
      console.log('* Login first *');
    }
    try {
      const result = await walletSession.transact({
        actions: [{
          account: contract_owner_name,
          name: 'claim',
          authorization: [{
            actor: Account,
            permission: 'active',
          }],
          data: {
            username: Account,
            assets_id: id_list,
            memo: 'claim',
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30
      });

    } catch (e) {
      console.log("An error is occured in claim");
      console.log(e);
    }
  }

  const randomWinner = async () => {

    if (!walletSession || Account == "") {
      console.log('* Login first *');
    }
    try {
      const result = await walletSession.transact({
        actions: [{
          account: contract_owner_name,
          name: 'checksolowin',
          authorization: [{
            actor: Account,
            permission: 'active',
          }],
          data: {
            username: Account,
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30
      });

    } catch (e) {
      console.log("An error is occured in claim");
      console.log(e);
    }
  }

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  return (
    <div className="main" style={{padding:"0 8% 0 8%"}}>
      <Sidebar Account={Account} />
      <div style={{ overflow: "auto", width: "100%" }}>
        <HeaderAsset wax={wax} walletSession={walletSession} account = {Account} Consumables={Consumables} Thorium={Thorium} Oxygen={Oxygen} />
        <main className={styles.contents} >
          <h1 className="align-center">Collection (if the player has no NFTs staked)</h1>
          <div className={styles.page_contents}>
            <Box>
              <Grid container spacing={0} style={{justifyContent:"center"}}>
                {Assets.map((NFT: any) => (
                  <>
                    <NFTCard
                      key={NFT.data.img}
                      state={stateFloag}
                      wax={wax} 
                      walletSession={walletSession}
                      uri={prefix_uri + NFT.data.img}
                      name={NFT.name}
                      account={Account}
                      assetID={NFT.asset_id}
                      Assets={Assets}
                      setAssets={setAssets}
                      showunNFTs={showunNFTs}
                      setShowunNFTs={setShowunNFTs}
                      setOxygen={setOxygen}
                      setConsumables={setConsumables}
                      setThorium={setThorium}
                    />
                  </>
                ))}
                {showunNFTs.map((NFT: any) => (
                  <>
                    <NFTCard
                      key={NFT.data.img}
                      state={!stateFloag}
                      wax={wax}
                      walletSession={walletSession}
                      uri={prefix_uri + NFT.data.img}
                      name={NFT.name}
                      account={Account}
                      assetID={NFT.asset_id}
                      Assets={Assets}
                      setAssets={setAssets}
                      showunNFTs={showunNFTs}
                      setShowunNFTs={setShowunNFTs}
                      setOxygen={setOxygen}
                      setConsumables={setConsumables}
                      setThorium={setThorium}
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
