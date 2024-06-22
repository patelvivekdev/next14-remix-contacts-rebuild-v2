'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import type { SelectContact } from '@/db/schema';
import { cn } from '@/utils/cn';

export default function ContactButton({ contact }: { contact: SelectContact }) {
  const pathName = usePathname();
  const isActive = pathName.includes(`/contacts/${encodeURIComponent(contact.id)}`);

  return (
    <Link
      className={cn(
        isActive ? 'bg-primary text-white' : 'hover:bg-gray',
        'flex w-full items-center justify-between gap-4 overflow-hidden whitespace-pre rounded-lg p-2 no-underline',
      )}
      href={`/contacts/${contact.id}`}
    >
      {contact.first || contact.last ? (
        <>
          {contact.first} {contact.last}
        </>
      ) : (
        <i>No Name</i>
      )}{' '}
      {contact.favorite ? (
        <span className={cn('float-right', isActive ? 'text-white' : 'text-yellow-500')}>★</span>
      ) : null}
    </Link>
  );
}
