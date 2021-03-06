import { useState } from 'react';
import {
  faFacebookSquare,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import AuthLayout from '../components/auth/AuthLayout';
import FormBox from '../components/auth/FormBox';
import Input from '../components/auth/Input';
import Button from '../components/auth/Button';
import Separator from '../components/auth/Separator';
import BottomBox from '../components/auth/BottomBox';
import FormError, { SFormError } from '../components/auth/FormError';
import PageTitle from '../components/PageTitle';
import routes from '../routes';
import { gql, useMutation, useReactiveVar } from '@apollo/client';
import { darkModeVar, logUserIn } from '../graphql/Apollo';
import { useLocation } from 'react-router-dom';
import { MutationResponse } from '../shared/types';

interface LoginFormField {
  username: string;
  password: string;
  result: string;
}

interface LocationState {
  username: string;
  password: string;
  message: string;
}

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      error
      token
    }
  }
`;

export default function Login() {
  const location = useLocation<LocationState>();
  const [reqErrorMessage, setReqErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormField>({
    mode: 'onChange',
    defaultValues: {
      username: location?.state?.username || '',
      password: location?.state?.password || '',
    },
  });

  const onCompleted = (data: { login: MutationResponse }) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      return setReqErrorMessage(error!);
    }
    if (token) {
      logUserIn(token!);
    }
  };

  const [login, { loading }] = useMutation<
    { login: MutationResponse },
    LoginFormField
  >(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmitValid = (data: LoginFormField) => {
    if (loading) return null;
    login({
      variables: {
        ...data,
      },
    });
  };

  const darkMode = useReactiveVar(darkModeVar);
  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <FontAwesomeIcon
          color={darkMode ? '#fff' : '#000'}
          icon={faInstagram}
          size="3x"
        />
        <Title>Instagram</Title>
        <Notification>{location?.state?.message}</Notification>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register('username', {
              required: {
                value: true,
                message: '????????? ????????? ???????????????.',
              },
            })}
            type="text"
            placeholder="????????? ??????"
            hasError={Boolean(errors?.username)}
          />
          <FormError message={errors?.username?.message} />
          <Input
            {...register('password', {
              required: {
                value: true,
                message: '??????????????? ???????????????.',
              },
              minLength: {
                value: 5,
                message: '??????????????? 5?????? ???????????? ??????????????????.',
              },
            })}
            type="password"
            placeholder="????????????"
            hasError={Boolean(errors?.password)}
          />
          <FormError message={errors?.password?.message} />
          <Button
            disabled={!isValid && !Boolean(errors.result?.message)}
            type="submit"
          >
            {loading ? '????????? ??? ...' : '?????????'}
          </Button>
        </form>
        <Separator />
        <ErrorMessage>{reqErrorMessage}</ErrorMessage>
        <FaceBookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} size="1x" />
          <span>Facebook?????? ?????????</span>
        </FaceBookLogin>
      </FormBox>

      <BottomBox
        title="????????????"
        description="????????? ????????????????"
        link={routes.signUp}
      />
    </AuthLayout>
  );
}

const Notification = styled.div`
  color: #2ecc71;
`;

export const ErrorMessage = styled(SFormError)`
  font-size: 15px;
  margin: 0px 0px 20px;
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.color};
`;

const FaceBookLogin = styled.button`
  color: #385185;
  background-color: #fff;
  border: none;
  cursor: pointer;
  margin: 0 0 20px;
  span {
    margin: 0 10px;
    font-weight: 600;
  }
  svg {
    font-size: 16px;
  }
`;
