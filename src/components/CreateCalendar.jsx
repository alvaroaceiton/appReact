import React, {useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie';

const endpoint = 'http://127.0.0.1:8000/api/calendar';
const cookie = new Cookies();

const CreateCalendar = () => {
    const [error, setError] = useState('');
    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const navigate = useNavigate();
    const store = async (e) => {
        e.preventDefault()
        const config = {
            headers: { Authorization: `Bearer ${cookie.get("at")}` }
        };
        console.log(config);
        const response = await axios.post(endpoint, 
            { summary: summary, location: location, description: description}, 
            config)
        if(response.data.status){
            navigate('/list')
        }else{
            if(response.data.error){
                for(let i in response.data.error){
                    console.log(i,':', response.data.error[i][0]);
                }
                setError('Debes completar los datos')
            }
        }
    }
  return (
    <div className='container'>
        <div className='d-grid gap-2'>
            <Link to="/list" className='btn btn-primary btn-lg mt-2 mb-2 text-wthite'>Listado</Link>
        </div>
        <h3>Crear Evento</h3>
        <form onSubmit={store}>
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

export default CreateCalendar