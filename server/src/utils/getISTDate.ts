export function getISTDate() {
  return new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    }),
  );
}
