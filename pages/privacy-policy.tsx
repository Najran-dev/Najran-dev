import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import path from 'path'
import fs from 'fs'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface PolicySection {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
}

interface PolicyMessages {
  metaTitle: string
  pageHeading: string
  appName: string
  effectiveDateLabel: string
  effectiveDate: string
  backHome: string
  intro: string
  sections: PolicySection[]
  contactLabel: string
  contactCTA: string
  footerNote: string
}

interface PrivacyPolicyProps {
  messages: PolicyMessages
}

export default function PrivacyPolicy({ messages }: PrivacyPolicyProps) {
  const router = useRouter()
  const { locale = 'en', asPath } = router
  const isRTL = locale === 'ar'
  const otherLocale = isRTL ? 'en' : 'ar'

  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
    document.documentElement.lang = locale
  }, [isRTL, locale])

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark')
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('light-mode', !isDarkMode)
    document.documentElement.classList.toggle('dark-mode', isDarkMode)
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  return (
    <>
      <Head>
        <title>{messages.metaTitle}</title>
        <meta
          name="description"
          content="Privacy policy for Najran Developers mobile application"
        />
      </Head>

      <div className="container">
        <div className={`terminal ${isRTL ? 'rtl' : 'ltr'}`}>
          <div className="terminal-header">
            <div className="dot red"></div>
            <div className="dot yellow"></div>
            <div className="dot green"></div>
          </div>

          <Link href={asPath} locale={otherLocale} className="language-toggle">
            {locale === 'en' ? 'العربية' : 'English'}
          </Link>

          <Link href="/" className="top-link">
            {messages.backHome}
          </Link>

          <h1>
            {messages.pageHeading}
            <span className="cursor"></span>
          </h1>

          <p className="policy-subtitle">{messages.appName}</p>
          <p className="policy-meta">
            {messages.effectiveDateLabel}: {messages.effectiveDate}
          </p>
          <p>{messages.intro}</p>

          {messages.sections.map((section) => (
            <section key={section.heading} className="policy-section">
              <h2>{section.heading}</h2>

              {section.paragraphs?.map((paragraph, index) => (
                <p key={`${section.heading}-paragraph-${index}`}>{paragraph}</p>
              ))}

              {section.bullets && section.bullets.length > 0 && (
                <ul className="policy-list">
                  {section.bullets.map((bullet, index) => (
                    <li key={`${section.heading}-bullet-${index}`}>{bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <p className="policy-note">{messages.footerNote}</p>
          <p className="contact-email">{messages.contactLabel}: contact@najran.dev</p>

          <a href="mailto:contact@najran.dev" className="button">
            {messages.contactCTA}
          </a>
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const filePath = path.join(process.cwd(), 'translations', locale ?? 'en', 'privacy.json')
  const messages = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

  return {
    props: {
      messages,
    },
  }
}
