import { useState } from "react";
import { Box, Heading, Stack, Separator } from "@chakra-ui/react";
import { useGastos } from "./hooks/useGastos";
import {
  Layout,
  FormularioGasto,
  ListaGastos,
  ResumenMensual,
  SelectorMes,
} from "./components";
import { GastoFormData } from "./types/gasto.types";

function App() {
  const {
    gastos,
    agregarGasto,
    eliminarGasto,
    filtrarGastos,
    obtenerResumenMensual,
    mesesDisponibles,
  } = useGastos();

  const [mesSeleccionado, setMesSeleccionado] = useState<string>("");

  // Obtener gastos filtrados
  const gastosFiltrados = mesSeleccionado
    ? filtrarGastos({ mes: mesSeleccionado })
    : gastos;

  // Obtener resumen del mes seleccionado
  const resumen = mesSeleccionado
    ? obtenerResumenMensual(mesSeleccionado)
    : {
        mes: "",
        total: gastos.reduce((sum, g) => sum + g.importe, 0),
        cantidad: gastos.length,
        gastos,
        porCategoria: gastos.reduce((acc, gasto) => {
          acc[gasto.categoria] = (acc[gasto.categoria] || 0) + gasto.importe;
          return acc;
        }, {} as Record<string, number>),
      };

  const handleAgregarGasto = (formData: GastoFormData) => {
    agregarGasto(formData);
  };

  const handleEliminarGasto = (id: string) => {
    eliminarGasto(id);
  };

  return (
    <Layout title="Gastos del Hogar">
      <Stack direction="column" gap={{ base: 6, md: 8 }} align="stretch">
        {/* Sección: Agregar Gasto */}
        <Box>
          <Heading
            as="h2"
            size="lg"
            mb={4}
            color="gray.700"
          >
            Registrar Nuevo Gasto
          </Heading>
          <FormularioGasto onSubmit={handleAgregarGasto} />
        </Box>

        <Separator />

        {/* Sección: Resumen y Filtros */}
        <Box>
          <Heading
            as="h2"
            size="lg"
            mb={4}
            color="gray.700"
          >
            Resumen
          </Heading>

          {/* Selector de Mes */}
          {mesesDisponibles.length > 0 && (
            <Box mb={4}>
              <SelectorMes
                mesesDisponibles={mesesDisponibles}
                mesSeleccionado={mesSeleccionado}
                onChange={setMesSeleccionado}
              />
            </Box>
          )}

          {/* Resumen Mensual */}
          <ResumenMensual resumen={resumen} />
        </Box>

        <Separator />

        {/* Sección: Lista de Gastos */}
        <Box>
          <Heading
            as="h2"
            size="lg"
            mb={4}
            color="gray.700"
          >
            {mesSeleccionado ? "Gastos del Mes" : "Todos los Gastos"}
          </Heading>
          <ListaGastos
            gastos={gastosFiltrados}
            onEliminar={handleEliminarGasto}
          />
        </Box>
      </Stack>
    </Layout>
  );
}

export default App;
