import ContactForm from "@/components/ContactForm";
import { COMPANY } from "@/lib/constants";

export const metadata = {
  title: "Kontak Kami",
  description:
    "Kami siap membantu menjawab pertanyaan dan mendiskusikan kebutuhan perusahaan Anda.",
};

export default function KontakPage() {
  return (
    <main className="pb-80">
      <section className="page-padding container align-center animate-fade-in-up">
        <h1 className="main-title">Hubungi Kami</h1>
        <p className="main-subtitle">
          Kami siap membantu menjawab pertanyaan dan mendiskusikan kebutuhan
          perusahaan Anda.
        </p>
      </section>

      <section className="container mb-50">
        <div className="grid-4-col">
          <div className="card card-white shadow-hover align-center">
            <div className="card-icon-wrapper center-icon green-light-bg mb-20">
              <i
                className="fas fa-map-marker-alt text-green"
                aria-hidden="true"
              />
            </div>
            <h3 className="card-title-center">Alamat Kantor</h3>
            <p className="card-text-center text-gray fs-small">
              {COMPANY.address}
            </p>
          </div>

          <div className="card card-white shadow-hover align-center">
            <div className="card-icon-wrapper center-icon green-light-bg mb-20">
              <i className="fas fa-phone-alt text-green" aria-hidden="true" />
            </div>
            <h3 className="card-title-center">Telepon</h3>
            <p className="card-text-center text-gray fs-small">
              {COMPANY.phone}
            </p>
          </div>

          <div className="card card-white shadow-hover align-center">
            <div className="card-icon-wrapper center-icon green-light-bg mb-20">
              <i className="far fa-envelope text-green" aria-hidden="true" />
            </div>
            <h3 className="card-title-center">Email</h3>
            <p className="card-text-center text-gray fs-small">
              {COMPANY.email}
            </p>
          </div>

          <div className="card card-white shadow-hover align-center">
            <div className="card-icon-wrapper center-icon green-light-bg mb-20">
              <i className="far fa-user text-green" aria-hidden="true" />
            </div>
            <h3 className="card-title-center">Contact Person</h3>
            <p className="card-text-center text-gray fs-small">
              {COMPANY.contactPerson}
              <br />({COMPANY.contactPersonPhone})<br />
              <br />
              Senin - Jumat: 08.00 - 17.00 WIB
            </p>
          </div>
        </div>
      </section>

      <section className="container mt-40">
        <div className="grid-2-col gap-50 align-start">
          <div className="map-section">
            <h2 className="section-title mb-20">Lokasi Kantor</h2>
            <div className="map-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.8382991471244!2d106.6862986!3d-6.390837699999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e67a23a9b821%3A0x20b81316d44ca294!2sPT.%20IDETO%20KONSULTAN!5e1!3m2!1sid!2sid!4v1777479948689!5m2!1sid!2sid"
                title="Lokasi Kantor PT IDETO Konsultan Indonesia"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div className="contact-form-section">
            <div className="card card-white">
              <h2 className="section-title mb-20">Kirim Pesan</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
