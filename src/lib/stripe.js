import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID = {
    'seeker_pro': 'price_1TjjbH1M1Z0gAaXRoNCEH95E',
    'seeker_premium': 'price_1Tjv3T1M1Z0gAaXRMBv2VulC',
    'recruiter_growth': 'price_1Tjv301M1Z0gAaXRpbDUqSuv',
    'recruiter_enterprise': 'price_1Tjv241M1Z0gAaXRmEnq99LW',
}