import { Suspense } from 'react';
import LoginPage from './LoginClient'; // rename your existing component to LoginClient.tsx

export default function LoginPageWrapper() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading login...</div>}>
      <LoginPage />
    </Suspense>
  );
}
