import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie';

const endpoint = 'http://127.0.0.1:8000/api/calendar';
const cookie = new Cookies();

const CreateCalendario = () => {
    const [summary, setSummary] = useState('');
    const navigate = useNavigate();
    const store = async (e) => {
        e.preventDefault()
        const config = {
            headers: { Authorization: `Bearer ${cookie.get("at")}` }
        };
        console.log(config);
        await axios.post(endpoint, { summary: summary}, config)
        navigate('/show')
    }
  return (
    <div>
        <h3>Crear Evento</h3>
        <form onSubmit={store}>
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

export default CreateCalendario