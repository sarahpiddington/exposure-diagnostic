export interface Question {
  id: number;
  section: 'people' | 'operational' | 'growth';
  sectionLabel: string;
  text: string;
  options: string[];
  multiSelect?: boolean;
}

export const questions: Question[] = [
  // People Strain (5 questions)
  {
    id: 1,
    section: 'people',
    sectionLabel: 'People strain',
    text: 'Who does work for your business right now?',
    multiSelect: true,
    options: [
      'Employees',
      'Contractors or freelancers',
      'Consultants',
      'Temporary or casual staff',
      'Just me',
    ],
  },
  {
    id: 2,
    section: 'people',
    sectionLabel: 'People strain',
    text: 'If one key person was unavailable for two weeks, what would be affected?',
    options: [
      'Very little',
      'Some deadlines or quality',
      'Core operations',
      'Client delivery or revenue',
      "I'm not sure",
    ],
  },
  {
    id: 3,
    section: 'people',
    sectionLabel: 'People strain',
    text: 'How do you currently know whether people are coping with their workload?',
    options: [
      'Regular check-ins or conversations',
      'We notice when performance drops',
      "People tell us if there's a problem",
      'We assume things are fine',
      "We don't really know",
    ],
  },
  {
    id: 4,
    section: 'people',
    sectionLabel: 'People strain',
    text: "When was the last time you or a manager had a conversation with someone about how they're really doing?",
    options: [
      'Within the last few weeks',
      'Within the last few months',
      "It's been a while",
      "We don't really have those conversations",
      "I'm not sure",
    ],
  },
  {
    id: 5,
    section: 'people',
    sectionLabel: 'People strain',
    text: 'What tends to happen when someone is under pressure?',
    options: [
      'Work is adjusted or redistributed',
      'They push through until it eases',
      "There's no consistent approach",
      'Issues usually surface late',
      "I'm not sure",
    ],
  },
  // Operational Clarity (5 questions)
  {
    id: 6,
    section: 'operational',
    sectionLabel: 'Operational clarity',
    text: 'How clear is it who is responsible for day-to-day safety, wellbeing or people issues?',
    options: [
      "Very clear - there's a named person responsible",
      'Mostly clear - leadership handles it',
      "Assumed - we know roughly who'd deal with it",
      "Unclear - it depends who's around",
      'No one owns it',
    ],
  },
  {
    id: 7,
    section: 'operational',
    sectionLabel: 'Operational clarity',
    text: 'If someone new joined tomorrow, how quickly would they understand the culture and how things work here?',
    options: [
      'Very easy - we have a formal induction process',
      'Quite easy - we have clear ways of doing things',
      "It would take time but they'd figure it out",
      'It would be confusing - a lot is informal',
      "I'm not sure",
    ],
  },
  {
    id: 8,
    section: 'operational',
    sectionLabel: 'Operational clarity',
    text: 'If something went wrong tomorrow (injury, complaint, burnout, conflict), how confident would you feel handling it?',
    options: [
      'Very confident',
      'Somewhat confident',
      'Not very confident',
      "I'd need external help quickly",
      "I wouldn't know where to start",
    ],
  },
  {
    id: 9,
    section: 'operational',
    sectionLabel: 'Operational clarity',
    text: 'How do new people learn what they need to know about wellbeing, health and safety?',
    options: [
      'Structured onboarding or induction',
      'Informal handover or shadowing',
      'They figure it out as they go',
      'It varies',
      "We haven't really thought about it",
    ],
  },
  {
    id: 10,
    section: 'operational',
    sectionLabel: 'Operational clarity',
    text: 'How often do you step back and review how work is actually being done day-to-day?',
    options: [
      'Regularly',
      'Occasionally',
      'Only when something goes wrong',
      'Rarely',
      'Never',
    ],
  },
  // Growth and Scrutiny Readiness (5 questions)
  {
    id: 11,
    section: 'growth',
    sectionLabel: 'Growth and scrutiny readiness',
    text: 'Are you planning to grow, hire or change how you work in the next 12–24 months?',
    options: [
      "Yes, it's already underway",
      'Yes, definitely',
      "We're thinking about it",
      "It hasn't really crossed our minds",
      'No plans to change',
    ],
  },
  {
    id: 12,
    section: 'growth',
    sectionLabel: 'Growth and scrutiny readiness',
    text: 'Have you ever been asked about wellbeing, health or safety by an external party?',
    multiSelect: true,
    options: [
      'Clients or customers',
      'Insurers or brokers',
      'Investors or funders',
      'Regulators (e.g. HSE, EHO, fire service)',
      'Landlords',
      'No, not yet',
    ],
  },
  {
    id: 13,
    section: 'growth',
    sectionLabel: 'Growth and scrutiny readiness',
    text: 'As your business grows, how prepared do you feel to maintain the culture and wellbeing of your team?',
    options: [
      "Very prepared - we have clear plans in place",
      "We've thought about this and have some foundations",
      "We're aware it matters but haven't formalised much",
      "We haven't really addressed this yet",
      "We're not planning to grow",
      "I'm not sure",
    ],
  },
  {
    id: 14,
    section: 'growth',
    sectionLabel: 'Growth and scrutiny readiness',
    text: 'If a client, investor or insurer asked you to explain how you manage people risk and wellbeing, how confident would you feel?',
    options: [
      'Comfortable and confident',
      'I could explain it roughly',
      "I'd feel a bit exposed",
      "I'd be uncomfortable",
      "I'd avoid the question",
    ],
  },
  {
    id: 15,
    section: 'growth',
    sectionLabel: 'Growth and scrutiny readiness',
    text: 'Which statement feels closest to the truth right now?',
    options: [
      'What we have works for now and for growth',
      'What we have works for now, but not for growth',
      'What we have is mostly informal',
      "We're relying on everyone just getting on with it",
      "I'm not sure what we're relying on",
    ],
  },
];

export const totalQuestions = questions.length;
