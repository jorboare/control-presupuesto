import React, { useState, useEffect } from 'react';
import Pregunta from './components/Pregunta'
import Formulario from './components/Formulario'
import Listado from './components/Listado'
import ControlPresupuesto from './components/ControlPresupuesto'

function App() {

  //Definir State

  const [presupuesto, guardarPresupuesto] = useState(0)
  const [restante, guardarRestante] = useState(0)
  const [mostrarPregunta, actualizarPregunta] = useState(true)
  const [gastos, guardarGastos] = useState([])
  const [gasto, guardarGasto] = useState({})
  const [creargasto, guardarCrearGasto] = useState(false)


  //UseEffect que actualiza el restante
  useEffect(() => {
    if (creargasto) {
      guardarGastos([
        ...gastos,
        gasto
      ])

      //resta del presupuesto actuao
      const presupuestoRestante = restante - gasto.cantidad
      guardarRestante(presupuestoRestante)

      //resetear a False
      guardarCrearGasto(false)

    }
  }, [gasto, creargasto, gastos, restante])


  // Cuando agreguemos un nuevo gasto
  const agregarNuevoGasto = gasto => {
    guardarGastos([
      ...gastos,
      gasto
    ])
  }


  return (
    <div className="container">
      <header>
        <h1>Gasto Semanal</h1>

        <div className="contenido-principal contenido">
          {mostrarPregunta ? (
            <Pregunta
              guardarPresupuesto={guardarPresupuesto}
              guardarRestante={guardarRestante}
              actualizarPregunta={actualizarPregunta} />

          ) :
            (

              <div className="row">
                <div className="one-half column">
                  <Formulario

                    guardarGasto={guardarGasto}
                    guardarCrearGasto={guardarCrearGasto} />
                </div>
                <div className="one-half column">
                  <Listado
                    gastos={gastos}
                  />
                  <ControlPresupuesto
                    presupuesto={presupuesto}
                    restante={restante}
                  />
                </div>
              </div>
            )}

        </div>
      </header>
    </div>
  );
}

export default App;
