export interface VoteResponse {
    votes?: number[];
}

export interface PointerResponse {
    names: string[];
    votes?: VoteResponse[];
}