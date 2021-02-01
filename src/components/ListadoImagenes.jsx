import React from 'react';
import Imagen from './Imagenes';
import PropTypes from 'prop-types';

const ListadoImagenes = ({RespuetaBusqueda}) => {

    return (  
    <div className="col-12 p-5 row">
        {RespuetaBusqueda.map(imagen=>(
            <Imagen 
               key={imagen.id}
               imagen={imagen}
            />
        ))}
    </div>
    );
}
 
ListadoImagenes.propTypes = {
    RespuetaBusqueda:PropTypes.array.isRequired
}


export default ListadoImagenes;