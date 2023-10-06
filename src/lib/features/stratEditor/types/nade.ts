export enum NadeType {
  SMOKE = 'SMOKE',
  FLASH = 'FLASH',
  MOLOTOV = 'MOLOTOV',
  HE = 'HE',
  DECOY = 'DECOY',
}

export interface Nade {
  id: number;
  name: string;
  notes: string;
  type: NadeType | undefined;
  lineupX: number;
  lineupY: number;
  impactX: number | undefined;
  impactY: number | undefined;
  lineupImg: File | undefined;
  impactImg: File | undefined;
}
