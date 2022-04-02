import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie';
import {Link} from 'react-router-dom'
const ShowCalendario = () => {
    const [events, setEvents] = useState([]);
    const cookie = new Cookies();
    const endpoint = 'http://127.0.0.1:8000/api/calendar';
    useEffect (() => {
        getAllEvents();
    }, []);
    const getAllEvents = async () => {
        console.log(cookie.get("at"));
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
        const config = {
            headers: { Authorization: `Bearer ${cookie.get("at")}` }
        };
        await axios.delete(endpoint+"/"+id, config)
        getAllEvents()
    }
    const editEvents = () => {

    }
  return (
    <div>
        <div className='d-grid gap-2'>
            <Link to="/create" className='btn btn-success btn-lg mt-2 mb-2 text-wthite'>Create</Link>
        </div>
    <table className='table table-striped'>
        <thead className='bg-primary text-white'>
        <tr>
            <th>Evento</th>
            <th>Descripcion</th>
            <th>fecha inicio</th>
            <th>fecha termino</th>
            <th>Acciones</th>
        </tr>
        </thead>
        <tbody>
            {events.map((event) => (
                <tr key={event["id"]}>
                    <td>{event["name"]}</td>
                    <td>{event["summary"]}</td>
                    <td>{event["fecha_inicio"]}</td>
                    <td>{event["fecha_termino"]}</td>
                    <td>
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

export default ShowCalendario