import CreateShortUrls from '@/app/createPublic'
import { db } from '@/lib/db'
import { shortUrls, users } from '@/lib/db/schema'
import { count, isNotNull, isNull } from 'drizzle-orm'
import { Anchor, ArrowDown, ExternalLink, Star, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 60

export default async function Page() {
  const getUsersCount = (await db.select({ value: count() }).from(users))[0]
    .value
  const getShortUrlsCount = (
    await db
      .select({ value: count() })
      .from(shortUrls)
      .where(isNotNull(shortUrls.userId))
  )[0].value
  const getPublicShortUrlsCount = (
    await db
      .select({ value: count() })
      .from(shortUrls)
      .where(isNull(shortUrls.userId))
  )[0].value

  const githubInfo = await fetch(
    'https://api.github.com/repos/nrjdalal/rdt-li',
  ).then((res) => res.json())

  return (
    <main className="container flex max-w-screen-md flex-col items-center justify-center px-5">
      <section className="space-y-6 pb-4 pt-12 ">
        <div className="flex w-full max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading max-w-xl text-3xl sm:text-4xl">
            <span className="font-mono font-semibold">
              {process.env.NEXT_PUBLIC_APP_URL?.split('://')[1]}
            </span>{' '}
            self hostable open source URL shortener
          </h1>

          <CreateShortUrls />

          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            {process.env.NEXT_PUBLIC_APP_URL?.split('://')[1]} self hostable,
            feature rich, minimalistic and open source URL shortener. Built with
            Next.js, Drizzle, NextAuth and Postgres.
          </p>

          <div className="mt-3 flex space-x-4">
            <Link
              href="/x"
              className="flex h-10 items-center rounded-md bg-blue-500 px-8 text-sm text-white"
            >
              Login
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
