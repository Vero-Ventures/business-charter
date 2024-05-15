import { Suspense } from 'react';
import Loading from '@/components/loading';
import FamilyMembers from './family-members';
import { FamilyForm } from './family-management-form';
import AuthenticatedRoute from '../(auth)/authenticated-route';

export default function ContactPage() {
  return (
    <AuthenticatedRoute>
      <main className="min-h-screen px-6 pt-5">
        <h1 className="text-3xl font-bold">Family Management</h1>
        <FamilyForm />
      </main>
    </AuthenticatedRoute>
  );
}
