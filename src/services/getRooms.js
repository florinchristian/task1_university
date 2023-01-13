import axios from "axios";
import {HOST, getRoomsPath as path} from "./paths";

const getRooms = async () => {
    const result = await axios.get(`${HOST}/${path}`);
    return result.data;
};

export default getRooms;