const fallback = [
  { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { text: "Whether you think you can or you think you can’t, you’re right.", author: "Henry Ford" },
  { text: "Do one thing every day that scares you.", author: "Eleanor Roosevelt" },
];

export async function GET() {
  try {
    const res = await fetch("https://api.quotable.io/random");
    if (res.ok) {
      const q = await res.json();
      return Response.json({ text: q.content, author: q.author, source: "quotable.io" });
    }
    const pick = fallback[Math.floor(Math.random() * fallback.length)];
    return Response.json({ ...pick, source: "fallback" });
  } catch {
    const pick = fallback[Math.floor(Math.random() * fallback.length)];
    return Response.json({ ...pick, source: "fallback" });
  }
}
