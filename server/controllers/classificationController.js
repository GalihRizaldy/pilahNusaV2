import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import HistoryModel from '../models/HistoryModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// The 11 class labels provided by the user
const CLASS_LABELS = {
  0: 'Batrai',
  1: 'Botol Plastik',
  2: 'Kaca',
  3: 'Kardus',
  4: 'Kertas',
  5: 'Makanan Sisa',
  6: 'Metal',
  7: 'Plastik hitam',
  8: 'Sisa Sayuran',
  9: 'Sisa buah',
  10: 'Vegetation'
};

// Rich data mapping based on category names
const CLASS_DATA_MAP = {
  'Batrai': {
    category: 'B3',
    description: 'Baterai bekas yang mengandung bahan kimia berbahaya bagi lingkungan.',
    recyclingTips: ['Jangan dibuang sembarangan karena mengandung racun', 'Kumpulkan di tempat pengumpulan limbah B3 khusus'],
    disposalGuide: 'Pisahkan dari sampah rumah tangga biasa. Bawa ke pusat pengumpulan limbah elektronik atau B3.',
    decompositionTime: 'Tidak terurai secara alami (berbahaya)',
  },
  'Botol Plastik': {
    category: 'anorganik',
    description: 'Botol plastik jenis PET yang umum digunakan untuk minuman.',
    recyclingTips: ['Cuci bersih sebelum dibuang', 'Pisahkan tutup botol', 'Kumpulkan untuk didaur ulang'],
    disposalGuide: 'Masukkan ke tempat sampah anorganik (kuning).',
    decompositionTime: '400-450 tahun',
  },
  'Kaca': {
    category: 'anorganik',
    description: 'Pecahan kaca atau botol kaca yang bisa didaur ulang tanpa batas.',
    recyclingTips: ['Bungkus pecahan kaca dengan kertas tebal', 'Pisahkan dari sampah lain agar tidak membahayakan'],
    disposalGuide: 'Masukkan ke tempat sampah khusus kaca atau anorganik yang aman.',
    decompositionTime: '1 juta tahun',
  },
  'Kardus': {
    category: 'anorganik',
    description: 'Limbah kertas tebal berupa kardus kemasan.',
    recyclingTips: ['Lipat pipih kardus untuk menghemat tempat', 'Jaga agar tetap kering', 'Kumpulkan untuk bank sampah'],
    disposalGuide: 'Masukkan ke tempat sampah anorganik (kuning/biru).',
    decompositionTime: '2 bulan',
  },
  'Kertas': {
    category: 'anorganik',
    description: 'Kertas bekas cetak, koran, atau buku.',
    recyclingTips: ['Pastikan kertas tidak basah atau kotor kena minyak', 'Gunakan sisi baliknya jika masih kosong'],
    disposalGuide: 'Masukkan ke tempat sampah anorganik khusus kertas (biru).',
    decompositionTime: '2-6 minggu',
  },
  'Makanan Sisa': {
    category: 'organik',
    description: 'Sisa makanan konsumsi yang mudah membusuk.',
    recyclingTips: ['Gunakan sebagai pakan ternak (jika sesuai)', 'Jadikan pupuk kompos', 'Tiriskan airnya sebelum dibuang'],
    disposalGuide: 'Masukkan ke tempat sampah organik (hijau).',
    decompositionTime: '2 minggu - 1 bulan',
  },
  'Metal': {
    category: 'anorganik',
    description: 'Kaleng bekas minuman atau logam lainnya.',
    recyclingTips: ['Cuci bersih dan keringkan', 'Remukkan kaleng untuk menghemat ruang'],
    disposalGuide: 'Masukkan ke tempat sampah anorganik (kuning) atau jual ke pengepul.',
    decompositionTime: '50-200 tahun',
  },
  'Plastik hitam': {
    category: 'anorganik',
    description: 'Kantong plastik kresek berwarna hitam, biasanya sulit didaur ulang.',
    recyclingTips: ['Gunakan ulang sebagai kantong sampah sekunder', 'Kurangi penggunaannya'],
    disposalGuide: 'Masukkan ke tempat sampah anorganik.',
    decompositionTime: '10-20 tahun',
  },
  'Sisa Sayuran': {
    category: 'organik',
    description: 'Potongan sisa sayur dari dapur yang belum dimasak.',
    recyclingTips: ['Sangat baik untuk bahan utama kompos', 'Gunakan untuk pakan ternak', 'Gunakan untuk eco-enzyme'],
    disposalGuide: 'Masukkan ke tempat sampah organik (hijau).',
    decompositionTime: '1-4 minggu',
  },
  'Sisa buah': {
    category: 'organik',
    description: 'Kulit buah atau sisa buah yang tidak termakan.',
    recyclingTips: ['Jadikan bahan dasar kompos atau eco-enzyme', 'Keringkan untuk dijadikan pakan hewan'],
    disposalGuide: 'Masukkan ke tempat sampah organik (hijau).',
    decompositionTime: '2-5 minggu',
  },
  'Vegetation': {
    category: 'organik',
    description: 'Sisa tanaman, dedaunan, atau ranting kering.',
    recyclingTips: ['Tumpuk di area tanah terbuka untuk pelapukan alami', 'Cacah kecil untuk mempercepat kompos'],
    disposalGuide: 'Jadikan tumpukan kompos di halaman atau masukkan ke sampah organik.',
    decompositionTime: '1-3 bulan',
  }
};

