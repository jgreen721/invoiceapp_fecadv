import React, {useState, useEffect} from 'react'
import { calenderIcon, arrowLeft, arrowRight } from '../../../../const'
import { useLocalStorage } from '../../../../hooks/useLocalStorage'
import "./CalenderForm.css"

const CalenderForm = ({clearArtifacts}) => {
  const calenderMonths = [
    {id:1,name:"January",days:31},
    {id:2,name:"February",days:28},
    {id:3,name:"March",days:31},
    {id:4,name:"April",days:30},
    {id:5,name:"May",days:31},
    {id:6,name:"June",days:30},
    {id:7,name:"July",days:31},
    {id:8,name:"August",days:31},
    {id:9,name:"September",days:30},
    {id:10,name:"October",days:31},
    {id:11,name:"November",days:30},
    {id:12,name:"December",days:31},
  ]
  const [showSelect,setShowSelect] = useState(false);
  const [monthCount,setMonthCount] = useState(0);     // user selected month will be established via this workflow
  const {payload:dayPayload} = useLocalStorage("day",1,null)
  const {payload:monthPayload}= useLocalStorage("month","January",null)
  const {payload:yearPayload} = useLocalStorage("year",2021,null)
  const [day,setDay] = useState(dayPayload);
  const [month,setMonth] = useState(monthPayload);
  const [year,setYear] = useState(yearPayload);

    // ui purposes mainly
  const [uiYear,setUiYear] = useState(year);    //prevent undesired updates while user is selecting



  let calenderDays = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4]
      calenderDays = calenderDays.map((day,idx)=>({id:idx+1,value:day}))


      useEffect(()=>{
        setDay(dayPayload)
        setMonth(monthPayload)
        setYear(yearPayload)
      },[dayPayload,monthPayload,yearPayload])

      useEffect(()=>{
        if(day != 1 || year != 2021 || month != "January"){
          console.log('refactor the calender UI!')
          determineSelectedMonthCount(year,month)
        }
      },[])

      useEffect(()=>{
//user cleared form
        if(clearArtifacts){
          setDay(1);
          setYear(2021);
          setUiYear(2021)
          setMonth("January");
          setMonthCount(0);
          setShowSelect(false)
        }
      },[clearArtifacts])

      const determineSelectedMonthCount = (year,month)=>{
          // console.log(year,month)
          let tempCount = 0;
          if(year  == 2020){
            let monthIdx = calenderMonths.findIndex(c=>c.name == month);
            tempCount = monthIdx 
          }
          else{
            while(year != 2021){
              tempCount+=12
              year--
            }
            let monthIdx = calenderMonths.findIndex(c=>c.name == month);
            tempCount+= monthIdx;
          }
          tempCount = tempCount % 12;
          setMonthCount(tempCount);
      }


  const handleChangeMonth = (dir)=>{
    if(dir == "back"){
      if(calenderMonths[monthCount].name == "January" && year == 2020)return;
      if(monthCount == 0){
        setYear(year=>year=year-1)
      }
      setMonthCount((monthCount)=>monthCount > 0 ? monthCount-1 : 11)
    }
    else{
      if(calenderMonths[monthCount] == "December" && year == 2030)return;

      if(monthCount == 11){
        setYear(year=>year=year+1)
      }
      setMonthCount((monthCount)=>monthCount < 11 ? monthCount+1 : 0)


    }
  }

  const handleSelectDate=(e,day)=>{
    e.preventDefault();
        setMonth(calenderMonths[monthCount].name);
        setDay(day)
        setUiYear(year);
        setShowSelect(false)
        
  }

  
  return (
    <div className="calender-form-container custom-select-form-container form-div">
      <label className="form-label" htmlFor="date">
          Invoice Date
          <input type="hidden" name="date" value={JSON.stringify({year,day,month})} id="date" />
      </label>
      <div className="select-form-div">
        <h5>{day} {month} {uiYear}</h5>
        <button onClick={(e)=>{
          e.preventDefault()
          setShowSelect((showSelect)=>showSelect=!showSelect)
        }}
           className="transparent-btn">
          <img className="calender-icon" src={calenderIcon} alt="arrow-img" />
        </button>
      </div>

      <div className={showSelect ? "calender-select" : "calender-select hide-dropdown"}>
        <div className="calender-form-header">
          <button onClick={(e)=>{
            e.preventDefault()
            handleChangeMonth("back")}} className="transparent-btn calender-btn">
            <img src={arrowLeft} alt="" />
          </button>
          <p>{calenderMonths[monthCount].name} {year}</p>
          <button onClick={(e)=>{
            e.preventDefault()
            handleChangeMonth("forwards")}} className="transparent-btn calender-btn">
            <img src={arrowRight} alt="" />
          </button>
        </div>
      <ul className="calender-days">
        {calenderDays.map(d=>(
          <li onClick={(e)=>handleSelectDate(e,d.value)} key={d.id} className={d.id < calenderMonths[monthCount].days ? "day-item select-item" : "day-item muted-day-item"}>
            <p className={d.value == day ? "extra-bold" : ""}>{d.value}</p>
          </li>
        ))}
      </ul>
      </div>
    </div>
  )
}

export default CalenderForm