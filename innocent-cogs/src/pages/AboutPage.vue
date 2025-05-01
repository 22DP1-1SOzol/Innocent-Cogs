<template>
  <div class="about-container">
    <div class="about-card">
      <h1>Par <span class="highlight">Innocent Cogs</span></h1>

      <p>
        <strong>Innocent Cogs</strong> ir mans personīgais mēģinājums vienkāršot piezīmju veidošanas procesu.
        Tā radās no vēlmes atbrīvoties no liekā un koncentrēties uz būtisko — tas ir minimālistisks rīks, kas palīdz domāt,
        rakstīt un atcerēties bez liekiem traucēkļiem.
      </p>

      <p>
        Neatkarīgi no tā, vai pieraksti pēkšņu domu, strukturē idejas vai veido kaut ko nozīmīgu,
        <em>Innocent Cogs</em> ir veidots tā, lai netraucētu un ļautu tavai domai būt galvenajā lomā.
      </p>

      <p>
        Veidots ar <strong>Vue 3</strong> un <strong>Vite</strong>, šis projekts apvieno modernu tīmekļa ātrdarbību
        ar klasiskām rakstīšanas vērtībām. Visi pieraksti tiek glabāti tikai tavā ierīcē —
        nekas netiek sūtīts prom, ja vien tu pats to nevēlies.
      </p>

      <p>
        Tas nav perfekts. Taču tas ir tīrs, ātrs un kļūst arvien labāks —
        gluži kā domas, ko tas cenšas saglabāt.
      </p>

      <router-link to="/" class="back-link">← Atpakaļ</router-link>
    </div>
  </div>
</template>


<style scoped>
.about-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f8f9fa;
}

.about-card {
  background: white;
  padding: 2rem 3rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  text-align: center;
  max-width: 480px;
  width: 90%;
  font-family: 'Segoe UI', sans-serif;
}

h1 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.highlight {
  color: #3b7a57;
}

p {
  margin: 0.5rem 0;
  color: #444;
}

.back-link {
  display: inline-block;
  margin-top: 1.5rem;
  text-decoration: none;
  color: #007acc;
  font-weight: 500;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: #005ea2;
}
</style>
