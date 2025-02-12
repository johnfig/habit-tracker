import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative isolate">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
        
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
            <div className="mt-24 sm:mt-32 lg:mt-16">
              <a href="#" className="inline-flex space-x-6">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold leading-6 text-primary ring-1 ring-inset ring-primary/20">
                  What's new
                </span>
                <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-muted-foreground">
                  <span>Just shipped v1.0</span>
                  <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            </div>
            <h1 className="mt-10 text-4xl font-bold tracking-tight sm:text-6xl">
              Build better habits, achieve your goals
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Track your daily habits, build lasting streaks, and transform your life. Our simple but powerful habit tracking helps you stay consistent and motivated.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/auth/signup"
                className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Get started for free
              </Link>
              <Link
                href="/auth/signin"
                className="text-sm font-semibold leading-6 text-foreground"
              >
                Sign in <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="mx-auto max-w-7xl px-6 sm:mt-16 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Track Faster</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to build better habits
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Simple yet powerful features to help you stay consistent and achieve your goals.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <feature.icon className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="relative isolate mt-32 sm:mt-40 sm:pt-32">
        <div className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl">
          <div className="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-primary to-[#9089fc]" />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-lg font-semibold leading-8 tracking-tight text-primary">
              Testimonials
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Loved by habit builders
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
            {testimonials.map((testimonial) => (
              <div key={testimonial.author} className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5">
                <p className="text-muted-foreground">{testimonial.text}</p>
                <p className="mt-4 font-semibold text-foreground">{testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const features = [
  {
    name: 'Track Daily Progress',
    description: 'Easily log your daily habits with just one click. Visual progress indicators help you stay motivated.',
    icon: CheckCircle,
  },
  {
    name: 'Build Streaks',
    description: "Watch your streaks grow day by day. The longer your streak, the more motivated you'll be to maintain it.",
    icon: CheckCircle,
  },
  {
    name: 'Insights & Analytics',
    description: 'Get detailed insights into your habit-forming journey with beautiful charts and statistics.',
    icon: CheckCircle,
  },
]

const testimonials = [
  {
    text: "This app has completely transformed how I approach my daily routines. The streak feature keeps me motivated!",
    author: "Sarah Johnson",
  },
  {
    text: "Simple, beautiful, and effective. Exactly what I needed to build better habits.",
    author: "Michael Chen",
  },
  {
    text: "I've tried many habit trackers, but this one stands out with its clean design and powerful features.",
    author: "Emma Davis",
  },
  {
    text: "The perfect balance of simplicity and functionality. It's helped me stay consistent with my goals.",
    author: "James Wilson",
  },
] 