import { NextApiRequest, NextApiResponse } from "next";
import { createAssetTxn, setChainDriver } from 'blockin-test-package';
import { stringify } from "../../utils/preserveJson";
import AlgoDriver from "blockin-algo-driver";

const chainDriver = new AlgoDriver('Testnet', process.env.ALGO_API_KEY ? process.env.ALGO_API_KEY : '')
setChainDriver(chainDriver);

const createOptInTxn = async (req: NextApiRequest, res: NextApiResponse) => {

    const to = req.body.to;
    const assetId = req.body.assetId;

    // Create asset, sign, and send to network
    const uTxn = await chainDriver.makeAssetOptInTxn({
        to,
        assetIndex: Number(assetId),
    });

    const uTxnString = stringify(uTxn);  //little hack to preserve Uint8Arrays

    return res.status(200).json({ uTxn: uTxnString });
};

export default createOptInTxn;
