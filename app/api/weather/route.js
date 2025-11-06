export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = (searchParams.get("city") || "").trim();
    if (!city) return Response.json({ error: "City is required" }, { status: 400 });

    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (apiKey) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
      const res = await fetch(url);
      if (!res.ok) return Response.json({ error: "City not found" }, { status: 404 });
      const w = await res.json();
      return Response.json({
        city: w.name,
        temp_c: w.main.temp,
        description: w.weather?.[0]?.description || "n/a",
        humidity: w.main.humidity,
        wind_kph: Math.round((w.wind.speed || 0) * 3.6),
        source: "openweathermap.org"
      });
    }

    return Response.json({
      city,
      temp_c: 26.4,
      description: "clear sky (mock)",
      humidity: 48,
      wind_kph: 9,
      source: "mock"
    });
  } catch {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
