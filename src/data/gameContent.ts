import {
  DomainMeta,
  AttentionQuestion,
  LearningQuestion,
  PerceptionQuestion,
  DecisionScenario,
  DecisionProfile,
} from '../types/cognition';

export const DOMAINS: DomainMeta[] = [
  {
    id: 'attention',
    number: '01',
    name: 'ATTENTION',
    subtitle: 'Defend Your Focus.',
    description: 'Can you identify what matters when everything demands your attention?',
    gameTitle: 'The Distraction Protocol',
    gameType: 'Simulated Distraction Filter',
    theme: {
      primary: 'from-cyan-500 to-fuchsia-500',
      accent: 'text-cyan-400',
      bgStyle: 'bg-black/90 border-cyan-500/30',
      borderStyle: 'hover:border-cyan-400/80 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]',
    },
  },
  {
    id: 'memory',
    number: '02',
    name: 'MEMORY',
    subtitle: 'Hold What Matters.',
    description: 'Observe, remember, and reconstruct information after it disappears.',
    gameTitle: 'The Sequence Recall',
    gameType: 'Spatial Working Memory Grid',
    theme: {
      primary: 'from-indigo-400 to-purple-400',
      accent: 'text-indigo-300',
      bgStyle: 'bg-[#0d121f]/90 border-indigo-500/30',
      borderStyle: 'hover:border-indigo-400/80 hover:shadow-[0_0_30px_rgba(99,102,241,0.25)]',
    },
  },
  {
    id: 'learning',
    number: '03',
    name: 'LEARNING',
    subtitle: 'Adapt to the Rules.',
    description: 'Can you recognize a pattern, master a rule, and switch when the rules change?',
    gameTitle: 'The Rule Reversal',
    gameType: 'Cognitive Task Switching',
    theme: {
      primary: 'from-emerald-400 via-amber-400 to-rose-400',
      accent: 'text-amber-400',
      bgStyle: 'bg-[#121620]/90 border-amber-500/30',
      borderStyle: 'hover:border-amber-400/80 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]',
    },
  },
  {
    id: 'perception',
    number: '04',
    name: 'PERCEPTION',
    subtitle: 'Question What You See.',
    description: 'Challenge your assumptions and discover how a small detail can change your interpretation.',
    gameTitle: 'The Reality Glitch',
    gameType: 'Contextual Ambiguity Scenarios',
    theme: {
      primary: 'from-purple-300 to-slate-100',
      accent: 'text-purple-300',
      bgStyle: 'bg-[#101018]/90 border-purple-400/30',
      borderStyle: 'hover:border-purple-300/80 hover:shadow-[0_0_30px_rgba(192,132,252,0.25)]',
    },
  },
  {
    id: 'decision',
    number: '05',
    name: 'DECISION-MAKING',
    subtitle: 'Choose Under Uncertainty.',
    description: 'Explore the values, trade-offs, and priorities behind difficult choices.',
    gameTitle: 'The Moral Compass',
    gameType: 'Reflective Trade-Off Analysis',
    theme: {
      primary: 'from-amber-200 via-amber-400 to-yellow-600',
      accent: 'text-amber-300',
      bgStyle: 'bg-[#0b0c10]/95 border-amber-500/30',
      borderStyle: 'hover:border-amber-300/80 hover:shadow-[0_0_30px_rgba(217,119,6,0.3)]',
    },
  },
];

/* =========================================================================
   ATTENTION GAME CONTENT (THE DISTRACTION PROTOCOL)
   ========================================================================= */

export const ATTENTION_NOTIFICATIONS = [
  'Tomorrow can we go out?',
  'Someone sent you a meme.',
  '67',
  'Tung tung tung sahur!',
  'BRO REPLY 😭',
  'Your streak is about to disappear!',
  'Wait, did you see that?',
  'New message: You will NOT believe this.',
  'POV: you opened your phone for one second.',
  'BREAKING: absolutely nothing important happened.',
  'One more reel?',
  'Your group chat is exploding.',
  '⚡ Battery at 14%',
  'Delivery arriving in 4 minutes',
  'Trending: Why everyone is talking about this',
  'Double tap to see full post',
];

