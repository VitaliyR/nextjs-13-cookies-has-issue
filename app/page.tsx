import * as React from 'react';
import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function CompanyJobApplyPage({ searchParams }: { searchParams: { nobug: string } }) {
  console.log('cookies method > ', cookies);
  console.log('cookies.get > it function', cookies().get);
  console.log('cookies.has > should be function', cookies().has);

  const cookieValue = cookies().get('test')?.value;
  const hasCookie = searchParams.nobug ? undefined : cookies().has('test'); // this will crash after server action executes
  // but the cookies().get will work fine!

  return <div>
    {hasCookie ? 'has cookie!' : 'no cookie'} 
    {cookieValue ? `value: ${cookieValue}` : ''}
    <form action={async () => {
      'use server';

      cookies().set('test', 'world!', {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 10
      });
      
    }}>
      <button type="submit">Set Cookie</button>
    </form>

    <form action={async () => {
      'use server';

      cookies().delete('test');
    }}>
      <button type="submit">Remove Cookie</button>
    </form>

    <Link href="/">With Bug (cookies().has call)</Link>
    <br/>
    <Link href="/?nobug=1">No Bug (no cookies().has call)</Link>
  </div>
}
