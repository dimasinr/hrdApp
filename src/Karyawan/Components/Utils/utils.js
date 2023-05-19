export function hitungDurasi(date) {
    const tanggal = new Date(date);
    
    const sekarang = new Date();
    
    const selisih = sekarang.getTime() - tanggal.getTime();
    
    const tahun = Math.floor(selisih / (1000 * 60 * 60 * 24 * 365));
    const bulan = Math.floor(selisih / (1000 * 60 * 60 * 24 * 30)) % 12;
    const hari = Math.floor(selisih / (1000 * 60 * 60 * 24)) % 30;
    
    let hasil = '';
    if (tahun > 0) hasil += `${tahun} tahun `;
    if (bulan > 0) hasil += `${bulan} bulan `;
    if (hari > 0) hasil += `${hari} hari `;
    
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