import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'universal-cookie';

const EditCalendar = () => { 
    const endpoint = 'http://127.0.0.1:8000/api/calendar';
    const [error, setError] = useState('');
    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const {id} = useParams()
    const navigate = useNavigate();
    //console.log("id", id)
    const cookie = new Cookies();
    const config = {
        headers: { Authorization: `Bearer ${cookie.get("at")}` }
    };
    const update = async (e) => {
        e.preventDefault()
        const response = await axios.put(endpoint+"/"+id,{
            summary: summary,
            location: location, 
            description: description
        },config)
        if(response.data.status){
            navigate("/list")
        }else{
            setError('Debes completar los datos')
        }
        
    }
    useEffect(() => {
        const getEventById = async () => {
            const response = await axios.get(endpoint+"/"+id, config)
            setSummary(response.data["summary"])
            setLocation(response.data["location"])
            setDescription(response.data["description"])
        }
        getEventById()
    },[])
    
    return (
        <div className='container'>
            <h3>Crear Evento</h3>
            <form onSubmit={update}>
                <div className='mb-3'> 
                <label className='form-label'>Resumen</label>
                <input value={summary} type="text" className='form-control'
                onChange={ (e) => setSummary(e.target.value)} 
                placeholder="Resumen"/>
                <label className='form-label'>Localizacion</label>
                <input value={location} type="text" className='form-control'
                onChange={ (e) => setLocation(e.target.value)} 
                placeholder="Localizacion" />
                <label className='form-label'>Descripcion</label>
                <textarea value={description} type="text" className='form-control'
                onChange={ (e) => setDescription(e.target.value)} 
                placeholder="Descripcion"/>
                <br/>
                {
                    error != '' ? 
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div> : ''
                }
                <button type='submit' className='btn btn-primary'>Guardar</button>
                </div>
            </form>
        </div>
      )
    }

export default EditCalendar