export const ATTENTION_QUESTIONS_POOL: AttentionQuestion[] = [
  {
    id: 'att-1',
    topic: 'Sleep & Memory Consolidation',
    originalStatement:
      'During slow-wave sleep, the hippocampus replays recent neural patterns to transfer memories to the neocortex.',
    options: [
      'During slow-wave sleep, the hippocampus replays recent neural patterns to transfer memories to the neocortex.',
      'During REM sleep, the prefrontal cortex erases short-term synapses to prevent memory overload.',
      'During slow-wave sleep, the amygdala stores sensory impressions while the hippocampus remains inactive.',
    ],
    correctIndex: 0,
    explanation:
      'Neuroimaging shows that deep slow-wave sleep coordinates hippocampal sharp-wave ripples with cortical sleep spindles, consolidating episodic memory into long-term cortical networks.',
  },
  {
    id: 'att-2',
    topic: 'Attentional Bottleneck',
    originalStatement:
      'The attentional blink demonstrates that human brains temporarily miss a second visual target presented within 200 to 500 milliseconds of the first.',
    options: [
      'The attentional blink shows that visual processing resets every 80 milliseconds across all sensory modalities.',
      'The attentional blink demonstrates that human brains temporarily miss a second visual target presented within 200 to 500 milliseconds of the first.',
      'The attentional blink proves that peripheral vision shuts down completely during high-cognitive-load audio processing.',
    ],
    correctIndex: 1,
    explanation:
      'The attentional blink is a classic psychological phenomenon showing our cognitive bottleneck: working memory encoding of Target 1 temporarily blocks conscious awareness of Target 2.',
  },
  {
    id: 'att-3',
    topic: 'Synaptic Plasticity',
    originalStatement:
      'Long-term potentiation strengthens synaptic connections through persistent high-frequency signaling and NMDA receptor activation.',
    options: [
      'Long-term potentiation weakens older synapses through enzymatic degradation of acetylcholine receptors.',
      'Long-term potentiation synchronizes neural firings by releasing inhibitory dopamine bursts across dendrites.',
      'Long-term potentiation strengthens synaptic connections through persistent high-frequency signaling and NMDA receptor activation.',
    ],
    correctIndex: 2,
    explanation:
      'Long-Term Potentiation (LTP) is the cellular basis of learning, characterized by increased AMPA receptor insertion triggered by calcium influx via NMDA receptors.',
  },
  {
    id: 'att-4',
    topic: 'Working Memory Limits',
    originalStatement:
      'Contemporary cognitive models show visual working memory can actively hold only 3 to 4 distinct items simultaneously.',
    options: [
      'Contemporary cognitive models show visual working memory can actively hold only 3 to 4 distinct items simultaneously.',
      'Contemporary cognitive models prove working memory retains exactly 7 continuous audiovisual channels indefinitely.',
      'Contemporary cognitive models indicate sensory memory holds up to 12 items, but only when auditory rhythm is absent.',
    ],
    correctIndex: 0,
    explanation:
      'While George Miller historically estimated 7 ± 2 for verbal chunks, modern rigorous research by Cowan and Luck & Vogel proves pure visual working memory capacity averages 3 to 4 items.',
  },
  {
    id: 'att-5',
    topic: 'Neurogenesis in the Brain',
    originalStatement:
      'Adult neurogenesis occurs primarily in the subgranular zone of the dentate gyrus and the subventricular zone.',
    options: [
      'Adult neurogenesis occurs exclusively across the motor strip and occipital lobes during strenuous physical exercise.',
      'Adult neurogenesis occurs primarily in the subgranular zone of the dentate gyrus and the subventricular zone.',
      'Adult neurogenesis takes place inside the corpus callosum to replace myelin sheaths damaged by stress hormones.',
    ],
    correctIndex: 1,
    explanation:
      'Even in adulthood, stem cells in the dentate gyrus generate new functional granular neurons that integrate into spatial memory and pattern separation circuits.',
  },
  {
    id: 'att-6',
    topic: 'Dopamine & Prediction Error',
    originalStatement:
      'Phasic dopamine bursts signal reward prediction errors rather than the raw magnitude of the reward itself.',
    options: [
      'Phasic dopamine bursts release continuous steady currents that match the total caloric value of food intake.',
      'Phasic dopamine bursts trigger muscular reflex actions prior to any cortical signal reaching the basal ganglia.',
      'Phasic dopamine bursts signal reward prediction errors rather than the raw magnitude of the reward itself.',
    ],
    correctIndex: 2,
    explanation:
      'Wolfram Schultz discovered that midbrain dopamine neurons fire when outcomes exceed expectations (positive prediction error) and depress when expected rewards fail to arrive.',
  },
  {
    id: 'att-7',
    topic: 'The Default Mode Network',
    originalStatement:
      'The Default Mode Network increases its metabolic activity during introspection, self-reflection, and mental simulation of future scenarios.',
    options: [
      'The Default Mode Network increases its metabolic activity during introspection, self-reflection, and mental simulation of future scenarios.',
      'The Default Mode Network activates exclusively during high-speed manual motor tasks requiring sharp physical precision.',
      'The Default Mode Network shuts down during dream states to prevent emotional memory contamination.',
    ],
    correctIndex: 0,
    explanation:
      'The Default Mode Network (including medial prefrontal and posterior cingulate cortex) becomes active during mind-wandering, episodic future thinking, and social cognition.',
  },
  {
    id: 'att-8',
    topic: 'Inattentional Blindness',
    originalStatement:
      'Inattentional blindness occurs when observers fail to perceive an unexpected visible stimulus because their attention is focused on another task.',
    options: [
      'Inattentional blindness is a physical retinal defect caused by overexposure to high-intensity blue light frequencies.',
      'Inattentional blindness occurs when observers fail to perceive an unexpected visible stimulus because their attention is focused on another task.',
      'Inattentional blindness happens when auditory information completely cancels ocular saccades during rapid reading.',
    ],
    correctIndex: 1,
    explanation:
      'Demonstrated famously by Simons and Chabris with the invisible gorilla, attention acts as a conscious gatekeeper; without focused attention, obvious stimuli remain unperceived.',
  },
  {
    id: 'att-9',
    topic: 'Circadian Regulation',
    originalStatement:
      'The suprachiasmatic nucleus uses intrinsically photosensitive retinal ganglion cells to synchronize the master circadian clock to sunlight.',
    options: [
      'The suprachiasmatic nucleus relies exclusively on body temperature drops to set morning melatonin release.',
      'The pineal gland regulates blood sugar levels through direct hormone feedback to the lateral hypothalamus.',
      'The suprachiasmatic nucleus uses intrinsically photosensitive retinal ganglion cells to synchronize the master circadian clock to sunlight.',
    ],
    correctIndex: 2,
    explanation:
      'Melanopsin-containing retinal ganglion cells directly project via the retinohypothalamic tract to the suprachiasmatic nucleus, entraining our 24-hour biological cycle.',
  },
  {
    id: 'att-10',
    topic: 'Perceptual Binding',
    originalStatement:
      'Gamma-band oscillations around 40 Hertz are hypothesized to bind separate sensory features like color and shape into a unified conscious percept.',
    options: [
      'Gamma-band oscillations around 40 Hertz are hypothesized to bind separate sensory features like color and shape into a unified conscious percept.',
      'Delta waves at 2 Hertz cause sensory signals from the optic nerve to swap coordinates with auditory signals.',
      'Theta waves synchronize muscle contractions in the neck to stabilize visual fixations during saccadic eye movements.',
    ],
    correctIndex: 0,
    explanation:
      'Temporal binding theory proposes that synchronized gamma oscillations coordinate neural ensembles across distant cortical regions, creating coherent perceptual experiences.',
  },
];

