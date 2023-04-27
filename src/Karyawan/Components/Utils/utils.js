export function hitungDurasi(date) {
    // Tanggal yang ingin dihitung durasinya
    const tanggal = new Date(date);
    
    // Tanggal hari ini
    const sekarang = new Date();
    
    // Selisih waktu dalam milidetik
    const selisih = sekarang.getTime() - tanggal.getTime();
    
    // Hitung jumlah tahun, bulan, dan hari
    const tahun = Math.floor(selisih / (1000 * 60 * 60 * 24 * 365));
    const bulan = Math.floor(selisih / (1000 * 60 * 60 * 24 * 30)) % 12;
    const hari = Math.floor(selisih / (1000 * 60 * 60 * 24)) % 30;
    
    // Buat format string untuk menampilkan hasil
    let hasil = '';
    if (tahun > 0) hasil += `${tahun} tahun `;
    if (bulan > 0) hasil += `${bulan} bulan `;
    if (hari > 0) hasil += `${hari} hari `;
    
    // Tampilkan hasil
    return `${hasil}`
  }
  

  export function mergerArray(array1, array2, prop) {
    return array2.map(function (item2) {
        var item1 = array1.find(function (item1) {
            return item1[prop] === item2[prop];
        });
        return Object.assign({}, item1, item2);
    });
}