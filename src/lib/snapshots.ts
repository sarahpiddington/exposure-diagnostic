export type SnapshotType = 'informal' | 'stretched' | 'growth-ready';

export interface Snapshot {
  type: SnapshotType;
  title: string;
  subtitle: string;
  openingReflection: string;
  workingWell: string[];
  quietlyRisky: string[];
  mattersAsYouGrow: string[];
  mattersTitle: string;
  // Email-specific fields
  emailSubject: string;
  emailIntro: string;
  workingWellNote: string;
  quietlyRiskyNote: string;
}

export const snapshots: Record<SnapshotType, Snapshot> = {
  informal: {
    type: 'informal',
    title: 'Informal but Holding',
    subtitle: 'For small teams who are coping now, but relying on goodwill.',
    openingReflection: "Based on what you've shared, your business is currently relying heavily on informal ways of working. In small teams where people genuinely care about each other, this often feels completely fine — and in many ways, it is.",
    workingWell: [
      'People are committed and want to do the right thing',
      'Issues get handled through conversation rather than process',
      "There's real flexibility in how work gets done",
    ],
    quietlyRisky: [
      'People may be under pressure without saying so',
      'One or two people could be carrying more than others realise',
      'When a wellbeing or safety issue does arise, it may not be clear who owns it',
    ],
    mattersAsYouGrow: [
      'If you hire, grow or lose someone key, the gaps in clarity tend to show up first',
      'Simple structure now is almost always easier than fixing things under pressure later',
      "Knowing where you're vulnerable gives you choices — and right now, you have them",
    ],
    mattersTitle: 'What will matter as you grow or change',
    emailSubject: 'Your vulnerability snapshot — how your business looks right now',
    emailIntro: "Here's your snapshot from the diagnostic. Take a moment with it — it's worth reading slowly.",
    workingWellNote: "These are genuine strengths. They're often what help small businesses move quickly and feel human.",
    quietlyRiskyNote: "None of this means something is wrong. But it does mean you're relying on things staying as they are.",
  },
  stretched: {
    type: 'stretched',
    title: 'Stretched and Vulnerable',
    subtitle: 'For teams already feeling pressure or cracks forming.',
    openingReflection: "Based on what you've shared, your business appears to be running under sustained pressure, with a lot depending on individuals coping and pushing through. This is one of the most common patterns we see — and it's almost always invisible from the inside until someone reaches their limit.",
    workingWell: [
      'People are committed and doing their best',
      'Work keeps moving even when things feel stretched',
      'Problems get dealt with as they come up',
    ],
    quietlyRisky: [
      'Stress and overload can go unnoticed until someone is suddenly off',
      'People and safety issues may be getting handled inconsistently',
      'Knowledge and responsibility are likely sitting with too few people',
    ],
    mattersAsYouGrow: [
      'Without clearer ways of managing workload and wellbeing, pressure tends to increase rather than ease',
      'Acting now gives you far more options than waiting until something forces the issue',
      'Small, practical steps tend to make the biggest difference at this stage',
    ],
    mattersTitle: 'What will matter as you grow or change',
    emailSubject: 'Your vulnerability snapshot — what your answers are telling us',
    emailIntro: "Here's your snapshot. It's honest, but I want you to read it knowing it describes something very common — and very fixable.",
    workingWellNote: "That resilience is real, and it matters. But it's expensive to maintain, and it doesn't hold indefinitely.",
    quietlyRiskyNote: "These risks don't tend to announce themselves. They build slowly, then surface all at once.",
  },
  'growth-ready': {
    type: 'growth-ready',
    title: 'Growth-Ready but Under-Prepared',
    subtitle: 'For businesses with ambition, investment or external scrutiny ahead.',
    openingReflection: "Based on what you've shared, your business is functioning well, but much of what's in place is informal and person-dependent. That's completely normal at this stage of growth. The question is whether it will hold as expectations increase.",
    workingWell: [
      'People step up when it matters',
      'Work gets done without heavy process or overhead',
      'Trust plays a central role in how things operate',
    ],
    quietlyRisky: [
      'It can be difficult to explain clearly how people risk and wellbeing are managed, especially under scrutiny',
      'Issues and absences may be handled inconsistently as the team grows',
      'Leaders end up personally holding things together that should sit in the structure',
    ],
    mattersAsYouGrow: [
      'Clients, insurers and investors will expect clarity — not perfection, but clarity',
      'Proportionate foundations now protect both your people and your credibility',
      'Getting ahead of this is far easier than retrofitting it during a growth phase or due diligence process',
    ],
    mattersTitle: 'What will matter as you grow or come under scrutiny',
    emailSubject: "Your vulnerability snapshot — where you are, and what's coming",
    emailIntro: "Here's your snapshot. It reflects where most ambitious businesses are at this stage — and it's worth paying attention to.",
    workingWellNote: "This is what makes businesses like yours agile and fast-moving. The challenge is that it doesn't scale on its own.",
    quietlyRiskyNote: "These aren't failings. They're signals that the business has outgrown its current setup.",
  },
};

