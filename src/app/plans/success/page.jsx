import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'
// Gravity UI Icons
import { CircleCheck, Envelope, ArrowRight } from '@gravity-ui/icons'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    return (
      <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-[#121214] border border-zinc-900 rounded-[24px] p-8 shadow-2xl text-center space-y-6">
          
          {/* Animated Success Badge Group */}
          <div className="relative flex items-center justify-center mx-auto w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full ring-8 ring-emerald-500/5">
            <CircleCheck width={32} height={32} />
          </div>

          {/* Heading Blocks */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Payment Successful!
            </h1>
            <p className="text-zinc-400 text-sm leading-relaxed px-2">
              We appreciate your business! Your tier limits and account access details have been successfully updated.
            </p>
          </div>

          {/* Customer Confirmation Detail Box */}
          <div className="bg-[#1c1c1f]/60 border border-zinc-900 rounded-xl p-4 flex items-start gap-3 text-left">
            <div className="p-2 bg-[#1c1c1f] rounded-lg text-[#e293ff] mt-0.5 shrink-0">
              <Envelope width={16} height={16} />
            </div>
            <div className="space-y-0.5">
              <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
                Confirmation Email Sent To
              </p>
              <p className="text-sm font-medium text-zinc-200 break-all">
                {customerEmail}
              </p>
            </div>
          </div>

          {/* Navigation Action Buttons Stack */}
          <div className="space-y-3 pt-2">
            <Link 
              href="/jobs" 
              className="w-full h-11 bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg"
            >
              Explore Open Positions
              <ArrowRight width={16} height={16} />
            </Link>
          </div>

          {/* Help Desk Footer Section */}
          <div className="pt-4 border-t border-zinc-900/60 text-xs text-zinc-500">
            Have questions regarding your checkout order? <br className="hidden sm:block"/>
            Reach out to our team at{' '}
            <a 
              href="mailto:orders@example.com" 
              className="text-[#e293ff] hover:underline font-medium transition-colors"
            >
              orders@example.com
            </a>
          </div>

        </div>
      </div>
    )
  }
}