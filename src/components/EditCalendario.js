import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'universal-cookie';

const EditCalendario = () => { 
    const endpoint = 'http://127.0.0.1:8000/api/calendar';
    const [summary, setSummary] = useState('')
    const {id} = useParams()
    const navigate = useNavigate();
    //console.log("id", id)
    const cookie = new Cookies();
    const config = {
        headers: { Authorization: `Bearer ${cookie.get("at")}` }
    };
    const update = async (e) => {
        e.preventDefault()
        await axios.put(endpoint+"/"+id,{
            summary: summary
        },config)
        navigate("/show")
    }
    useEffect( () => {
        const getProductById = async () => {
            const response = await axios.get(endpoint+"/"+id, config)
            setSummary(response.data["summary"])
        }
        getProductById()
    }, [])
    
    return (
        <div>
            <h3>Crear Evento</h3>
            <form onSubmit={update}>
                <div className='mb-3'>
                <label className='form-label'>Summary</label>
                <input value={summary} type="text" className='form-control'
                onChange={ (e) => setSummary(e.target.value)} 
                />
                
                <button type='submit' className='btn btn-primary'>Guardar</button>
                </div>
            </form>
        </div>
      )
    }

export default EditCalendario