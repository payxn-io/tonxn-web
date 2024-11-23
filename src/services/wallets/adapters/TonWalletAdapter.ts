import { TON_WALLET_EXTENSION_URL } from 'consts';
import { Cell, StateInit } from 'ton';
import { tonWalletClient } from '../clients/TonWalletClient';
import { TransactionRequest, Wallet, WalletAdapter } from '../types';


export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export class TonWalletWalletAdapter implements WalletAdapter<boolean> {
  async createSession(): Promise<boolean> {
    try {
      await tonWalletClient.ready(150);
      return true;
    } catch (error) {
      window.open(TON_WALLET_EXTENSION_URL, '_blank');
      throw error;
    }
  }

  async awaitReadiness(session: boolean): Promise<Wallet> {
    await tonWalletClient.ready();

    const [[wallet]] = await Promise.all([
      tonWalletClient.requestWallets(),
      delay(150),
    ]);

    if (!wallet) {
      throw new Error('TON Wallet is not configured.');
    }

    return wallet;
  }

  getWallet(session: boolean): Promise<Wallet> {
    return this.awaitReadiness(session);
  }

  isAvailable(): boolean {
    return !!(window as any).ton?.isTonWallet;
  }

  async requestTransaction(_session: any, request: TransactionRequest): Promise<void> {
    const INIT_CELL = new Cell();
    // @ts-ignore
    let b64InitCell = "";
    if(request.stateInit) {
      request.stateInit.writeTo(INIT_CELL);
      b64InitCell = INIT_CELL.toBoc().toString("base64");
    }

    try {
      const res: any = await tonWalletClient.sendTransaction({
        to: request.to,
        value: request.value,
        dataType: 'boc',
        data: request.payload,
        stateInit: b64InitCell,
      })
      
      if(!res){
        throw new Error('Something went wrong')
      }else{
       
      }
     
    } catch (error: any) {      
      throw new Error(error.message)
    }
  }
}

