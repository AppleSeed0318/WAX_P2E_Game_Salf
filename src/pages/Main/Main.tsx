import { useEffect, useState, useRef, useLayoutEffect } from "react";
import styles from "./Main.module.scss";
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

import { SlideView } from "../../components/SlideView";
import { StakePanel } from "../../components/StakePanel";

import Modal from '@mui/material/Modal';

export interface NFTProp {
  wax: any,
  Assets: any,
  Account: any,
}
export const Main = ({ wax, Assets, Account }: NFTProp) => {
  const [showNFTs, setShowNFTs] = useState(Assets);

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

  console.log(showNFTs);
  let totalNFTs: any = [];
  let nfts: any = [
    // (<img src="/image/nft/nft-forest-2.png" />),
    // (<img src="/image/nft/nft-snake-2.png" />),
    // (<img src="/image/nft/nft-snake-1.png" />),
    // (<img src="/image/nft/nft-forest-1.png" />),
    // (<img src="/image/nft/nft-forest-2.png" />),
    // (<img src="/image/nft/nft-snake-2.png" />),
    // (<img src="/image/nft/nft-snake-1.png" />),
  ];

  let ids: any=[];

  let flag = 0;
  flag = 1;
  // useEffect(() => {
  var src = "https://ipfs.atomichub.io/ipfs/";
  console.log("gg", Assets);

  for (const data of Assets) {
    let img1:any = data.data.img;
    let img_src = (<img src={`https://ipfs.atomichub.io/ipfs/${img1}`}/>);
    nfts.push(img_src);

    ids.push(data.asset_id);
  }
  console.log(nfts);
  // }, [flag]);



  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  const contract_owner_name = "houfanglin12";

  const onStake = (asset_id:any) => {
    console.log("select asset_id = ", asset_id);
    stake(asset_id);
  }

  const stake = async (asset_id:any) => {
    
    var id_list = [];
    id_list.push(asset_id);

    if (!wax.api || Account == "") {
      console.log('* Login first *');
    }
    try {
        const result = await wax.api.transact({
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
        
        if(result) {
          
        }
        else {
          console.log("result value is null, stake request faild!!!");
        }

    } catch (e) {
        console.log("An error is occured in stake");
    }
  }

  const unstake = async (asset_id:any) => {

    var id_list = [];
    id_list.push(parseInt(asset_id));

    if (!wax.api || Account == "") {
      console.log('* Login first *');
    }
    try {
        const result = await wax.api.transact({
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

  const claim = async (asset_id:any) => {
    
    var id_list = [];
    id_list.push(parseInt(asset_id));

    if (!wax.api || Account == "") {
      console.log('* Login first *');
    }
    try {
        const result = await wax.api.transact({
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
    
    if (!wax.api || Account == "") {
      console.log('* Login first *');
    }
    try {
        const result = await wax.api.transact({
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
    <main className={styles.main} >
      <div className={styles.contents}>
        <div className={styles.header}>
          <div className={styles.bottle}><img src="/image/item_bottle.png" /><span>20</span></div>
        </div>

        <div className={styles.nft_panel}>
          <h1 className={styles.align_center}>YOUR NFTS</h1>
          <SlideView items={nfts} />
        </div>

        <div className={styles.button_group}>
          <Button className={styles.btn_home}></Button>
          <Button className={styles.btn_stake} onClick = {handleOpen}></Button>
          <Button className={styles.btn_fight}></Button>
        </div>

      </div>
    </main>
  );
};
