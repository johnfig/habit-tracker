import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from './lib/auth'
import { Button } from './components/ui/button'
import { ArrowRight, CheckCircle, TrendingUp, Calendar, Target, Sparkles } from 'lucide-react'
import { FeatureShowcase } from './components/feature-showcase'
import { FeaturesHeader } from './components/features-header'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-blue-500/10 animate-gradient" />
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-purple-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
          </div>
          <div className="container relative px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="inline-block animate-bounce-slow">
                <span className="inline-flex items-center px-4 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-full ring-1 ring-primary/20">
                  <Sparkles className="mr-1 h-4 w-4" />
                  Transform Your Life With Better Habits
                  <span className="ml-2 text-primary/70">✨</span>
                </span>
              </div>
              <div className="space-y-4 relative">
                <div className="absolute -inset-x-20 top-0 h-[200px] w-[700px] bg-gradient-to-r from-primary/20 to-purple-500/20 blur-3xl opacity-30 -z-10" />
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                  <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-500 animate-gradient pb-2">
                    Build Better Habits
                  </span>
                  <br />
                  <span className="text-foreground inline-block mt-2">Track Your Progress</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Transform your daily routines into lasting habits. Track, analyze, and improve your habits with our intuitive habit tracking system.
                </p>
              </div>
              <div className="space-x-4 pt-8">
                <Link href={session ? "/dashboard" : "/auth/signin"}>
                  <Button size="lg" className="group relative overflow-hidden rounded-full bg-gradient-to-r from-primary to-purple-600 px-8 hover:from-primary/90 hover:to-purple-600/90 hover:scale-105 transition-all duration-200 shadow-lg shadow-primary/25">
                    <span className="relative z-10 flex items-center">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 opacity-0 group-hover:opacity-50 transition-opacity" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - reduced top padding */}
        <section className="w-full py-12 md:py-24 -mt-20 bg-dot-pattern relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
          <div className="container relative px-4 md:px-6">
            <FeaturesHeader />
            <FeatureShowcase />
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-24 bg-primary/5">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center space-y-2">
                  <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                    {stat.value}
                  </div>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/20 to-blue-500/20" />
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="container relative px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                    Ready to Build Better Habits?
                  </span>
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                  Join thousands of users who are already transforming their lives with our habit tracking system.
                </p>
              </div>
              <Link href={session ? "/dashboard" : "/auth/signin"}>
                <Button size="lg" className="group relative overflow-hidden rounded-full bg-gradient-to-r from-primary to-purple-600 px-8 hover:scale-105 transition-all duration-200 shadow-lg shadow-primary/25">
                  <span className="relative z-10 flex items-center">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 bg-gradient-to-b from-background to-background/80 border-t border-primary/10">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Target className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                  Habit Streaks
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Building better habits, one day at a time.
              </p>
            </div>
            {footerLinks.map((section) => (
              <div key={section.title} className="space-y-3">
                <h4 className="text-sm font-semibold">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-primary/10">
            <p className="text-center text-sm text-muted-foreground">
              © 2024 Habit Streaks. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    title: "Daily Tracking",
    description: "Mark habits as complete each day and build streaks to stay motivated.",
    icon: <CheckCircle className="h-10 w-10 text-primary" />,
  },
  {
    title: "Progress Analytics",
    description: "Visualize your progress with detailed analytics and insights.",
    icon: <TrendingUp className="h-10 w-10 text-purple-500" />,
  },
  {
    title: "Streak System",
    description: "Build and maintain streaks to reinforce your habit-building journey.",
    icon: <Calendar className="h-10 w-10 text-blue-500" />,
  },
]

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "50K+", label: "Habits Tracked" },
  { value: "1M+", label: "Days Logged" },
  { value: "95%", label: "Success Rate" },
]

const footerLinks = [
  {
    title: "Product",
    links: [
      { title: "Features", href: "#" },
      { title: "Pricing", href: "#" },
      { title: "FAQ", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "About", href: "#" },
      { title: "Blog", href: "#" },
      { title: "Careers", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { title: "Privacy", href: "#" },
      { title: "Terms", href: "#" },
      { title: "Contact", href: "#" },
    ],
  },
] 