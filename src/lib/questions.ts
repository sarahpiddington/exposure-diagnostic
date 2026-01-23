export interface Question {
  id: number;
  section: 'people' | 'operational' | 'growth';
  sectionLabel: string;
  text: string;
  options: string[];
}

export const questions: Question[] = [
  // People Strain (4 questions)
  {
    id: 1,
    section: 'people',
    sectionLabel: 'People strain',
    text: 'When someone in your team is struggling, how often do you hear about it before it becomes a bigger issue?',
    options: [
      'Usually early - people feel safe to speak up',
      'Sometimes - it depends on who it is',
      'Often late - we tend to find out when things have escalated',
      "I'm not sure",
    ],
  },
  {
    id: 2,
    section: 'people',
    sectionLabel: 'People strain',
    text: 'If a key person was off for an extended period, how would the rest of the team manage?',
    options: [
      "We'd adjust - others could step in",
      'It would be difficult but manageable',
      'It would create significant pressure',
      "I'm not sure",
    ],
  },
  {
    id: 3,
    section: 'people',
    sectionLabel: 'People strain',
    text: 'How would you describe the general energy levels across your team right now?',
    options: [
      'Mostly positive and sustainable',
      'Variable - some people are stretched',
      'Generally tired or overloaded',
      "I'm not sure",
    ],
  },
  {
    id: 4,
    section: 'people',
    sectionLabel: 'People strain',
    text: "When was the last time you or a manager had a meaningful conversation with someone about how they're really doing?",
    options: [
      'Within the last few weeks',
      'Within the last few months',
      "It's been a while",
      "I'm not sure",
    ],
  },
  // Operational Clarity (4 questions)
  {
    id: 5,
    section: 'operational',
    sectionLabel: 'Operational clarity',
    text: 'If someone new joined tomorrow, how easy would it be for them to understand how things work here?',
    options: [
      'Quite easy - we have clear ways of doing things',
      "It would take time but they'd figure it out",
      'It would be confusing - a lot is informal',
      "I'm not sure",
    ],
  },
  {
    id: 6,
    section: 'operational',
    sectionLabel: 'Operational clarity',
    text: 'How would you describe your approach to documenting how work gets done?',
    options: [
      'Mostly documented and kept up to date',
      "Some things are written down, others aren't",
      'Very little is formally documented',
      "I'm not sure",
    ],
  },
  {
    id: 7,
    section: 'operational',
    sectionLabel: 'Operational clarity',
    text: 'When things go wrong, how clearly do people understand what to do?',
    options: [
      "There's a clear process people follow",
      'It depends on the situation',
      'People tend to improvise',
      "I'm not sure",
    ],
  },
  {
    id: 8,
    section: 'operational',
    sectionLabel: 'Operational clarity',
    text: 'How confident are you that your current ways of working would hold up under pressure?',
    options: [
      'Very confident',
      'Reasonably confident',
      'Not very confident',
      "I'm not sure",
    ],
  },
  // Growth and Scrutiny Readiness (3 questions)
  {
    id: 9,
    section: 'growth',
    sectionLabel: 'Growth and scrutiny readiness',
    text: 'If a potential investor, partner or client asked to see how you look after your people, what would you be able to show them?',
    options: [
      'Clear evidence of thoughtful practices',
      'Some things, but it would feel incomplete',
      "Not much - it's mostly informal",
      "I'm not sure",
    ],
  },
  {
    id: 10,
    section: 'growth',
    sectionLabel: 'Growth and scrutiny readiness',
    text: 'As your business grows, how prepared do you feel to maintain the culture and wellbeing of your team?',
    options: [
      "We've thought about this and have some foundations",
      "We're aware it matters but haven't formalised much",
      "We haven't really addressed this yet",
      "I'm not sure",
    ],
  },
  {
    id: 11,
    section: 'growth',
    sectionLabel: 'Growth and scrutiny readiness',
    text: 'If you were asked to demonstrate your approach to health and safety, how would that feel?',
    options: [
      'Comfortable - we have things in place',
      'A bit nervous - there are gaps',
      "Quite uncomfortable - it's not well organised",
      "I'm not sure",
    ],
  },
];

export const totalQuestions = questions.length;
