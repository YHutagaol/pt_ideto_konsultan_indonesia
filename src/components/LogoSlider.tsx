const CLIENT_LOGOS = [
  { name: "Pertamina", logoUrl: "/assets/logo_pertamina.jpg" },
  { name: "Adhi Persada", logoUrl: "/assets/logo_adhi_persada.jpg" },
  { name: "ConocoPhillips", logoUrl: "/assets/logo_conocophillips.png" },
  { name: "Cabot", logoUrl: "/assets/logo_cabot.png" },
  { name: "Beta Pramesti Asia", logoUrl: "/assets/logo-beta-pramesti-asia.jpg" },
  { name: "BNSP", logoUrl: "/assets/logo-bnsp.png" },
  { name: "Citra Baru Steel", logoUrl: "/assets/logo-citra-baru-steel.png" },
  { name: "CMP", logoUrl: "/assets/logo-cmp.jpg" },
  { name: "Eagleburgmann", logoUrl: "/assets/logo-eagleburgmann.png" },
  { name: "Grand Galaxy Park", logoUrl: "/assets/logo-grand-galaxy-park.png" },
  { name: "Grobest", logoUrl: "/assets/logo-grobest.jpg" },
  { name: "Jembo Cable", logoUrl: "/assets/logo-jembo-cable.png" },
  { name: "John Crane", logoUrl: "/assets/logo-john-crane.png" },
  { name: "Kobelco", logoUrl: "/assets/logo-kobelco.png" },
  { name: "Kyodo Yushi", logoUrl: "/assets/logo-kyodo-yushi.jpg" },
  { name: "Lixil", logoUrl: "/assets/logo-lixil.png" },
  { name: "LSP LHI", logoUrl: "/assets/logo-lsp-lhi.jpg" },
  { name: "LSP TLIP", logoUrl: "/assets/logo-lsp-tlip.jpg" },
  { name: "Master Steel", logoUrl: "/assets/logo-master-steel.jpg" },
  { name: "Medco Energi", logoUrl: "/assets/logo-medcoenergi.png" },
  { name: "Mitsui Chemicals", logoUrl: "/assets/logo-mitsui-chemicals.jpg" },
  { name: "MPI", logoUrl: "/assets/logo-mpi.png" },
  { name: "Nippon Steel", logoUrl: "/assets/logo-nippon-steel.jpg" },
  { name: "Oneject", logoUrl: "/assets/logo-oneject.png" },
  { name: "Pertagas", logoUrl: "/assets/logo-pertagas.jpg" },
  { name: "Pertamina Hulu Energi", logoUrl: "/assets/logo-pertamina-hulu-energi.png" },
  { name: "Pertamina PHE Tuban East Java", logoUrl: "/assets/logo-pertamina-phe-tuban-east-java.png" },
  { name: "PT Gurita Lintas Samudera", logoUrl: "/assets/logo-pt-gurita-lintas-samudera.png" },
  { name: "PT Horn Ming Indonesia", logoUrl: "/assets/logo-pt-horn-ming-indonesia.jpg" },
  { name: "PT Mugi Griyatama", logoUrl: "/assets/logo-pt-mugi-griyatama.png" },
  { name: "PT Non Ferindo Utama", logoUrl: "/assets/logo-pt-non-ferindo-utama.png" },
  { name: "PT Pangan Mahkota Emas", logoUrl: "/assets/logo-pt-pangan-mahkota-emas.png" },
  { name: "PT Selago", logoUrl: "/assets/logo-pt-selago.jpg" },
  { name: "Sasa", logoUrl: "/assets/logo-sasa.png" },
  { name: "Seiren", logoUrl: "/assets/logo-seiren.png" },
  { name: "Shangri-La Jakarta", logoUrl: "/assets/logo-shangri-la-jakarta.png" },
  { name: "Sintra", logoUrl: "/assets/logo-sintra.png" },
  { name: "Sulzer", logoUrl: "/assets/logo-sulzer.png" },
  { name: "Syaqua", logoUrl: "/assets/logo-syaqua.png" },
  { name: "UNI", logoUrl: "/assets/logo-uni.png" },
  { name: "UPM", logoUrl: "/assets/logo-upm.png" },
  { name: "Wisma Nusantara", logoUrl: "/assets/logo-wisma-nusantara.png" },
  { name: "PGN", logoUrl: "/assets/logo_png.png" },
];

export default function LogoSlider() {
  // Render the list twice so the -50% marquee animation loops seamlessly.
  const duplicated = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section className="client-section">
      <div className="container">
        <h3
          className="align-center mb-40 fs-small"
          style={{ letterSpacing: '2px', opacity: 0.6 }}
        >
          DIPERCAYA OLEH PERUSAHAAN TERKEMUKA
        </h3>
        <div className="logo-slider" aria-hidden="true">
          <div className="logo-track">
            {duplicated.map((client, index) => (
              <img
                key={`${client.name}-${index}`}
                src={client.logoUrl}
                alt={client.name}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
