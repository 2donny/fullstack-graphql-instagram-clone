export interface MutationResponse {
  ok: boolean;
  error?: string;
  token?: string;
  [key: ?string]: {};
}

export interface UserTypes {
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  bio?: string;
  avatar?: string;
  followers?: [UserTypes];
  followings?: [UserTypes];
  photos?: [PhotoTypes];
  totalFollowings?: number;
  totalFollowers?: number;
  isMe?: boolean;
  isFollowing?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PhotoTypes {
  id?: number;
  user?: UserTypes;
  file?: string;
  caption?: string;
  hashtags?: [HashtagTypes];
  createdAt?: string;
  updatedAt?: string;
  isMine?: boolean;
  likes?: number;
  isLiked?: boolean;
  commentNumber?: number;
  comments?: [CommentTypes]
}

export interface LikeTypes {
  id?: number;
  photo?: PhotoTypes;
  createdAt?: string;
  updatedAt?: string;
}

export interface HashtagTypes {
  id?: number;
  hashtag?: string;
  photos?: [PhotoTypes];
  totalPhotos?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CommentTypes {
  id?: number
  user?: UserTypes
  photo?: PhotoTypes
  payload?: string
  isMine?: boolean
  createdAt?: string
  updatedAt?: string
}