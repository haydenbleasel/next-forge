'use client';

import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import type { FC } from 'react';

export const Analytics: FC = () => <VercelAnalytics />;
