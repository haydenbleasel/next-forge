import { signup } from './actions/signup';
import type { FC } from 'react';

const Login: FC = () => (
  <form>
    <label htmlFor="email">Email:</label>
    <input
      id="email"
      name="email"
      type="email"
      required
      aria-labelledby="email"
    />
    <label htmlFor="password">Password:</label>
    <input
      id="password"
      name="password"
      type="password"
      required
      aria-labelledby="password"
    />
    <button type="button" formAction={signup}>
      Sign up
    </button>
  </form>
);

export default Login;
