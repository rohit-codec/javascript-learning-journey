const form = document.querySelector("#form"),
  out = document.querySelector("#output");
form.onsubmit = async (e) => {
  e.preventDefault();
  const city = document.querySelector("#city").value.trim();
  out.textContent = "Loading…";
  try {
    const g = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`,
    );
    if (!g.ok) throw Error("City search failed");
    const places = (await g.json()).results;
    if (!places?.length) throw Error("City not found");
    const p = places[0],
      r = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${p.latitude}&longitude=${p.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`,
      );
    if (!r.ok) throw Error("Weather request failed");
    const d = await r.json();
    out.textContent = `${p.name}: ${d.current.temperature_2m}°C · Humidity ${d.current.relative_humidity_2m}% · Wind ${d.current.wind_speed_10m} km/h`;
  } catch (err) {
    out.textContent = err.message;
  }
};
