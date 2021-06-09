import {
  gql,
  MutationHookOptions,
  useMutation,
  useQuery,
} from '@apollo/client';
import {
  COMMENT_FRAGMENT,
  PHOTO_FRAGMENT,
  USER_FRAGMENT,
} from '../graphql/fragments';
import { MutationResponse, PhotoTypes, UserTypes } from '../shared/types';
import { Scalars } from '../shared/types';

type Maybe<T> = T | null;

export type toggleLikePhotoMutation = {
  toggleLikePhoto: MutationResponse;
};
export type toggleLikePhotoMutationVariables = {
  id: Scalars['ID'];
};

export type seeFeedQuery = {
  seeFeed: Array<
    { __typename?: 'Photo' } & Pick<
      PhotoTypes,
      | 'id'
      | 'user'
      | 'file'
      | 'caption'
      | 'likes'
      | 'commentNumber'
      | 'createdAt'
      | 'isMine'
      | 'isLiked'
      | 'comments'
      | 'hashtags'
    >
  >;
};
export type seeFeedQueryVariables = {
  page: Scalars['Int'];
};

export type createCommentMutation = {
  createComment: MutationResponse;
};
export type createCommentMutationVariables = {
  photoId: Scalars['Int'];
  payload: Scalars['String'];
};

export type deleteCommentMutation = {
  deleteComment: MutationResponse;
};
export type deleteCommentVariables = {
  commentId: Scalars['Int'];
};

export type seeProfileQuery = {
  seeProfile: UserTypes;
};
export type seeProfileVariables = {
  username: Scalars['String'];
  page: Scalars['Int'];
};

export type followUserMutation = {
  followUser: MutationResponse;
};
export type followUserVariables = {
  username: Scalars['String'];
};

export const followUserDocument = gql`
  mutation followUser($username: String!) {
    followUser(username: $username) {
      ok
      error
    }
  }
`;
export function useFollowUserMutation(
  baseOptions?: MutationHookOptions<followUserMutation, followUserVariables>,
) {
  const [followUser] = useMutation<followUserMutation, followUserVariables>(
    followUserDocument,
    baseOptions,
  );
  return followUser;
}


export type unfollowUserMutation = {
  unfollowUser: MutationResponse;
};
export type unfollowUserVariables = {
  username: Scalars['String'];
};

export const unfollowUserDocument = gql`
  mutation unfollowUser($username: String!) {
    unfollowUser(username: $username) {
      ok
      error
    }
  }
`;
export function useUnfollowUserMutation(
  baseOptions?: MutationHookOptions<
    unfollowUserMutation,
    unfollowUserVariables
  >,
) {
  const [unfollowUser, { data }] = useMutation<unfollowUserMutation, unfollowUserVariables>(
    unfollowUserDocument,
    baseOptions,
  );
  console.log(data);
  return unfollowUser;
}

export const seeProfileDocument = gql`
  ${PHOTO_FRAGMENT}
  ${USER_FRAGMENT}
  query seeProfile($username: String!, $page: Int!) {
    seeProfile(username: $username) {
      ...UserFragment
      name
      bio
      isFollowing
      totalFollowings
      totalFollowers
      photos(page: $page) {
        ...PhotoFragment
      }
    }
  }
`;
export function useSeeProfileQuery(
  baseOptions?: MutationHookOptions<seeProfileQuery, seeProfileVariables>,
) {
  const { loading, data } = useQuery<seeProfileQuery, seeProfileVariables>(
    seeProfileDocument,
    baseOptions,
  );
  return { loading, data };
}

export const deleteCommentDocument = gql`
  mutation deleteComment($commentId: Int!) {
    deleteComment(commentId: $commentId) {
      ok
      error
    }
  }
`;
export function useDeleteCommentMutation(
  baseOptions?: MutationHookOptions<
    deleteCommentMutation,
    deleteCommentVariables
  >,
) {
  const [deleteComment, { loading }] = useMutation<
    deleteCommentMutation,
    deleteCommentVariables
  >(deleteCommentDocument, baseOptions);

  return { deleteComment, loading };
}

export const createCommentDocument = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      error
      id
    }
  }
`;
export function useCreateCommentMutation(
  baseOptions?: MutationHookOptions<
    createCommentMutation,
    createCommentMutationVariables
  >,
) {
  const [createComment, { loading, error }] = useMutation<
    createCommentMutation,
    createCommentMutationVariables
  >(createCommentDocument, baseOptions);

  return { createComment, loading, error };
}

export const toggleLikePhotoDocument = gql`
  mutation toggleLikePhoto($id: Int!) {
    toggleLikePhoto(id: $id) {
      ok
      error
    }
  }
`;
export function useToggleLikePhotoMutation(
  baseOptions?: MutationHookOptions<
    toggleLikePhotoMutation,
    toggleLikePhotoMutationVariables
  >,
) {
  const [toggleLike] = useMutation<
    toggleLikePhotoMutation,
    toggleLikePhotoMutationVariables
  >(toggleLikePhotoDocument, baseOptions);
  return toggleLike;
}

export const seeFeedDocument = gql`
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
  ${USER_FRAGMENT}
  query seeFeed($page: Int!) {
    seeFeed(page: $page) {
      ...PhotoFragment
      user {
        username
        avatar
      }
      caption
      createdAt
      isMine
      comments {
        ...CommentFragment
        user {
          ...UserFragment
        }
      }
    }
  }
`;
export function useSeeFeedQuery(
  baseOptions?: MutationHookOptions<seeFeedQuery, seeFeedQueryVariables>,
) {
  const { data, error, loading } = useQuery<
    seeFeedQuery,
    seeFeedQueryVariables
  >(seeFeedDocument, baseOptions);
  return { data, error, loading };
}
