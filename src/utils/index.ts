export const generateName = (
  firstName: string,
  username?: string | null
): string => {
  return `${firstName}${username ? " " + username : ""}`;
};
