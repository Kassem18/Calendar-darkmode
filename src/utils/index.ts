export * from "./storage";
export * from "./dateHelpers";

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const colors = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#FFA07A",
  "#98D8C8",
  "#F7DC6F",
  "#BB8FCE",
  "#85C1E2",
];

export const getRandomColor = (): string => {
  return colors[Math.floor(Math.random() * colors.length)];
};
