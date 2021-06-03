import * as React from 'react';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthLayout from '../components/auth/AuthLayout';
import styled from 'styled-components';
import FormBox from '../components/auth/FormBox';
import Input from '../components/auth/Input';
import Button from '../components/auth/Button';
import Separator from '../components/auth/Separator';
import BottomBox from '../components/auth/BottomBox';
import routes from '../routes';

export interface Props {
}

export default function SignUp (props: Props) {
  return (
    <AuthLayout>
        <FormBox>
            <h1>Instagram</h1>
            <h2>친구들의 사진과 동영상을 보려면 가입하세요.</h2>
            <Button type="submit">
                <FontAwesomeIcon icon={faFacebookSquare} />
                Facebook으로 로그인
            </Button>
            <Separator />
            <Input placeholder="휴대폰 번호 또는 이메일 주소" />
            <Input placeholder="성명" />
            <Input placeholder="사용자 이름" />
            <Input placeholder="비밀번호" />
            <Button type="submit">
                가입
            </Button>
        </FormBox>
        <BottomBox 
            title="계정이 있으신가요?"
            description="로그인"
            link={routes.home}
        />
    </AuthLayout>
  );
}