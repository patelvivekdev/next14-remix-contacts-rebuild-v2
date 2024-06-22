'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { contactsTable } from '@/db/schema';

export async function createEmptyContact() {
  const contact = await db.insert(contactsTable).values({ first: '', last: '' }).returning();

  revalidateTag('contacts');
  revalidatePath('/');
  redirect(`/contacts/${contact[0].id}/edit`);
}
