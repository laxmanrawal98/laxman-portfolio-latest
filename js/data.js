/* Portfolio + career data, sourced from CV Projects sheet / Modification CSV */
window.LR_DATA = {
  hero: {
    name: "I'm Laxman Rawal",
    role: "Founder’s Office | Program Manager | AI Solutions Architect | Agentic Workflows & Multi-Agent Systems",
    bio: "AI-native operator and ex-founder specializing in multi-agent workflows, voice agents, and ERP automation instrumented against real P&L impact. Shipped GenAI systems across construction, real estate, and healthcare while driving 0 to 1 initiatives with complete ownership in high-ambiguity environments.",
    photo: "assets/profile.png",
    connect: {
      label: "Connect With me:",
      email: "hello@laxmanrawal.in",
      linkedin: "https://www.linkedin.com/in/laxmanrawal98/",
    },
  },

  career: [
    {
      id: "scalify",
      company: "Scalify With AI",
      role: "Ex-Founder",
      dates: "Jun 2025 - Present",
      location: "Remote / India",
      tag: "Founder",
      summary:
        "Building AI operating systems for growth-stage businesses, WhatsApp & voice agents, IoT automation, and ERP platforms instrumented against real P&L.",
      impacts: [
        "Shipped multi-agent workflows across construction, medical hospitality, real estate, and solar.",
        "Turned operational leaks into stage-gated systems with before/after receipts founders can read in seconds.",
        "Combined agent design and instrumentation so every system pays for itself.",
      ],
      skills: [
        "Generative AI",
        "Agentic Workflows",
        "Enterprise Automation",
        "AI System Design",
      ],
    },
    {
      id: "amazon",
      company: "Amazon",
      role: "Senior Risk Investigation Specialist",
      dates: "Sept 2021 - Oct 2024",
      location: "Bengaluru, India",
      tag: "Full-time",
      summary:
        "Led high-stakes investigation of complex financial fraud, seller compliance risk, and cross-border transactional anomalies.",
      impacts: [
        "Investigated complex multi-million dollar fraud patterns across global Amazon marketplaces.",
        "Developed predictive risk indicators and anomaly rule sets that reduced fraud false-positives by 28%.",
        "Mentored junior investigators and established standard operational playbooks.",
      ],
      skills: [
        "Risk Analytics",
        "Financial Fraud Investigation",
        "Pattern Recognition",
      ],
    },
    {
      id: "ca",
      company: "GRV & PK Associates",
      role: "CA Article",
      dates: "Feb 2018 - Dec 2020",
      location: "India",
      tag: "Articleship",
      summary:
        "Developed core expertise in audit discipline, financial reporting, and operational detail.",
      impacts: [
        "Supported statutory and internal audit cycles across client books.",
        "Built fluency in financial controls, reconciliations, and compliance documentation.",
      ],
      skills: ["Audit", "Financial Controls", "Compliance", "Accounting", "Reporting"],
    },
  ],

  projects: [
    {
      id: "upscape",
      niche: "Construction",
      filter: "construction",
      title: "Architect - Upscape",
      subtitle: "Upscape Build™, Tech-Enabled Design & Construction Platform",
      tags: [],
      brief:
        "Upscape Build™, Tech-Enabled Design & Construction Platform Upscape Build is an integrated design and residential construction partner offering end-to-end architecture, civil construction, and interior design across tier-1 South Indian cities. Leveraging transparent pricing, custom digital configuration platforms, and advanced engineering benchmarks, the company connects customer project specifications with real-time site execution.",
      problems: [
        "Communication & Coordination: WhatsApp reliance and lack of centralized SOPs.",
        "Executive Oversight: Zero real-time visibility for the Founder on finances, site progress, and P&L.",
        "Field Reporting: Manual, unverifiable updates from Site Engineers.",
        "Client Transparency: Opaque billing, milestone progress, and design sign-offs for clients.",
        "Cash-Flow & Collections: Uncontrolled revenue leakage from advancing work before milestone payments clear.",
        "Procurement & Operations: Reactive inventory management causing site stoppages and idle labor costs.",
      ],
      solutions: [
        "Unified Operating Platform & Stage-Gated Workflow Engine\nBuilt an enterprise-grade ERP with dedicated, role-based dashboards (Founder, Project Architect, Site Engineer, Client).\nStandardized operations by introducing automated stage-gated logic. A project cannot transition into the construction phase or trigger the next milestone until the prior phase's technical approvals (PDF sign-offs) and payments are fully verified. Integrated a native multi-channel messaging hub (\"Nuegas\") to eliminate scattered WhatsApp threads and maintain full operational audit trails.",
        "Executive Control Center & Real-Time P&L Engine\nDesigned a centralized Founder Dashboard and Action Center providing 360-degree visibility into company performance.\nIntegrated financial ledger APIs to pull live data across active, pending, and halted projects. Automated tracking for total contract value, collected revenue, pending collections, gross profit margins, and site-level P&L breakdowns. High-priority actionable alerts are pushed directly to the Action Center for instant one-click approvals (e.g., PO approvals, overdue payment reminders).",
        "Mobile-First Field Logging & Geo-Tagged Verification System\nDeveloped a lightweight, mobile-optimized site management portal for Site Engineers.\nStreamlined daily reporting by enabling site engineers to log daily site notes, record worker attendance, and upload visual progress proof in seconds. Uploaded photos are auto-categorized by construction stage (Excavation, Foundation, Plinth, etc.) with optional automated GPS geotagging and instant sharing options for client visibility.",
        "Transparent Client Portal & Self-Serve Approval Suite\nCreated a dedicated Customer Portal giving homeowners real-time visibility into their residential project.\nClients can track overall project progress (Design & Construction phases), download structural and architectural drawings (Zoning, Floor Plans, Elevations), and execute \"Approve\" or \"Request for Change\" actions. Weekly photo updates uploaded by field engineers are streamed directly into the client dashboard along with transparent milestone invoice tracking.",
        "Automated Payment Gating & Cash-Flow Risk Mitigation\nIntroduced an automated milestone billing engine connected to contract Annexures.\nThe platform auto-generates stage-wise tax invoices and enforces strict \"Halted\" status badges if milestone payments become overdue (e.g., triggering automated payment reminders to clients via SMS/Email). Work suspension rules automatically protect capital reserves by preventing material allocation to unpaid stages.",
        "Intelligent Procurement Dashboard & Labor Cost Tracking\nBuilt an integrated procurement and workforce management system.\nFeatures real-time inventory tracking with low-stock threshold alerts (e.g., critical cement or steel stock notifications). Tracks vendor performance, pending Purchase Orders, and city-wise material rates. Incorporates daily worker attendance sheets mapped to specific wage rates (e.g., Mason, Helper, Carpenter) to keep daily labor overhead strictly within estimated budget parameters.",
      ],
      impacts: [
        "77% Faster Milestone Payment Collection: Automated payment-gated stages reduced the average overdue payment window from 18 days to 4 days.",
        "Near-Zero Revenue Leakage: Work-suspension rules on overdue payments prevented unbilled site work, cutting capital exposure on unpaid milestones by ~85%.",
        "Predictable Cash Flow: Auto-generated tax invoices and instant client reminders reduced payment delays across active sites.",
        "78% Reduction in Field Reporting Time: Mobile site logging cut Site Engineers' daily updates from 45 minutes to under 10 minutes.",
        "15+ Hours/Week Saved per Manager: Replacing scattered WhatsApp messaging with structured in-app communications eliminated manual status follow-ups.",
        "50% Faster Design Approval Cycles: Centralizing document sign-offs (Zoning, Floor Plans, Elevations) in the client portal reduced approval turnaround time from 14 days to 7 days.",
        "12% Reduction in Site Labor Overhead: Tracking daily worker attendance (Masons, Helpers) directly against budgeted wage rates eliminated unverified labor payouts.",
        "90% Reduction in Emergency Procurement Costs: Low-stock alerts (e.g., critical cement/steel notifications) prevented last-minute rush-order premiums and idle labor hours.",
        "Improved Gross Margins: Site-level P&L visibility allowed real-time cost adjustments before project completion.",
        "100% Executive Visibility: The Founder Dashboard provided real-time tracking of overall contract value, collected revenue, P&L, and critical site alerts without relying on manual updates.",
        "90% Drop in Client Progress Queries: Real-time client access to weekly photo feeds and milestone schedules reduced status phone calls from ~20/week to <2/week per client.",
      ],
      receipt: [],
      metrics: [
        { value: "77%", label: "77% Faster Milestone Payment Collection" },
        { value: "78%", label: "78% Reduction in Field Reporting Time" },
        { value: "50%", label: "50% Faster Design Approval Cycles" },
      ],
      videos: [
        {
          platform: "drive",
          id: "1-zH_JhgkgWLqXXxfeAq09YMZBe4FWhI7",
          label: "Video 1",
          description:
            "A demo version [Draft 1] was made with the help of AI tools like Claude after the PRD. This gave an idea to the client of how the final product and it's functionality would look like.",
        },
        {
          platform: "youtube",
          url: "https://youtube.com/shorts/iQjadxWqQxo",
          label: "Video 2",
          description:
            "The Upscape Build WhatsApp Agent provides users with instant, automated construction cost estimates through an intuitive interactive chat. By guiding clients through a quick step-by-step process capturing key details such as project type (Residential or Commercial), location, plot size, and layout configuration (from BHKs to Duplexes and Villas). The agent automatically generates a personalized project enquiry summary and estimated cost range. It streamlines lead capture, provides immediate budget clarity to prospective clients, and seamlessly directs them to connect with a representative or visit the official website.",
        },
      ],
      links: [],
    },
    {
      id: "residency",
      niche: "Medical Hospitality",
      filter: "hospitality",
      title: "Residency",
      subtitle: "Extended-stay medical residency lodges",
      tags: [],
      brief:
        "The client operates a chain of specialized extended-stay residency lodges catering exclusively to long-term medical tourists and families seeking treatment at one of India's top multispecialty research hospitals. Unlike traditional short-stay hotels, guest stays range anywhere from 3 months to 3 years, requiring an operational model that blends long-term lease management, medical amenity support, and flexible billing cycles tailored to extended healthcare treatments.",
      problems: [
        "Uncontrolled Revenue Leakage via Local Transit Interception\nLocal auto-rickshaw and cab drivers at key transit hubs (railway stations, bus terminals, and airports) were being bribed with higher commissions by competitor lodges to divert arriving patients and their families.\nDirect loss of high-intent top-of-funnel customer traffic and reduced baseline occupancy despite strong brand reputation.",
        "High Utility Overhead due to Lack of Centralized Energy Control\nGuests leaving air conditioners, water heaters, and appliances running continuously resulted in massive energy wastage.\nElectricity bills inflated to nearly ₹18 Lakhs per annum across the 3 properties due to the complete absence of smart, centralized power monitoring or automated energy management controls.",
        "Missed Bookings & Lead Drop-Off Outside Working Hours\nRoom reservations relied entirely on manual phone calls handled by front-desk staff during standard office hours.\nHigh lead loss from distressed medical tourists calling after hours, long wait times, and zero automated instant-booking mechanisms during peak arrival windows.",
        "Absence of Operational SOPs & Unmonitored Staff Execution\nHousekeeping, room maintenance, and daily cleaning requests were handled informally over verbal requests or unorganized phone calls to staff.\nManagement had zero visibility into staff task completion, turnaround times, or unfulfilled guest service requests, leading to guest dissatisfaction and uncollected feedback.",
      ],
      solutions: [
        "WhatsApp AI Interception & Automated Transit Pickup Network\nBuilt an automated customer onboarding pipeline that connected WhatsApp AI booking agents directly with a trusted partner transit fleet.\nThe WhatsApp AI agent collected arrival details (train/flight numbers and expected arrival times) during the booking process. Upon confirmation, the system automatically dispatched verified drivers to pick up guests at transit hubs, sending automated vehicle and driver details directly to the guest's WhatsApp, completely bypassing third-party driver interception.",
        "Smart IoT Energy Automation & Booking API Integration\nEngineered a smart energy management system combining IoT hardware with the property management software (PMS).\nInstalled smart switches at the main circuit breakers linked via API to the central reservation database. Main power was automatically activated upon digital check-in and instantly cut off upon check-out. During active stays, power consumption was dynamically controlled using keycard slots and in-room motion sensors to prevent HVAC and appliance usage when rooms were unoccupied.",
        "24/7 AI Voice & WhatsApp Conversational Booking Agents\nDeployed an omni-channel AI reservation suite (WhatsApp AI & Voice Agents) for continuous lead capture.\nThe AI agents handled inbound queries, checked real-time room availability, answered medical stay questions, and processed instant bookings outside staff working hours. Unconverted lead calls were automatically logged and categorized on a staff CRM dashboard for human follow-up first thing the next morning.",
        "Centralized Operations Dashboard & WhatsApp Task Dispatch Engine\nDeveloped a unified operational command center for staff service management and real-time owner oversight.\nGuests submitted housekeeping, room service, or maintenance requests directly through WhatsApp. Requests automatically created tracked service tickets on the central staff dashboard, notifying property owners of response times, unfulfilled requests, and post-service customer feedback ratings to enforce strict staff accountability.",
      ],
      impacts: [
        "20% Reduction in Energy Costs: Smart IoT power cut-offs and motion sensor controls slashed annual electricity expenditure from ₹22 Lakhs to ~₹17.6 Lakhs.",
        "35% Surge in Top-of-Funnel Conversion: Direct transit pick-ups and 24/7 AI booking availability eliminated driver interception and missed after-hours leads.",
        "Zero After-Hours Lead Loss: The 24/7 AI voice and WhatsApp booking agents captured 100% of off-hour queries, converting high-intent medical travelers overnight.",
        "100% Request Transparency: Owners gained real-time visibility into staff response rates, driving housekeeping turnaround times down by 60%.",
        "Seamless Human-in-the-Loop Workflow: Automated lead logging ensured staff followed up on 100% of unconverted voice calls the next morning.",
      ],
      receipt: [
        ["Annual Electricity Expense", "₹18 Lakhs/year", "~₹5.7 Lakhs/year", "75% Cost Reduction"],
        ["After-Hours Booking Response Time", "~12 Hours (Next Day)", "Instant (<5 seconds)", "100% Lead Capture"],
        ["Service Request Tracking", "Unmonitored / Verbal", "100% Digitized", "Complete Transparency"],
      ],
      metrics: [
        { value: "20%", label: "20% Reduction in Energy Costs" },
        { value: "35%", label: "35% Surge in Top-of-Funnel Conversion" },
        { value: "100%", label: "100% Request Transparency" },
      ],
      videos: [
        {
          platform: "youtube",
          url: "https://youtube.com/shorts/CnIBBXLKEKg",
          label: "Video 1",
          description:
            "The Rawal's Residency WhatsApp Agent provides a fully automated, seamless room booking experience for guests visiting Katpadi/Vellore. Leads coming from online ads, websites, or local contact details can instantly initiate a booking by sending a message on WhatsApp. The agent guides users step-by-step through selecting their preferred property, room type, check-in/check-out dates via an interactive calendar, and custom arrival/departure times.\n\nOnce choices are selected, it presents a complete Booking Summary with itemized costs and sends a secure payment link supporting multiple options like UPI, Debit, and Credit Cards. Upon payment, guests receive instant booking confirmation along with location maps and front desk contact information, making reservation management completely effortless and available 24/7.",
        },
        {
          platform: "youtube",
          url: "https://youtube.com/shorts/WwNqWLOT4oo",
          label: "Video 2",
          description:
            "To test and validate smart automation, I first installed and configured a Wi-Fi smart switch relay at home to verify its real-time control via a mobile app. Next, using the device's API key, I integrated the switch directly into a custom Project Management System. This enabled fully automated power management, instantly supplying electricity to a room upon guest check-in and cutting power automatically upon check-out to maximize energy efficiency.",
        },
        {
          platform: "youtube",
          url: "https://youtu.be/-5vQ37EoC1A",
          label: "Video 3",
          description:
            "Client Prototype: PRD-Based Demo\n\nThis video showcases a functional prototype developed directly from the client's Product Requirement Document (PRD). It illustrates the core user flows, system logic, and UI layout designed to validate requirements before full-scale deployment.",
        },
      ],
      links: [],
    },
    {
      id: "realestate",
      niche: "Real Estate",
      filter: "realestate",
      title: "Real Estate",
      subtitle: "Integrated Real Estate Developer & Master Brokerage Firm",
      tags: [],
      brief:
        "Client: Integrated Real Estate Developer & Master Brokerage Firm\n\nIndustry: Commercial & Residential Real Estate (Property Development, Construction, & High-Ticket Brokerage)\n\nTarget market: UAE & Pune, India\n\nBusiness Model: Hybrid model operating simultaneously as a Property Developer (building and selling proprietary inventory) and a Real Estate Brokerage (marketing third-party inventory and channel partner management).",
      problems: [
        "1. Inefficient Multi-Channel Lead Management & Lack of High-Intent Prospect Discovery",
        "Inbound leads across Dubai and Pune portals (Bayut, Property Finder, MagicBricks, Meta Ads) were scattered across disparate systems.",
        "Sales teams struggled to identify high-net-worth individuals (HNWIs) and NRIs who fit the ideal buyer persona for luxury off-plan properties.",
        "2. High Drop-Off in High-Ticket Lead Nurturing & Site Visit Conversions",
        "Because properties carried multi-crore/multi-million AED price tags, cold leads required extensive warming before agreeing to a physical site visit.",
        "High-ticket leads arriving outside office hours were left unattended, causing severe lead drop-off and low site-visit conversion rates.",
        "3. Exorbitant Media Production Overhead & Slow Content Turnaround",
        "Marketing high-ticket properties required hiring professional videographers, staging crews, and drone operators for every listing and construction update.",
        "Content creation costs ballooned to thousands of dollars per property, delaying campaign launches and burning marketing budgets before lead acquisition even began.",
      ],
      solutions: [
        "AI-Powered Unified Dashboard & LinkedIn Lookalike Prospecting Engine\nBuilt a centralized Real Estate CRM and Lead Intelligence Dashboard.\nIntegrated directly with property portals, ad campaigns, and the LinkedIn API. The system analyzes existing high-ticket buyers' professional profiles, wealth indicators, and company roles to automatically discover, scrape, and score lookalike NRI and HNWI leads in real time.",
        "Omni-Channel AI Nurturing Engine (WhatsApp & AI Voice Agents)\nDeployed 24/7 conversational WhatsApp AI and Voice AI agents tailored for luxury property consultation.\nAgents handle off-hour inquiries, qualify buyer budgets/investment timelines, answer project questions, and automatically schedule guided site visits or virtual walk-throughs for senior sales executives to close.",
        "Automated Generative Visual Studio (Google Veo & Imagen Nano Banana APIs)\nReplaced expensive physical video shoots with an AI-driven visual generation pipeline.\nIntegrated Google's Veo Video Model API and Imagen Nano Banana Image API into the dashboard. Field agents upload raw site photographs, which the AI transforms into cinematic, high-resolution promo videos and virtual staging visuals, slashing video production costs by up to $2,000 USD per property campaign.",
      ],
      impacts: [
        "$2,000 USD Saved per Property Campaign: Replacing traditional videography crews with AI video generation (Google Veo + Imagen Nano Banana) reduced visual production costs by ~85%.",
        "40% Reduction in Cost Per Acquisition (CPA): Automated lookalike lead discovery via LinkedIn API improved target lead quality, drastically reducing wasted ad spend.",
        "3.5x Increase in Site-Visit Booking Rate: 24/7 AI WhatsApp & Voice agents nurtured high-ticket leads instantly, moving prospects from cold inquiry to booked site visit in under 24 hours.",
        "100% Off-Hours Lead Engagement: Zero lead drop-off for international NRI buyers calling/messaging across different time zones (UAE vs. India vs. US/UK).",
        "90% Faster Promo Content Turnaround: Generated cinematic marketing videos from raw site photos in under 15 minutes, down from 5-7 days with external production teams.",
      ],
      receipt: [],
      metrics: [
        { value: "$2,000 USD", label: "$2,000 USD Saved per Property Campaign" },
        { value: "40%", label: "40% Reduction in Cost Per Acquisition (CPA)" },
        { value: "3.5x", label: "3.5x Increase in Site-Visit Booking Rate" },
      ],
      videos: [],
      links: [
        {
          href: "https://aistudio.google.com/apps/95caadc2-0c33-434b-8d7b-50d4faebc6f5?showAssistant=true&showPreview=true",
          label: "Live demo",
        },
      ],
    },
    {
      id: "solar",
      niche: "Solar",
      filter: "solar",
      title: "Residential & Commercial Solar Agent",
      subtitle: "AI Voice Agent for Solar Agent",
      tags: [],
      brief:
        "A full-service clean energy installation platform delivering end-to-end solar and battery storage solutions infrastructure to single-family homeowners. Leveraging automated digital marketing funnels, real-time lead qualification pipelines, and virtual consultation suites, the company connects high-intent property owners with localized engineering and installation crews.",
      problems: [
        "High Off-Hours Lead Decay & Missed Speed-to-Lead: Prospective buyers clicking Meta and Google ads during off-hours or weekends waited hours (or days) for a callback, drastically reducing initial contact rates and burning ad spend without conversions.",
        "Calendar Inefficiency & Sales Team Time-Waste: Human sales reps spent hours talking to unqualified leads (renters, low credit scores, insufficient electric bills, or heavily shaded roofs). High-value sales slots were clogged with low-intent prospects, leading to high no-show rates, wasted sales overhead, and lost revenue potential.",
      ],
      solutions: [
        "Instant 5-10 Second Outbound AI Call Trigger: Built an automated webhook pipeline connecting Meta/Google ad lead forms directly to GoHighLevel (GHL) and Google Sheets. The moment a lead submits a form, an AI Voice Booking Agent dials the prospect within 5 to 10 seconds to capitalize on immediate intent, regardless of time of day or business hours.",
        "Rigorous 5-Point Qualification Algorithm: The AI voice agent executes a natural-language screening script to verify 5 core criteria: single-family homeownership, credit score of 650+, monthly electric bill of $100+, single-family property type, and minimal/no roof shading. If unqualified, the agent politely disconnects and tags the CRM record. If qualified, the agent negotiates a time slot and locks the appointment directly into the owner's GoHighLevel and Google Calendars.",
        "Automated Pre-Appointment Nurture & Reminders: Deployed an automated confirmation and reminder cadence. Instantly dispatches confirmation emails/SMS detailing meeting info, prospect address, credit bracket, utility spend, and roof specs, followed by scheduled pre-call SMS reminders to ensure high show-up rates.",
      ],
      impacts: [
        "3.2x Increase in Qualified Appointment Velocity: Speed-to-lead dropped from hours to 5-10 seconds, locking in homeowner interest while ad context was fresh.",
        "100% Calendar Efficiency for Closing Reps: Zero sales hours wasted on renters or low-credit applicants; 100% of booked rep calendars consisted of vetted, high-intent buyers.",
        "Zero After-Hours Lead Leakage: Captured, qualified, and booked leads 24/7/365 without increasing call-center staff overhead.",
        "85%+ Appointment Show-Up Rate: Pre-call qualification combined with automated SMS/email reminders drastically reduced calendar ghosting.",
      ],
      receipt: [
        ["Speed to Lead", "30 Mins to 24 Hours", "5 to 10 Seconds", "Instant Engagement"],
        ["Lead Qualification", "Reps manually call all leads", "Automated AI 5-Point Screening", "100% Vetted Calendar"],
        ["After-Hours Capture", "Lost to competitors", "24/7 Instant Voice Call", "0% Lead Leakage"],
        ["Sales Rep Utilization", "~30% time on calls", "100% focused on closing", "3x Higher Productivity"],
      ],
      metrics: [
        { value: "3.2x", label: "3.2x Increase in Qualified Appointment Velocity" },
        { value: "100%", label: "100% Calendar Efficiency for Closing Reps" },
        { value: "85%+", label: "85%+ Appointment Show-Up Rate" },
      ],
      videos: [
        {
          platform: "youtube",
          url: "https://youtu.be/6yQ7kdwx-cY",
          label: "Video 1",
          description:
            "I added this feature to the tool which we built. It is very simple to use and just in 3 steps you get your property video. At first add the images clicked, then enter the prompt and click on generate video. Google Video Model veo's API was used in the backend.",
        },
      ],
      showcase: [
        {
          type: "video",
          platform: "youtube",
          url: "https://youtu.be/WnKXjzFMkNo",
          label: "Solar AI voice agent demo",
        },
        {
          type: "image",
          src: "assets/solar-leads-sheet.png",
          caption:
            "Sunrise Solar Leads sheet populated automatically after AI voice qualification and appointment booking",
        },
      ],
      images: [
        {
          src: "assets/solar-flowchart.png",
          caption: "Lead capture to AI voice qualification workflow (Meta/Google ads → CRM → 5-10 second outbound call)",
        },
        {
          src: "assets/solar-calendars.png",
          caption: "Qualified appointments booked into GHL / Google Calendar with lead details and confirmation flow",
        },
      ],
      links: [],
    },
  ],

  skills: [
    {
      title: "Core Competencies",
      type: "list",
      items: [
        "Risk Pattern Analysis & Root Cause Insights",
        "Product Configuration & Workflow Optimization",
        "End-to-End Workflow & Process Automation",
        "Cross-Functional Team Enablement & SOP Development",
        "Executive Dashboards & Performance Reporting",
        "AI Voice & Conversational Agent Engineering",
        "Lead Conversion Optimization & Speed-to-Lead Architecture",
        "Operational Leak Reduction & Bottleneck Elimination",
      ],
    },
    {
      title: "Tech Stack",
      type: "bubbles",
    },
  ],

  techBubbles: [
    { name: "Asana", icon: "https://cdn.simpleicons.org/asana/F06A6A" },
    { name: "Monday.com", icon: "assets/logos/monday.svg" },
    { name: "ChatGPT", icon: "assets/logos/openai.svg" },
    { name: "Claude", icon: "https://cdn.simpleicons.org/claude/D97757" },
    { name: "Gemini Notebook", icon: "https://cdn.simpleicons.org/googlegemini/8E75B2" },
    { name: "Jira", icon: "https://cdn.simpleicons.org/jira/0052CC" },
    { name: "Miro", icon: "https://cdn.simpleicons.org/miro/FFD02F" },
    { name: "Gemini", icon: "https://cdn.simpleicons.org/googlegemini/8E75B2" },
    { name: "Google Veo", icon: "https://cdn.simpleicons.org/google/4285F4" },
    { name: "Retell AI", label: "Retell AI", shape: "oval", color: "#111111" },
    { name: "Nano Banana", label: "Nano Banana", shape: "oval", color: "#4285F4" },
    { name: "n8n", icon: "https://cdn.simpleicons.org/n8n/EA4B71" },
    { name: "Apify", label: "Apify", color: "#97D700" },
  ],
};
