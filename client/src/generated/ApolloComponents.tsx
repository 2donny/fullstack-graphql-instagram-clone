import {
  gql,
  MutationHookOptions,
  useMutation,
  useQuery,
} from '@apollo/client';
import { MutationResponse, PhotoTypes } from '../shared/types';
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
  query seeFeed($page: Int!) {
    seeFeed(page: $page) {
      id
      user {
        username
        avatar
      }
      file
      caption
      likes
      commentNumber
      createdAt
      isMine
      isLiked
      comments {
        id
        user {
          username
          avatar
          isMe
          createdAt
        }
        payload
        isMine
        createdAt
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
