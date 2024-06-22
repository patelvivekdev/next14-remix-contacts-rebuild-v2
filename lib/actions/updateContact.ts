'use server';

import { eq } from 'drizzle-orm';
import {  revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { contactsTable } from '@/db/schema';
import type { ContactSchemaErrorType, ContactSchemaType } from '@/validations/contactSchema';
import { contactSchema } from '@/validations/contactSchema';

type State = {
  success?: boolean;
  data?: ContactSchemaType;
  error?: ContactSchemaErrorType;
};

export async function updateContact(contactId: string, _prevState: State, formData: FormData): Promise<State> {
  const contact = Object.fromEntries(formData);
  const result = contactSchema.safeParse(contact);

  if (!result.success) {
    return {
      data: contact as ContactSchemaType,
      error: result.error.formErrors,
      success: false,
    };
  }

  await db
    .update(contactsTable)
    .set({
      avatar: result.data.avatar,
      first: result.data.first!,
      last: result.data.last!,
      notes: result.data.notes,
      twitter: result.data.twitter,
    })
    .where(eq(contactsTable.id, contactId));

  revalidatePath('/');
  redirect(`/contacts/${contactId}`);
}
