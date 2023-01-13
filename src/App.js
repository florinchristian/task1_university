import './App.css';
import {useEffect, useState} from "react";
import getRooms from "./services/getRooms";
import roomIsAvailable from "./services/roomIsAvailable";
import registerBooking from "./services/registerBooking";

const minimumSeconds = 60 * 60;
const maximumSeconds = 4 * minimumSeconds;

function App() {
    const [rooms, setRooms] = useState([]);

    const [selectedRoom, setSelectedRoom] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const bookRoom = async () => {
        const isAvailable = await roomIsAvailable(selectedRoom, startTime, endTime);

        if (!isAvailable) {
            alert("The selected room is not available in the selected time interval");
            return;
        }


        const _startTime = new Date(startTime);
        const _endTime = new Date(endTime);

        if (_startTime > _endTime) {
            alert("The end time must be after the start time");
            return;
        }

        const diff = (_endTime.getTime() - _startTime.getTime()) / 1000;

        if (!(diff >= minimumSeconds && diff <= maximumSeconds)) {
            alert("You can book a room from one to four hours only");
            return;
        }

        await registerBooking(selectedRoom, startTime, endTime);
        window.location.reload();
    };

    const fetchRooms = async () => {
        const rooms = await getRooms();
        setSelectedRoom('1');
        setRooms(rooms);
    };

    const renderRoomOptions = () => {
        return rooms.map(room => (
            <option key={room['id']} value={room['id']}>{room['name']}</option>
        ));
    }

    useEffect(() => {
        fetchRooms();
    }, []);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
        }}>
            <h1>ACE UCV Craiova</h1>

            <p>Select your room:</p>

            <select onChange={event => setSelectedRoom(event.target.value)} value={selectedRoom}>
                {renderRoomOptions()}
            </select>

            <input onChange={event => setStartTime(event.target.value)} type={'datetime-local'} value={startTime}/>
            <input onChange={event => setEndTime(event.target.value)} type={'datetime-local'} value={endTime}/>

            <button onClick={bookRoom}>Book</button>
        </div>
    );
}

export default App;
