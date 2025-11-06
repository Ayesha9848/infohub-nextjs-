"use client";
import { useState } from "react";

function Tabs({ active, onChange }) {
  const items = [
    { id: "weather", label: "Weather" },
    { id: "convert", label: "INR → USD/EUR" },
    { id: "quotes", label: "Quotes" },
  ];
  return (
    <div className="tabs">
      {items.map(t => (
        <button key={t.id}
          className={"tab " + (active === t.id ? "active" : "")}
          onClick={() => onChange(t.id)}>{t.label}</button>
      ))}
    </div>
  );
}

function WeatherCard() {
  const [city, setCity] = useState("Hyderabad");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setError(""); setLoading(true); setData(null);
    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed");
      setData(json);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="card">
      <div className="row">
        <input value={city} onChange={e=>setCity(e.target.value)} placeholder="City" />
        <button onClick={load}>{loading? <span className="spinner" /> : "Get Weather"}</button>
      </div>
      {error && <p style={{color:"#f87171"}}>⚠️ {error}</p>}
      {data && (
        <div style={{marginTop:12}}>
          <div className="row">
            <div>📍 <b>{data.city}</b></div>
            <div className="small">({data.source})</div>
          </div>
          <div className="row mono" style={{fontSize:24}}>
            <div>🌡 {data.temp_c.toFixed(1)}°C</div>
            <div>•</div>
            <div>☁️ {data.description}</div>
          </div>
          <div className="small">Humidity {data.humidity}% · Wind {data.wind_kph} kph</div>
        </div>
      )}
    </div>
  );
}

function ConverterCard() {
  const [amount, setAmount] = useState(1000);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const convert = async () => {
    setError(""); setLoading(true); setData(null);
    try {
      const res = await fetch(`/api/convert?amount=${encodeURIComponent(amount)}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed");
      setData(json);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="card">
      <div className="row">
        <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} min="0" />
        <button onClick={convert}>{loading? <span className="spinner" /> : "Convert INR"}</button>
      </div>
      {error && <p style={{color:"#f87171"}}>⚠️ {error}</p>}
      {data && (
        <div style={{marginTop:12}} className="mono">
          <div>INR {data.amount_inr.toFixed(2)}</div>
          <div>≈ USD {data.usd.toFixed(2)}</div>
          <div>≈ EUR {data.eur.toFixed(2)}</div>
          <div className="small">Rate source: {data.source}</div>
        </div>
      )}
    </div>
  );
}

function QuoteCard() {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setError(""); setLoading(true); setText(""); setAuthor("");
    try {
      const res = await fetch(`/api/quote`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed");
      setText(json.text); setAuthor(json.author);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="card">
      <div className="row">
        <button onClick={load}>{loading? <span className="spinner" /> : "New Quote"}</button>
      </div>
      {error && <p style={{color:"#f87171"}}>⚠️ {error}</p>}
      {text && (
        <blockquote style={{marginTop:12, fontSize:18, lineHeight:1.5}}>
          “{text}”
          <div className="small" style={{marginTop:8}}>— {author}</div>
        </blockquote>
      )}
    </div>
  );
}

export default function Page() {
  const [tab, setTab] = useState("weather");
  return (
    <main style={{marginTop:16}}>
      <Tabs active={tab} onChange={setTab} />
      {tab === "weather" && <WeatherCard />}
      {tab === "convert" && <ConverterCard />}
      {tab === "quotes" && <QuoteCard />}
      <div style={{marginTop:16}} className="small">
        Built with Next.js App Router. No page reloads. Friendly loading & error states.
      </div>
    </main>
  );
}
