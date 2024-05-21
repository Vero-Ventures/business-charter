import { Suspense } from 'react';
import Loading from '@/components/loading';
import FamilyMembers from './family-members';
import { FamilyForm } from './family-form';
import Families from './families';
import AuthenticatedRoute from '../(auth)/authenticated-route';

export default function FamilyPage() {
  return (
    <AuthenticatedRoute>
      <main className="min-h-screen px-6 pt-5">
        <h1 className="text-3xl font-bold">Family Management</h1>
        <br></br>
        <h2 className="text-2xl">Your Families</h2>
        <Suspense fallback={<Loading />}>
          <Families />
        </Suspense>
        <br></br>
        <FamilyForm />
      </main>
    </AuthenticatedRoute>
  );
}
