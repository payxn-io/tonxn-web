import { Cell, TonClient, Address } from "ton";
import Ton from "assets/images/tokens/ton.svg";

import { localStorageTokensToObject } from "utils";
import { PoolInfo } from 'components/PoolInfo'
import { FOUND_JETTON } from 'consts'

export type PoolInfo = {
    ammMinter: string;
    tokenMinter: string;
    image?: string;
    displayName: string;
    color: string;
    name: string;
    isCustom?: boolean;
    isDisabled?: boolean;
    decimals: number;
    ammVersion?: number;
};

export type PoolInfoRaw = {
    ammMinter?: string;
    tokenMinter?: string;
    image: string;
    displayName: string;
    color: string;
    name: string;
};

export const MainNetPoolsRoot: { [key: string]: PoolInfo } = {
    "EQC61IQRl0_la95t27xhIpjxZt32vl1QQVF2UgTNuvD18W-4": {
        ammMinter: "EQDnLbES4CER47LYR45Ti0cw4ScvPUJ3HShtH9FbIFGDACkj",
        tokenMinter: "EQC61IQRl0_la95t27xhIpjxZt32vl1QQVF2UgTNuvD18W-4",
        image: "https://avatars.githubusercontent.com/u/182174645?s=400&u=203e577597e0a3e35f4cef295c122f0a172f86b9&v=4",
        displayName: "pUSD",
        color: "#3EAAB1",
        name: "Payxn TON USD Coin",
        decimals: 6,
    },
    "EQAW42HutyDem98Be1f27PoXobghh81umTQ-cGgaKVmRLS7-": {
        ammMinter: "EQDXAi23o05pbnxMGIQVFDrZt6fdPeRZlMQ0sPPm0tpEju5I",
        tokenMinter: "EQAW42HutyDem98Be1f27PoXobghh81umTQ-cGgaKVmRLS7-",
        image: "https://w7.pngwing.com/pngs/113/18/png-transparent-tether-hd-logo-thumbnail.png",
        displayName: "USDT",
        color: "#3EAAB1",
        name: "Tether USDT",
        decimals: 18,
    },
    EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c: {
        ammMinter: "EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c",
        tokenMinter: "EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c",
        image: "https://cryptologos.cc/logos/toncoin-ton-logo.png",
        displayName: "TON",
        color: "#4682B4",
        name: "Toncoin",
        decimals: 8,
    },
    "EQAwr5lcbQcLKTAg_SQ-dpKWNQZpO1MGnrAs53bf1gkKTVHx": {
        ammMinter: "EQAoFEOWRZt9rZlJDv60ErW-BlaXsI4Q1yLSAdzqcYuwkg0j",
        tokenMinter: "EQAwr5lcbQcLKTAg_SQ-dpKWNQZpO1MGnrAs53bf1gkKTVHx",
        image: "https://assets.coingecko.com/coins/images/33453/standard/rFmThDiD_400x400.jpg?1701876350",
        displayName: "NOT",
        color: "#3EAAB1",
        name: "Notcoin",
        decimals: 18,
    },
    "EQDCJL0iQHofcBBvFBHdVG233Ri2V4kCNFgfRT-gqAd3Oc86": {
        ammMinter: "EQCiC_tXfU9p5oACQY0naMZi0tZz-1oeKdB1mh3KjvpogFgB",
        tokenMinter: "EQDCJL0iQHofcBBvFBHdVG233Ri2V4kCNFgfRT-gqAd3Oc86",
        image: "https://assets.coingecko.com/coins/images/39699/standard/dogs_logo_200x200.png",
        displayName: "DOGS",
        color: "#CCAAFF",
        name: "DOGS Token",
        isCustom: false,
        decimals: 9,
    },
    "EQCcLAW537KnRg_aSPrnQJoyYjOZkzqYp6FVmRUvN1crSazV": {
        ammMinter: "EQB8Fmy0fbDNyEP_j0lZLbJqbEORgyWLEmJPJWMNbPy-vS_7",
        tokenMinter: "EQCcLAW537KnRg_aSPrnQJoyYjOZkzqYp6FVmRUvN1crSazV",
        image: "https://assets.coingecko.com/coins/images/39102/standard/hamster-removebg-preview.png",
        displayName: "HMSTR",
        color: "#F8BD58",
        name: "Hamster Kombat",
        isCustom: false,
        decimals: 9,
    },
    
};

export let MainNetPools = (): { [key: string]: PoolInfo } => MainNetPoolsRoot;

export const UsersPools = (): { [key: string]: PoolInfo } => {
    return  {...localStorageTokensToObject()}
};

export const TemporaryPool = (): { [key: string]: PoolInfo } => {
    const temporaryPool = JSON.parse(localStorage.getItem(FOUND_JETTON) || '{}')
    const result: any = {}
    result[temporaryPool?.tokenMinter] = temporaryPool
    return result
}


