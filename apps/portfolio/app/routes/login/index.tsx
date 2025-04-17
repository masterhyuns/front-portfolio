import * as styles from './login.css';
import { Form, useActionData, useNavigate } from '@remix-run/react';
import { Button, InputField } from '@portfolio/ui';
import { ActionFunctionArgs, redirect } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import { authSession } from '@portfolio/server-shared';
import Redis from 'ioredis';
import { json, useTokenStore } from '@portfolio/shared';
const redisConnect = new Redis({
  host: 'localhost',
  port: 6379,
});
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');

  const res = await fetch('http://localhost:4000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const { access_token, refresh_token } = await res.json();
  const session = await authSession.getSession(request.headers.get('Cookie'));
  const sessionId = uuidv4();

  console.log('연결은 문제 없음');
  await redisConnect.set(
    sessionId,
    JSON.stringify({ accessToken: access_token, refreshToken: refresh_token }),
    'EX',
    60 * 60 * 24 * 7
  );
  session.set('session_id', sessionId);
  //console.log('tokenInfo => ', await redisConnect.get(`${sessionId}`));
  return json(
    { accessToken: access_token },
    {
      headers: {
        'Set-Cookie': await authSession.commitSession(session),
      },
    }
  );
};

const LoginPage = () => {
  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();
  const tokenStore = useTokenStore();
  useEffect(() => {
    console.log('actionData?.accessToken => ', actionData?.accessToken);
    if (actionData?.accessToken) {
      tokenStore.setAccessToken(actionData?.accessToken);
      navigate('/projects');
    }
  }, [actionData]);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome Back</h1>
      <p className={styles.subtitle}>test@example.com // 123456</p>
      <Form method="post" className={styles.form}>
        <InputField
          label={'Email'}
          type="email"
          name="email"
          placeholder="Email"
          defaultValue={'test@example.com'}
          required
        />
        <InputField
          label={'Password'}
          type="password"
          name="password"
          placeholder="Password"
          defaultValue={'123456'}
          required
        />
        <Button variant={'primary'} type="submit">
          Sign In
        </Button>
      </Form>
    </div>
  );
};
export default LoginPage;
