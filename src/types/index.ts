export interface ProfileData {
  stageName: string | null;
  bio: string | null;
  genres: Array<string> | null;
  instruments: Array<string> | null;
  twitter: string | null;
  instagram: string | null;
  facebook: string | null;
  bandcamp: string | null;
  spotify: string | null;
  youtube: string | null;
  soundcloud: string | null;
  examples: string | null;
}

export interface Post {
  id: string;
  post: string;
  createdAt: string;
}

export const enum UserTypes {
  bigBoss = 'bigBoss',
  member = 'member',
  bandmate = 'bandmate',
}
