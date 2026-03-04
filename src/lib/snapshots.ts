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
    openingReflection: "Your business is currently relying heavily on informal ways of working. In small teams where people genuinely care about each other, this often feels completely fine — and in many ways, it is.",
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
      "Knowing where you're exposed gives you choices — and right now, you have them",
    ],
    mattersTitle: 'What will matter as you grow or change',
    emailSubject: 'Your exposure snapshot — how your business looks right now',
    emailIntro: "Here's your snapshot from the diagnostic. Take a moment with it — it's worth reading slowly.",
    workingWellNote: "These are genuine strengths. They're often what help small businesses move quickly and feel human.",
    quietlyRiskyNote: "None of this means something is wrong. But it does mean you're relying on things staying as they are.",
  },
  stretched: {
    type: 'stretched',
    title: 'Stretched and Exposed',
    subtitle: 'For teams already feeling pressure or cracks forming.',
    openingReflection: "Your business appears to be running under sustained pressure, with a lot depending on individuals coping and pushing through. This is one of the most common patterns we see — and it's almost always invisible from the inside until someone reaches their limit.",
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
    emailSubject: 'Your exposure snapshot — what your answers are telling us',
    emailIntro: "Here's your snapshot. It's honest, but I want you to read it knowing it describes something very common — and very fixable.",
    workingWellNote: "That resilience is real, and it matters. But it's expensive to maintain, and it doesn't hold indefinitely.",
    quietlyRiskyNote: "These risks don't tend to announce themselves. They build slowly, then surface all at once.",
  },
  'growth-ready': {
    type: 'growth-ready',
    title: 'Growth-Ready but Under-Prepared',
    subtitle: 'For businesses with ambition, investment or external scrutiny ahead.',
    openingReflection: "Your business is functioning well, but much of what's in place is informal and person-dependent. That's completely normal at this stage of growth. The question is whether it will hold as expectations increase.",
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
    emailSubject: "Your exposure snapshot — where you are, and what's coming",
    emailIntro: "Here's your snapshot. It reflects where most ambitious businesses are at this stage — and it's worth paying attention to.",
    workingWellNote: "This is what makes businesses like yours agile and fast-moving. The challenge is that it doesn't scale on its own.",
    quietlyRiskyNote: "These aren't failings. They're signals that the business has outgrown its current setup.",
  },
};

export function determineSnapshot(answers: Record<number, number | number[]>): SnapshotType {
  // Helper to get single answer value (for non-multiselect questions)
  const getAnswer = (qId: number): number => {
    const ans = answers[qId];
    return typeof ans === 'number' ? ans : -1;
  };

  // STRETCHED signals - pressure and fragility now
  let stretchedSignals = 0;

  // Q2: Key person absence affects core operations (2) or client delivery/revenue (3)
  if (getAnswer(2) === 2 || getAnswer(2) === 3) stretchedSignals++;

  // Q3: Assume things are fine (3) or don't know (4)
  if (getAnswer(3) >= 3) stretchedSignals++;

  // Q5: Push through (1) or issues surface late (3)
  if (getAnswer(5) === 1 || getAnswer(5) === 3) stretchedSignals++;

  // Q6: Unclear who's responsible (3) or no one owns it (4)
  if (getAnswer(6) >= 3) stretchedSignals++;

  // Q8: Not very confident (2), need external help (3), or wouldn't know where to start (4)
  if (getAnswer(8) >= 2) stretchedSignals++;

  // GROWTH signals - growth or scrutiny + readiness gap
  let growthSignals = 0;

  // Q11: Already underway (0), Yes definitely (1), or Possibly (2)
  if (getAnswer(11) >= 0 && getAnswer(11) <= 2) growthSignals++;

  // Q12: External scrutiny present (any option except "No, not yet" which is index 5)
  const q12 = answers[12];
  if (Array.isArray(q12) && q12.length > 0 && !q12.includes(5)) growthSignals++;

  // Q13: Aware but not formalised (2) or not addressed (3)
  if (getAnswer(13) === 2 || getAnswer(13) === 3) growthSignals++;

  // Q14: Feel exposed (2), uncomfortable (3), or avoid question (4)
  if (getAnswer(14) >= 2) growthSignals++;

  // Q15: Works for now but not growth (1) or mostly informal (2)
  if (getAnswer(15) === 1 || getAnswer(15) === 2) growthSignals++;

  // VISIBILITY signals - low visibility, uncertainty, lack of check-ins
  let visibilitySignals = 0;

  // Q3: People tell us (2), assume fine (3), or don't know (4)
  if (getAnswer(3) >= 2) visibilitySignals++;

  // Q4: It's been a while (2) or we don't have those conversations (3)
  if (getAnswer(4) === 2 || getAnswer(4) === 3) visibilitySignals++;

  // Q10: Only when something goes wrong (2), Rarely (3), or Never (4)
  if (getAnswer(10) >= 2) visibilitySignals++;

  // Count "I'm not sure" answers (capped at 3)
  let unsureCount = 0;
  const unsureIndexes: Record<number, number> = { 2: 4, 4: 4, 5: 4, 7: 4, 13: 5, 15: 4 };
  Object.entries(unsureIndexes).forEach(([qId, unsureIdx]) => {
    if (getAnswer(Number(qId)) === unsureIdx) unsureCount++;
  });
  visibilitySignals += Math.min(unsureCount, 3);

  // DECISION LOGIC (priority rules)

  // Rule 1: If StretchedSignals >= 4, return Stretched
  if (stretchedSignals >= 4) {
    return 'stretched';
  }

  // Rule 2: If StretchedSignals >= 3 AND VisibilitySignals >= 2, return Stretched
  if (stretchedSignals >= 3 && visibilitySignals >= 2) {
    return 'stretched';
  }

  // Rule 3: If GrowthSignals >= 3, return Growth-Ready
  if (growthSignals >= 3) {
    return 'growth-ready';
  }

  // Rule 4: Default to Informal
  return 'informal';
}
