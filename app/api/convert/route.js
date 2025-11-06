export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const amountInr = Number(searchParams.get("amount"));
    if (isNaN(amountInr) || amountInr < 0)
      return Response.json({ error: "Enter a valid amount" }, { status: 400 });

    const key = process.env.EXCHANGE_API_KEY;
    if (key) {
      const res = await fetch(`https://v6.exchangerate-api.com/v6/${key}/latest/INR`);
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      const usd = data.conversion_rates.USD;
      const eur = data.conversion_rates.EUR;
      return Response.json({ amount_inr: amountInr, usd: amountInr * usd, eur: amountInr * eur, source: "exchangerate-api.com" });
    }

    return Response.json({ amount_inr: amountInr, usd: amountInr * 0.012, eur: amountInr * 0.011, source: "mock" });
  } catch {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