/* =========================================================================
   LEARNING GAME CONTENT (THE RULE REVERSAL)
   ========================================================================= */

export const LEARNING_QUESTIONS: LearningQuestion[] = [
  // Phase 1 (Q1-Q5): Text-Color Rule (Ignore the word, pick the color of the text!)
  { id: 1, word: 'GREEN', color: 'RED', rulePhase: 1 },
  { id: 2, word: 'YELLOW', color: 'BLUE', rulePhase: 1 },
  { id: 3, word: 'RED', color: 'GREEN', rulePhase: 1 },
  { id: 4, word: 'BLUE', color: 'YELLOW', rulePhase: 1 },
  { id: 5, word: 'GREEN', color: 'BLUE', rulePhase: 1 },

  // Phase 2 (Q6-Q10): Word-Meaning Rule (Ignore the font color, pick the color named by the word!)
  { id: 6, word: 'RED', color: 'GREEN', rulePhase: 2 },
  { id: 7, word: 'BLUE', color: 'RED', rulePhase: 2 },
  { id: 8, word: 'YELLOW', color: 'GREEN', rulePhase: 2 },
  { id: 9, word: 'GREEN', color: 'YELLOW', rulePhase: 2 },
  { id: 10, word: 'BLUE', color: 'YELLOW', rulePhase: 2 },
];

