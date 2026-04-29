/**
 * Waste Categories Data
 * Contains category metadata including colors, icons, and descriptions
 */

export const CATEGORIES = {
  organik: {
    key: 'organik',
    label: 'Organik',
    color: '#22C55E',
    bgColor: '#F0FDF4',
    borderColor: '#86EFAC',
    iconName: 'Leaf',
    description: 'Sampah yang dapat terurai secara alami oleh mikroorganisme',
    examples: ['Sisa makanan', 'Daun kering', 'Kulit buah', 'Kertas', 'Sayuran']
  },
  anorganik: {
    key: 'anorganik',
    label: 'Anorganik',
    color: '#3B82F6',
    bgColor: '#EFF6FF',
    borderColor: '#BFDBFE',
    iconName: 'Recycle',
    description: 'Sampah yang sulit atau tidak dapat terurai, namun dapat didaur ulang',
    examples: ['Plastik', 'Kaca', 'Logam', 'Kaleng', 'Botol']
  },
  B3: {
    key: 'B3',
    label: 'B3 Berbahaya',
    color: '#EF4444',
    bgColor: '#FEF2F2',
    borderColor: '#FECACA',
    iconName: 'AlertTriangle',
    description: 'Bahan Berbahaya dan Beracun yang memerlukan penanganan khusus',
    examples: ['Baterai', 'Cat', 'Pestisida', 'Obat kadaluarsa', 'Lampu neon']
  },
  elektronik: {
    key: 'elektronik',
    label: 'Elektronik',
    color: '#F59E0B',
    bgColor: '#FFFBEB',
    borderColor: '#FDE68A',
    iconName: 'BatteryCharging',
    description: 'Limbah elektronik atau e-waste yang mengandung bahan berharga',
    examples: ['Ponsel rusak', 'Laptop', 'Charger', 'Kabel', 'Komponen elektronik']
  }
};

export const CATEGORY_LIST = Object.values(CATEGORIES);

export const getCategoryByKey = (key) => {
  return CATEGORIES[key] || CATEGORIES.anorganik;
};
