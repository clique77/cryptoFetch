export interface ITokengenerator {
  generate(userId: string): string;
  verify(token: string): { userId: string } | null;
}