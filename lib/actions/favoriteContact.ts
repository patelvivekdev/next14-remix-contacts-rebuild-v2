'use server';

import { eq } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';
import { db } from '@/db';
import { contactsTable } from '@/db/schema';

export async function favoriteContact(contactId: string, isFavorite: boolean) {
  await db.update(contactsTable).set({ favorite: !isFavorite }).where(eq(contactsTable.id, contactId));

  revalidateTag('contact');
  revalidateTag('contacts');
}