/* =========================================================================
   PERCEPTION GAME CONTENT (THE REALITY GLITCH)
   ========================================================================= */

export const PERCEPTION_QUESTIONS: PerceptionQuestion[] = [
  {
    id: 1,
    title: 'The Elevator That Was Never Pressed',
    scenario:
      'At 11:47 p.m., Mara enters an empty apartment building. The lobby has two elevators. She presses the button for floor 12 and watches the display: 11, 10, 9, 8… The left elevator stops on floor 8, its doors open, and nobody exits. Mara’s elevator then arrives from floor 6.\n\nThe next morning, security footage shows only one elevator car in the building all night. Yet Mara insists she saw two elevators, and the floor display clearly changed.',
    question: 'What actually happened?',
    options: [
      { label: 'A', text: 'There were two elevators, but one was hidden from the camera.' },
      { label: 'B', text: 'Mara saw a mirror reflection of the same elevator.' },
      { label: 'C', text: 'The building has a time loop.' },
      { label: 'D', text: 'Someone else exited on floor 8 before the camera recorded it.' },
    ],
    correctLabel: 'B',
    keyClue: 'Lobby mirror reflection duplicating movement without a second passenger',
    explanation:
      'A mirror beside the elevator could create the appearance of a second elevator and a second display. A reflection would move in synchrony with the real elevator, and no person would need to exit the apparent second car. This explanation is plausible if the lobby contains a suitably positioned mirror. The scenario should establish that mirror or reflective surface to make B uniquely supported; otherwise, the evidence alone does not prove it.',
    biasChallenged:
      'Naive Realism: assuming our perceptual senses directly report raw objective reality without taking into account optical reflections or sensory framing.',
  },
  {
    id: 2,
    title: 'The Witness Who Saw the Murderer',
    scenario:
      'A man is found dead in a locked study. The window is shut from inside, the door is bolted, and the only entrance is a narrow ventilation shaft too small for an adult.\n\nA neighbor tells police: "I saw the killer leave through the front door at 9:15 p.m. He was wearing a red coat and carrying a black umbrella."\n\nPolice later learn it rained heavily from 8:00 p.m. until midnight. The neighbor also says, "I watched him from my balcony across the street."',
    question: 'Why is the neighbor lying?',
    options: [
      { label: 'A', text: 'The killer could not have carried an umbrella indoors.' },
      { label: 'B', text: 'The neighbor could not have seen the front door from across the street.' },
      { label: 'C', text: 'The neighbor described a red coat, but the victim wore red.' },
      { label: 'D', text: 'The neighbor could not have seen anything because the study was locked.' },
    ],
    correctLabel: 'B',
    keyClue: "The physical geometry of the witness's viewpoint vs. the entrance",
    explanation:
      "The intended clue concerns the witness's claimed viewpoint. However, simply being across the street does not make it impossible to see a front door. The scene must establish that the balcony's angle or an intervening obstruction blocks the entrance from view. If that condition is established, the witness could not truthfully have observed the departure from the stated position. Without it, the scenario is underdetermined.",
    biasChallenged:
      'Uncritical Credulity: accepting sensory claims without testing spatial angles, geometric sightlines, and physical vantage constraints.',
  },
  {
    id: 3,
    title: 'The Photograph with No Photographer',
    scenario:
      'A hiker finds an old camera on a mountain trail. Its final photo shows a rocky ledge, a blue backpack, and a pair of hiking boots standing upright.\n\nThe timestamp says 3:12 p.m. The hiker checks the sun: it is directly overhead, casting almost no shadows. But in the photo, every rock casts a long shadow toward the camera.\n\nThere are no footprints around the camera except the hiker’s own. The camera has no timer, remote, or self-timer function.',
    question: 'Which detail proves the photo was staged?',
    options: [
      { label: 'A', text: 'The boots were upright.' },
      { label: 'B', text: 'The shadows point the wrong way for noon.' },
      { label: 'C', text: 'The camera had no timer.' },
      { label: 'D', text: 'The backpack was blue.' },
    ],
    correctLabel: 'B',
    keyClue: 'Inconsistency between described overhead sunlight and long horizontal shadows',
    explanation:
      "The intended clue is the mismatch between the described lighting conditions and the long shadows in the photograph. If the sun really were almost directly overhead at the moment of capture, long horizontal shadows would be unexpected. However, a 3:12 p.m. timestamp alone does not establish the sun's position, and the camera's location, terrain, season, and latitude also matter. Treat the stated overhead sun as the key premise. To make the answer conclusive, clarify that the photo was allegedly taken at that exact moment under those observed conditions.",
    biasChallenged:
      'Surface Coherence: accepting photographic metadata at face value while overlooking irreconcilable physical environmental laws (lighting & shadows).',
  },
  {
    id: 4,
    title: 'The Train That Arrived Before It Left',
    scenario:
      'A commuter boards the 7:30 a.m. express train. The announcement says the journey takes exactly 40 minutes. At 8:10 a.m., the train arrives at the destination station.\n\nThe passenger checks her phone: it still reads 7:30 a.m. Other passengers’ phones also read 7:30 a.m. The station clock reads 8:10 a.m.\n\nThe passenger did not cross time zones, her phone had full signal, and the train did not stop unexpectedly.',
    question: 'What is the most logical explanation?',
    options: [
      { label: 'A', text: 'The train traveled back in time.' },
      { label: 'B', text: 'The passengers’ phones synchronized to the train’s internal clock.' },
      { label: 'C', text: 'The station clock is 40 minutes ahead.' },
      { label: 'D', text: 'The passengers’ phones were set to a different time zone.' },
    ],
    correctLabel: 'C',
    keyClue: 'Station display misalignment vs independent synchronized passenger mobile devices',
    explanation:
      "If the journey lasted 40 minutes and the passengers' phones still show 7:30 a.m., the clocks disagree. A station clock that is 40 minutes fast is one possible explanation. However, the scenario does not conclusively establish that the station clock is wrong rather than the phones being frozen or incorrectly set. For a unique answer, add that the phones continued advancing normally and had been verified against an independent accurate time source before departure.",
    biasChallenged:
      'Authority Trust Bias: assuming an institutional infrastructure clock is infallible when faced with synchronized contradictory personal evidence.',
  },
  {
    id: 5,
    title: 'The Room with One Extra Person',
    scenario:
      'During a blackout, six friends sit around a circular table in a windowless room. There are six chairs, six plates, and six glasses. When the lights return, everyone counts seven people at the table.\n\nEach person insists they arrived with one friend. Each person can name the person sitting to their left and right. No one entered or left during the blackout, and the room has only one door.',
    question: 'Who is the seventh person?',
    options: [
      { label: 'A', text: 'A stranger hiding under the table.' },
      { label: 'B', text: 'One person was counted twice.' },
      { label: 'C', text: 'There were always seven chairs.' },
      { label: 'D', text: 'The seventh person is a reflection.' },
    ],
    correctLabel: 'B',
    keyClue: 'Circular boundary counting error where the starting individual is re-tallied',
    explanation:
      'In a circular arrangement, a person can accidentally be counted twice if someone counts around the table and mistakenly treats the starting person as a new person at the end. The six chairs, plates, and glasses support the intended interpretation that there are six actual participants. However, the wording does not prove a counting error occurred; it presents a plausible explanation. The lesson is to examine how a count was performed before accepting a surprising result.',
    biasChallenged:
      'Process Neglect: accepting an unexpected conclusion without auditing the procedural methodology used to gather the count.',
  },
];

