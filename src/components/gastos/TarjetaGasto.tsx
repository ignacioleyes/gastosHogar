import {
  Box,
  Stack,
  Text,
  IconButton,
  Badge,
} from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Gasto } from "../../types/gasto.types";
import { formatearMoneda, formatearFecha } from "../../utils/formatters";

interface TarjetaGastoProps {
  gasto: Gasto;
  onEliminar: (id: string) => void;
}

export function TarjetaGasto({ gasto, onEliminar }: TarjetaGastoProps) {
  return (
    <Box
      bg="white"
      p={4}
      borderRadius="md"
      boxShadow="sm"
      borderLeft="4px solid"
      borderLeftColor="primary.500"
      _hover={{ boxShadow: "md" }}
      transition="box-shadow 0.2s"
    >
      <Stack direction="row" justify="space-between" align="start">
        <Stack direction="column" align="start" gap={1} flex={1}>
          <Stack direction="row">
            <Text fontSize="2xl" fontWeight="bold" color="primary.600">
              {formatearMoneda(gasto.importe)}
            </Text>
            <Badge colorPalette="orange" size="sm">
              {gasto.categoria}
            </Badge>
          </Stack>

          <Text fontSize="sm" color="gray.600">
            {formatearFecha(gasto.fecha)}
          </Text>

          {gasto.descripcion && (
            <Text fontSize="sm" color="gray.700" mt={2}>
              {gasto.descripcion}
            </Text>
          )}
        </Stack>

        <DialogRoot placement="center" motionPreset="slide-in-bottom">
          <DialogBackdrop />
          <DialogTrigger asChild>
            <IconButton
              aria-label="Eliminar gasto"
              variant="ghost"
              colorPalette="red"
              size="sm"
            >
              🗑️
            </IconButton>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Eliminar Gasto</DialogTitle>
              <DialogCloseTrigger />
            </DialogHeader>
            <DialogBody>
              <Text>
                ¿Está seguro de eliminar este gasto de {formatearMoneda(gasto.importe)}?
                Esta acción no se puede deshacer.
              </Text>
            </DialogBody>
            <DialogFooter>
              <DialogActionTrigger asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogActionTrigger>
              <Button
                colorPalette="red"
                onClick={() => onEliminar(gasto.id)}
                ml={3}
              >
                Eliminar
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogRoot>
      </Stack>
    </Box>
  );
}
