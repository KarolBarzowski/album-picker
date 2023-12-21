declare module "album-types" {
  interface IAlbum {
    Rank: number;
    Artist: string;
    Album: string | number;
    Info: string;
    Description: string;
  }
}