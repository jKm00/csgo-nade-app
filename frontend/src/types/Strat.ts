import type { Lineup } from "@/types/Lineup";

export type Strat = {
  id: number;
  name: string;
  lineups: Lineup[]
}