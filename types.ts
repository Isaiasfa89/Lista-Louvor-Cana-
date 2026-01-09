
export type SongType = 'harpa' | 'congregational';

export interface Song {
  id: string;
  number?: number;
  title: string;
  artist?: string;
  keyMen: string;
  keyWomen: string;
  type: SongType;
}

export type ParticipantRole = 'singer' | 'musician';

export interface Participant {
  id: string;
  name: string;
  role: ParticipantRole;
  associatedSongIds: string[]; // Only for singers, linking to congregational songs
}

export interface ServiceScale {
  id: string;
  date: string;
  harpaSongIds: string[];
  congregationalSongIds: string[];
  singerIds: string[];
  musicianIds: string[];
  notes?: string;
}