export function determineSnapshot(answers: Record<number, number | number[]>): SnapshotType {
  const getAnswer = (qId: number): number => {
    const ans = answers[qId];
    return typeof ans === 'number' ? ans : -1;
  };

  // STRETCHED signals — pressure and fragility happening now
  let stretchedSignals = 0;
  if (getAnswer(2) >= 2) stretchedSignals++;           // Key person absence hits core ops or revenue
  if (getAnswer(3) >= 3) stretchedSignals++;           // Assume fine or don't know
  if (getAnswer(5) === 1 || getAnswer(5) === 3) stretchedSignals++;  // Push through or surface late
  if (getAnswer(6) >= 2) stretchedSignals++;           // Ownership unclear or assumed
  if (getAnswer(8) >= 2) stretchedSignals++;           // Not confident handling issues

  // INFORMAL signals — coping but no real structure
  let informalSignals = 0;
  if (getAnswer(3) === 2) informalSignals++;           // People tell us if there's a problem
  if (getAnswer(4) === 1 || getAnswer(4) === 2) informalSignals++;  // It's been a while / no real conversations
  if (getAnswer(6) === 2) informalSignals++;           // Ownership assumed
  if (getAnswer(9) === 1 || getAnswer(9) === 2) informalSignals++;  // Informal handover or figure it out
  if (getAnswer(10) === 1 || getAnswer(10) === 2) informalSignals++; // Occasionally or only when something goes wrong
  if (getAnswer(15) === 2) informalSignals++;          // What we have is mostly informal

  // GROWTH signals — ambition or scrutiny ahead, foundations missing
  let growthSignals = 0;
  if (getAnswer(11) === 0 || getAnswer(11) === 1) growthSignals++;  // Already underway or yes definitely
  const q12 = answers[12];
  if (Array.isArray(q12) && q12.length > 0 && !q12.includes(5)) growthSignals++; // External scrutiny already present
  if (getAnswer(13) === 0 || getAnswer(13) === 1) growthSignals++;  // Has plans or some foundations for growth
  if (getAnswer(14) === 1 || getAnswer(14) === 2) growthSignals++;  // Could explain roughly or feels vulnerable
  if (getAnswer(15) === 1) growthSignals++;            // Works now but not for growth

  // FORMAL signals — evidence of real structure (prevents misclassification)
  let formalSignals = 0;
  if (getAnswer(3) === 0) formalSignals++;             // Regular check-ins
  if (getAnswer(4) === 0) formalSignals++;             // Recent wellbeing conversations
  if (getAnswer(6) === 0 || getAnswer(6) === 1) formalSignals++;    // Clear ownership
  if (getAnswer(8) === 0 || getAnswer(8) === 1) formalSignals++;    // Confident handling issues
  if (getAnswer(9) === 0) formalSignals++;             // Structured onboarding
  if (getAnswer(10) === 0) formalSignals++;            // Reviews regularly

  // DECISION LOGIC
  // Stretched wins if enough pressure signals and not highly formal
  if (stretchedSignals >= 3 && formalSignals <= 2) return 'stretched';
  if (stretchedSignals >= 4) return 'stretched';

  // Growth-ready if clear growth intent + awareness gap, and not stretched
  if (growthSignals >= 3 && stretchedSignals <= 2) return 'growth-ready';
  if (growthSignals >= 2 && formalSignals >= 3) return 'growth-ready'; // Structured but planning growth

  // Informal if genuinely informal (and not formal enough to be growth-ready)
  if (informalSignals >= 3 && formalSignals <= 2) return 'informal';

  // If mostly formal signals with some growth intent → growth-ready
  if (formalSignals >= 4 && growthSignals >= 1) return 'growth-ready';

  // Default
  return 'informal';
}
