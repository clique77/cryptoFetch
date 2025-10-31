import Address from "../value-objects/Address";
import Wallet from "../entities/Wallet";

interface IWalletRepository {
  findById(id: string): Promise<Wallet | null>;
  findByAddress(address: Address): Promise<Wallet | null>;
  findByUserId(userId: string): Promise<Wallet[]>;
  save(wallet: Wallet): Promise<void>;
  delete(id: string): Promise<void>;
}

export default IWalletRepository;