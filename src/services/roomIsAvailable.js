import axios from 'axios';
import {HOST, checkRoomAvailabilityPath as path} from "./paths";

const roomIsAvailable = async (roomId, startTime, endTime) => {
    const result = await axios.get(`${HOST}/${path}`, {
        params: {
            roomId,
            startTime,
            endTime
        }
    });

    return result.data;
};

export default roomIsAvailable;