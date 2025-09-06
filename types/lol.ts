export interface Champion {
  name: string;
  image: string;
}

export interface Counter {
  my: string;
  enemy: string;
  content: string;
}

export interface LolData {
  champions: Champion[];
  counters: Counter[];
}
