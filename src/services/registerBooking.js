import axios from 'axios';
import {HOST, postBookingsPath as path} from "./paths";

const registerBooking = async (roomId, startTime, endTime) => {
    const result = await axios.post(`${HOST}/${path}`, {
        roomId,
        startTime,
        endTime
    });

    return result.data;
};

export default registerBooking;