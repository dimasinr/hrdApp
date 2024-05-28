import ReactPaginate from 'react-paginate';

export function PaginationTable(props) {
  return (
    <ReactPaginate
      previousLabel={'previous'}
      nextLabel={'next'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={props.pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={props.handlePageClick}
      containerClassName={'pagination'}
      subContainerClassName={'pages pagination'}
      activeClassName={'active'}
    />
  );
}

export function datesUpt(dates){
    const date = new Date(dates);

    const options = { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    };

    const formattedDate = date.toLocaleDateString('id-ID', options);
    return formattedDate
  }

export function workHour(hour){
    let timeString = hour.toString();
    if (timeString.length === 3) {
      timeString = "0" + timeString; // tambahkan 0 di depan string jika panjangnya 3 karakter
    }

    const hours = timeString.slice(0, 2);
    const minutes = timeString.slice(2);

    const formattedTime = hours.concat(":", minutes);
    return formattedTime;
  }

export function totalWorkHour(value){
    let totalwork = 0
    
    if(value !== 0){
      totalwork = value
    }
    let timeString = totalwork.toString();

    if (timeString.length === 3) {
      timeString = "0" + timeString; 
    }

    const hours = timeString.slice(0, -2);
    const minutes = timeString.slice(-2);

    if (hours.length === 0) {
      const formattedTime = hours.concat(minutes, " Menit");
      return formattedTime
    }else if (minutes === "00") {
      const formattedTime = hours.concat(" Jam");
      return formattedTime
    } else {
      const formattedTime = hours.concat(".", minutes, " Jam");
      return formattedTime
    }
  }

export function totalWorking(hourTotal) {
    let jam = Math.floor(hourTotal / 100); 
    let menit = hourTotal % 100; 
    let waktu; 
  
    if (jam > 0 && menit > 0) {
      waktu = jam + '.' + (menit < 10 ? '0' + menit : menit) + ' Jam';
    } else if (jam > 0 && menit === 0) {
      waktu = jam + '.00 Jam';
    } else if (jam === 0 && menit > 0) {
      waktu = menit + ' Menit';
    } else {
      waktu = '0 Menit';
    }
  
    return waktu;
  }

export function changeDayName(hari) {
  switch(hari) {
    case 'Sunday':
      return 'Minggu';
    case 'Monday':
      return 'Senin';
    case 'Tuesday':
      return 'Selasa';
    case 'Wednesday':
      return 'Rabu';
    case 'Thursday':
      return 'Kamis';
    case 'Friday':
      return 'Jumat';
    case 'Saturday':
      return 'Sabtu';
    default:
      return hari;
  }
}