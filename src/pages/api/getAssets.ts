import { NextApiRequest, NextApiResponse } from "next";
import { AlgoDriver, getAllAssetsForAddress, getAssetDetails, setChainDriver } from "blockin";
import { getColorFromMetadata } from "../../permissions/permissions";

setChainDriver(new AlgoDriver('Testnet', process.env.ALGO_API_KEY ? process.env.ALGO_API_KEY : ''))

const getAssetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
    const address = req.body.address;
    const assetMap = req.body.assetMap;
    const includeColors = req.body.includeColors;

    const assets: any[] = [];

    const allAssets = await getAllAssetsForAddress(address);
    const newAssetMap = assetMap;

    for (const asset of allAssets) {
        if (asset['amount'] > 0) {
            assets.push(asset);
        }
    }

    for (const asset of assets) {

        const id: string = asset['asset-id'];
        if (!newAssetMap[id]) {
            const assetInfo = await getAssetDetails(id);
            newAssetMap[id] = assetInfo;
        }

        if (includeColors) {
            asset['color'] = await getColorFromMetadata(newAssetMap[id]['metadata-hash']);


            if (!asset['color']) {
                asset['color'] = 'Custom';
            } else {
                asset['color'] = asset['color'].charAt(0).toUpperCase() + asset['color'].slice(1);
            }
        }
    }

    return res.status(200).json({ assets, assetMap: newAssetMap });

};

export default getAssetRequest;
