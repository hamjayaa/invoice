// --- DATABASE PRODUK (DIPERBARUI) ---
const products = [
    { id: 'custom', name: '--- Produk/Layanan Kustom ---', price: 0 },
    { id: 'serum-sehat-ayu', name: 'Serum Sehat Ayu', price: 100000 },
    { id: 'facial-wash-sehat-ayu', name: 'Facial Wash Sehat Ayu', price: 60000 },
    { id: 'day-cream-sehat-ayu', name: 'Day Cream Sehat Ayu', price: 95000 },
    { id: 'night-cream-sehat-ayu', name: 'Night Cream Sehat Ayu', price: 95000 },
    { id: 'full-set-sehat-ayu', name: 'Full Set Sehat Ayu', price: 295000 },
    { id: 'zingering-krimer', name: 'Zingering Krimer 5 Sachet', price: 30000 },
    { id: 'natura-shark-carrilage', name: 'Natura Shark Cartillage', price: 150000 },
    { id: 'gamin-gathuk', name: 'Gamin Gathuk', price: 100000 },
    { id: 'sari-kurma-angkak', name: 'Sari Kurma Angkak', price: 45000 },
    { id: 'green-spirulina-natura', name: 'Green Spirulina Natura', price: 100000 },
    { id: 'new-kopi-radix-jumbo', name: 'New Kopi Radix Jumbo 32 sachet', price: 185000 },
    { id: 'minyak-bidara-mumtas', name: 'Minyak Bidara Mumtas', price: 30000 },
    { id: 'minyak-telon-mumtas', name: 'Minyak Telon Mumtas', price: 25000 },
    { id: 'madu-multifitora-mumtas', name: 'Madu Multifitora Mumtas', price: 90000 },
    { id: 'prima-spirulina-al-kautsar', name: 'Prima Spirulina Al Kautsar', price: 100000 },
    { id: 'antirac-60-kapsul', name: 'Antirac 60 kapsul', price: 150000 },
    { id: 'sj-2-60-kapsul', name: 'SJ-2 60 kapsul', price: 150000 },
    { id: 'elbume', name: 'Elbuma', price: 75000 },
    { id: 'rosso', name: 'Rosso', price: 100000 },
    { id: 'best-v', name: 'Best-V', price: 100000 },
    { id: 'langtugin', name: 'Langtugin', price: 100000 },
    { id: 'silangzing', name: 'Silangzing', price: 100000 },
    { id: 'curmaval', name: 'Curmaval', price: 100000 },
    { id: 'zozcov', name: 'ZozCov', price: 100000 },
    { id: 'minyak-herba-mumtas', name: 'Minyak Herba Mumtas (MHM) 100ml', price: 45000 },
    { id: 'diabevitto', name: 'Diabevitto', price: 100000 },
    { id: 'prima-spirulina-al-kautsar-new', name: 'Prima Spirulina Al Kautsar New', price: 100000 },
    { id: 'teh-morizen', name: 'Teh Morizen', price: 70000 },
    { id: 'teh-cenzvizt', name: 'Teh Cenzvizt', price: 70000 },
    { id: 'teh-zirzen', name: 'Teh Zirzen', price: 70000 },
    { id: 'wedang-uwuh-celup', name: 'Wedang Uwuh Celup 25 kantong celup', price: 70000 },
    { id: 'mumtas-shampoo', name: 'Mumtas Shampoo 170ml', price: 35000 },
    { id: 'mumtas-body-wash', name: 'Mumtas Body Wash 250ml', price: 35000 },
    { id: 'mumtas-mie-moringa-kuah-soto', name: 'Mumtas Mie - Moringa Kuah Soto', price: 10000 },
    { id: 'mumtas-mie-habbasuda-kuah-kari', name: 'Mumtas Mie - Habbasuda Kuah Kari', price: 10000 },
    { id: 'mumtas-mie-collagen-goreng', name: 'Mumtas Mie - Collagen Goreng', price: 10000 },
    { id: 'mumtas-mie-spirulina-goreng', name: 'Mumtas Mie - Spirulina Goreng Special', price: 10000 },
    { id: 'mumtazzio-gingerissimo-box', name: 'Mumtazzio Gingerissimo Box 5 sachet', price: 25000 },
    { id: 'mumtazzio-gingerissimo-botol', name: 'Mumtazzio Gingerissimo Botol 250ml', price: 75000 },
    { id: 'shark-oil-squa', name: 'Shark Oil Squa', price: 175000 },
    { id: 'v-radix', name: 'V Radix', price: 350000 }
];

