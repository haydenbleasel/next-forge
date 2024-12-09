import { keys as cms } from '@repo/cms/keys';
import { keys as email } from '@repo/email/keys';
import { keys as core } from '@repo/env';
import { keys as flags } from '@repo/feature-flags/keys';
import { keys as observability } from '@repo/observability/keys';
import { keys as security } from '@repo/security/keys';
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
  extends: [cms(), core(), email(), observability(), flags(), security()],
  server: {},
  client: {},
  runtimeEnv: {},
});
