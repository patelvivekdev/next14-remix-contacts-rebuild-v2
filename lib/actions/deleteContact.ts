'use server';

import { eq } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { contactsTable } from '@/db/schema';

export async function deleteContact(contactId: string) {
  await db.delete(contactsTable).where(eq(contactsTable.id, contactId));

  revalidateTag('contacts');
  redirect('/');
}
