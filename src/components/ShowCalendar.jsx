import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {Link, useParams} from 'react-router-dom';
const ShowCalendar = () => {
    const endpoint = 'http://127.0.0.1:8000/api/calendar';
    const [event, setEvent] = useState([])
    const {id} = useParams()
    const cookie = new Cookies();
    const config = {
        headers: { Authorization: `Bearer ${cookie.get("at")}` }
    };
    useEffect(() => {
        const getEventById = async () => {
            const response = await axios.get(endpoint+"/"+id, config)
            console.log(response.data)
            setEvent(response.data)
           
        }
        getEventById()
    },[])


  return (
    <div className='container'>
        <div className='d-grid gap-2'>
            <Link to="/list" className='btn btn-primary btn-lg mt-2 mb-2 text-wthite'>Listado</Link>
        </div>
         <table className='table table-striped'>
            <tbody>
                <tr>
                    <th>Id</th>
                    <td>{event["id"]}</td>
                </tr>
                <tr>
                    <th>Evento</th>
                    <td>{event["name"]}</td>
                </tr>
                <tr>
                    <th>Descripcion</th>
                    <td>{event["description"]}</td>
                </tr>
                <tr>
                    <th>fecha inicio</th>
                    <td>{event["fecha_start"]}</td>
                </tr>
                <tr>
                    <th>fecha termino</th>
                    <td>{event["fecha_end"]}</td>
                </tr>
                <tr>
                    <th>Link</th>
                    <td><a href={event["html_link"]} target="_blank">{event["html_link"]}</a></td>
                </tr>
            </tbody>
        </table>

    </div>
  )
}

export default ShowCalendar