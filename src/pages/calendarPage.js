// import format from 'date-fns/format'
// import parse from 'date-fns/parse'
// import startOfWeek from 'date-fns/startOfWeek'
// import getDay from 'date-fns/getDay'
import { useEffect , useState } from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import { fireStore } from '../firebase/config';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, {Draggable} from '@fullcalendar/interaction'
import ProfileIcon from '../components/profileIcon';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

import './calendarPage.scss'

import heLocale from "@fullcalendar/core/locales/he";

import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

// import "@fullcalendar/react/dist/s"

// const DnDCalendar = withDragAndDrop(Calendar);


// const now = new Date()

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  }
}));



function CalendarPage() {

  const [users, setUsers] = useState([]);

useEffect(() => {
  const usersRef = fireStore.collection('users');
  const unsubscribe = usersRef.onSnapshot((querySnapshot) => {
    const users = querySnapshot.docs.map((doc) => doc.data());
    setUsers(users);
  });
  return unsubscribe;
}, []);


  useEffect(() => {
      let draggableEl = document.getElementById("external-events");
      if(draggableEl){ 
        new Draggable(draggableEl, {
        itemSelector: ".fc-event",
        eventData: function(eventEl) {
          let title = eventEl.getAttribute("title");
          let id = eventEl.getAttribute("data");
          return {
            title: title,
            id: id,
            color: eventEl.style.backgroundColor
          };
        }
      });}
    
  },[])

  // const onEventDrop = ({ event, start, end, allDay }) => {
  //   console.log("event clicked");
  //   console.log(start, event, end, allDay);
  // };

 

	return (
		<div className="calender-page">
    {users && <Events users={users}/>}
    
    <FullCalendar
      height={`${document.documentElement.clientHeight - 300}px`}
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      locale={heLocale}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      }}
      initialView="dayGridMonth"
      droppable={true}
      // weekends={false}
      editable={true}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      eventDrop={console.log}

      events={[
        { title: 'event 1', date: '2021-08-01' },
        { title: 'event 2', date: '2021-08-02' }
      ]}
    />

		</div>
	)
}

export default CalendarPage


const Events = ({users})=>{
  const getStyle = (isStudent,specialty)=>{
    return ({
      backgroundColor:`hsl(${ isStudent ? 60 * specialty : 120 * specialty }, 70%, 60%)`,
      border: `${!isStudent ?'solid 3px gold' : ''}`
     });
  }

  // return  
  return <div id="external-events">{users.map((item)=> 
  <Chip
    avatar={<ProfileIcon id={item.uid} alt={item.name}/>}
    label={item.name}
    className="fc-event"
    key={item.uid} 
    title={item.name}
    variant={`${item.isStudent ?'' : 'outlined'}`}
    data={item.uid}
    style={getStyle(item.isStudent,item.specialty)}
  />)}
  </div>
  
  
  // <Chip className="fc-event" key={item.uid} title={item.name} data={item.uid}>{item.name}</Chip>) }
  // </div>
}