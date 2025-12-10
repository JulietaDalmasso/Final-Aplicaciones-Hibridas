import React from 'react'

const Home = () => (
  <main className="home-main">
    <section className="hero home-hero">
      <img src="/imgs/porfolio.png" alt="portfolio" className="home-img" />
      <div className="home-info">
        <h3 className="home-title">¿Quiénes somos?</h3>
        <p className="home-desc">Estudiantes de diseño web con un enfoque creativo en cada proyecto.</p>
      </div>
    </section>
    <footer className="home-footer">
      <p>&copy; Parcial Aplicaciones Hibridas - 2025</p>
    </footer>
  </main>
)

export default Home