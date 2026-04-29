import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ImagePlus, Layers, Recycle, Leaf, Zap, CheckCircle, BatteryCharging, AlertTriangle } from 'lucide-react';
import Button from '../components/ui/Button';
import StatCard from '../components/ui/StatCard';
import { CATEGORY_LIST } from '../data/wasteCategories';

/**
 * Home page — Landing page with hero section and feature highlights
 */
const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    { icon: <Zap size={14} />, label: 'AI Powered' },
    { icon: <Leaf size={14} />, label: 'Ramah Lingkungan' },
    { icon: <CheckCircle size={14} />, label: 'Mudah Digunakan' },
  ];

  // Helper to render lucide icon by name
  const renderIcon = (iconName, color) => {
    switch (iconName) {
      case 'Leaf': return <Leaf size={24} color={color} />;
      case 'Recycle': return <Recycle size={24} color={color} />;
      case 'AlertTriangle': return <AlertTriangle size={24} color={color} />;
      case 'BatteryCharging': return <BatteryCharging size={24} color={color} />;
      default: return <Leaf size={24} color={color} />;
    }
  };

  return (
    <div className="home-page animate-slide-up">
      {/* Hero Section */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__content">
          <div className="hero__badge" aria-hidden="true">
            <Leaf size={14} />
            <span>Eco-Friendly AI Solution</span>
          </div>

          <h1 className="hero__title" id="hero-title">
            PilahNusa AI
          </h1>

          <p className="hero__subtitle">
            Scan sampahmu dan pelajari cara pengelolaannya dengan teknologi AI yang canggih dan mudah digunakan
          </p>

          {/* CTA Buttons */}
          <div className="hero__cta" role="group" aria-label="Tindakan utama">
            <Button
              variant="primary"
              size="lg"
              icon={<Camera size={18} />}
              onClick={() => navigate('/scan')}
              id="btn-scan-sekarang"
              aria-label="Mulai scan sampah sekarang"
            >
              Scan Sekarang
            </Button>
            <Button
              variant="outline"
              size="lg"
              icon={<ImagePlus size={18} />}
              onClick={() => navigate('/scan')}
              id="btn-upload-galeri"
              aria-label="Upload foto dari galeri"
            >
              Upload dari Galeri
            </Button>
          </div>

          {/* Feature pills */}
          <div className="hero__features" role="list" aria-label="Fitur unggulan">
            {features.map(({ icon, label }) => (
              <div key={label} className="hero__feature" role="listitem">
                <span className="hero__feature-icon" aria-hidden="true">{icon}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Visual Card (Matching Gambar 2) */}
        <div className="hero__visual" aria-hidden="true">
          <div className="hero-card">
            {/* Main Visual Container */}
            <div className="hero-card__visual-container">
              {/* Floating decorations around the circle */}
              <div className="hero-card__float hero-card__float--tl animate-float">
                <Recycle size={18} color="var(--color-primary)" />
              </div>
              <div className="hero-card__float hero-card__float--tr animate-float-reverse">
                <Leaf size={16} color="var(--color-primary)" />
              </div>
              <div className="hero-card__float hero-card__float--br animate-float">
                <Leaf size={14} color="var(--color-primary)" />
              </div>

              {/* Large Green Circle with Layers Icon */}
              <div className="hero-card__circle-wrapper">
                <div className="hero-card__circle">
                  <Layers size={64} color="white" strokeWidth={1.5} />
                </div>
              </div>
            </div>

            {/* Stats row below circle */}
            <div className="hero-card__stats-grid" role="list" aria-label="Statistik aplikasi">
              <div className="hero-card__stat-item" role="listitem">
                <strong className="hero-card__stat-value">95%</strong>
                <span className="hero-card__stat-label">Akurasi</span>
              </div>
              <div className="hero-card__stat-item" role="listitem">
                <strong className="hero-card__stat-value">10+</strong>
                <span className="hero-card__stat-label">Kategori</span>
              </div>
              <div className="hero-card__stat-item" role="listitem">
                <strong className="hero-card__stat-value">Fast</strong>
                <span className="hero-card__stat-label">Proses</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Preview Section */}
      <section className="home-categories" aria-labelledby="categories-heading">
        <h2 className="home-categories__title" id="categories-heading">
          Kategori Sampah
        </h2>
        <p className="home-categories__subtitle">
          PilahNusa AI dapat mengklasifikasikan berbagai jenis sampah secara otomatis
        </p>
        <div className="home-categories__grid" role="list">
          {CATEGORY_LIST.map((cat) => (
            <div
              key={cat.key}
              className="category-chip"
              role="listitem"
              style={{ borderColor: cat.color + '33', backgroundColor: cat.bgColor }}
            >
              <div className="category-chip__icon-wrapper">
                {renderIcon(cat.iconName, cat.color)}
              </div>
              <div>
                <strong className="category-chip__label" style={{ color: cat.color }}>{cat.label}</strong>
                <p className="category-chip__desc">{cat.description.split(',').slice(0, 3).join(', ')}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .home-page {
          padding: 28px 28px 28px;
          display: flex;
          flex-direction: column;
          gap: 36px;
          min-height: 100vh;
        }

        /* ---- Hero ---- */
        .hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
          min-height: 480px;
        }

        .hero__content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .hero__badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: var(--color-primary-bg);
          color: var(--color-primary-dark);
          border: 1.5px solid var(--color-primary-bg-md);
          border-radius: var(--radius-full);
          font-size: 0.8125rem;
          font-weight: 600;
          width: fit-content;
        }

        .hero__title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          line-height: 1.1;
          color: var(--color-text-primary);
          margin: 0;
        }

        .hero__subtitle {
          font-size: 1rem;
          color: var(--color-text-secondary);
          line-height: 1.65;
          margin: 0;
          max-width: 420px;
        }

        .hero__cta {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .hero__features {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .hero__feature {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--color-text-secondary);
        }

        .hero__feature-icon {
          display: flex;
          align-items: center;
          color: var(--color-primary);
        }        /* ---- Hero Card (Gambar 2 style) ---- */
        .hero-card {
          background: var(--color-white);
          border-radius: var(--radius-2xl);
          padding: 24px;
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--color-border-light);
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          width: 100%;
        }

        .hero-card__visual-container {
          position: relative;
          width: 100%;
          height: 240px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-card__float {
          position: absolute;
          width: 44px;
          height: 44px;
          background: white;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-md);
          z-index: 2;
        }

        .hero-card__float--tl { top: 10%; left: 15%; }
        .hero-card__float--tr { top: 35%; right: 10%; }
        .hero-card__float--br { bottom: 20%; right: 15%; }

        .hero-card__circle-wrapper {
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }

        .hero-card__circle {
          width: 160px;
          height: 160px;
          background: #22C55E;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 25px rgba(34, 197, 94, 0.3);
          animation: scanPulse 4s ease-in-out infinite;
        }

        .hero-card__stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          width: 100%;
        }

        .hero-card__stat-item {
          background: var(--color-bg-secondary);
          border-radius: var(--radius-lg);
          padding: 12px 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 4px;
        }

        .hero-card__stat-value {
          font-size: 1.125rem;
          font-weight: 800;
          color: #22C55E;
          font-family: var(--font-heading);
        }

        .hero-card__stat-label {
          font-size: 0.75rem;
          color: var(--color-text-secondary);
          font-weight: 500;
        } }

        /* ---- Category Section ---- */
        .home-categories {
          padding: 4px 0;
        }

        .home-categories__title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 6px;
        }

        .home-categories__subtitle {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          margin-bottom: 20px;
        }

        .home-categories__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
        }

        .category-chip {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          border-radius: var(--radius-lg);
          border: 1.5px solid;
          transition: transform var(--transition-normal), box-shadow var(--transition-normal);
          cursor: default;
        }

        .category-chip:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .category-chip__icon {
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .category-chip__label {
          display: block;
          font-size: 0.875rem;
          font-weight: 700;
          font-family: var(--font-heading);
          margin-bottom: 2px;
        }

        .category-chip__desc {
          font-size: 0.75rem;
          color: var(--color-text-secondary);
          margin: 0;
          line-height: 1.4;
        }

        /* ---- Responsive ---- */
        @media (max-width: 1023px) {
          .hero {
            grid-template-columns: 1fr;
            gap: 28px;
            min-height: auto;
          }

          .hero__visual {
            order: -1;
          }

          .hero-card {
            width: 100%;
            margin: 0 auto;
          }
        }

        @media (max-width: 767px) {
          .home-page {
            padding: 20px 16px;
          }

          .hero__cta {
            flex-direction: column;
          }

          .hero__cta .btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
