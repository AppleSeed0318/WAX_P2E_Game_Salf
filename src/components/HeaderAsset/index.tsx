import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import "./headerasset.css";
import { borderRadius, display } from "@mui/system";

export interface AssetProp {
  wax: any,
  walletSession: any,
  account: any,
  Consumables: any,
  Thorium: any,
  Oxygen: any,
}

export const HeaderAsset = ({ wax, walletSession, account, Consumables, Thorium, Oxygen }: AssetProp) => {
  const contract_owner_name = "mudplanetoff";
  const tokencontract_owner_name = "mudplantoken";
  const [oxyg, setOxyg] = useState("0");
  const [cons, setCons] = useState("0");
  const [thor, setThor] = useState("0");

  const deposit = async () => {

    var id_list = [];
    var tokenO, tokenC, tokenT;
    if (oxyg != "") {
      tokenO = parseInt(oxyg) + ".0000" + " OXYG";
      id_list.push(tokenO);
    }
    if (oxyg != "") {
      tokenC = parseInt(cons) + ".0000" + " CONS";
      id_list.push(tokenC);
    }

    if (oxyg != "") {
      tokenT = parseInt(thor) + ".0000" + " THOR";
      id_list.push(tokenT);
    }
    if (!walletSession || account == "") {
      console.log('* Login first *');
    }
    try {
      console.log(tokenO, tokenC, tokenT);
      const result = await walletSession.transact({
        actions: [{
          account: tokencontract_owner_name,
          name: 'transfer',
          authorization: [{
            actor: account,
            permission: 'active',
          }],
          data: {
            from: account,
            to: contract_owner_name,
            quantities: id_list,
            memo: "deposit",
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30
      });
      console.log("result", result);
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
            Oxygen = result1.rows[i].balance_Oxygen;
            Consumables = result1.rows[i].balance_Consumables;
            Thorium = result1.rows[i].balance_Thorium;
          }
        }

      }

    } catch (e) {
      console.log("An error is occured in unstake");
      console.log(e);
    }
  }
  const withdraw = async () => {

    var id_list = [];
    var tokenO, tokenC, tokenT;
    if (oxyg != "") {
      tokenO = parseInt(oxyg) + ".0000" + " OXYG";
    }
    else {
      tokenO = "0.0000 OXYG";
    }
    if (oxyg != "") {
      tokenC = parseInt(cons) + ".0000" + " CONS";
    }
    else {
      tokenC = "0.0000 CONS";
    }
    if (oxyg != "") {
      tokenT = parseInt(thor) + ".0000" + " THOR";
    }
    else {
      tokenT = "0.0000 THOR";
    }
    // id_list.push(parseInt(asset_id));

    if (!walletSession || account == "") {
      console.log('* Login first *');
    }
    try {
      const result = await walletSession.transact({
        actions: [{
          account: contract_owner_name,
          name: 'withdrawn',
          authorization: [{
            actor: account,
            permission: 'active',
          }],
          data: {
            username: account,
            v_Oxygen: tokenO,
            v_Consumables: tokenC,
            v_Thorium: tokenT,
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
  const buytoken = async () => {

    var id_list = [];
    var tokenO, tokenC, tokenT;
    if (oxyg != "") {
      tokenO = parseInt(oxyg) + ".0000" + " OXYG";
    }
    else {
      tokenO = "0.0000 OXYG";
    }
    if (oxyg != "") {
      tokenC = parseInt(cons) + ".0000" + " CONS";
    }
    else {
      tokenC = "0.0000 CONS";
    }
    if (oxyg != "") {
      tokenT = parseInt(thor) + ".0000" + " THOR";
    }
    else {
      tokenT = "0.0000 THOR";
    }

    if (!walletSession || account == "") {
      console.log('* Login first *');
    }
    try {
      const result = await walletSession.transact({
        actions: [{
          account: contract_owner_name,
          name: 'buytokens',
          authorization: [{
            actor: account,
            permission: 'active',
          }],
          data: {
            username: account,
            v_Oxygen: tokenO,
            v_Consumables: tokenC,
            v_Thorium: tokenT,
            memo: "buytoken",
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
  return (
    <div className="asset-header">

      <ul>

        <li>
          <div>
            <img style={{ width: "20%" }} src="/icon/IMG_2364.PNG"></img>
          </div>
          <div>
            {Consumables}
          </div>
        </li>
        <li>
          <div>
            <img style={{ width: "20%" }} src="/icon/IMG_2359.PNG"></img>
          </div>
          <div>
            {Thorium}
          </div>
        </li>
        <li>
          <div>
            <img style={{ width: "20%" }} src="/icon/IMG_2356.PNG"></img>
          </div>
          <div>
            {Oxygen}
          </div>
        </li>
      </ul>
      <div style={{ marginTop: "10px", textAlign: "center" }}>
        <Button style={{ backgroundColor: "#1976d2", color: "white", borderRadius: "10px" }} variant="outlined" sx={{ mr: 2 }} onClick={() => buytoken()}>Buy tokens</Button>

        <Button style={{ backgroundColor: "#1976d2", color: "white", borderRadius: "10px" }} variant="outlined" sx={{ mr: 2 }} onClick={() => deposit()}>Deposit</Button>

        <Button style={{ backgroundColor: "#1976d2", color: "white", borderRadius: "10px" }} variant="outlined" sx={{ mr: 2 }} onClick={() => withdraw()}>Withdraw</Button>
      </div>
      <div style={{ marginTop: "30px", textAlign: "center"}}>
        <form style={{ display:"flex", flexDirection:"column"}}>
          <label>OXYG AMOUNT:
            <input
              style={{ height: "30px!important", borderRadius: "30px", backgroundColor: "darkgrey" }}
              type="text"
              value={oxyg}
              onChange={(e) => setOxyg(e.target.value)}
            />
          </label>
          <label>CONS AMOUNT:
            <input
              style={{ height: "30px!important", borderRadius: "30px", backgroundColor: "darkgrey" }}

              type="text"
              value={cons}
              onChange={(e) => setCons(e.target.value)}
            />
          </label>
          <label>THOR AMOUNT:
            <input
              style={{ height: "30px!important", borderRadius: "30px", backgroundColor: "darkgrey" }}

              type="text"
              value={thor}
              onChange={(e) => setThor(e.target.value)}
            />
          </label>
        </form>
      </div>


    </div>
  );
};
