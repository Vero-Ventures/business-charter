import { Suspense } from "react";
import Loading from "@/components/loading";
import Contacts from "./contacts";
import { ContactForm } from "./contact-form";
import AuthenticatedRoute from "../(auth)/authenticated-route";

export default function ContactPage() {
  return (
    <AuthenticatedRoute>
      <main className="min-h-screen px-6 pt-5">
        <h1 className="text-3xl font-bold">Contacts</h1>
        <ContactForm />
        <Suspense fallback={<Loading />}>
          <br></br>
          <h1 className="text-3xl font-bold">Family</h1>
          <Contacts />
          <br></br>
          <h1 className="text-3xl font-bold">Outside Contacts</h1>
          <Contacts />
        </Suspense>
      </main>
    </AuthenticatedRoute>
  );
}
