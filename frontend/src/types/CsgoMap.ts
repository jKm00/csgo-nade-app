import type { Strat } from "@/types/Strat";

export type CsgoMap = {
  name: string;
  thumbnail: string;
  radar: string;
  available: boolean;
  strats: Strat[];
}