export const ton: PoolInfo = {
    isCustom: false,
    image: Ton,
    displayName: "TON",
    name: "ton",
    color: "#1490CD",
    ammMinter: "ton",
    tokenMinter: "ton",
    decimals: 9,
};

let isTestNet = true;
export const Pools = () => {
    return { ...MainNetPools(), ...UsersPools() };
};

const tokenCache: { [key: string]: Address } = {};

export function addToken(key: string, pool: PoolInfo) {
    const pools = Pools();
    pools[key] = pool;
}

async function fetchAndCache(fn: Promise<Address>, cacheKey: string) {
    const res = await fn;
    tokenCache[cacheKey] = res;
    return res;
}

export async function getToken(client: TonClient, token: string, owner: Address) {
    const jettonWalletKey = `${token}:jettonWallet:${owner}`;
    const jettonWallet = tokenCache[jettonWalletKey] || (await fetchAndCache(resolveJettonWallet(client, owner, Address.parse(Pools()[token].tokenMinter!!)), jettonWalletKey));
    const lpWalletKey = `${token}:lpWallet`;
    const lpWallet = tokenCache[lpWalletKey] || (await fetchAndCache(resolveJettonWallet(client, owner, Address.parse(Pools()[token].ammMinter!!)), lpWalletKey));

    return {
        ...Pools()[token],
        jettonWallet,
        lpWallet,
    };
}

export async function resolveJettonWallet(client: TonClient, walletAddress: Address, jettonMaster: Address) {
    let cell = new Cell();
    cell.bits.writeAddress(walletAddress);

    // tonweb style - this way its more optimized for browser
    const b64data = bytesToBase64(await cell.toBoc({ idx: false }));
    let res = await client.callGetMethod(jettonMaster, "get_wallet_address", [["tvm.Slice", b64data]]);

    return bytesToAddress(res.stack[0][1].bytes);
}

export function bytesToAddress(bufferB64: string) {
    const buff = Buffer.from(bufferB64, "base64");
    let c2 = Cell.fromBoc(buff);
    return c2[0].beginParse().readAddress() as Address;
}

const base64abc = (() => {
    const abc = [];
    const A = "A".charCodeAt(0);
    const a = "a".charCodeAt(0);
    const n = "0".charCodeAt(0);
    for (let i = 0; i < 26; ++i) {
        abc.push(String.fromCharCode(A + i));
    }
    for (let i = 0; i < 26; ++i) {
        abc.push(String.fromCharCode(a + i));
    }
    for (let i = 0; i < 10; ++i) {
        abc.push(String.fromCharCode(n + i));
    }
    abc.push("+");
    abc.push("/");
    return abc;
})();

/**
 * @param bytes {Uint8Array}
 * @return {string}
 */
export function bytesToBase64(bytes: any) {
    let result = "";
    let i;
    const l = bytes.length;
    for (i = 2; i < l; i += 3) {
        result += base64abc[bytes[i - 2] >> 2];
        result += base64abc[((bytes[i - 2] & 0x03) << 4) | (bytes[i - 1] >> 4)];
        result += base64abc[((bytes[i - 1] & 0x0f) << 2) | (bytes[i] >> 6)];
        result += base64abc[bytes[i] & 0x3f];
    }
    if (i === l + 1) {
        // 1 octet missing
        result += base64abc[bytes[i - 2] >> 2];
        result += base64abc[(bytes[i - 2] & 0x03) << 4];
        result += "==";
    }
    if (i === l) {
        // 2 octets missing
        result += base64abc[bytes[i - 2] >> 2];
        result += base64abc[((bytes[i - 2] & 0x03) << 4) | (bytes[i - 1] >> 4)];
        result += base64abc[(bytes[i - 1] & 0x0f) << 2];
        result += "=";
    }
    return result;
}

// Deployer : https://sandbox.tonwhales.com/explorer/address/EQBdPuDE6-9QE6c7dZZWbfhsE2jS--EfcwfEvGaWjKeW8vfO
// USDC-Minter : https://sandbox.tonwhales.com/explorer/address/EQCDEwcaliIbTcV13eLMfvZ3QAXaIGv9v4mxZbFKYCPRmh8B
// DeployerUSDC : https://sandbox.tonwhales.com/explorer/address/EQD05JqOhN8IY1FU_RspKhx4o9jn5aLlqJouYMZgpIi6ZlTr
// AMM-Minter : https://sandbox.tonwhales.com/explorer/address/EQDZgM7d4EnRkKYPjc1SU34U6PTv1tDz86ct-H_Js-rntnTB
// LP-Wallet : https://sandbox.tonwhales.com/explorer/address/EQAblUXhaGCFlt4kqxZeLNxPYvsI_MWkpnAWqVIpmRayhw4L