/* =========================================================================
   DECISION-MAKING GAME CONTENT (THE MORAL COMPASS)
   ========================================================================= */

export const DECISION_SCENARIOS: DecisionScenario[] = [
  {
    id: 1,
    title: 'The Secret That Saves One and Damages Another',
    scenario:
      'You discover proof that a close friend was falsely accused of something serious and is about to lose a major opportunity because of it. But revealing the proof will expose another innocent person’s private mistake and permanently damage their reputation.',
    tradeoffNotice:
      'Trade-off: Direct loyalty to an unjustly accused friend vs. Non-maleficence toward an innocent third party.',
    optionA: {
      text: 'Reveal the proof and save your friend, knowing an innocent person will be publicly hurt.',
      interpretation:
        'You prioritize direct responsibility and protecting those closest to you. You accept collateral damage when you believe justice demands action.',
      tags: ['Loyalty', 'Direct Action', 'Accountability', 'Remedy'],
    },
    optionB: {
      text: 'Stay silent and protect the innocent person’s privacy, knowing your friend will suffer for something they did not do.',
      interpretation:
        'You value privacy, restraint, and the principle that one wrong should not be corrected by creating another. You carry the weight of inaction heavily.',
      tags: ['Privacy', 'Restraint', 'Non-Maleficence', 'Endurance'],
    },
  },
  {
    id: 2,
    title: 'The Future You Cannot Share',
    scenario:
      'You and your best friend have worked toward the same goal for years. Only one of you can get it. You secretly learn that a small, honest mistake by your friend will disqualify them—but reporting it would feel like betrayal, while staying silent would mean taking an unfair advantage.',
    tradeoffNotice:
      'Trade-off: Objective procedural fairness vs. Relational solidarity and grace.',
    optionA: {
      text: 'Report the mistake, because fairness matters more than friendship or personal gain.',
      interpretation:
        'You are principled and willing to lose personally to preserve fairness. You do not want success built on silence.',
      tags: ['Procedural Fairness', 'Impartiality', 'Principle', 'Integrity'],
    },
    optionB: {
      text: 'Stay silent, take the opportunity, and live with the knowledge that you won partly because you chose not to speak.',
      interpretation:
        'You are ambitious and deeply loyal, but you struggle when loyalty, fairness, and self-interest collide. You may justify the choice as "not my responsibility."',
      tags: ['Pragmatism', 'Relational Solidarity', 'Ambition', 'Contextual Realism'],
    },
  },
  {
    id: 3,
    title: 'The Sacrifice No One Will Know',
    scenario:
      'You can donate a significant part of your savings to save a stranger’s life, but doing so would delay your own family’s major plans and create real financial pressure at home. No one outside your family would ever know about the donation.',
    tradeoffNotice:
      'Trade-off: Universal humanitarian altruism vs. Immediate familial duty and proximity.',
    optionA: {
      text: 'Donate, because a life is worth more than a plan, even if your family bears part of the cost.',
      interpretation:
        'You have a strong moral imagination—you can feel responsibility for people you have never met. But you may underestimate the emotional cost to those closest to you.',
      tags: ['Universal Altruism', 'Deontological Compassion', 'Radical Empathy'],
    },
    optionB: {
      text: 'Keep the money for your family, accepting that a stranger may suffer because you chose the people in front of you.',
      interpretation:
        'You are grounded in obligation and proximity. You believe your first duty is to the people who depend on you, even when it means living with a painful trade-off.',
      tags: ['Proximity Ethics', 'Familial Duty', 'Grounded Obligation', 'Fiduciary Care'],
    },
  },
  {
    id: 4,
    title: 'The Truth That Breaks Trust',
    scenario:
      'Someone who helped you shape your future and supported you when you needed it most once did something morally wrong years ago. Exposing them could protect others, but it would also destroy their life, hurt many people who depend on them, and erase the support that changed your life.',
    tradeoffNotice:
      'Trade-off: Absolute deontological truth vs. Utilitarian welfare preservation.',
    optionA: {
      text: 'Expose them, because their past wrongdoing should not be protected by the fact that they helped you or their present importance.',
      interpretation:
        'You believe accountability must not depend on someone’s personal help, status, or emotional importance to you. You value principle over consequences.',
      tags: ['Absolute Accountability', 'Deontology', 'Universal Justice'],
    },
    optionB: {
      text: 'Stay silent, because exposing them would cause widespread harm to the person who helped you and the people who depend on them now.',
      interpretation:
        'You think in terms of living consequences and debt of gratitude, not abstract justice. You are willing to carry moral discomfort to prevent larger immediate harm.',
      tags: ['Consequentialism', 'Welfare Protection', 'Pragmatic Harm-Reduction'],
    },
  },
  {
    id: 5,
    title: 'The Version of You That Wins',
    scenario:
      'You are offered a life-changing opportunity, but accepting it requires becoming someone colder: making decisions you personally dislike, distancing yourself from people who ground you, and prioritizing results over empathy. Refusing means remaining true to yourself but watching a weaker version of the opportunity go to someone else.',
    tradeoffNotice:
      'Trade-off: Transformational scale & achievement vs. Internal virtue & authentic selfhood.',
    optionA: {
      text: 'Accept it and become the person the opportunity demands, even if you slowly stop recognizing yourself.',
      interpretation:
        'You are willing to trade comfort, softness, and even identity for impact. You believe transformation is the price of extraordinary outcomes.',
      tags: ['Transformative Scale', 'Outcome Mastery', 'Instrumental Pragmatism'],
    },
    optionB: {
      text: 'Refuse it and protect your character, accepting that you may never get another chance at that level.',
      interpretation:
        'You believe there is no achievement worth becoming someone you cannot respect. You choose internal integrity over external scale.',
      tags: ['Intrinsic Integrity', 'Virtue Ethics', 'Identity Preservation'],
    },
  },
];

