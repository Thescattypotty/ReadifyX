export interface LoginRequest{
    username: string;
    password: string;
}

export interface RegisterRequest{
    username: string;
    email: string;
    password: string;
}

export interface JwtResponse {
    accessToken: string;
    refreshToken: string;
}

export interface UserRequest{
    username: string;
    email: string;
    roles: ERole[];
    password: string | null | undefined;
}

export interface UserResponse{
    id: string;
    username: string;
    email: string;
    roles: ERole[];
    createdAt: Date;
    updatedAt: Date;
}

export enum ERole {
    ROLE_USER = 'ROLE_USER',
    ROLE_AUTHOR = 'ROLE_AUTHOR',
    ROLE_READER = 'ROLE_READER',
    ROLE_ADMINISTRATOR = 'ROLE_ADMINISTRATOR'
}
export interface TagRequest {
    name: string;
}
export interface TagResponse {
    id: string;
    name: string;
    createdAt: Date;
}

export interface BookRequest {
  title: string;
  genres: string[];
  tagsId?: string[];
  price: number;
  authorId?: string;
  bookFile: FileRequest;
  coverImage?: FileRequest; 
  publishedDate: Date;
}

export interface FileRequest {
  file: File;
  description?: string;
}

export interface BookResponse {
  id: string;
  title: string;
  genres: string[];
  tagsId?: string[]; 
  price: number;
  authorId?: string;
  bookFile: string;
  coverImage?: string;
  publishedDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export enum EGenre {
    Fiction = 'fiction_image',
    NonFiction = 'nonfiction_image',
    Mystery = 'mystery_image',
    Thriller = 'thriller_image',
    Fantasy = 'fantasy_image',
    ScienceFiction = 'science_fiction_image',
    Romance = 'romance_image',
    Horror = 'horror_image',
    Historical = 'historical_image',
    Adventure = 'adventure_image',
    Biography = 'biography_image',
    Autobiography = 'autobiography_image',
    Memoir = 'memoir_image',
    SelfHelp = 'self_help_image',
    Poetry = 'poetry_image',
    Drama = 'drama_image',
    Comics = 'comics_image',
    GraphicNovel = 'graphic_novel_image',
    YoungAdult = 'young_adult_image',
    Children = 'children_image',
    NewAdult = 'new_adult_image',
    Dystopian = 'dystopian_image',
    Paranormal = 'paranormal_image',
    UrbanFantasy = 'urban_fantasy_image',
    HistoricalFiction = 'historical_fiction_image'
} 