import { env } from '@/shared/env';
import { app } from './app';

app.listen(env.PORT, '0.0.0.0', () => {
  console.log(`server running on http://localhost:${env.PORT}`);
  console.log(`server running on http://192.168.15.9:${env.PORT}`);
});
