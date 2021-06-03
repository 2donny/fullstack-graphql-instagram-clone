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
import routes from '../routes';

export interface Props {}

export default function Login(props: Props) {
  const { register, handleSubmit } = useForm();
  const onSubmitValid = (data: any) => {
    console.log(data);
  }
  const onSubmitInValid = (data: any) => {
    console.log(data);
  }

  console.log(register("username"));
  return (
    <AuthLayout>
      <FormBox>
        <FontAwesomeIcon icon={faInstagram} size="3x" />
        <h1>Instagram</h1>
        <form onSubmit={handleSubmit(onSubmitValid, onSubmitInValid)}>
          <Input
            {...register("username")} 
            type="text" 
            placeholder="전화번호, 사용자 이름 또는 이메일" 
          />
          <Input
            {...register("password")} 
            type="password" 
            placeholder="비밀번호" 
          />
          <Button type="submit">로그인</Button>
        </form>
        <Separator />
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
