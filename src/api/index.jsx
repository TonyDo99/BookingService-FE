import axios from 'axios';

const API_HOST = 'http://localhost:4000/api';

export const fetchUser = async (navigate) => {
  try {
    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('accessKey')}`;
    const { data } = await axios.get(`${API_HOST}/user/listUsers`);
    return data;
  } catch (error) {
    console.log(`%c ${error}`, 'background: yellow; color: red');
    localStorage.clear();
    return navigate('/login', {
      replace: true,
    });
  }
};

export const login = async (dataForm) => {
  try {
    const { data } = await axios.post(`${API_HOST}/login`, dataForm);
    return data?.accessKey;
  } catch (error) {
    console.log(`%c ${error}`, 'background: yellow; color: red');
    return null;
  }
};

export const register = async (dataForm, setStatusRegister) => {
  try {
    const { data } = await axios.post(`${API_HOST}/user/signup`, dataForm);
    if (data) setStatusRegister(true);
    else setStatusRegister(false);
  } catch (error) {
    console.log(`%c ${error}`, 'background: yellow; color: red');
    setStatusRegister(false);
  }
};

// ------------------------------------- EVENT API *

export const fetchEvents = async (navigate) => {
  try {
    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('accessKey')}`;
    const { data } = await axios.get(`${API_HOST}/event/allEvents`);
    return data;
  } catch (error) {
    console.log(`%c ${error}`, 'background: yellow; color: red');
    localStorage.clear();
    return navigate('/login', {
      replace: true,
    });
  }
};

export const createEvent = async (formData, setStatusCreate) => {
  try {
    const { data } = await axios.post(`${API_HOST}/event/createEvent`, formData);
    if (data) return setStatusCreate(true);
    return setStatusCreate(false);
  } catch (error) {
    console.log(`%c ${error}`, 'background: yellow; color: red');
    return setStatusCreate(false);
  }
};

/** *
 * @param _id - the id of event
 * @param dataUpdate - the data update event, it's can be any, this case i'm update status published field
 */

export const updateEvent = async (_id, dataUpdate) => {
  try {
    await axios.patch(`${API_HOST}/event/updateEvent/${_id}`, dataUpdate);
  } catch (error) {
    console.log(`%c ${error}`, 'background: yellow; color: red');
  }
};

// ------------------------------------- TICKET API *

/** *
 *
 * @return [{ _id, name, description, price, quantity }] - List of tickets 
 * @example [{
        "_id": "f08029ba-cbf1-4bc7-98db-7715d726aa57",
        "name": "Ticket star",
        "description": "14:00-17:00",
        "price": 3000,
        "quantity": 99
    },]
 */

export const fetchListTickets = async () => {
  try {
    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('accessKey')}`;
    const { data } = await axios.get(`${API_HOST}/ticket/allTickets`);
    return data;
  } catch (error) {
    console.log(`%c ${error}`, 'background: yellow; color: red');
    return [];
  }
};

export const buyTicket = async (ticketId, formData) => {
  try {
    const { data } = await axios.patch(`${API_HOST}/ticket/updateTicket/${ticketId}`, formData);
    if (data) return true;
    return false;
  } catch (error) {
    console.log(`%c ${error}`, 'background: yellow; color: red');
    return false;
  }
};

/**
 * @param _id - specific id of the event
 * @return array of event object
 * @example [
 * {
      "_id": "f08029ba-cbf1-4bc7-98db-7715d726aa57",
      "name": "Ticket star",
      "description": "14:00-17:00",
      "price": 3000,
      "quantity": 99
      ticket: []
    },
  ]
 */

export const fetchEventById = async (_id) => {
  try {
    const { data } = await axios.get(`${API_HOST}/event/${_id}`);
    return data;
  } catch (error) {
    console.log(`%c ${error}`, 'background: yellow; color: red');
    return [];
  }
};

/**
 * @param setAuthen - authen state verify
 * @return - user information
 * @example {
    "_id": "54a22559-2b59-4d41-b044-837acc4b9436",
    "mobilePhone": "0826240270",
    "email": "dotanphat20@gmail.com",
    "fullName": "Dreamer",
    "role": "admin_user"
}
 */

export const findUser = async (navigate) => {
  try {
    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('accessKey')}`;
    const { data } = await axios.get(`${API_HOST}/user/find`);
    return data;
  } catch (error) {
    console.log(`%c ${error}`, 'background: yellow; color: red');
    localStorage.clear();
    return navigate('/login', {
      replace: true,
    });
  }
};
