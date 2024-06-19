import 'server-only';

import { eq } from 'drizzle-orm';
import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import { db } from '@/db';
import { contactsTable } from '@/db/schema';

export const getContact = unstable_cache(
  async (contactId: string) => {
    const contact = await db.query.contactsTable.findFirst({
      where: eq(contactsTable.id, contactId),
    });
    if (!contact) {
      notFound();
    }
    return contact;
  },
  ['contact'],
  {
    tags: ['contact'],
  },
);
