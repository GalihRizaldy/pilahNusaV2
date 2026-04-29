/**
 * AI Service — Simplified for static demonstration
 * The real AI integration will be connected later.
 */

/**
 * Classify waste from a base64-encoded image (Mock Version)
 * @param {string} base64Image - Base64 encoded image data
 * @returns {Promise<Object>} Mock classification result
 */
export const classifyWaste = async (base64Image) => {
  const mocks = [
    {
      name: 'Botol Plastik PET',
      category: 'anorganik',
      confidence: 94,
      description: 'Botol plastik jenis PET (Polyethylene Terephthalate) yang umum digunakan untuk air minum kemasan.',
      recyclingTips: [
        'Cuci bersih sebelum dibuang ke tempat daur ulang',
        'Pisahkan tutup botol (beda jenis plastik)',
        'Kumpulkan dan jual ke pengepul plastik',
      ],
      disposalGuide: 'Masukkan ke tempat sampah anorganik (berwarna kuning) atau kumpulkan untuk dijual ke bank sampah.',
      decompositionTime: '400-450 tahun',
      economicValue: 'Rp 500-2.000 per kg di bank sampah',
    },
    {
      name: 'Kulit Pisang',
      category: 'organik',
      confidence: 97,
      description: 'Kulit buah pisang yang merupakan sampah organik mudah terurai dan kaya nutrisi.',
      recyclingTips: [
        'Jadikan kompos untuk pupuk tanaman',
        'Gunakan sebagai pupuk organik langsung',
      ],
      disposalGuide: 'Masukkan ke tempat sampah organik (berwarna hijau) untuk diolah menjadi kompos.',
      decompositionTime: '2-5 minggu',
      economicValue: null,
    },
    {
      name: 'Baterai Bekas',
      category: 'B3',
      confidence: 92,
      description: 'Baterai alkaline bekas yang mengandung bahan kimia berbahaya bagi lingkungan.',
      recyclingTips: [
        'Jangan dibuang sembarangan karena mengandung racun',
        'Kumpulkan di tempat pengumpulan limbah B3 khusus',
      ],
      disposalGuide: 'Pisahkan dari sampah rumah tangga biasa. Bawa ke pusat pengumpulan limbah elektronik atau B3.',
      decompositionTime: 'Tidak terurai secara alami (berbahaya)',
      economicValue: null,
    }
  ];

  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mocks[Math.floor(Math.random() * mocks.length)]);
    }, 2000);
  });
};

/**
 * Compatibility export for existing code
 */
export const mockClassifyWaste = classifyWaste;
