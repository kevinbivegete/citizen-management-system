// src/app/page.tsx
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 opacity-90" />
        </div>
        <div className="relative mx-auto max-w-7xl py-24 px-6 sm:py-32 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Your Voice Matters
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-white">
            A direct channel between citizens and government agencies to report
            issues, track progress, and improve public services.
          </p>
          <div className="mt-10 flex gap-x-6">
            <Link
              href="/citizen/submit"
              className="rounded-md bg-white px-3.5 py-2.5 text-base font-semibold text-primary-600 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
            >
              Submit Complaint
            </Link>
            <Link
              href="/citizen/track"
              className="rounded-md border border-white bg-transparent px-3.5 py-2.5 text-base font-semibold text-white shadow-sm hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
            >
              Track Your Complaint
            </Link>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600">
              Efficient Engagement
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to connect with your government
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our platform streamlines the process of submitting, tracking, and
              resolving citizen complaints and feedback, ensuring your voice is
              heard.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-primary-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  Easy Submission
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Submit complaints or feedback in minutes with our intuitive
                    form. Include photos, location data, and details to help us
                    address your concerns promptly.
                  </p>
                  <p className="mt-6">
                    <Link
                      href="/citizen/submit"
                      className="text-base font-semibold leading-7 text-primary-600"
                    >
                      Submit now <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-primary-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Real-time Tracking
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Track the status of your submission in real-time. Receive
                    updates as your complaint moves through the resolution
                    process and get notified when action is taken.
                  </p>
                  <p className="mt-6">
                    <Link
                      href="/citizen/track"
                      className="text-base font-semibold leading-7 text-primary-600"
                    >
                      Track status <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-primary-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                    />
                  </svg>
                  Transparency
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Access public data on complaint resolution, view statistics
                    on service performance, and hold government agencies
                    accountable through increased transparency.
                  </p>
                  <p className="mt-6">
                    <Link
                      href="/reports"
                      className="text-base font-semibold leading-7 text-primary-600"
                    >
                      View reports <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* How it works section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600">
              How It Works
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Simple process, powerful results
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our streamlined process ensures your complaints and feedback reach
              the right people and get addressed efficiently.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24">
            <ol className="relative border-l border-gray-200 space-y-12">
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-primary-100 rounded-full -left-4 ring-4 ring-white">
                  <span className="font-semibold text-primary-800">1</span>
                </span>
                <h3 className="mb-1 text-lg font-semibold text-gray-900">
                  Submit Your Complaint
                </h3>
                <p className="text-base text-gray-600">
                  Fill out a simple form with details about your issue. You can
                  attach photos or documents to provide more context.
                </p>
              </li>
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-primary-100 rounded-full -left-4 ring-4 ring-white">
                  <span className="font-semibold text-primary-800">2</span>
                </span>
                <h3 className="mb-1 text-lg font-semibold text-gray-900">
                  Automatic Categorization
                </h3>
                <p className="text-base text-gray-600">
                  Our system automatically categorizes and routes your complaint
                  to the appropriate government agency or department.
                </p>
              </li>
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-primary-100 rounded-full -left-4 ring-4 ring-white">
                  <span className="font-semibold text-primary-800">3</span>
                </span>
                <h3 className="mb-1 text-lg font-semibold text-gray-900">
                  Agency Response
                </h3>
                <p className="text-base text-gray-600">
                  The responsible agency reviews your complaint and takes
                  appropriate action. They update the status and provide
                  responses through the system.
                </p>
              </li>
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-primary-100 rounded-full -left-4 ring-4 ring-white">
                  <span className="font-semibold text-primary-800">4</span>
                </span>
                <h3 className="mb-1 text-lg font-semibold text-gray-900">
                  Track Progress
                </h3>
                <p className="text-base text-gray-600">
                  Monitor the status of your complaint in real-time through our
                  tracking system. Receive notifications as updates occur.
                </p>
              </li>
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-primary-100 rounded-full -left-4 ring-4 ring-white">
                  <span className="font-semibold text-primary-800">5</span>
                </span>
                <h3 className="mb-1 text-lg font-semibold text-gray-900">
                  Resolution and Feedback
                </h3>
                <p className="text-base text-gray-600">
                  Once your issue is resolved, you can provide feedback on the
                  process and the resolution, helping improve government
                  services.
                </p>
              </li>
            </ol>
          </div>
          <div className="mt-16 flex justify-center">
            <Link
              href="/citizen/submit"
              className="rounded-md bg-primary-600 px-3.5 py-2.5 text-base font-semibold text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-secondary-600 px-6 py-16 shadow-xl sm:rounded-3xl sm:px-16 md:py-20 lg:px-20">
            <div className="relative">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Ready to make your voice heard?
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-lg text-white">
                  Join thousands of citizens who are helping improve public
                  services through their feedback and engagement.
                </p>
              </div>
              <div className="mt-10 flex justify-center">
                <Link
                  href="/auth/register"
                  className="rounded-md bg-white px-3.5 py-2.5 text-base font-semibold text-primary-600 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
                >
                  Create an Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
