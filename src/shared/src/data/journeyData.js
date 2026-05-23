// ─── Journey Data: 2-Stage System ────────────────────────────────────────────

export const journeyStages = [
  {
    id: 'pre-arrival',
    title: 'Pre-Arrival',
    emoji: '✈️',
    description: 'Everything to complete before arriving in Australia',
    color: '#cd0d2d',
    sections: [
      {
        id: 'before-you-leave',
        title: 'Before You Leave',
        tasks: [
          {
            id: 'pa-1',
            title: 'Booking your flight',
            detail: 'Research flight options to your city. Melbourne, Sydney, Brisbane, and Perth are major student hubs. Book at least 8–10 weeks in advance for better prices. Set up price alerts on Google Flights or Skyscanner.',
          },
          {
            id: 'pa-2',
            title: 'Packing Smart',
            detail: 'Australia has strict biosecurity laws — avoid bringing fresh food, certain plants, or wooden items. Pack for variable climates. Lightweight clothing works well for most of the year. Keep essential documents in your carry-on.',
          },
          {
            id: 'pa-3',
            title: 'Getting documents in order',
            detail: 'Organise: Passport, Student visa (subclass 500), Confirmation of Enrolment (CoE), OSHC policy document, Offer letter, and bank statements. Make digital copies and store in cloud storage.',
          },
        ],
      },
      {
        id: 'planning-your-life',
        title: 'Planning Your Life in Australia',
        tasks: [
          {
            id: 'pa-4',
            title: 'Find your Accommodation',
            detail: 'Options include on-campus accommodation (apply early — spots go fast), private rentals (Facebook Marketplace, Domain, Realestate.com.au), and student-specific housing. Aim to have accommodation confirmed before departure.',
          },
          {
            id: 'pa-5',
            title: 'Explore SIM & Mobile Plan',
            detail: 'Major carriers: Telstra (best coverage), Optus, Vodafone. Budget options: Woolworths Mobile, Aldi Mobile, Boost. Prepaid plans start ~$15–30/month. Compare using whistleout.com.au.',
          },
          {
            id: 'pa-6',
            title: 'Explore Bank Accounts',
            detail: 'Recommended banks for international students: Commonwealth Bank (CBA), ANZ, Westpac. Some allow you to open an account online before arriving. Wise is a great option for international transfers with low fees.',
          },
          {
            id: 'pa-7',
            title: 'Money & Budgeting',
            detail: 'Estimate your monthly costs: Rent ($800–1,500+), Groceries (~$300), Transport (~$100), Health extras (~$50). Set up a budget spreadsheet or use apps like Pocketbook or YNAB to track spending.',
          },
        ],
      },
      {
        id: 'getting-ready-for-uni',
        title: 'Getting Ready for University',
        tasks: [
          {
            id: 'pa-8',
            title: 'Get University Ready',
            detail: 'Activate your student email, register for orientation, enrol in subjects, and set up your learning management system (LMS) such as Canvas or Blackboard. Join your course Facebook/Discord groups early.',
          },
          {
            id: 'pa-9',
            title: 'Get career ready as a Student',
            detail: 'Set up a LinkedIn profile with your student status. Research part-time roles in your field. Look into your university\'s career centre — most offer free resume reviews, mock interviews, and employer networking events.',
          },
        ],
      },
      {
        id: 'understanding-australia',
        title: 'Understanding Australia',
        tasks: [
          {
            id: 'pa-10',
            title: 'Learn about Australia',
            detail: 'Australia is a multicultural country with 8 states and territories. The Australian dollar (AUD) is the currency. Tipping is not mandatory. Australians value directness, punctuality, and outdoor lifestyles. Key laws differ from other countries — familiarise yourself.',
          },
          {
            id: 'pa-11',
            title: 'What to Expect Once You Land',
            detail: 'At the airport: clear customs (declare everything), collect baggage, and use GroundLink/rideshare to reach your accommodation. Register your overseas address with the Department of Home Affairs within 7 days. Get a SIM immediately.',
          },
        ],
      },
    ],
  },
  {
    id: 'settling-in',
    title: 'Settling In',
    emoji: '🏡',
    description: 'Getting set up and building your new life after arriving',
    color: '#1e3f8a',
    sections: [
      {
        id: 'first-few-days',
        title: 'First Few Days',
        tasks: [
          {
            id: 'si-1',
            title: 'Create USI',
            detail: 'A Unique Student Identifier (USI) is required for all students studying in Australia. It\'s free and takes 5 minutes to create at usi.gov.au. You\'ll need your passport or other ID. Without it, you cannot get your results or qualifications.',
          },
          {
            id: 'si-2',
            title: 'Collecting Student ID',
            detail: 'Visit your university\'s student services centre with your enrolment confirmation and passport. Your Student ID card unlocks library access, student discounts, campus facilities, and your LMS account.',
          },
          {
            id: 'si-3',
            title: 'Know what to do in emergencies',
            detail: 'Emergency number: 000 (police, ambulance, fire). Non-emergency police: 131 444. Medibank 24/7 nurse line: 1800 644 325. Your university\'s international student support line is also available. Save these in your contacts now.',
          },
          {
            id: 'si-4',
            title: 'Get your SIM',
            detail: 'Purchase an Australian SIM from a carrier store or supermarket. Recommended: Telstra or Optus for reliability. Bring your passport for ID. Activate the SIM and test calls and data before leaving the store.',
          },
          {
            id: 'si-5',
            title: 'Open a Bank Account',
            detail: 'If not done pre-arrival, visit a CBA, ANZ, or Westpac branch with your passport and student ID. Most accounts are free for students. Set up online banking immediately. Your paycheck and Centrelink (if eligible) will be deposited here.',
          },
          {
            id: 'si-6',
            title: 'Apply for TFN',
            detail: 'A Tax File Number (TFN) is required to work and pay correct tax in Australia. Apply at ato.gov.au — it\'s free and usually arrives within 28 days. Never pay anyone to apply for you; it\'s always free.',
          },
          {
            id: 'si-7',
            title: 'Get Myki card',
            detail: 'If in Melbourne, get a Myki card for public transport (trains, trams, buses). Available at 7-Eleven, major stations, and the airport. Load credit and register it online so you can recover the balance if lost. Other cities have equivalent cards (Opal in Sydney, etc.).',
          },
        ],
      },
      {
        id: 'work-and-finances',
        title: 'Getting Started with Work & Finances',
        tasks: [
          {
            id: 'si-8',
            title: 'Start your part time job search',
            detail: 'Student visas allow up to 48 hours of work per fortnight during semester (unlimited during breaks). Search on Seek, Indeed, LinkedIn, and your university\'s job board. Hospitality, retail, and tutoring are common entry points. Always present your TFN when starting work.',
          },
          {
            id: 'si-9',
            title: 'Get ABN (for contract roles)',
            detail: 'An Australian Business Number (ABN) is needed if you work as a contractor or freelancer. Apply free at abr.gov.au — takes 5 minutes. Required for platforms like Airtasker, Uber Eats, or if invoicing clients directly.',
          },
          {
            id: 'si-10',
            title: 'How to file Tax',
            detail: 'Tax year runs 1 July – 30 June. Lodge your tax return after 30 June each year at myTax via the ATO portal. Most students receive a refund. Keep receipts for work-related expenses. Free tax help is available at taxhelp.gov.au for eligible students.',
          },
          {
            id: 'si-11',
            title: 'What is superannuation account',
            detail: 'Superannuation (super) is Australia\'s mandatory retirement savings system. Employers must contribute 11% of your earnings to a super fund. Choose a fund when you start work, otherwise you\'ll be assigned a default fund. You can take your super home when you leave Australia permanently.',
          },
        ],
      },
      {
        id: 'living-in-australia',
        title: 'Living in Australia',
        tasks: [
          {
            id: 'si-12',
            title: 'How to apply for Drivers license',
            detail: 'You can drive on your overseas licence for up to 3 months in most states. After that, apply for an Australian licence at your state\'s transport authority (VicRoads in VIC, Service NSW, etc.). Requirements vary by state — check your state\'s website.',
          },
          {
            id: 'si-13',
            title: 'How to save money as a student',
            detail: 'Use student discount cards (ISIC, UNiDAYS, Student Edge). Shop at Aldi for groceries. Cook at home. Use the library for textbooks. Get a concession Myki/Opal for cheaper transport. Sign up for Cashrewards or ShopBack for online purchases. Compare utilities at Canstar.',
          },
          {
            id: 'si-14',
            title: 'Socialising tips',
            detail: 'Join clubs at your university — almost every interest is covered. Attend O-Week events. Apps like Meetup and Eventbrite list community events. Many campuses have free international student social events weekly. Being proactive is key — reach out, say yes to invites.',
          },
          {
            id: 'si-15',
            title: 'Places to visit in Australia',
            detail: 'Must-sees: Great Ocean Road (VIC), Bondi Beach (NSW), Great Barrier Reef (QLD), Uluru (NT), Fremantle (WA). Within your city, explore local markets, national parks, and cultural events. Student travel discounts are often available through STA Travel or student unions.',
          },
        ],
      },
      {
        id: 'next-phase',
        title: 'Preparing for Next Phase',
        isOvhcSection: true,
        tasks: [
          {
            id: 'si-16',
            title: 'Understanding long-term stay options',
            detail: 'After your student visa, options include: Temporary Graduate visa (subclass 485), employer-sponsored visas (subclass 482/186), or further study. Speak to a registered migration agent for personalised advice. Understanding your options early reduces stress.',
          },
          {
            id: 'si-17',
            title: 'Preparing for full-time work',
            detail: 'Start applying for graduate roles 6–12 months before finishing your degree. Leverage your university\'s career centre, attend industry events, and build your professional network on LinkedIn. Internships and work placements significantly improve job prospects.',
          },
          {
            id: 'si-18',
            title: 'Transitioning to OVHC',
            detail: 'As your student visa ends, your OSHC cover expires too. Overseas Visitor Health Cover (OVHC) ensures you remain covered if you stay in Australia on a graduate or work visa. Continuing with Medibank means you keep your rewards, health score, and benefits — no restart.',
            isOvhcTask: true,
          },
        ],
      },
    ],
  },
];