const itemsBody = document.getElementById('items-body');
const ocrBtn = document.getElementById('ocr_extract');
const ocrFile = document.getElementById('ocr_file');
const ocrStatus = document.getElementById('ocr_status');
const logoUrlInput = document.getElementById('logo_url');
const logoFileInput = document.getElementById('logo_file');
const updatePreviewBtn = document.getElementById('update-preview');
const directPrintBtn = document.getElementById('direct-print');
const addRowBtn = document.getElementById('add-row');
const clearRowsBtn = document.getElementById('clear-rows');
const fillSampleBtn = document.getElementById('fill-sample');


// --- HELPER FUNCTIONS ---
function fmt(v, cur){
    if(cur==='USD'){return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(v);}  
    return new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(Math.round(v||0));
}

function escapeHtml(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

function toTitleCase(str) {
    if (!str) return '';
    return str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}

// --- ITEM ROW MANAGEMENT ---
function addRow(productId, qty, price, customDesc = ''){
    const tr = document.createElement('tr');
    const selectedProduct = products.find(p => p.id === productId);
    const productOptions = products.map(p => 
        `<option value="${p.id}" ${p.id === productId ? 'selected' : ''}>${escapeHtml(p.name)}</option>`
    ).join('');

    tr.innerHTML=`
      <td>
        <select class="i-prod-select">${productOptions}</select>
        <input class="i-desc-custom" type="text" placeholder="Deskripsi kustom..." value="${escapeHtml(customDesc)}" style="display:${productId === 'custom' ? 'block' : 'none'}; margin-top: 4px;">
      </td>
      <td><input class="i-qty" type="number" min="1" value="${qty || 1}"></td>
      <td><input class="i-price" type="number" min="0" value="${price ?? selectedProduct?.price ?? 0}"></td>
      <td class="right td-line">0</td>
      <td class="no-print"><button class="btn-del ghost small">hapus</button></td>`;
    itemsBody.appendChild(tr);

    const selectEl = tr.querySelector('.i-prod-select');
    const descCustomInput = tr.querySelector('.i-desc-custom');
    const qtyInput = tr.querySelector('.i-qty');
    const priceInput = tr.querySelector('.i-price');
    
    selectEl.addEventListener('change', () => {
        const selectedId = selectEl.value;
        const product = products.find(p => p.id === selectedId);
        if (product) {
            priceInput.value = product.price;
            descCustomInput.style.display = product.id === 'custom' ? 'block' : 'none';
            if (product.id === 'custom') descCustomInput.focus();
        }
        updatePreview();
    });

    [qtyInput, priceInput, descCustomInput].forEach(el => el.addEventListener('input', updatePreview));
    tr.querySelector('.btn-del').addEventListener('click',()=>{tr.remove();updatePreview();});
    
    updatePreview();
}

// --- LOGIC FUNCTIONS ---
function gatherData(){
    const currency=document.getElementById('currency').value||'IDR';
    const rows=[];
    itemsBody.querySelectorAll('tr').forEach(tr=>{
      const selectEl = tr.querySelector('.i-prod-select');
      let description = selectEl.value === 'custom' 
          ? tr.querySelector('.i-desc-custom').value 
          : selectEl.options[selectEl.selectedIndex].text;
      const q = Number(tr.querySelector('.i-qty').value) || 0;
      const p = Number(tr.querySelector('.i-price').value) || 0;
      rows.push({desc: description, qty: q, price: p, line: Math.round(q*p)});
    });
    return {
      logo_url: (document.getElementById('logo_url').value||'').trim(),
      from_name: document.getElementById('from_name').value,
      from_addr: document.getElementById('from_addr').value,
      from_hp: document.getElementById('from_hp').value,
      from_web: document.getElementById('from_web').value,
      to_name: document.getElementById('to_name').value,
      to_addr: document.getElementById('to_addr').value,
      to_hp: document.getElementById('to_hp').value,
      inv_no: document.getElementById('inv_no').value,
      inv_date: document.getElementById('inv_date').value || new Date().toISOString().slice(0,10),
      discount: Number(document.getElementById('discount').value)||0,
      taxrate: Number(document.getElementById('taxrate').value)||0,
      rows, currency
    };
}

function calcTotals(d){
    let subtotal=0;
    d.rows.forEach(r=>subtotal+=r.line);
    const disc=d.discount||0;
    const base=Math.max(0,subtotal-disc);
    const tax=Math.round(base*(d.taxrate/100));
    return {subtotal,discount:disc,tax,total:base+tax};
}
  
function buildInvoiceHTML(d){
    const t = calcTotals(d);
    const cur = d.currency;
    const rowsHTML = d.rows.map(r => `<tr style="font-size: 12.5px;"><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(r.desc)}</td><td style="padding:8px;border-bottom:1px solid #eee;width:70px" class="right">${r.qty}</td><td style="padding:8px;border-bottom:1px solid #eee;width:140px" class="right">${fmt(r.price, cur)}</td><td style="padding:8px;border-bottom:1px solid #eee;width:140px" class="right">${fmt(r.line, cur)}</td></tr>`).join('');
    
    const companyDetailsHTML = `
        <div style="line-height:1.6; max-width: 50%;">
            <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
                ${d.logo_url ? `<img src="${escapeHtml(d.logo_url)}" alt="Logo" style="width:52px; height:52px; object-fit:contain; border-radius:8px;"/>` : ''}
                <div style="font-weight:800; font-size:16px; color:var(--accent);">${escapeHtml(d.from_name)}</div>
            </div>
            <div style="white-space:pre-wrap;">${escapeHtml(d.from_addr)}</div>
            <div>${escapeHtml(d.from_hp)}</div>
            <div><a href="http://${escapeHtml(d.from_web)}" style="color:var(--accent); text-decoration:none;">${escapeHtml(d.from_web)}</a></div>
        </div>
    `;

    return `
      <div class="print-area">
        <div class="invoice-main-content">
          <div class="inv-header" style="padding-bottom: 20px; margin-bottom: 20px; border-bottom: 2px solid #eee; align-items: flex-start;">
            ${companyDetailsHTML}
            <div class="inv-meta" style="line-height:1.6;">
              <div style="font-weight:800;font-size:28px; color:#333;">INVOICE</div>
              <div style="margin-top:8px;"><strong>No. Invoice:</strong> ${escapeHtml(d.inv_no)}</div>
              <div><strong>Tanggal:</strong> ${escapeHtml(d.inv_date)}</div>
            </div>
          </div>

          <div style="margin-top:20px; line-height:1.6;">
              <div style="font-weight:700; color:var(--muted);">KEPADA:</div>
              <div style="margin-top:6px; font-weight:700;">${escapeHtml(d.to_name)}</div>
              <div style="white-space:pre-wrap;">${escapeHtml(d.to_addr)}</div>
              <div>${escapeHtml(d.to_hp)}</div>
          </div>
          
          <table style="width:100%;margin-top:24px;border-collapse:collapse">
            <thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #ddd">Deskripsi</th><th style="text-align:right;padding:8px;border-bottom:2px solid #ddd">Qty</th><th style="text-align:right;padding:8px;border-bottom:2px solid #ddd">Harga</th><th style="text-align:right;padding:8px;border-bottom:2px solid #ddd">Jumlah</th></tr></thead>
            <tbody>${rowsHTML}</tbody>
          </table>

          <div style="margin-top:12px;display:flex;justify-content:flex-end">
               <div style="width:320px">
                <div style="display:flex;justify-content:space-between;padding:6px 0"><div class="muted">Subtotal</div><div>${fmt(t.subtotal,cur)}</div></div>
                <div style="display:flex;justify-content:space-between;padding:6px 0"><div class="muted">Diskon</div><div>${fmt(t.discount,cur)}</div></div>
                <div style="display:flex;justify-content:space-between;padding:6px 0"><div class="muted">Pajak (${d.taxrate}%)</div><div>${fmt(t.tax,cur)}</div></div>
                <div style="border-top:1px solid #ddd;margin-top:8px;padding-top:8px;font-weight:700;display:flex;justify-content:space-between"><div>Total</div><div>${fmt(t.total,cur)}</div></div>
              </div>
          </div>
        </div>
        
        <div class="footer">
            <div style="padding-top: 12px; border-top: 1px solid #ddd; display: flex; justify-content: space-between; align-items: flex-start;">
                <div style="width: 50%; text-align: left; font-style:italic; color:var(--muted);">
                    Alhamdulillāh, Barakallah, Jazākallāhu Khairan.
                </div>
                <div style="width: 50%; text-align: right;">
                    <div style="font-weight:700;">Pembayaran ke:</div>
                    <div style="margin-top:6px">${escapeHtml(d.from_name)}</div>
                    <div style="margin-top:6px">Bank BSI • 7333318886</div>
                </div>
            </div>
        </div>
      </div>`;
}

function updatePreview(){
    const d=gatherData();
    document.getElementById('preview-wrap').innerHTML=buildInvoiceHTML(d);
    itemsBody.querySelectorAll('tr').forEach(tr=>{const q=Number(tr.querySelector('.i-qty').value)||0;const p=Number(tr.querySelector('.i-price').value)||0;tr.querySelector('.td-line').textContent=fmt(Math.round(q*p), d.currency);});
}

// --- EVENT HANDLERS ---
addRowBtn.addEventListener('click', () => addRow(products.find(p => p.id === 'custom').id));
clearRowsBtn.addEventListener('click', () => {itemsBody.innerHTML='';updatePreview();});
fillSampleBtn.addEventListener('click', () => {
    itemsBody.innerHTML='';
    addRow('mumtas-mie-moringa-kuah-soto', 2);
    addRow('natura-shark-carrilage', 1);
    addRow('serum-sehat-ayu', 1);
});

logoFileInput.addEventListener('change',(e)=>{
    const f=e.target.files&&e.target.files[0];
    if(!f)return;
    const r=new FileReader();
    r.onload=()=>{
        logoUrlInput.value=r.result;
        updatePreview(); /* Memastikan preview diperbarui saat logo lokal dimuat */
    };
    r.readAsDataURL(f);
});

updatePreviewBtn.addEventListener('click',updatePreview);

directPrintBtn.addEventListener('click', () => {
    updatePreview(); 
    
    const d = gatherData();
    const originalTitle = document.title;
    // Set title for PDF file name suggestion
    document.title = `${d.inv_no} - ${d.to_name}`;
    
    setTimeout(() => {
        window.print();
        // Restore original title after print dialog closes
        document.title = originalTitle;
    }, 100);
});


// --- GEMINI AI EXTRACTION LOGIC ---

// --- MENGHILANGKAN RETRY FUNCTION UNTUK MENINGKATKAN STABILITAS DI LINGKUNGAN YANG KETAT ---
async function callGeminiForInvoice(base64ImageData) {
    ocrStatus.textContent='🧠 Menganalisis gambar dengan Gemini AI (hanya ekstraksi visual)...';
    
    const apiKey = ""; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    const responseSchema = {
        type: "OBJECT",
        properties: {
            invoiceNumber: { type: "STRING" },
            clientName: { type: "STRING" },
            clientAddress: {
                type: "OBJECT",
                description: "Structured client address.",
                properties: {
                    street: { type: "STRING", description: "Detail jalan/RT/RW/gang/dusun." },
                    village: { type: "STRING", description: "Nama Desa/Kelurahan." },
                    district: { type: "STRING", description: "Nama Kecamatan." },
                    city: { type: "STRING", description: "Nama Kota/Kabupaten." },
                    province: { type: "STRING", description: "Nama Provinsi." },
                    zip: { type: "STRING", description: "Kode Pos (Diisi HANYA jika terlihat jelas di gambar)." }
                },
                required: ["city"] // Hanya wajib ada Kota
            },
            clientPhone: { type: "STRING" },
            invoiceDate: { type: "STRING", description: "Format YYYY-MM-DD" },
            items: {
                type: "ARRAY",
                items: {
                    type: "OBJECT",
                    properties: {
                        description: { type: "STRING" },
                        quantity: { type: "NUMBER" },
                        unitPrice: { type: "NUMBER" }
                    },
                    required: ["description", "quantity", "unitPrice"]
                }
            }
        },
        required: ["invoiceNumber", "clientName", "clientAddress", "items"]
    };
    
    // Instruksi untuk ekstraksi visual murni
    const userPrompt = `
      Analisis gambar ini. Ekstrak detailnya. 
      'kode transaksi' atau 'nomor pesanan' adalah nomor invoice. 
      Fokus pada: nomor invoice, nama klien (buat jadi ALL CAPS), nomor telepon, dan tanggal. 
      Untuk alamat klien, pecah menjadi komponen terstruktur: jalan/dusun/RT RW (street), desa/kelurahan (village), kecamatan (district), kota/kabupaten (city), provinsi (province), dan kode pos (zip). 
      HANYA isi Kode Pos (zip) jika Kode Pos terlihat jelas di gambar. JANGAN mencoba mencari Kodepos di Google.
      Tambahkan Kec., Kab., atau Kota di depan nama daerah yang sesuai.
      Pastikan semua nilai teks alamat (kecuali Nama Klien) adalah Title Case. 
      Ekstrak juga daftar lengkap barang (deskripsi, kuantitas, harga satuan). 
      Format output sebagai JSON sesuai skema.
    `;

    const payload = {
        contents: [{
            parts: [
                { text: userPrompt },
                { inlineData: { mimeType: "image/jpeg", data: base64ImageData } }
            ]
        }],
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: responseSchema
        }
    };

    try {
        // MENGHILANGKAN RETRY - LANGSUNG PANGGIL fetch
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`API request failed with status ${response.status}. Detail: ${errorBody.substring(0, 100)}...`);
        }

        const result = await response.json();
        const jsonText = result.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!jsonText) {
            const safetyIssue = result.candidates?.[0]?.safetyRatings?.some(r => r.probability !== 'NEGLIGIBLE');
            if (safetyIssue) {
                ocrStatus.textContent = '❌ Gagal menganalisis gambar karena alasan keamanan konten (Safety). Coba gambar lain.';
                return;
            }
            throw new Error("Respons API tidak valid atau kosong.");
        }
        
        const data = JSON.parse(jsonText);
        populateFormWithAIData(data);

    } catch (error) {
        console.error("Kesalahan saat memanggil Gemini AI:", error);
        ocrStatus.textContent = `❌ Gagal Ekstraksi: Status 403/401 di server. Coba muat ulang halaman atau gunakan gambar yang lebih jelas.`;
    }
}

