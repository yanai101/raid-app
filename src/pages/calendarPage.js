// import format from 'date-fns/format'
// import parse from 'date-fns/parse'
// import startOfWeek from 'date-fns/startOfWeek'
// import getDay from 'date-fns/getDay'
import { useEffect } from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, {Draggable} from '@fullcalendar/interaction'
import './calendarPage.scss'

import heLocale from "@fullcalendar/core/locales/he";

import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

// import "@fullcalendar/react/dist/s"
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";// a plugin!


// const locales = {
//   'he_IL': require('date-fns/locale/he'),
// }
// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// })

// const DnDCalendar = withDragAndDrop(Calendar);


// const now = new Date()

const myEventsList = [
  {
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2021, 8, 0),
    end: new Date(2021, 8, 1),
  },
  {
    id: 1,
    title: 'Long Event',
    start: new Date(2021, 8, 7),
    end: new Date(2021, 8, 10),
  },

  {
    id: 2,
    title: 'DTS STARTS',
    start: new Date(2016, 2, 13, 0, 0, 0),
    end: new Date(2016, 2, 20, 0, 0, 0),
  },

  {
    id: 3,
    title: 'DTS ENDS',
    start: new Date(2016, 10, 6, 0, 0, 0),
    end: new Date(2016, 10, 13, 0, 0, 0),
  },

  {
    id: 4,
    title: 'Some Event',
    start: new Date(2021, 8, 9, 0, 0, 0),
    end: new Date(2021, 8, 10, 0, 0, 0),
  },
  {
    id: 5,
    title: 'Conference',
    start: new Date(2021, 8, 11),
    end: new Date(2021, 8, 13),
    desc: 'Big conference for important people',
  },
  {
    id: 6,
    title: 'Meeting',
    start: new Date(2021, 8, 12, 10, 30, 0, 0),
    end: new Date(2021, 8, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting',
  },
  {
    id: 7,
    title: 'Lunch',
    start: new Date(2021, 8, 12, 12, 0, 0, 0),
    end: new Date(2021, 8, 12, 13, 0, 0, 0),
    desc: 'Power lunch',
  },
  {
    id: 8,
    title: 'Meeting',
    start: new Date(2021, 8, 12, 14, 0, 0, 0),
    end: new Date(2021, 8, 12, 15, 0, 0, 0),
  },
  {
    id: 9,
    title: 'Happy Hour',
    start: new Date(2021, 8, 12, 17, 0, 0, 0),
    end: new Date(2021, 8, 12, 17, 30, 0, 0),
    desc: 'Most important meal of the day',
  },
  {
    id: 10,
    title: 'Dinner',
    start: new Date(2021, 8, 12, 20, 0, 0, 0),
    end: new Date(2021, 8, 12, 21, 0, 0, 0),
  },
  {
    id: 11,
    title: 'Planning Meeting with Paige',
    start: new Date(2021, 8, 13, 8, 0, 0),
    end: new Date(2021, 8, 13, 10, 30, 0),
  },
  {
    id: 11.1,
    title: 'Inconvenient Conference Call',
    start: new Date(2021, 8, 13, 9, 30, 0),
    end: new Date(2021, 8, 13, 12, 0, 0),
  },
  {
    id: 11.2,
    title: "Project Kickoff - Lou's Shoes",
    start: new Date(2021, 8, 13, 11, 30, 0),
    end: new Date(2021, 8, 13, 14, 0, 0),
  },
  {
    id: 11.3,
    title: 'Quote Follow-up - Tea by Tina',
    start: new Date(2021, 8, 13, 15, 30, 0),
    end: new Date(2021, 8, 13, 16, 0, 0),
  },
  {
    id: 12,
    title: 'Late Night Event',
    start: new Date(2021, 8, 17, 19, 30, 0),
    end: new Date(2021, 8, 18, 2, 0, 0),
  },
  {
    id: 12.5,
    title: 'Late Same Night Event',
    start: new Date(2021, 8, 17, 19, 30, 0),
    end: new Date(2021, 8, 17, 23, 30, 0),
  },
  {
    id: 13,
    title: 'Multi-day Event',
    start: new Date(2021, 8, 20, 19, 30, 0),
    end: new Date(2021, 8, 22, 2, 0, 0),
  },
  {
    id: 14,
    title: 'Today',
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
  },
  {
    id: 16,
    title: 'Video Record',
    start: new Date(2021, 8, 14, 15, 30, 0),
    end: new Date(2021, 8, 14, 19, 0, 0),
  },
  {
    id: 17,
    title: 'Dutch Song Producing',
    start: new Date(2021, 8, 14, 16, 30, 0),
    end: new Date(2021, 8, 14, 20, 0, 0),
  },
  {
    id: 18,
    title: 'Itaewon Halloween Meeting',
    start: new Date(2021, 8, 14, 16, 30, 0),
    end: new Date(2021, 8, 14, 17, 30, 0),
  },
  {
    id: 19,
    title: 'Online Coding Test',
    start: new Date(2021, 8, 14, 17, 30, 0),
    end: new Date(2021, 8, 14, 20, 30, 0),
  },
  {
    id: 20,
    title: 'An overlapped Event',
    start: new Date(2021, 8, 14, 17, 0, 0),
    end: new Date(2021, 8, 14, 18, 30, 0),
  },
  {
    id: 21,
    title: 'Phone Interview',
    start: new Date(2021, 8, 14, 17, 0, 0),
    end: new Date(2021, 8, 14, 18, 30, 0),
  },
  {
    id: 22,
    title: 'Cooking Class',
    start: new Date(2021, 8, 14, 17, 30, 0),
    end: new Date(2021, 8, 14, 19, 0, 0),
  },
  {
    id: 23,
    title: 'Go to the gym',
    start: new Date(2021, 8, 14, 18, 30, 0),
    end: new Date(2021, 8, 14, 20, 0, 0),
  },
]


function CalendarPage() {

  // const onEventDrop = ({ event, start, end, allDay }) => {
  //   console.log("event clicked");
  //   console.log(start, event, end, allDay);
  // };

 

	return (
		<div>
    <Events/>
    <FullCalendar
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


const Events = ()=>{
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
        };
      }
    });}
  
  })

  return <div id="external-events"> 
  {myEventsList.map((item, index)=> <div style={{width: '150px'}} className="fc-event" key={item.id} title={item.title} data={item.id}>{item.title}</div>)}
  </div>
}