/**
 * Dynamic rule-based reflective personality engine.
 * Generates an individualized cognitive archetype based on exact sequence of 5 choices.
 */
export function calculateDecisionProfile(choices: ('A' | 'B')[]): DecisionProfile {
  const [c1, c2, c3, c4, c5] = choices;
  const aCount = choices.filter((c) => c === 'A').length;

  // Track key dimensions
  const hasUniversalAltruism = c3 === 'A';
  const hasFamilialDuty = c3 === 'B';
  const hasAbsolutePrinciple = c4 === 'A';
  const hasConsequentialHarmReduction = c4 === 'B';
  const hasHighTransformation = c5 === 'A';
  const hasHighIntegrity = c5 === 'B';
  const hasLoyaltyAction = c1 === 'A';
  const hasProceduralFairness = c2 === 'A';

  let title = 'The Contextual Synthesizer';
  let subtitle = 'Navigating principles, proximity, and practical outcomes';
  let summary =
    'Your choices indicate an adaptive moral framework that resists rigid dogma. Rather than reflexively defaulting to pure abstract rules or pure immediate loyalty, you weigh contextual nuances against long-term consequence.';
  const prominentThemes: string[] = [];
  const strengths: string[] = [];
  const tradeoffs: string[] = [];
  const reflectionQuestions: string[] = [];

  // Determine distinctive archetype
  if (aCount === 5) {
    title = 'The Radical Deontologist';
    subtitle = 'Uncompromising adherence to principle and transformative impact';
    summary =
      'Across all five dilemmas, you consistently prioritized universal principles, systemic accountability, and decisive action over personal comfort or quiet restraint. You are willing to endure severe friction and identity shifts if you believe the objective goal demands it.';
    prominentThemes.push('Universal Justice', 'Radical Accountability', 'High Transformational Drive');
    strengths.push(
      'Incorruptible standard of fairness regardless of personal stakes',
      'Willingness to shoulder extreme burdens to right institutional wrongs'
    );
    tradeoffs.push(
      'Risk of overlooking the emotional wreckage borne by vulnerable people near you',
      'Vulnerability to burnout from pursuing absolute ideals in an imperfect world'
    );
    reflectionQuestions.push(
      'When principles demand human collateral damage, who truly bears the enduring cost?',
      'Can an outcome remain noble if the person achieving it ceases to recognize themselves?'
    );
  } else if (aCount === 0) {
    title = 'The Relational Guardian';
    subtitle = 'Anchored in proximity, harm reduction, and authentic character';
    summary =
      'Your decisions reveal an ethic rooted in living relationships, protection of those who depend on you, and preserving internal peace. You reject abstract crusades that create immediate casualties, preferring restraint and authentic fidelity.';
    prominentThemes.push('Proximity Ethics', 'Pragmatic Harm-Reduction', 'Authentic Self-Preservation');
    strengths.push(
      'Deep, unwavering reliability for family, friends, and direct dependents',
      'High resistance to corrupting external pressures and prestige temptations'
    );
    tradeoffs.push(
      'Carrying the hidden moral weight of passive complicity when systems need reform',
      'Reluctance to step onto larger scales where strangers benefit from your intervention'
    );
    reflectionQuestions.push(
      'Where is the line between healthy self-protection and shielding unjust status quos?',
      'How does one honor loyalties without allowing proximity to narrow our moral horizon?'
    );
  } else if (hasAbsolutePrinciple && hasHighIntegrity && hasProceduralFairness) {
    title = 'The Principled Realist';
    subtitle = 'Guided by intrinsic standards and institutional integrity';
    summary =
      'You are drawn to objective fairness and ethical consistency. You believe institutions and personal character must be held to unyielding standards, yet you navigate dilemmas with a sharp awareness of human limits.';
    prominentThemes.push('Procedural Fairness', 'Character Integrity', 'Moral Consistency');
    strengths.push(
      'Clear, predictable compass that others can trust under high stakes',
      'Refusal to exploit loopholes or compromise personal values for convenience'
    );
    tradeoffs.push(
      'Potential tension with close companions who expect preferential loyalty over rules',
      'Risk of moral paralysis when two equally valid principles directly collide'
    );
    reflectionQuestions.push(
      'How do you sustain empathy for someone whose honest mistake breaks your code?',
      'Does true integrity ever require bending a rule to rescue a person?'
    );
  } else if (hasConsequentialHarmReduction && hasFamilialDuty && hasHighIntegrity) {
    title = 'The Grounded Pragmatist';
    subtitle = 'Balancing direct obligations with compassionate consequence';
    summary =
      'You view morality through the lens of concrete human impact. Rather than worshipping abstract dogmas, you ask: "Who will actually suffer, and who is directly under my care?" You protect the people around you while guarding your own core values.';
    prominentThemes.push('Familial Fiduciary Care', 'Welfare Preservation', 'Pragmatic Restraint');
    strengths.push(
      'Exceptional practical wisdom in messy, high-pressure human conflicts',
      'Focus on tangible relief rather than theoretical virtue signaling'
    );
    tradeoffs.push(
      'May struggle when a crisis demands sacrificing personal comfort for a broader public good',
      'Living with lingering remorse over unresolved injustices left unaddressed'
    );
    reflectionQuestions.push(
      'Can keeping the peace sometimes become a disguise for avoiding necessary conflict?',
      'What responsibility do we hold toward those beyond our circle of care?'
    );
  } else if (hasHighTransformation && (hasUniversalAltruism || hasLoyaltyAction)) {
    title = 'The Visionary Catalyzer';
    subtitle = 'Embracing risk and personal reinvention for significant outcomes';
    summary =
      'You are willing to accept personal friction, reputational risk, and deliberate self-reinvention to achieve tangible shifts in the world. You value movement and courage over comfortable stagnation.';
    prominentThemes.push('Transformative Scale', 'Decisive Intervention', 'Outcome Orientation');
    strengths.push(
      'High tolerance for ambiguity and the courageous initiative to break deadlocks',
      'Ability to mobilize resources and defend causes under formidable odds'
    );
    tradeoffs.push(
      'Danger of becoming alienated from earlier grounding relationships',
      'Tendency to rationalize harsh methods by focusing exclusively on the final horizon'
    );
    reflectionQuestions.push(
      'What essential qualities of yourself must remain non-negotiable as you evolve?',
      'How do you measure whether a grand outcome was truly worth the hidden human cost?'
    );
  } else {
    title = 'The Reflective Humanist';
    subtitle = 'Tethered to empathy, measured accountability, and contextual grace';
    summary =
      'Your pattern of choices reflects a mature recognition that difficult ethical problems contain genuine tragedy. You do not treat dilemmas as mathematical puzzles to be solved cleanly, but as tensions between competing human dignities.';
    prominentThemes.push('Contextual Ethics', 'Empathy & Accountability', 'Deliberate Restraint');
    strengths.push(
      'Deep capacity for nuanced perspective-taking without premature judgment',
      'Balanced judgment that weighs both the spirit of principles and the flesh of consequences'
    );
    tradeoffs.push(
      'The emotional exhaustion that comes with feeling the validity of both sides',
      'Hesitation during rapid-fire crises where any choice leaves a permanent mark'
    );
    reflectionQuestions.push(
      'How do you forgive yourself when every available choice hurts someone you care about?',
      'What anchor keeps your judgment steady when external guidance vanishes?'
    );
  }

  // Ensure default themes exist if empty
  if (prominentThemes.length === 0) {
    prominentThemes.push('Contextual Wisdom', 'Ethical Reflection', 'Responsibility');
  }
  if (strengths.length === 0) {
    strengths.push('Ability to weigh complex tradeoffs without dogmatism', 'Respect for human complexity');
  }
  if (tradeoffs.length === 0) {
    tradeoffs.push('Bearing the cognitive burden of competing obligations', 'Living with unresolved ambiguity');
  }
  if (reflectionQuestions.length === 0) {
    reflectionQuestions.push(
      'Which values in these five dilemmas felt most instinctive, and which caused hesitation?',
      'If you had faced these dilemmas five years ago, would your choices have looked the same?'
    );
  }

  return {
    title,
    subtitle,
    summary,
    prominentThemes,
    strengths,
    tradeoffs,
    reflectionQuestions,
  };
}
