class Address {
  private value: string;

  private constructor(value: string) {
    if (!Address.isValid(value)) {
      throw new Error('Invalid address');
    }
    this.value = value;
  }

  public toString(): string {
    return this.value;
  }

  public equals(otherAddress: Address): boolean {
    if (!otherAddress) {
      return false;
    }
    return this.value.toLowerCase() === otherAddress.value.toLowerCase();
  }

  public static create(value: string) {
    return new Address(value);
  }

  public static isValidAddress(address: string): boolean {
    return Address.isValid(address);
  }

  private static isValid(address: string): boolean {
    if (!address.startsWith('0x')) {
      return false;
    }

    if (address.length !== 42) {
      return false;
    }

    const hexPart: string = address.slice(2);
    const hexRegex: RegExp = /^[0-9a-fA-F]+$/;

    return hexRegex.test(hexPart);
  }
}

export default Address;