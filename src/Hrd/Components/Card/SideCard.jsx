import React from "react"
import { CircularProgress } from "@mui/material"
import { datesUpt } from "../../../Components/utilsFunction/functionUtils";

var dates = new Date().getFullYear()
var startDate = new Date(`01/01/${dates}`);
var endDate = new Date(`12/31/${dates}`);
var numOfDates = getBusinessDatesCount(startDate,endDate);

function getBusinessDatesCount(startDate, endDate) {
    let count = 0;
    const curDate = new Date(startDate.getTime());
    while (curDate <= endDate) {
        const dayOfWeek = curDate.getDay();
        if(dayOfWeek !== 0 && dayOfWeek !== 6) count++;
        curDate.setDate(curDate.getDate() + 1);
    }
    return count;
}

const dayPerc = numOfDates*800

function percentage(x, y){
    return (x/y*100)
  }

export const SideCardLow = ({ data, loading }) => {

return <div className="col-md-12 mb-2">
        <div className="card shadow-card" style={{ border:'none' }}>
            <div className="card-title text-center top_card_color">5 Bottom Presence</div>
            <div className="card-body">
                <ol>
                    {loading && loading ?
                    <React.Fragment>
                    {data.map((lowEmp, index) =>{
                        return(
                            <li key={index}>
                                <div className='d-flex justify-content-between'>
                                <span>{lowEmp.name.toString().length > 10 ? lowEmp.name.toString().slice(0,10) + '...' : lowEmp.name}</span>
                                <span className='text-danger'>{percentage(lowEmp.working_hour, dayPerc).toString().slice(0,5)}%</span>
                                </div>
                            </li>
                        )
                    })
                    }
                    </React.Fragment>
                    :
                    <CircularProgress />  
                    }
                </ol>
            </div>
        </div>
    </div>
}

export const SideCardTop = ({ data, loading }) => {

return <div className="col-md-12 mb-2">
    <div className="card shadow-card" style={{ border:'none' }}>
        <div className="card-title text-center top_card_color">Top 5 Presence</div>
            <div className="card-body">
                <ol>
                {loading && loading ?
                    <React.Fragment>
                    {data.map((top, index) =>{
                        return(
                            <li key={index}>
                                <div className='d-flex justify-content-between'>
                                <span>{top.name.toString().length > 10 ? top.name.toString().slice(0,10) + '...' : top.name}</span>
                                <span className='text-success'>{percentage(top.working_hour, dayPerc).toString().slice(0,5)}%</span>
                                </div>
                            </li>
                        )
                    })
                    }
                    </React.Fragment>
                    :
                    <CircularProgress />  
                    }
                </ol>
            </div>
        </div>
    </div>
}

export const SideCardBirthday = ({ data, loading }) => {

    return <div className="col-md-12 mb-2">
        <div className="card shadow-card" style={{ border:'none' }}>
            <div className="card-title text-center top_card_color">Employee Birthday</div>
                <div className="card-body">
                    <ol>
                    {loading && loading ?
                        <React.Fragment>
                        {data ? data.map((employee, index) =>{
                            return(
                                <li key={index}>
                                    <div className='d-flex justify-content-between'>
                                    <span>{employee.name.toString().length > 10 ? employee.name.toString().slice(0,10) + '...' : employee.name}</span>
                                    <span className='text-secondary'>{datesUpt(employee.birth_date)}</span>
                                    </div>
                                </li>
                            )
                        }) : <small className="text-secondary">Tidak ada yang berulang tahun bulan ini</small>
                        }
                        </React.Fragment>
                        :
                        <CircularProgress />  
                        }
                    </ol>
                </div>
            </div>
        </div>
    }