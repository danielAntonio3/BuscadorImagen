import React,{useState} from 'react';
import Error from './Error';
import PropTypes from 'prop-types';

const Formulario = ({setBusquedaImg}) => {

    const [busqueda, setBusqueda] = useState('');
    const [error, setError] = useState(false);



    const buscarImagen= e=>{
       e.preventDefault();

       //validamos 
        if(busqueda.trim() === ''){
            setError(true);return;
        }

        setError(false);
       //enviamos a componente principal
       setBusquedaImg(busqueda);
    };




    return ( 
    <form 
    onSubmit={buscarImagen}
    >
        <div className="row">
            <div className=" form-group col-md-8">
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Buscador de imágenes, ejemplo: autos o paisajes"
                    onChange={e=>setBusqueda(e.target.value)}
                    />
            </div>

            <div className=" form-group col-md-4">
                <input
                    type="submit"
                    className="btn btn-lg btn-info btn-block"
                    value="Buscar"
                    />
            </div>
        </div>

        {error? <Error mensaje="Agrega un termino de búsqueda" /> :null}

    </form>



     );
}


Formulario.propTypes={
    setBusquedaImg: PropTypes.func.isRequired
}
 
export default Formulario;