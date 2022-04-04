import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {Link} from 'react-router-dom';
const ShowCalendar = () => {
    const [events, setEvents] = useState([]);
    const cookie = new Cookies();
    const endpoint = 'http://127.0.0.1:8000/api/calendar';
    useEffect (() => {
        getAllEvents();
    }, []);
    const getAllEvents = async () => {
        const config = {
            headers: { Authorization: `Bearer ${cookie.get("at")}` }
        };
        console.log(config);
        await axios.get(
            endpoint,
            config
        ).then((response) => {
            console.log(response);
            setEvents(response.data);
          }, (error) => {
            console.log(error);
          });
    }
    const deleteEvent = async (id) => {
        console.log(id)
        const config = {
            headers: { Authorization: `Bearer ${cookie.get("at")}` }
        };
        await axios.delete(endpoint+"/"+id, config)
        getAllEvents()
    }
  return (
    <div className='container'>
        <div className='d-grid gap-2'>
            <Link to="/create" className='btn btn-success btn-lg mt-2 mb-2 text-wthite'>Crear</Link>
        </div>
    <table className='table table-striped'>
        <thead className='bg-primary text-white'>
        <tr>
            <th>Id</th>
            <th>Resumen evento</th>
            <th>Localizacion</th>
            <th>Descripcion</th>
            <th>fecha inicio</th>
            <th>fecha termino</th>
            <th>Acciones</th>
        </tr>
        </thead>
        <tbody>
            {events.map((event) => (
                <tr key={event["id"]}>
                    <td>{event["id"]}</td>
                    <td>{event["summary"]}</td>
                    <td>{event["location"]}</td>
                    <td>{event["description"]}</td>
                    <td>{event["fecha_start"]}</td>
                    <td>{event["fecha_end"]}</td>
                    <td>
                        <Link to={"/show/"+event["id"]} className="btn btn-primary">Ver</Link>
                        <Link to={"/edit/"+event["id"]} className="btn btn-warning">Editar</Link>
                        <button onClick={ () => deleteEvent(event["id"]) } className="btn btn-danger">Eliminar</button>
                    </td>
                </tr>           
            ))}
        </tbody>
    </table>
    </div>
  )
}

export default ShowCalendar