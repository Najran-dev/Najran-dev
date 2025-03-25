import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import path from 'path'
import fs from 'fs'
import Head from 'next/head'
import Link from 'next/link'

interface Messages {
  title: string
  tagline: string
  subheader: string
  about: string
  mission: string
  personalNote: string
  achievementTitle: string
  achievementDescription: string
  contactCTA: string
}

interface HomeProps {
  messages: Messages
}

export default function Home({ messages }: HomeProps) {
  const router = useRouter()
  const { locale, asPath } = router

  // Toggle between 'en' and 'ar'
  const otherLocale = locale === 'en' ? 'ar' : 'en'

  return (
    <>
      <Head>
        <title>{messages.title}</title>
        <meta
          name="description"
          content="Najran Devs - Empowering developers & communities"
        />
      </Head>

      <div className="container">
        <div className="terminal">
          {/* Terminal "traffic lights" (optional UI flair) */}
          <div className="terminal-header">
            <div className="dot red"></div>
            <div className="dot yellow"></div>
            <div className="dot green"></div>
          </div>

          {/* Language toggle link */}
          <Link href={asPath} locale={otherLocale} className="language-toggle">
            {locale === 'en' ? 'AR' : 'EN'}
          </Link>

          {/* Hero / Tagline */}
          <h1>
            {messages.tagline}
            <span className="cursor"></span>
          </h1>
          <p>{messages.subheader}</p>

          <hr style={{ margin: '1.5rem 0' }} />

          {/* About / Mission */}
          <h2>{messages.about}</h2>
          <p>{messages.mission}</p>

          {/* Personal Note */}
          <p>{messages.personalNote}</p>

          {/* Islamic Calendar Achievement */}
          <h3 style={{ marginTop: '1.5rem' }}>{messages.achievementTitle}</h3>
          <p>{messages.achievementDescription}</p>

          {/* Contact Button */}
          <p  style={{ color: '#1059a3' }} > contact@najran.dev</p>

          <a href="mailto:contact@najran.dev" className="button">
            {messages.contactCTA}
          </a>
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const filePath = path.join(process.cwd(), 'translations', locale ?? 'en', 'common.json')
  const messages = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

  return {
    props: {
      messages,
    },
  }
}