export const classifyWaste = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided for classification' });
    }

    const imagePath = req.file.path;
    const modelPath = path.join(__dirname, '../data/pilahnusa_model_final.tflite');
    const pythonScript = path.join(__dirname, '../python/predict.py');

    // Spawn python child process
    const pythonProcess = spawn('python', [pythonScript, modelPath, imagePath]);

    let outputData = '';
    let errorData = '';

    pythonProcess.stdout.on('data', (data) => {
      outputData += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      errorData += data.toString();
      // TF might log warnings to stderr, so we don't immediately throw.
    });

    pythonProcess.on('close', (code) => {
      // Create a base64 thumbnail to save before deleting the image
      let thumbnailBase64 = null;
      try {
        const fileData = fs.readFileSync(imagePath);
        thumbnailBase64 = 'data:image/jpeg;base64,' + fileData.toString('base64');
      } catch (err) {
        console.error('Failed to create thumbnail', err);
      }

      // Cleanup the uploaded image
      fs.unlink(imagePath, (err) => {
        if (err) console.error('Error deleting uploaded file:', err);
      });

      if (code !== 0) {
        console.error('Python Script Error:', errorData);
        return res.status(500).json({ error: 'AI Prediction process failed.' });
      }

      try {
        // Find JSON block in python output (ignoring TF warnings)
        const match = outputData.match(/\{.*\}/s);
        if (!match) {
          throw new Error('No JSON output from Python script');
        }

        const resultJson = JSON.parse(match[0]);
        
        if (!resultJson.success) {
          return res.status(500).json({ error: resultJson.error || 'AI Inference error' });
        }

        const predictedLabelName = CLASS_LABELS[resultJson.class_index] || 'Unknown';
        const richData = CLASS_DATA_MAP[predictedLabelName] || {};

        const finalResult = {
          name: predictedLabelName,
          category: richData.category || 'unknown',
          confidence: resultJson.confidence,
          description: richData.description || 'Tidak ada deskripsi',
          recyclingTips: richData.recyclingTips || [],
          disposalGuide: richData.disposalGuide || '-',
          decompositionTime: richData.decompositionTime || '-',
          economicValue: null
        };

        // Save to Database Model
        const historyItem = {
          id: uuidv4(),
          timestamp: new Date().toISOString(),
          imageBase64: thumbnailBase64, // frontend needs this for history view
          result: finalResult
        };

        HistoryModel.add(historyItem);

        // Return the history item so frontend can use the ID and result
        return res.status(200).json(historyItem);

      } catch (parseError) {
        console.error('Parse Error. Python Output:', outputData);
        return res.status(500).json({ error: 'Failed to parse AI output.' });
      }
    });

  } catch (error) {
    next(error);
  }
};
