export {};

declare global {
  type ClubType = {
    id: number;
    name: string;
    is_active?: boolean;
  }
}
