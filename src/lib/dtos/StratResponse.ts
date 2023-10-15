export type StratResponse = {
    strat_id: number;
    strat_name: string;
    author: string;
    author_id: string;
    created_at: string;
    team: string | null;
    side: string;
    position_name: string;
    position_img: string;
    map_name: string;
    game_short_name: string;
    game_full_name: string;
}