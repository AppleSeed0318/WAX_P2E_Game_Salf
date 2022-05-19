import React from "react";
import { useEffect, useState } from "react";

import "./card.css";
import Button from '@mui/material/Button';
import { Box, Grid } from '@mui/material';


import Typography from '@mui/material/Typography';

import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { randomUUID } from "crypto";

export interface URIProp {
  state: any,
  wax: any,
  walletSession: any,
  uri: any,
  name: string,
  account: string,
  assetID: string,
  Assets: any,
  setAssets: any,
  showunNFTs?: any,
  setShowunNFTs?: any,
  setOxygen: any,
  setConsumables: any,
  setThorium: any,
}

const NFTCard = ({ state, wax, walletSession, uri, name, account, assetID, Assets, setAssets, showunNFTs, setShowunNFTs, setOxygen, setConsumables, setThorium }: URIProp) => {
  const contract_owner_name = "mudplanetoff";
  const [hide, setHide] = useState(false);
  const box_style = {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    margin: "auto",
    height: "100%",
    maxWidth: "200px",
    width: "70%",
    p: 2,
    padding: "10px 5px 10px 5px",
    bgcolor: '#1a1f3c',
    borderRadius: 4,
    border: "2px solid",
    backgroundImage: "radial-gradient(circle, #5c0067 0%, #06313a 100%)",
  }

  const display_none = {
    display: "none",
  }
  const stake = async (asset_id: any) => {
    console.log("wax", wax);
    var id_list = [];
    id_list.push(asset_id);
    console.log(walletSession, account);
    if (!walletSession || account == "") {
      console.log('* Login first *');
    }
    try {
      const result = await walletSession.transact({
        actions: [{
          account: "atomicassets",
          name: 'transfer',
          authorization: [{
            actor: account,
            permission: 'active',
          }],
          data: {
            from: account,
            to: contract_owner_name,
            asset_ids: id_list,
            memo: 'game',
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30
      });

      if (result) {
        let _Assets = [...Assets];
        let _showunNFTs = [...showunNFTs];

        console.log("before stake  =  ", _Assets);

        for (var i = 0; i < _Assets.length; i++) {
          if (_Assets[i].asset_id == asset_id) {
            _showunNFTs.push(_Assets[i]);
            _Assets.splice(i, 1);
            console.log("remove item index", asset_id);
            break;
          }
        }

        console.log("after stake  =  ", _Assets);

        setShowunNFTs(_showunNFTs);
        setAssets(_Assets);

      }
      else {
        console.log("result value is null, stake request faild!!!");
      }

    } catch (e) {
      console.log(e);
      console.log("An error is occured in stake");
    }
  }

  const unstake = async (asset_id: any) => {

    var id_list = [];
    id_list.push(parseInt(asset_id));

    if (!walletSession || account == "") {
      console.log('* Login first *');
    }
    try {
      const result = await walletSession.transact({
        actions: [{
          account: contract_owner_name,
          name: 'unstake',
          authorization: [{
            actor: account,
            permission: 'active',
          }],
          data: {
            username: account,
            unstakeID: id_list,
            memo: 'game',
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30
      });

      if (result) {
        let _Assets = [...Assets];
        let _showunNFTs = [...showunNFTs];

        console.log("before stake  =  ", _Assets);

        for (var i = 0; i < _showunNFTs.length; i++) {
          if (_showunNFTs[i].asset_id == asset_id) {
            _Assets.push(_showunNFTs[i]);
            _showunNFTs.splice(i, 1);
            break;
          }
        }
        setShowunNFTs(_showunNFTs);
        setAssets(_Assets);
      }

    } catch (e) {
      console.log("An error is occured in unstake");
      console.log(e);
    }
  }
  const sendMission = async (asset_id: any, mission: any) => {

    var id_list = [];
    id_list.push(parseInt(asset_id));

    if (!walletSession || account == "") {
      console.log('* Login first *');
    }
    try {
      const nftNames = ["Canis", "Odonata", "Hydrozoa"];
      let selectNFTkind = nftNames[Math.floor(Math.random() * 3)];
      let balance_Oxygen, balance_Consumables, balance_Thorium;
      const original_balance = await wax.rpc.get_table_rows({
        json: true,
        code: contract_owner_name,
        scope: contract_owner_name,
        table: "peoplelist",
        reverse: false,
        show_payer: false
      });
      for (let i = 0; i < original_balance.rows.length; i++) {
        if (original_balance.rows[i].user == account) {
          balance_Oxygen =  original_balance.rows[i].balance_Oxygen;
          balance_Consumables = original_balance.rows[i].balance_Consumables;
          balance_Thorium = original_balance.rows[i].balance_Thorium;
        }
      }
      const result = await walletSession.transact({
        actions: [{
          account: contract_owner_name,
          name: 'sendnft',
          authorization: [{
            actor: account,
            permission: 'active',
          }],
          data: {
            username: account,
            missionNFTs: id_list,
            mission: mission.toString()
          },
        }, {
          account: contract_owner_name,
          name: 'mission',
          authorization: [{
            actor: account,
            permission: 'active',
          }],
          data: {
            username: account,
            sendNFT: parseInt(asset_id),
            nftName: selectNFTkind,
            mission: mission.toString()
          },
        }
        ]
      }, {
        blocksBehind: 3,
        expireSeconds: 30
      });

      if (result) {
        const result1 = await wax.rpc.get_table_rows({
          json: true,
          code: contract_owner_name,
          scope: contract_owner_name,
          table: "peoplelist",
          reverse: false,
          show_payer: false
        });
        for (let i = 0; i < result1.rows.length; i++) {
          if (result1.rows[i].user == account) {
            setOxygen(result1.rows[i].balance_Oxygen);
            setConsumables(result1.rows[i].balance_Consumables);
            setThorium(result1.rows[i].balance_Thorium);
          }
        }

      }

    } catch (e) {
      console.log("An error is occured in unstake");
      console.log(e);
    }
  }

  //------------ for model start------------

  const modal_style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#1a203c',
    color: 'white',
    border: '4px solid #000',
    boxShadow: 24,
    borderColor: '#ea923e',
    textAlign: "center",
    borderRadius: "16px",
    p: 4,
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //------------ for model end------------

  const getInputValue = (event: any) => {
    let _value = event.target.value;
    console.log("value = ", _value, Math.floor(_value));
  };

  const onSubmit = () => {

  }

  return (
    <Grid xl={2.4} md={4} sm={6} xs={12} style={{ marginBottom: "50px" }} sx={[hide ? display_none : {}]}>
      <Box sx={box_style}>

        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modal_style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Type stake amounts
              </Typography>

              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Button variant="outlined" sx={{ mr: 2 }} onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={() => onSubmit()}>Confirm</Button>
              </Typography>
            </Box>
          </Modal>
        </div>

        <Box style={{ width: "100%", margin: "auto" }}>
          <Box sx={{ width: "90%", textAlign: "center", margin: "auto" }}>
            <img style={{ width: "100%", borderRadius: "16px" }} src={uri} alt="card" />
            {state ? <Button variant="contained" onClick={() => stake(assetID)}>stake</Button>
              : <><Button variant="contained" onClick={() => unstake(assetID)}>unstake</Button><Button style={{marginTop:"5px", borderRadius:"20px"}} variant="contained" onClick={() => sendMission(assetID, 1)}>mission</Button></>
            }
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default NFTCard;