export const taskDetails = {
  // Pre-Arrival Tasks
  'pa-1': {
    id: 'pa-1',
    title: 'Booking your flight',
    summary: 'Secure your travel to Australia early for the best rates and routes.',
    timeToComplete: '1-2 hours',
    difficultyLevel: 'Medium',
    whyItMatters: 'Booking early helps you save money and secure better routes, especially during peak student intake periods (January/February and June/July). It also gives you certainty for your visa and accommodation arrangements.',
    stepByStep: [
      { title: 'Compare airlines and routes', description: 'Use tools like Skyscanner or Google Flights to look at various options.' },
      { title: 'Choose arrival city based on your university', description: 'Make sure you are flying into the city closest to your campus to minimize domestic travel.' },
      { title: 'Check baggage rules', description: 'International student flights often have special baggage allowances. Check with the airline.' },
      { title: 'Book tickets 4–6 weeks in advance', description: 'This is generally the sweet spot for finding the best combination of price and availability.' },
    ],
    tips: [
      'Avoid last-minute bookings which can cost double.',
      'Check if airlines offer student discounts (like Student Universe or Emirates Student fares).',
      'If arriving late at night, ensure you have a transport plan from the airport.',
    ],
    resources: [
      { name: 'Skyscanner', url: 'https://www.skyscanner.com.au' },
      { name: 'Google Flights', url: 'https://www.google.com/flights' },
    ],
    whatMostStudentsDo: 'Most students prefer arriving 1–2 weeks before classes start to get over jet lag and attend Orientation Week (O-Week).',
    checklist: [
      'Compare flights',
      'Choose destination',
      'Book tickets',
      'Save itinerary to phone'
    ],
  },
  'pa-2': {
    id: 'pa-2',
    title: 'Packing Smart',
    summary: 'Bring the essentials and respect Australia\'s strict biosecurity laws.',
    timeToComplete: '2-4 hours',
    difficultyLevel: 'Easy',
    whyItMatters: 'Packing correctly saves you from excess baggage fees, ensures you have what you need for your first few days, and prevents issues with Australian Customs, which are notoriously strict about organic items.',
    stepByStep: [
      { title: 'Check Australia\'s biosecurity laws', description: 'Understand what you cannot bring (e.g., fresh fruit, meat, wooden items, soil).' },
      { title: 'Pack for variable climates', description: 'Australian weather can change rapidly. Bring layers, including a good jacket, even if moving to a "sunny" city.' },
      { title: 'Prepare your carry-on', description: 'Keep all essential documents, electronics, a universal power adapter, and a change of clothes in your cabin bag.' },
      { title: 'Weigh your bags', description: 'Ensure you are within your airline\'s limits to avoid hefty fees at the airport.' },
    ],
    tips: [
      'Don\'t overpack toiletries or stationery; these are cheap to buy in Australia (e.g., at Kmart or Big W).',
      'Declare everything on your incoming passenger card if you are unsure.',
      'Vacuum pack bulky clothing like winter coats.',
    ],
    resources: [
      { name: 'Australian Border Force - What you can bring', url: '#' },
    ],
    whatMostStudentsDo: 'Most students regret bringing too many clothes and not enough home comfort snacks (commercially packaged ones only!).',
    checklist: [
      'Review biosecurity rules',
      'Pack essential documents in carry-on',
      'Pack weather-appropriate clothing',
      'Weigh luggage before leaving'
    ],
  },
  'pa-3': {
    id: 'pa-3',
    title: 'Getting documents in order',
    summary: 'Organize your physical and digital paperwork for a smooth entry.',
    timeToComplete: '1 hour',
    difficultyLevel: 'Important',
    whyItMatters: 'You will need to present specific documents at immigration, university enrolment, and when setting up essential services like banking and renting.',
    stepByStep: [
      { title: 'Gather original physical documents', description: 'Passport, valid visa, Confirmation of Enrolment (CoE), Offer letter, and OSHC policy.' },
      { title: 'Scan and backup', description: 'Create clear digital scans of all documents. Save them to a cloud service (Google Drive, iCloud) and email them to yourself.' },
      { title: 'Print copies', description: 'Have at least one physical copy of your CoE, Visa grant letter, and OSHC in a separate folder from the originals.' },
      { title: 'Organise medical records', description: 'If you have ongoing health conditions, bring translated medical records and prescriptions.' },
    ],
    tips: [
      'Always keep your passport in a secure travel wallet.',
      'Have your accommodation address readily accessible for the incoming passenger card.',
    ],
    resources: [
      { name: 'Department of Home Affairs', url: '#' },
    ],
    whatMostStudentsDo: 'Many students create a specific "Australia Move" folder in their Google Drive to quickly access PDFs from their phone when asked.',
    checklist: [
      'Original passport and visa',
      'Printed CoE and Offer Letter',
      'Printed OSHC details',
      'Digital backups created'
    ],
  },
  'pa-4': {
    id: 'pa-4',
    title: 'Find your Accommodation',
    summary: 'Secure a place to stay before you land to ease your transition.',
    timeToComplete: 'Days to Weeks',
    difficultyLevel: 'Hard',
    whyItMatters: 'Having confirmed accommodation reduces anxiety upon arrival and provides an address needed for opening bank accounts and registering for services.',
    stepByStep: [
      { title: 'Determine your budget', description: 'Factor in rent, utilities, and internet. Student housing usually includes bills; private rentals often do not.' },
      { title: 'Choose accommodation type', description: 'Decide between University managed housing, Purpose-Built Student Accommodation (PBSA like Scape or Unilodge), share houses, or homestays.' },
      { title: 'Research suburbs', description: 'Look for areas with good public transport links to your campus.' },
      { title: 'Book short-term if unsure', description: 'If you can\'t find long-term housing, book an Airbnb or hostel for 2-4 weeks while you inspect properties in person.' },
    ],
    tips: [
      'Never send money via Western Union or to overseas bank accounts for private rentals to avoid scams.',
      'Check if the rent is advertised weekly (standard in Australia) or monthly.',
    ],
    resources: [
      { name: 'Flatmates.com.au', url: '#' },
      { name: 'Realestate.com.au', url: '#' },
    ],
    whatMostStudentsDo: 'Most students book a PBSA (student apartment) for their first semester as it\'s easier to secure from overseas, then move to a sharehouse later.',
    checklist: [
      'Set budget',
      'Select accommodation type',
      'Secure booking or short-term stay',
      'Pay deposit securely'
    ],
  },
  'pa-5': {
    id: 'pa-5',
    title: 'Explore SIM & Mobile Plan',
    summary: 'Understand your mobile options so you can connect immediately.',
    timeToComplete: '30 mins',
    difficultyLevel: 'Easy',
    whyItMatters: 'You will need an Australian phone number almost immediately for maps, rideshares, and setting up bank accounts (which require SMS verification).',
    stepByStep: [
      { title: 'Check your phone is unlocked', description: 'Ensure your current smartphone is not locked to your home country\'s network.' },
      { title: 'Understand the networks', description: 'Australia has three main networks: Telstra (best coverage), Optus, and Vodafone. Other brands (MVNOs) use these networks at cheaper rates.' },
      { title: 'Choose prepaid vs postpaid', description: 'Prepaid is easiest to start with as it requires no credit check. You can buy 30-day plans or long-expiry plans.' },
      { title: 'Plan where to buy', description: 'Decide if you will buy a SIM at the airport upon arrival or pre-order an eSIM if your phone supports it.' },
    ],
    tips: [
      'eSIMs are a great option to set up before you leave so you have data the moment you land.',
      'Providers like Aldi Mobile or Boost Mobile offer great value using the Telstra network.',
    ],
    resources: [
      { name: 'WhistleOut (Plan Comparison)', url: '#' },
    ],
    whatMostStudentsDo: 'Most students grab a cheap $30 prepaid SIM at the airport arrivals hall to get connected instantly, then switch to a better plan a month later.',
    checklist: [
      'Unlock phone',
      'Compare prepaid plans',
      'Decide on physical SIM vs eSIM'
    ],
  },
  'pa-6': {
    id: 'pa-6',
    title: 'Explore Bank Accounts',
    summary: 'Set up your Australian finances before you arrive.',
    timeToComplete: '1 hour',
    difficultyLevel: 'Medium',
    whyItMatters: 'You need an Australian bank account to pay rent, receive your salary from a part-time job, and avoid international transaction fees on daily purchases.',
    stepByStep: [
      { title: 'Compare student accounts', description: 'The "Big 4" banks (CBA, Westpac, ANZ, NAB) all offer fee-free accounts for international students.' },
      { title: 'Apply online', description: 'Many Australian banks allow you to open an account online up to 3 months before you arrive.' },
      { title: 'Transfer initial funds', description: 'Use services like Wise to transfer some setup money into your new account at better exchange rates than traditional banks.' },
      { title: 'Plan card collection', description: 'Note the branch address where you will need to go to verify your ID and collect your debit card upon arrival.' },
    ],
    tips: [
      'Commonwealth Bank (CBA) has the most ATMs and a very popular app among students.',
      'You cannot withdraw funds from an account opened overseas until you verify your ID in an Australian branch.',
    ],
    resources: [
      { name: 'Wise (Money Transfers)', url: '#' },
      { name: 'CBA Moving to Australia', url: '#' },
    ],
    whatMostStudentsDo: 'Most students open a Commonwealth Bank account online a month before arriving and transfer $2,000 to cover initial bond and setup costs.',
    checklist: [
      'Compare banks',
      'Open account online',
      'Transfer initial setup funds',
      'Save branch details for collection'
    ],
  },
  'pa-7': {
    id: 'pa-7',
    title: 'Money & Budgeting',
    summary: 'Create a realistic budget for living in Australia.',
    timeToComplete: '1-2 hours',
    difficultyLevel: 'Medium',
    whyItMatters: 'Australia has a high cost of living. Understanding your expenses prevents financial stress and ensures you don\'t breach visa conditions regarding work hours.',
    stepByStep: [
      { title: 'Estimate fixed costs', description: 'Calculate weekly rent, internet, mobile plan, and health insurance.' },
      { title: 'Estimate variable costs', description: 'Factor in groceries, eating out, public transport, and entertainment.' },
      { title: 'Factor in setup costs', description: 'Remember you will need money for a rental bond (usually 4 weeks rent) and household items initially.' },
      { title: 'Create a tracking system', description: 'Set up a spreadsheet or download a budgeting app.' },
    ],
    tips: [
      'Rent is typically advertised weekly in Australia, not monthly. Multiply weekly rent by 52, then divide by 12 for the monthly cost.',
      'Take advantage of student discounts everywhere you go.',
    ],
    resources: [
      { name: 'Insider Guides Cost of Living Calculator', url: '#' },
    ],
    whatMostStudentsDo: 'Many students use apps like Splitwise to manage shared expenses with housemates, and track personal budgets carefully in their first 3 months.',
    checklist: [
      'Calculate setup costs',
      'Estimate weekly living expenses',
      'Set up a budgeting tool'
    ],
  },
  'pa-8': {
    id: 'pa-8',
    title: 'Get University Ready',
    summary: 'Complete your enrolment and understand your academic expectations.',
    timeToComplete: '2 hours',
    difficultyLevel: 'Important',
    whyItMatters: 'Completing administrative tasks early ensures you get the classes you want and allows you to focus on settling in and socializing during O-Week.',
    stepByStep: [
      { title: 'Activate student email', description: 'Set up your university IT account and check your student email regularly.' },
      { title: 'Enrol in units/subjects', description: 'Log into your student portal and register for your classes. Classes fill up fast!' },
      { title: 'Register for O-Week', description: 'Sign up for international student orientation sessions and social events.' },
      { title: 'Explore the LMS', description: 'Log into Canvas, Blackboard, or Moodle and familiarize yourself with the interface.' },
    ],
    tips: [
      'Check if there are compulsory introductory modules (like academic integrity) you need to complete before classes start.',
      'Look for second-hand textbook groups on Facebook for your university to save money.',
    ],
    resources: [
      { name: 'University Student Portal', url: '#' },
    ],
    whatMostStudentsDo: 'Students who enrol as soon as the portal opens get the best timetable slots, avoiding 8 AM lectures and late Friday classes.',
    checklist: [
      'Activate IT account',
      'Enrol in subjects',
      'Register for O-Week',
      'Check for compulsory pre-arrival modules'
    ],
  },
  'pa-9': {
    id: 'pa-9',
    title: 'Get career ready as a Student',
    summary: 'Start laying the groundwork for part-time work and future graduate roles.',
    timeToComplete: '1.5 hours',
    difficultyLevel: 'Medium',
    whyItMatters: 'The Australian job market is competitive. Getting your resume ready now means you can start applying for part-time jobs immediately upon arrival.',
    stepByStep: [
      { title: 'Update your resume', description: 'Adapt your resume to the Australian format (usually 1-2 pages, clean layout, no photo, no date of birth).' },
      { title: 'Update LinkedIn', description: 'Change your location to your new Australian city and add your new university to your education section.' },
      { title: 'Research your industry', description: 'Look up major companies in your field in Australia and see what graduate roles they offer.' },
      { title: 'Draft a cover letter template', description: 'Australian employers place high value on customized cover letters.' },
    ],
    tips: [
      'Australian employers highly value "soft skills" like communication and teamwork. Highlight these.',
      'Familiarize yourself with Seek.com.au, the main job board in Australia.',
    ],
    resources: [
      { name: 'Seek.com.au', url: '#' },
      { name: 'University Career Centre', url: '#' },
    ],
    whatMostStudentsDo: 'Proactive students connect with alumni from their university on LinkedIn before they even arrive.',
    checklist: [
      'Format resume for Australia',
      'Update LinkedIn profile',
      'Draft a cover letter template'
    ],
  },
  'pa-10': {
    id: 'pa-10',
    title: 'Learn about Australia',
    summary: 'Understand the culture, climate, and geography of your new home.',
    timeToComplete: '1 hour',
    difficultyLevel: 'Easy',
    whyItMatters: 'Understanding local culture helps prevent culture shock, makes socializing easier, and helps you navigate daily life more smoothly.',
    stepByStep: [
      { title: 'Understand the geography', description: 'Learn about the states and territories, and the layout of your destination city.' },
      { title: 'Learn basic slang', description: 'Australians use a lot of slang (e.g., "arvo" for afternoon, "brekkie" for breakfast). Don\'t worry, they are happy to explain!' },
      { title: 'Understand weather patterns', description: 'Remember that seasons are reversed in the Southern Hemisphere (Summer is Dec-Feb).' },
      { title: 'Read up on local etiquette', description: 'Australians generally prefer informal communication and value punctuality.' },
    ],
    tips: [
      'Tipping is not expected or required in Australia, though you can round up a bill for exceptional service.',
      'Always swim between the red and yellow flags at the beach.',
    ],
    resources: [
      { name: 'Study Australia', url: '#' },
    ],
    whatMostStudentsDo: 'Most students watch YouTube vlogs of international students living in their specific Australian city to get a feel for daily life.',
    checklist: [
      'Review city map',
      'Learn basic slang',
      'Understand local weather'
    ],
  },
  'pa-11': {
    id: 'pa-11',
    title: 'What to Expect Once You Land',
    summary: 'Prepare for airport procedures and getting to your accommodation.',
    timeToComplete: '30 mins',
    difficultyLevel: 'Easy',
    whyItMatters: 'After a long flight, navigating a new airport can be overwhelming. Knowing exactly what to do step-by-step reduces stress.',
    stepByStep: [
      { title: 'Complete the Incoming Passenger Card', description: 'You will receive this on the plane. Fill it out truthfully, especially the customs declarations.' },
      { title: 'Pass through SmartGate/Immigration', description: 'Have your ePassport ready. Some nationalities can use automated SmartGates.' },
      { title: 'Collect baggage and clear Customs', description: 'If you declared items, go to the declare line. Do not risk a fine by hiding prohibited items.' },
      { title: 'Arrange transport', description: 'Follow signs to the taxi rank, rideshare pickup (Uber/Didi), or train station.' },
    ],
    tips: [
      'Do not bring any food off the plane with you.',
      'Many universities offer a free airport pickup service for new international students. Check if you need to book this in advance.',
    ],
    resources: [
      { name: 'SmartGate Information', url: '#' },
    ],
    whatMostStudentsDo: 'Most students book their university\'s airport pickup service, as it\'s safe, reliable, and often free for first-timers.',
    checklist: [
      'Have pen ready for passenger card',
      'Know your accommodation address',
      'Book airport pickup (if available)'
    ],
  },

  // Settling In Tasks
  'si-1': {
    id: 'si-1',
    title: 'Create USI',
    summary: 'Generate your Unique Student Identifier (USI) required for studying.',
    timeToComplete: '10 mins',
    difficultyLevel: 'Easy',
    whyItMatters: 'It is a legal requirement for all students in Australia. Without a USI, you cannot receive your final grades or your degree.',
    stepByStep: [
      { title: 'Go to the USI website', description: 'Visit usi.gov.au and select "Create USI".' },
      { title: 'Agree to Terms', description: 'Accept the terms and conditions.' },
      { title: 'Provide Identification', description: 'Use your non-Australian passport with your Australian visa. You must have entered Australia to do this.' },
      { title: 'Submit and save', description: 'Your USI will be generated immediately. Save this number and provide it to your university.' },
    ],
    tips: [
      'You can only create a USI AFTER you have passed through Australian immigration.',
      'It is 100% free. Never pay a third party to create a USI for you.',
    ],
    resources: [
      { name: 'USI Registry', url: 'https://www.usi.gov.au' },
    ],
    whatMostStudentsDo: 'Students usually complete this on their phone from their hotel or accommodation on the first night they arrive.',
    checklist: [
      'Have passport ready',
      'Create USI online',
      'Update university student portal with USI'
    ],
  },
  'si-2': {
    id: 'si-2',
    title: 'Collecting Student ID',
    summary: 'Get your physical student card from your university campus.',
    timeToComplete: '1 hour',
    difficultyLevel: 'Easy',
    whyItMatters: 'Your student ID is your key to campus life. It grants access to buildings, libraries, printing services, and crucial student discounts on public transport and retail.',
    stepByStep: [
      { title: 'Check the requirements', description: 'Most universities require you to have completed online enrolment first.' },
      { title: 'Locate Student Services', description: 'Find out where and when card collection is happening (often a specific hub during O-Week).' },
      { title: 'Bring required documents', description: 'Take your passport and your student ID number.' },
      { title: 'Get your photo taken', description: 'Smile! You\'ll have this card for years.' },
    ],
    tips: [
      'Go early in the morning during O-Week to avoid massive queues.',
      'Some universities let you upload a photo online beforehand and just collect the printed card.',
    ],
    resources: [
      { name: 'University Campus Map', url: '#' },
    ],
    whatMostStudentsDo: 'Most students make an afternoon of it: collect their ID, take a campus tour, and grab a coffee to find their lecture halls.',
    checklist: [
      'Complete online enrolment',
      'Bring passport',
      'Collect physical ID card'
    ],
  },
  'si-3': {
    id: 'si-3',
    title: 'Know what to do in emergencies',
    summary: 'Save crucial numbers and understand the emergency response system.',
    timeToComplete: '15 mins',
    difficultyLevel: 'Important',
    whyItMatters: 'In a high-stress situation, you don\'t want to be Googling what number to call. Knowing how to access help quickly can be life-saving.',
    stepByStep: [
      { title: 'Save 000', description: 'This is the number for Police, Fire, and Ambulance in life-threatening situations. It is free from any phone.' },
      { title: 'Save Non-Emergency Police', description: 'Save 131 444 for police assistance when it is not an immediate life-threatening emergency.' },
      { title: 'Save Medibank Support', description: 'Save the Medibank 24/7 Student Health Line: 1800 887 283.' },
      { title: 'Save Campus Security', description: 'Find your university\'s 24/7 security number and save it.' },
    ],
    tips: [
      'If you call 000 and cannot speak English well, say your language and stay on the line; they will connect a translator.',
      'Ambulance cover is included in your Medibank OSHC.',
    ],
    resources: [
      { name: 'Triple Zero (000) Info', url: '#' },
    ],
    whatMostStudentsDo: 'Students add these numbers to their phone contacts immediately and set "000" as an emergency contact in their phone settings.',
    checklist: [
      'Save 000 in contacts',
      'Save 131 444 in contacts',
      'Save Medibank 24/7 line',
      'Save Campus Security'
    ],
  },
  'si-4': {
    id: 'si-4',
    title: 'Get your SIM',
    summary: 'Activate your Australian mobile number.',
    timeToComplete: '30 mins',
    difficultyLevel: 'Easy',
    whyItMatters: 'You need a local number to open a bank account, sign a lease, and apply for jobs. It is the most critical first step after landing.',
    stepByStep: [
      { title: 'Buy a SIM', description: 'Purchase from a supermarket (Coles/Woolworths), convenience store, or carrier shop.' },
      { title: 'Activate online', description: 'Follow the instructions on the package to activate via WiFi.' },
      { title: 'Provide ID', description: 'You will need your passport and visa details to register the SIM, as required by Australian law.' },
      { title: 'Test the connection', description: 'Make a call and test data to ensure it is working.' },
    ],
    tips: [
      'Supermarkets often sell starter packs half-price ($15 for a $30 recharge).',
      'Keep your home country SIM safe, you may need it for bank SMS verification back home.',
    ],
    resources: [
      { name: 'Finder - Compare SIM plans', url: '#' },
    ],
    whatMostStudentsDo: 'Most students buy a SIM at the airport, then switch to a cheaper MVNO (like Amaysim or Boost) after the first month.',
    checklist: [
      'Purchase SIM',
      'Activate using passport',
      'Test calls and data'
    ],
  },
  'si-5': {
    id: 'si-5',
    title: 'Open a Bank Account',
    summary: 'Verify your ID in branch to fully activate your Australian account.',
    timeToComplete: '1 hour',
    difficultyLevel: 'Important',
    whyItMatters: 'Even if you opened an account online from overseas, you cannot withdraw money or get a debit card until you visit a branch in person.',
    stepByStep: [
      { title: 'Locate a branch', description: 'Find the nearest branch of your chosen bank.' },
      { title: 'Gather documents', description: 'Take your passport, student ID/CoE, and proof of address (e.g., a lease agreement or hostel receipt).' },
      { title: 'Visit the branch', description: 'Tell the greeter you are an international student needing to verify your ID for a new account.' },
      { title: 'Set up app and PIN', description: 'Download the banking app, set your card PIN, and add the card to Apple Pay/Google Wallet.' },
    ],
    tips: [
      'Go within the first 6 weeks of arrival, as banks require less ID documentation during this window.',
      'Ask for a "Student Account" to ensure you don\'t pay monthly account-keeping fees.',
    ],
    resources: [
      { name: 'CBA Student Banking', url: '#' },
    ],
    whatMostStudentsDo: 'Students usually do this on day 2, ensuring they add their digital card to their phone wallet immediately so they don\'t have to wait for the physical card in the mail.',
    checklist: [
      'Visit branch with passport',
      'Verify ID',
      'Download banking app',
      'Add card to digital wallet'
    ],
  },
  'si-6': {
    id: 'si-6',
    title: 'Apply for TFN',
    summary: 'Apply for a Tax File Number to work legally in Australia.',
    timeToComplete: '15 mins',
    difficultyLevel: 'Medium',
    whyItMatters: 'If you work without a TFN, your employer must legally tax your earnings at the highest rate (almost 50%). You need this before starting any job.',
    stepByStep: [
      { title: 'Go to the ATO website', description: 'Navigate to ato.gov.au and search "Apply for TFN".' },
      { title: 'Select Foreign Passport Holder', description: 'Choose the option for foreign passport holders, permanent migrants and temporary visitors.' },
      { title: 'Fill out the form', description: 'Enter your passport details, name, and an Australian postal address.' },
      { title: 'Save your receipt number', description: 'Your TFN will be mailed to you within 28 days. Save the receipt number so you can give it to employers in the meantime.' },
    ],
    tips: [
      'You must be in Australia to apply.',
      'Applying is completely FREE. Never use a third-party website that charges a fee.',
    ],
    resources: [
      { name: 'ATO TFN Application', url: 'https://www.ato.gov.au' },
    ],
    whatMostStudentsDo: 'Students apply for their TFN in their first week, as it can take up to a month to arrive by mail.',
    checklist: [
      'Have passport ready',
      'Have an Australian postal address',
      'Complete online ATO form',
      'Save receipt number'
    ],
  },
  'si-7': {
    id: 'si-7',
    title: 'Get Myki card',
    summary: 'Set up your public transport card for getting around the city.',
    timeToComplete: '20 mins',
    difficultyLevel: 'Easy',
    whyItMatters: 'You cannot pay with cash or credit card on most public transport in Australia. You must have the local transit card (Myki in VIC, Opal in NSW, Translink in QLD).',
    stepByStep: [
      { title: 'Buy a card', description: 'Purchase a physical card from a train station, 7-Eleven, or airport. In some cities, you can use a digital card on Android phones.' },
      { title: 'Top up', description: 'Load money (Myki Money) onto the card.' },
      { title: 'Register the card', description: 'Go online and register the card to your name. If you lose it, your balance is protected.' },
      { title: 'Check concession eligibility', description: 'Check with your university if international students in your state are eligible for discounted travel fares.' },
    ],
    tips: [
      'Always tap ON and tap OFF to ensure you are charged the correct fare and avoid heavy fines from transit officers.',
      'In NSW (Sydney), you can just tap your regular credit/debit card, but in VIC (Melbourne) you must have a Myki.',
    ],
    resources: [
      { name: 'Public Transport Victoria (PTV)', url: '#' },
    ],
    whatMostStudentsDo: 'Students download the local transport app (like the PTV app) to manage their card balance and check train times.',
    checklist: [
      'Purchase transit card',
      'Load funds',
      'Register card online',
      'Download transit app'
    ],
  },
  'si-8': {
    id: 'si-8',
    title: 'Start your part time job search',
    summary: 'Begin applying for work to support your living expenses.',
    timeToComplete: 'Ongoing',
    difficultyLevel: 'Hard',
    whyItMatters: 'Finding a job can take a few weeks. Earning local income eases financial pressure and helps you practice English and meet locals.',
    stepByStep: [
      { title: 'Understand your visa limits', description: 'Student visas usually restrict work to 48 hours per fortnight during semester.' },
      { title: 'Prepare your resume', description: 'Tailor it to the jobs you are applying for (e.g., retail, hospitality, tutoring).' },
      { title: 'Apply online and in-person', description: 'Use Seek.com.au. For cafes and restaurants, dressing neatly and dropping in your resume in-person is still highly effective.' },
      { title: 'Prepare for interviews', description: 'Practice common interview questions and be ready to provide your availability schedule.' },
    ],
    tips: [
      'Be aware of your rights. The minimum wage in Australia is high. Do not accept "cash in hand" jobs below the minimum wage.',
      'If you want to work in hospitality serving alcohol, you MUST complete an RSA (Responsible Service of Alcohol) course first.',
    ],
    resources: [
      { name: 'Fair Work Ombudsman (Know your rights)', url: '#' },
      { name: 'Seek.com.au', url: '#' },
    ],
    whatMostStudentsDo: 'Most students find their first job through networking—asking friends from university or their community if their workplaces are hiring.',
    checklist: [
      'Finalize resume',
      'Get RSA certificate (if required)',
      'Apply online',
      'Drop resumes locally'
    ],
  },
  'si-9': {
    id: 'si-9',
    title: 'Get ABN (for contract roles)',
    summary: 'Apply for an Australian Business Number if you plan to freelance or gig work.',
    timeToComplete: '20 mins',
    difficultyLevel: 'Medium',
    whyItMatters: 'If you want to work for UberEats, Deliveroo, Airtasker, or do freelance design/tutoring, you must operate as a sole trader with an ABN.',
    stepByStep: [
      { title: 'Determine eligibility', description: 'Ensure you actually need an ABN. Regular part-time retail/hospitality jobs only require a TFN.' },
      { title: 'Go to the ABR website', description: 'Visit abr.gov.au and apply as a Sole Trader.' },
      { title: 'Provide details', description: 'You will need your TFN, passport, and details of the business activities you plan to undertake.' },
      { title: 'Receive ABN', description: 'If successful, you will receive your 11-digit ABN immediately online.' },
    ],
    tips: [
      'Having an ABN means you are responsible for paying your own tax at the end of the year. Put aside 20% of your earnings.',
      'Applying for an ABN is free.',
    ],
    resources: [
      { name: 'Australian Business Register (ABR)', url: '#' },
    ],
    whatMostStudentsDo: 'Students planning to do food delivery usually apply for their TFN and ABN on the same day during their first week.',
    checklist: [
      'Confirm if an ABN is needed',
      'Apply at abr.gov.au',
      'Save ABN number safely'
    ],
  },
  'si-10': {
    id: 'si-10',
    title: 'How to file Tax',
    summary: 'Understand your tax obligations and how to lodge a return.',
    timeToComplete: 'Reading: 15m',
    difficultyLevel: 'Medium',
    whyItMatters: 'If you work in Australia, you must lodge a tax return between July 1 and October 31 each year. Most students get a tax refund!',
    stepByStep: [
      { title: 'Understand the financial year', description: 'The tax year runs from 1 July to 30 June.' },
      { title: 'Set up myGov', description: 'Create a myGov account and link it to the ATO (Australian Taxation Office).' },
      { title: 'Keep records', description: 'Keep receipts for work-related expenses (like uniforms or required tools) as you can claim these.' },
      { title: 'Lodge online', description: 'Use myTax to lodge your return easily online.' },
    ],
    tips: [
      'International students studying for more than 6 months are generally considered "residents for tax purposes", meaning you get the tax-free threshold (first $18,200 earned is tax-free).',
      'Universities often host free Tax Help clinics in August/September.',
    ],
    resources: [
      { name: 'ATO - Studying in Australia', url: '#' },
    ],
    whatMostStudentsDo: 'Most students link their ATO to myGov early, but wait until August to lodge their return so their employer has time to upload their income summary.',
    checklist: [
      'Create myGov account',
      'Link ATO to myGov',
      'Keep work expense receipts'
    ],
  },
  'si-11': {
    id: 'si-11',
    title: 'How to apply for Drivers license',
    summary: 'Convert your overseas license or understand the rules for driving.',
    timeToComplete: 'Varies',
    difficultyLevel: 'Medium',
    whyItMatters: 'Driving gives you freedom, but driving illegally can result in massive fines or visa cancellation.',
    stepByStep: [
      { title: 'Check state rules', description: 'Rules vary wildly by state. In VIC, you must get a local license within 6 months. In NSW, temporary visa holders can drive on their home license indefinitely.' },
      { title: 'Get a translation', description: 'If your home license is not in English, you must carry a formal NAATI translation or an International Driving Permit.' },
      { title: 'Book an appointment', description: 'If converting, book an appointment with the state transport authority (e.g., VicRoads, Service NSW).' },
      { title: 'Take tests if required', description: 'Depending on your home country, you may need to take a written knowledge test and a practical driving test.' },
    ],
    tips: [
      'Always carry your physical license and passport when driving.',
      'Familiarize yourself with local rules, especially hook turns (Melbourne) and strict speed camera enforcement.',
    ],
    resources: [
      { name: 'Austroads (State by State info)', url: '#' },
    ],
    whatMostStudentsDo: 'Most students rely on public transport for the first year and only convert their license if they buy a car or need to drive for work.',
    checklist: [
      'Check specific rules for your state',
      'Obtain NAATI translation if required',
      'Book conversion appointment'
    ],
  },
  'si-12': {
    id: 'si-12',
    title: 'How to save money as a student',
    summary: 'Learn the best local hacks to stretch your budget further.',
    timeToComplete: 'Reading: 10m',
    difficultyLevel: 'Easy',
    whyItMatters: 'Australia is expensive. Small changes to your daily habits can save you thousands of dollars over your degree.',
    stepByStep: [
      { title: 'Use student discounts', description: 'Always ask "Do you have a student discount?" at cinemas, gyms, and retail stores.' },
      { title: 'Shop smart for groceries', description: 'Shop at Aldi for basics. Go to major supermarkets (Coles/Woolies) after 7 PM for heavily discounted bakery and meat items.' },
      { title: 'Buy second-hand', description: 'Use Facebook Marketplace, Gumtree, and Op Shops (thrift stores) for furniture and clothing.' },
      { title: 'Use campus facilities', description: 'Utilize free campus Wi-Fi, microwaves, and free food events.' },
    ],
    tips: [
      'Get a KeepCup; many cafes offer discounts if you bring your own reusable coffee cup.',
      'Download the "Half Price" app which tracks weekly 50% off specials at major supermarkets.',
    ],
    resources: [
      { name: 'UNiDAYS', url: '#' },
      { name: 'Student Edge', url: '#' },
    ],
    whatMostStudentsDo: 'Savvy students plan their meals around the weekly half-price specials catalog released by Coles and Woolworths every Wednesday.',
    checklist: [
      'Download UNiDAYS app',
      'Locate nearest Aldi/markets',
      'Join local Buy/Swap/Sell Facebook groups'
    ],
  },
  'si-13': {
    id: 'si-13',
    title: 'What is superannuation account',
    summary: 'Understand Australia\'s retirement savings system.',
    timeToComplete: '15 mins',
    difficultyLevel: 'Medium',
    whyItMatters: 'Employers pay an extra 11%+ on top of your wage into a Super account. It is your money, and you can claim it back when you leave Australia.',
    stepByStep: [
      { title: 'Understand the basics', description: 'Superannuation is a mandatory investment fund for your retirement.' },
      { title: 'Choose a fund', description: 'You can choose your own fund (e.g., AustralianSuper, Hostplus) when you start a job, or use the employer\'s default.' },
      { title: 'Provide details to employer', description: 'Give your Super fund details and Member Number to your employer so they can pay into it.' },
      { title: 'Consolidate accounts', description: 'If you change jobs, give your NEW employer your EXISTING super details so you don\'t open multiple accounts and pay multiple fees.' },
    ],
    tips: [
      'When your student visa expires and you leave Australia permanently, you can claim this money back via the DASP (Departing Australia Superannuation Payment).',
    ],
    resources: [
      { name: 'ATO - Super for temporary residents', url: '#' },
    ],
    whatMostStudentsDo: 'Most students choose a popular low-fee industry fund like Hostplus or Rest when they get their first job, and stick with it for their whole stay.',
    checklist: [
      'Choose a Super fund',
      'Provide details to employer',
      'Keep your Member Number safe'
    ],
  },
  'si-14': {
    id: 'si-14',
    title: 'Socialising tips',
    summary: 'Build a support network and make lifelong friends.',
    timeToComplete: 'Ongoing',
    difficultyLevel: 'Variable',
    whyItMatters: 'Homesickness is the biggest challenge for international students. Building a social circle is crucial for your mental health and academic success.',
    stepByStep: [
      { title: 'Join University Clubs', description: 'Sign up for at least one academic club and one hobby/sports club.' },
      { title: 'Attend campus events', description: 'Go to free BBQs, trivia nights, and international student mixers.' },
      { title: 'Use social apps', description: 'Use Meetup.com to find local groups interested in hiking, board games, or tech.' },
      { title: 'Talk to classmates', description: 'Be brave! Ask the person next to you in a lecture if they want to grab a coffee after class.' },
    ],
    tips: [
      'Australians often socialize over a drink (coffee or beer) or sports. Saying "yes" to a pub feed or a casual sports game is a great way to bond.',
      'Don\'t just stick with people from your home country; force yourself to mingle.',
    ],
    resources: [
      { name: 'Meetup', url: '#' },
    ],
    whatMostStudentsDo: 'Students who volunteer on campus (e.g., as orientation guides) report making the strongest local friendships.',
    checklist: [
      'Join 2 university clubs',
      'Attend an orientation event',
      'Introduce yourself to a neighbour or classmate'
    ],
  },
  'si-15': {
    id: 'si-15',
    title: 'Places to visit in Australia',
    summary: 'Explore your new backyard during semester breaks.',
    timeToComplete: 'Reading: 10m',
    difficultyLevel: 'Fun',
    whyItMatters: 'Studying abroad is also about the experience. Traveling helps you appreciate the country and gives you a break from studies.',
    stepByStep: [
      { title: 'Explore your local city', description: 'Start small. Visit local museums, national parks, and famous cafes in your own city.' },
      { title: 'Plan interstate trips', description: 'Look for cheap domestic flights (Jetstar, Virgin) to visit Sydney, Melbourne, or the Gold Coast.' },
      { title: 'Experience nature', description: 'Book a trip to see the Great Barrier Reef, Uluru, or do a road trip along the Great Ocean Road.' },
      { title: 'Travel safely', description: 'Always tell someone where you are going, especially if hiking in the bush or swimming at unpatrolled beaches.' },
    ],
    tips: [
      'YHA (Youth Hostels Australia) offers cheap, safe accommodation and great ways to meet other travelers.',
      'Book domestic flights during sale periods (e.g., Jetstar Friday Fare Frenzy).',
    ],
    resources: [
      { name: 'Tourism Australia', url: '#' },
    ],
    whatMostStudentsDo: 'Many international students plan a large group road trip during the mid-year winter break (July) to somewhere warm like Queensland.',
    checklist: [
      'Make a bucket list',
      'Set up flight alerts for domestic travel',
      'Plan a weekend day-trip'
    ],
  },
  'si-16': {
    id: 'si-16',
    title: 'Understanding long-term stay options',
    summary: 'Start planning your visa pathways early if you wish to stay post-graduation.',
    timeToComplete: 'Reading: 15m',
    difficultyLevel: 'Important',
    whyItMatters: 'Migration laws change frequently. Knowing your options early allows you to choose the right courses, gain relevant work experience, and avoid last-minute visa stress.',
    stepByStep: [
      { title: 'Research the 485 Visa', description: 'The Temporary Graduate visa (subclass 485) allows you to live, study, and work after you have finished your studies.' },
      { title: 'Understand Skilled Migration', description: 'Look at the Skilled Occupation List to see if your field of study is in demand.' },
      { title: 'Consult an expert', description: 'Consider booking a consultation with a Registered Migration Agent (MARA registered) in your final year.' },
      { title: 'Focus on English requirements', description: 'Post-study visas often require a higher IELTS/PTE score than student visas. Keep practicing!' },
    ],
    tips: [
      'Regional study offers extended visa options. If you are open to living outside major cities, research regional incentives.',
      'Never take immigration advice from friends or Facebook groups; only trust official government sources or MARA agents.',
    ],
    resources: [
      { name: 'Department of Home Affairs', url: '#' },
      { name: 'MARA (Migration Agents Registry)', url: '#' },
    ],
    whatMostStudentsDo: 'Proactive students start researching the 485 visa requirements 12 months before they graduate to ensure they meet all criteria.',
    checklist: [
      'Read about the 485 visa',
      'Check the Skilled Occupation List',
      'Plan English test prep if needed'
    ],
  },
  'si-17': {
    id: 'si-17',
    title: 'Preparing for full-time work',
    summary: 'Transition from student jobs to your professional career.',
    timeToComplete: 'Ongoing',
    difficultyLevel: 'Hard',
    whyItMatters: 'The graduate job market is highly competitive. Securing a professional role is often essential for post-study visa pathways.',
    stepByStep: [
      { title: 'Gain relevant experience', description: 'Apply for internships, cadetships, or volunteer in your field during your second and third years.' },
      { title: 'Apply for Graduate Programs', description: 'Large corporations open their Graduate Program applications in February/March for the FOLLOWING year. Do not miss this window!' },
      { title: 'Network extensively', description: 'Attend industry association events, university alumni nights, and reach out to professionals on LinkedIn for coffee chats.' },
      { title: 'Refine your personal brand', description: 'Clean up your social media, polish your LinkedIn, and utilize your university career service for mock interviews.' },
    ],
    tips: [
      'Local experience is king. Even an unpaid internship in your field in Australia is worth more to local employers than a prestigious overseas role.',
      'Tailor every cover letter; generic applications are easily spotted and discarded.',
    ],
    resources: [
      { name: 'GradConnection', url: '#' },
      { name: 'Prosple', url: '#' },
    ],
    whatMostStudentsDo: 'The most successful students treat their job search like a 10-hour-a-week subject in their final year.',
    checklist: [
      'Apply for internships',
      'Mark Graduate Program application dates in calendar',
      'Attend a networking event'
    ],
  },
  'si-18': {
    id: 'si-18',
    title: 'Transitioning to OVHC',
    summary: 'Upgrade your health cover seamlessly when your student visa ends.',
    timeToComplete: '5 mins',
    difficultyLevel: 'Easy',
    whyItMatters: 'Your OSHC is tied strictly to your Student Visa. When you transition to a Graduate (485) or Working visa, you must hold Overseas Visitor Health Cover (OVHC) to comply with visa condition 8501.',
    stepByStep: [
      { title: 'Understand the requirement', description: 'The Department of Home Affairs requires proof of adequate health insurance (OVHC) when you lodge your new visa application.' },
      { title: 'Review your options', description: 'Explore Medibank\'s OVHC plans. They are designed specifically to meet visa requirements.' },
      { title: 'Keep your benefits', description: 'By staying with Medibank, your rewards points, health score, and waiting periods carry over. You don\'t start from scratch.' },
      { title: 'Convert with one click', description: 'Use the Medibank app to transition your policy instantly when you are ready to apply for your new visa.' },
    ],
    tips: [
      'Do not let your cover lapse. A gap in cover can lead to visa refusal.',
      'You can easily add extras like Dental and Optical when you transition to an OVHC working plan.',
    ],
    resources: [
      { name: 'Medibank OVHC Information', url: '#' },
    ],
    whatMostStudentsDo: 'Students use the 1-click transition flow in the Medibank app the week they lodge their 485 visa, instantly receiving the certificate needed for immigration.',
    checklist: [
      'Confirm new visa health requirements',
      'Compare OVHC plans in-app',
      'Transition cover to maintain rewards'
    ],
  },
};
