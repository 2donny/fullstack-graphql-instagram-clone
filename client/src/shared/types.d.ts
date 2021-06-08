export type Array<T> = [T];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: number;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export interface MutationResponse {
  ok: Scalars['Boolean'];
  error: Scalars['String'];
  token: Scalars['String'];
  id: Scalars['Int'];
}

export interface UserTypes {
  id: Scalars['String'];
  name: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  bio: Scalars['String'];
  avatar: Scalars['String'];
  followers: [UserTypes];
  followings: [UserTypes];
  photos: [PhotoTypes];
  totalFollowings: Scalars['Int'];
  totalFollowers: Scalars['Int'];
  isMe: Scalars['boolean'];
  isFollowing: Scalars['boolean'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
}

export interface PhotoTypes {
  id: Scalars['ID'];
  user: UserTypes;
  file: Scalars['String'];
  caption: Scalars['String'];
  hashtags: [HashtagTypes];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  isMine: Scalars['boolean'];
  likes: Scalars['Int'];
  isLiked: Scalars['boolean'];
  commentNumber: Scalars['Int'];
  comments: [CommentTypes];
}

export interface LikeTypes {
  id: Scalars['Int'];
  photo: PhotoTypes;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
}

export interface HashtagTypes {
  id: Scalars['Int'];
  hashtag: Scalars['String'];
  photos: [PhotoTypes];
  totalPhotos: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
}

export interface CommentTypes {
  id: Scalars['Int'];
  user: UserTypes;
  photo: PhotoTypes;
  payload: Scalars['String'];
  isMine: Scalars['boolean'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
}
