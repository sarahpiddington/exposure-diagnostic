export type SnapshotType = 'informal' | 'stretched' | 'growth-ready';

export interface Snapshot {
  type: SnapshotType;
  title: string;
  subtitle: string;
  openingReflection: string;
  workingWell: string[];
  quietlyRisky: string[];
  mattersAsYouGrow: string[];
}

export const snapshots: Record<SnapshotType, Snapshot> = {
  informal: {
    type: 'informal',
    title: 'Informal but Holding',
    subtitle: 'For small teams who are coping now, but relying on goodwill.',
    openingReflection: "Based on what you've shared, your business is currently relying heavily on informal ways of working. This often feels fine day to day, especially in small teams where people care about each other and step in when needed. This isn't a judgement - it's simply where many businesses find themselves at this stage.",
    workingWell: [
      'People are committed and generally want to do the right thing',
      'Issues are handled through conversations rather than process',
      "There's flexibility in how work gets done",
    ],
    quietlyRisky: [
      "People are under pressure but don't say so",
      "One or two people are carrying more than others realise",
      "There's no clear ownership when wellbeing or safety issues arise",
    ],
    mattersAsYouGrow: [
      'If you grow, hire, or lose someone key, the lack of clarity around people risk and wellbeing is likely to show up first',
      'Putting some simple structure in place now is usually much easier than trying to fix things later',
    ],
  },
  stretched: {
    type: 'stretched',
    title: 'Stretched and Exposed',
    subtitle: 'For teams already feeling pressure or cracks forming.',
    openingReflection: "Based on what you've shared, your business appears to be operating under sustained pressure, with a lot depending on individuals coping and pushing through. This is very common and often invisible until someone reaches their limit. This isn't about blame - it's about what's sustainable.",
    workingWell: [
      'People are committed and doing their best',
      'Work continues even when things feel stretched',
      'Problems are dealt with as they arise',
    ],
    quietlyRisky: [
      'Stress and overload going unnoticed until someone is off',
      'Inconsistent handling of people or safety issues',
      'Important knowledge or responsibility sitting with too few people',
    ],
    mattersAsYouGrow: [
      'Without clearer ways of managing workload, wellbeing and responsibility, pressure tends to increase rather than ease',
      'Acting early gives you more options and far less disruption than waiting until something forces the issue',
    ],
  },
  'growth-ready': {
    type: 'growth-ready',
    title: 'Growth-Ready but Under-Prepared',
    subtitle: 'For businesses with ambition, investment or external scrutiny ahead.',
    openingReflection: "Based on what you've shared, your business is functioning well enough now, but much of what's in place is informal and person-dependent. That's common at this stage, but it can create exposure as expectations increase. This isn't about perfection - it's about being ready for what's next.",
    workingWell: [
      'People step up when needed',
      'Work gets done without heavy process',
      'Trust plays a big role in how things operate',
    ],
    quietlyRisky: [
      'Difficulty explaining how people risk and wellbeing are managed',
      'Inconsistent responses to issues or absence',
      'Pressure on leaders to personally hold everything together',
    ],
    mattersAsYouGrow: [
      'Clients, insurers, investors and partners will expect clarity, not perfection',
      'Putting proportionate, practical foundations in place now helps protect both your people and the business as it evolves',
    ],
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
