import React from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Recycle, Trash2, Clock, BarChart3, Leaf, Share2, Camera, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import CategoryBadge from '../components/ui/Badge';
import { getHistoryItemById } from '../utils/storageUtils';

/**
 * Result page — displays full waste classification results
 */
const ResultPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Get result from navigation state or localStorage
  const stateResult = location.state?.result;
  const stateImage = location.state?.imageDataUrl;
  const historyItem = !stateResult ? getHistoryItemById(id) : null;

  const result = stateResult || historyItem?.result;
  const imageUrl = stateImage || historyItem?.imageBase64;

  if (!result) {
    return (
      <div className="result-not-found animate-slide-up">
        <Trash2 size={48} color="var(--color-text-tertiary)" aria-hidden="true" />
        <h1>Hasil tidak ditemukan</h1>
        <p>Hasil scan tidak tersedia. Coba scan ulang.</p>
        <Button
          variant="primary"
          icon={<Camera size={16} />}
          onClick={() => navigate('/scan')}
          id="btn-scan-again"
          aria-label="Mulai scan baru"
        >
          Scan Sekarang
        </Button>

        <style>{`
          .result-not-found {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 16px;
            min-height: 60vh;
            padding: 40px;
            text-align: center;
          }
        `}</style>
      </div>
    );
  }

  const confidenceColor =
    result.confidence >= 85 ? '#22C55E' :
    result.confidence >= 65 ? '#F59E0B' : '#EF4444';

  const handleShare = async () => {
    const text = `Saya baru saja menscan sampah menggunakan PilahNusa AI!\n${result.name} — Kategori: ${result.category}\n#PilahNusaAI #GoGreen`;
    if (navigator.share) {
      await navigator.share({ title: 'PilahNusa AI — Hasil Scan', text });
    } else {
      await navigator.clipboard.writeText(text);
      alert('Teks berhasil disalin!');
    }
  };

  return (
    <div className="result-page animate-slide-up">
      {/* Header */}
      <div className="result-page__header">
        <button
          className="result-back-btn"
          onClick={() => navigate(-1)}
          aria-label="Kembali"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="result-page__title">Hasil Klasifikasi</h1>
        <button
          className="result-share-btn"
          onClick={handleShare}
          aria-label="Bagikan hasil"
          title="Bagikan"
        >
          <Share2 size={20} />
        </button>
      </div>

      <div className="result-content stagger-children">
        {/* Main result card */}
        <div className="result-main-card">
          {imageUrl && (
            <div className="result-main-card__image-wrapper">
              <img
                src={imageUrl}
                alt={`Foto ${result.name}`}
                className="result-main-card__image"
              />
            </div>
          )}
          <div className="result-main-card__info">
            <div className="result-main-card__badges">
              <CategoryBadge category={result.category} size="md" />
            </div>
            <h2 className="result-main-card__name">{result.name}</h2>
            {result.description && (
              <p className="result-main-card__desc">{result.description}</p>
            )}

            {/* Confidence */}
            <div className="result-confidence" aria-label={`Tingkat keyakinan AI: ${result.confidence}%`}>
              <div className="result-confidence__header">
                <span className="result-confidence__label">
                  <BarChart3 size={14} aria-hidden="true" />
                  Tingkat Keyakinan AI
                </span>
                <span
                  className="result-confidence__value"
                  style={{ color: confidenceColor }}
                >
                  {result.confidence}%
                </span>
              </div>
              <div
                className="result-confidence__bar"
                role="progressbar"
                aria-valuenow={result.confidence}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="result-confidence__fill"
                  style={{
                    width: `${result.confidence}%`,
                    backgroundColor: confidenceColor,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Disposal Guide */}
        {result.disposalGuide && (
          <div className="result-section">
            <div className="result-section__header">
              <div className="result-section__icon result-section__icon--blue">
                <Trash2 size={16} color="#3B82F6" />
              </div>
              <h3 className="result-section__title">Cara Pembuangan</h3>
            </div>
            <p className="result-section__text">{result.disposalGuide}</p>
          </div>
        )}

        {/* Recycling Tips */}
        {result.recyclingTips && result.recyclingTips.length > 0 && (
          <div className="result-section">
            <div className="result-section__header">
              <div className="result-section__icon result-section__icon--green">
                <Recycle size={16} color="var(--color-primary)" />
              </div>
              <h3 className="result-section__title">Tips Daur Ulang</h3>
            </div>
            <ul className="result-tips-list" role="list">
              {result.recyclingTips.map((tip, i) => (
                <li key={i} className="result-tips-list__item" role="listitem">
                  <CheckCircle size={15} color="var(--color-primary)" aria-hidden="true" className="result-tips-list__check" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Meta info row */}
        <div className="result-meta-row">
          {result.decompositionTime && (
            <div className="result-meta-card">
              <div className="result-meta-card__icon">
                <Clock size={18} color="var(--color-text-secondary)" />
              </div>
              <strong className="result-meta-card__label">Waktu Terurai</strong>
              <span className="result-meta-card__value">{result.decompositionTime}</span>
            </div>
          )}

          {result.economicValue && (
            <div className="result-meta-card">
              <div className="result-meta-card__icon">
                <Leaf size={18} color="var(--color-primary)" />
              </div>
              <strong className="result-meta-card__label">Nilai Ekonomi</strong>
              <span className="result-meta-card__value result-meta-card__value--green">{result.economicValue}</span>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="result-actions">
          <Button
            variant="outline"
            size="md"
            icon={<ArrowLeft size={16} />}
            onClick={() => navigate('/history')}
            id="btn-see-history"
            aria-label="Lihat riwayat scan"
          >
            Lihat Riwayat
          </Button>
          <Button
            variant="primary"
            size="md"
            icon={<Camera size={16} />}
            onClick={() => navigate('/scan')}
            id="btn-scan-new"
            aria-label="Scan sampah baru"
            fullWidth
          >
            Scan Lagi
          </Button>
        </div>
      </div>

      <style>{`
        .result-page {
          padding: 0;
          min-height: 100vh;
          background: var(--color-bg);
        }

        .result-page__header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px 24px;
          background: var(--color-white);
          border-bottom: 1px solid var(--color-border-light);
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .result-back-btn,
        .result-share-btn {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-md);
          border: 1.5px solid var(--color-border);
          background: var(--color-white);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-secondary);
          transition: all var(--transition-fast);
          flex-shrink: 0;
        }

        .result-back-btn:hover, .result-share-btn:hover {
          background: var(--color-bg);
          color: var(--color-text-primary);
        }

        .result-page__title {
          flex: 1;
          font-size: 1.0625rem;
          font-weight: 700;
          margin: 0;
          text-align: center;
        }

        .result-content {
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-width: 720px;
          margin: 0 auto;
        }

        /* ---- Main Card ---- */
        .result-main-card {
          background: var(--color-white);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-md);
          border: 1px solid var(--color-border-light);
          overflow: hidden;
        }

        .result-main-card__image-wrapper {
          width: 100%;
          height: 220px;
          background: var(--color-bg-secondary);
          overflow: hidden;
        }

        .result-main-card__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .result-main-card__info {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .result-main-card__name {
          font-size: 1.375rem;
          font-weight: 800;
          margin: 0;
          line-height: 1.2;
        }

        .result-main-card__desc {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          margin: 0;
          line-height: 1.6;
        }

        /* ---- Confidence ---- */
        .result-confidence {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .result-confidence__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .result-confidence__label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--color-text-secondary);
        }

        .result-confidence__value {
          font-size: 0.9375rem;
          font-weight: 800;
          font-family: var(--font-heading);
        }

        .result-confidence__bar {
          height: 8px;
          background: var(--color-bg-secondary);
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .result-confidence__fill {
          height: 100%;
          border-radius: var(--radius-full);
          transition: width 1s ease;
          animation: progressFill 1s ease forwards;
        }

        /* ---- Sections ---- */
        .result-section {
          background: var(--color-white);
          border-radius: var(--radius-xl);
          padding: 18px 20px;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--color-border-light);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .result-section__header {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .result-section__icon {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .result-section__icon--green { background: var(--color-primary-bg); }
        .result-section__icon--blue { background: #EFF6FF; }

        .result-section__title {
          font-size: 0.9375rem;
          font-weight: 700;
          margin: 0;
        }

        .result-section__text {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          margin: 0;
          line-height: 1.65;
        }

        /* ---- Tips List ---- */
        .result-tips-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .result-tips-list__item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          line-height: 1.5;
        }

        .result-tips-list__check {
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* ---- Meta Row ---- */
        .result-meta-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 12px;
        }

        .result-meta-card {
          background: var(--color-white);
          border-radius: var(--radius-lg);
          padding: 16px;
          border: 1px solid var(--color-border-light);
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .result-meta-card__icon {
          width: 36px;
          height: 36px;
          background: var(--color-bg);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .result-meta-card__label {
          font-size: 0.75rem;
          color: var(--color-text-secondary);
          font-weight: 600;
          font-family: var(--font-body);
        }

        .result-meta-card__value {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--color-text-primary);
          font-family: var(--font-heading);
        }

        .result-meta-card__value--green {
          color: var(--color-primary-dark);
        }

        /* ---- Actions ---- */
        .result-actions {
          display: flex;
          gap: 12px;
          padding-bottom: 8px;
        }

        @media (max-width: 767px) {
          .result-content {
            padding: 16px;
          }

          .result-main-card__image-wrapper {
            height: 200px;
          }

          .result-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default ResultPage;
