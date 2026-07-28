export async function analyzeText(content: string) {
  const response = await fetch("http://localhost:8000/api/analyze/text", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content,
    }),
  });

  if (!response.ok) {
    throw new Error("Analysis failed");
  }

  return await response.json();
}
