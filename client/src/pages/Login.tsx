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
import { darkModeVar, logUserIn } from '../Apollo';
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
  const [reqErrorMessage, setReqErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm<LoginFormField>({
    mode: 'onChange',
    defaultValues: {
      username: location?.state?.username || '',
      password: location?.state?.password || '',
    },
  });

  const onCompleted = (data: { login: MutationResponse }) => {
    console.log(data);
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      setReqErrorMessage(error!);
      return null;
    }
    logUserIn(token!);
  };

  const [login, { loading }] = useMutation<
    { login: MutationResponse },
    LoginFormField
  >(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmitValid = (data: LoginFormField) => {
    console.log(loading);
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
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register('username', {
              required: {
                value: true,
                message: '사용자 이름은 필수입니다.',
              },
            })}
            type="text"
            placeholder="사용자 이름"
            hasError={Boolean(errors?.username)}
          />
          <FormError message={errors?.username?.message} />
          <Input
            {...register('password', {
              required: {
                value: true,
                message: '비밀번호는 필수입니다.',
              },
              minLength: {
                value: 5,
                message: '비밀번호는 5자리 이상으로 설정해주세요.',
              },
            })}
            type="password"
            placeholder="비밀번호"
            hasError={Boolean(errors?.password)}
          />
          <FormError message={errors?.password?.message} />
          <Button
            disabled={!isValid && !Boolean(errors.result?.message)}
            type="submit"
          >
            {loading ? '로그인 중 ...' : '로그인'}
          </Button>
        </form>
        <Separator />
        <ErrorMessage>{reqErrorMessage}</ErrorMessage>
        <FaceBookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} size="1x" />
          <span>Facebook으로 로그인</span>
        </FaceBookLogin>
      </FormBox>

      <BottomBox
        title="가입하기"
        description="계정이 없으신가요?"
        link={routes.signUp}
      />
    </AuthLayout>
  );
}

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
