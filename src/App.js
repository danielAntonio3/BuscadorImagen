import React,{useState,useEffect} from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';



function App() {

  const [busquedaImg, setBusquedaImg] = useState('');
  const [RespuetaBusqueda, setRespuetaBusqueda] = useState([]);

  // para el paginado 
  const [paginasActuales,guardarPaginaActual] = useState(1);
  const [totalPaginas,guardarTotalPagina] = useState(1);



  useEffect(() => {
    const ConsulatarApi = async ()=>{
      //para evitar que carge la primer vez
        if(busquedaImg === ''){
            return;
          }

      const imagenesPorPagina = 30;
      const key = '17461423-99f3fc093eadbb45c08ec43bd';
    
      const url= `https://pixabay.com/api/?key=${key}&q=${busquedaImg}&per_page=${imagenesPorPagina}&page=${paginasActuales}`;


      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      setRespuetaBusqueda(resultado.hits);

      //calcular la paginacion 

      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);

      guardarTotalPagina(calcularTotalPaginas);

      //mover la apantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
          
      jumbotron.scrollIntoView({behavior:'smooth'});

    }
    
    ConsulatarApi();
  }, [busquedaImg,paginasActuales]);


  const paginaAnteriro = ()=>{
    const nuevaPaginaActual = paginasActuales-1;

    if(nuevaPaginaActual === 0) return;

    guardarPaginaActual(nuevaPaginaActual);

  } 

  const paginaSiguiente = ()=>{

    const nuevaPaginaActual = paginasActuales+1;

    if(nuevaPaginaActual > totalPaginas) return;

    guardarPaginaActual(nuevaPaginaActual);

  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        
        <Formulario
          setBusquedaImg={setBusquedaImg}
        />
        
        <div className="row justify-content-center">
            <ListadoImagenes
              RespuetaBusqueda={RespuetaBusqueda}
            />
        </div>        

        {(paginasActuales === 1)?null:<button 
          type="button"
          className="btn btn-info mr-1"
          onClick={paginaAnteriro}
          >&laquo; Anteriros</button>}
        
        {(paginasActuales === totalPaginas)?null:
        <button 
          type="button"
          className="btn btn-info"
          onClick={paginaSiguiente}
          >Siguiente &raquo;</button>}
      </div>
    </div>
  );
}

export default App;
