import 'server-only';

import { unstable_cache } from 'next/cache';
import { db } from '@/db';

export const getContacts = unstable_cache(
  async () => {
    let contacts = await db.query.contactsTable.findMany();
    // sort with first name
    contacts = contacts.sort((a, b) => {
      return a.first.localeCompare(b.first);
    });
    return contacts;
  },
  ['contacts'],
  {
    tags: ['contacts'],
  },
);
