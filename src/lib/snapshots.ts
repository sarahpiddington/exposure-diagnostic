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
    subtitle: 'Your business is running, your people are managing, and things are generally working - even if much of it happens through relationships rather than systems.',
    openingReflection: "From what you've shared, your business appears to be in a place many growing organisations recognise: things are working, but much of it depends on the people and relationships you've built rather than documented structures. This isn't unusual - and it's not a failing. It simply reflects where you are right now.",
    workingWell: [
      'Your team seems to be getting on with things day to day',
      'There is likely a culture of flexibility and mutual support',
      'People probably know who to go to when something comes up',
      'Your informal approach has allowed you to stay agile and responsive',
    ],
    quietlyRisky: [
      'Knowledge may be concentrated in a few key people',
      'If someone leaves or is unwell, continuity could be disrupted',
      'Wellbeing issues might surface later than ideal',
      'External stakeholders may find it hard to see how you operate',
    ],
    mattersAsYouGrow: [
      'Consider which informal practices deserve to be made more visible',
      'Think about how new people would learn the way things work here',
      'Reflect on whether your current approach can scale with you',
      'Notice where relationships are carrying too much weight',
    ],
  },
  stretched: {
    type: 'stretched',
    title: 'Stretched and Exposed',
    subtitle: 'Your business is feeling the pressure of its own success. Growth, change or external demands have outpaced your current structures - and that is showing up in how people are coping.',
    openingReflection: "From what you've shared, it sounds like your business has reached a point where the demands on your people and your systems are starting to exceed what you've had in place. This is a common moment in a growing organisation - and recognising it is an important first step.",
    workingWell: [
      'You are likely delivering for your clients or customers',
      'Your team is committed and working hard',
      'There is probably a lot of energy and ambition in the business',
      'You have grown because you have done things well',
    ],
    quietlyRisky: [
      'People may be carrying more than is sustainable',
      'Stress and strain might be building without being addressed',
      'Key dependencies could create fragility',
      'There may be gaps in how you would respond to difficult situations',
    ],
    mattersAsYouGrow: [
      'Prioritise understanding where the pressure is greatest',
      'Consider what would happen if a key person needed time away',
      'Think about what visibility you have into how people are really doing',
      'Reflect on whether your pace is sustainable for the people involved',
    ],
  },
  'growth-ready': {
    type: 'growth-ready',
    title: 'Growth-Ready but Under-Prepared',
    subtitle: "Your business is positioned for the next stage - but your people infrastructure hasn't quite caught up. You are ready to grow, but the foundations for that growth may need attention.",
    openingReflection: "From what you've shared, it sounds like your business is approaching a moment of transition. Whether that's growth, investment, new clients or changing expectations, you're likely thinking about what comes next. The question now is whether your approach to wellbeing, culture and operational clarity is ready for that shift.",
    workingWell: [
      'You are thinking ahead about what the business needs',
      'There is awareness that people practices matter',
      'You may have some foundations already in place',
      'Your ambition is clear and your direction is set',
    ],
    quietlyRisky: [
      "External scrutiny may reveal gaps you haven't addressed",
      'What is informal now may not scale easily',
      'New people may struggle to understand how things work',
      'Investor or partner expectations may exceed what you can demonstrate',
    ],
    mattersAsYouGrow: [
      'Consider what you would want to be able to show an external audience',
      'Think about how your culture will be communicated to new joiners',
      'Reflect on whether your current approach signals maturity',
      'Notice what might hold you back from the opportunities you are pursuing',
    ],
  },
};

export function determineSnapshot(answers: Record<number, number>): SnapshotType {
  // Pattern mapping based on answer tendencies
  // Option indices: 0 = positive, 1 = neutral, 2 = concerning, 3 = unsure
  
  let positiveCount = 0;
  let concerningCount = 0;
  let unsureCount = 0;
  
  Object.values(answers).forEach((answerIndex) => {
    if (answerIndex === 0) positiveCount++;
    else if (answerIndex === 2) concerningCount++;
    else if (answerIndex === 3) unsureCount++;
  });
  
  // Stretched: More concerning answers or high uncertainty
  if (concerningCount >= 4 || (concerningCount >= 3 && unsureCount >= 3)) {
    return 'stretched';
  }
  
  // Growth-ready: Mix of positive and neutral, with some gaps
  if (positiveCount >= 4 && positiveCount < 8 && concerningCount <= 2) {
    return 'growth-ready';
  }
  
  // Informal: Mostly neutral or mixed without clear concerning patterns
  return 'informal';
}
