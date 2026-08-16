export type ProblemItem = {
  id: string;
  title: string;
  description: string;
  icon: "perception" | "latency" | "security";
};

export const problems: ProblemItem[] = [
  {
    id: "perception-tax",
    icon: "perception",
    title: "The Perception Tax",
    description:
      "Agents shouldn't have to 'see' pixels to act. Current models waste massive compute reconstructing UI that should be structured data.",
  },
  {
    id: "latency-trap",
    icon: "latency",
    title: "The Latency Trap",
    description:
      "Vision-to-action loops are slow and brittle. High-frequency agent workflows die in the seconds spent waiting for multimodal inference.",
  },
  {
    id: "security-gap",
    icon: "security",
    title: "The Security Gap",
    description:
      "Headless browsers are a liability. Running untrusted agent code against raw browser processes creates an unmanageable attack surface.",
  },
];