function populateFormWithAIData(data) {
    if (!data) {
        ocrStatus.textContent = '⚠️ Data tidak ditemukan dari gambar.';
        return;
    }
    
    document.getElementById('inv_no').value = data.invoiceNumber || '';
    document.getElementById('to_name').value = data.clientName ? data.clientName.toUpperCase() : '';
    
    if (data.clientAddress) {
        const addr = data.clientAddress;
        
        // Helper function untuk menambahkan singkatan jika nilai ada
        const prefix = (value, p) => value ? `${p}. ${value}` : '';
        
        // Menentukan prefix Kota/Kabupaten
        let cityPrefix;
        if (addr.city) {
            const cityLower = addr.city.toLowerCase();
            if (cityLower.startsWith('kota')) {
                cityPrefix = 'Kota';
            } else if (cityLower.startsWith('kabupaten') || cityLower.startsWith('kab')) {
                cityPrefix = 'Kab';
            } else {
                cityPrefix = 'Kota/Kab'; // Jika tidak yakin, beri opsi umum
            }
        }

        const districtText = prefix(toTitleCase(addr.district), 'Kec');
        const cityText = addr.city ? prefix(toTitleCase(addr.city), cityPrefix) : '';
        
        // Baris 1: Jalan, Desa/Kelurahan
        const line1 = [toTitleCase(addr.street), toTitleCase(addr.village)].filter(Boolean).join(', ');
        // Baris 2: Kecamatan, Kota/Kabupaten
        const line2 = [districtText, cityText].filter(Boolean).join(', ');
        // Baris 3: Provinsi dan Kodepos
        const line3 = [toTitleCase(addr.province), addr.zip].filter(Boolean).join(' ') || '';
        
        document.getElementById('to_addr').value = [line1, line2, line3].filter(Boolean).join('\n');
    } else {
        document.getElementById('to_addr').value = ''; // Clear if no address is found
    }

    document.getElementById('to_hp').value = data.clientPhone || '';
    document.getElementById('inv_date').value = data.invoiceDate || new Date().toISOString().slice(0, 10);
    
    itemsBody.innerHTML = ''; // Clear existing items before populating
    
    if (data.items && data.items.length > 0) {
        data.items.forEach(item => {
            // Coba temukan produk yang cocok di daftar produk kita
            const matchedProduct = products.find(p => item.description && p.name.toLowerCase().includes(item.description.toLowerCase()));

            if (matchedProduct) {
                // Jika cocok, gunakan produk dari daftar kita
                addRow(matchedProduct.id, item.quantity, item.unitPrice, '');
            } else {
                // Jika tidak cocok, masukkan sebagai item kustom
                addRow('custom', item.quantity, item.unitPrice, item.description);
            }
        });
    } else {
        addRow(products.find(p => p.id === 'custom').id);
    }

    ocrStatus.textContent = '✅ Ekstraksi berhasil! Silakan periksa kembali data di bawah.';
    updatePreview();
}

ocrBtn.addEventListener('click', () => {
    const file = ocrFile.files && ocrFile.files[0];
    if (!file) {
        ocrStatus.textContent = 'Pilih file gambar terlebih dahulu.';
        return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
        const base64Data = reader.result.split(',')[1];
        callGeminiForInvoice(base64Data);
    };
    reader.readAsDataURL(file);
});
  
// --- INITIALIZATION ---
window.onload = function() {
    if(!document.getElementById('inv_date').value){
        document.getElementById('inv_date').value=new Date().toISOString().slice(0,10);
    }  
    // Pastikan elemen itemsBody ada sebelum memanggil addRow
    if (itemsBody) {
        addRow(products.find(p => p.id === 'custom').id);
    }
    updatePreview();
};
