"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

// URL del backend en Render
const API_URL = "https://prueba-backend-3lgp.onrender.com";

// Como se ve un vehículo
interface Vehicle {
  id: number;
  marca: string;
  localidad: string;
  aspirante: string;
}

export default function DashboardPage() {
  const { token, isAdmin, logout } = useAuth();
  const router = useRouter();

  const [vehicles, setVehicles] = useState<Vehicle[]>([]); // Lista de vehiculos del backend
  const [marca, setMarca] = useState(""); // Campo marca del formulario
  const [localidad, setLocalidad] = useState(""); // Campo localidad del formulario
  const [aspirante, setaspirante] = useState(""); // Campo aspirante del formulario
  const [editingId, setEditingId] = useState<number | null>(null); // ID del vehiculo
  const [isEditing, setIsEditing] = useState(false); // Mira si el formulario es visible o no
  const [error, setError] = useState(""); // Error
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    } else {
      fetchVehicles();
    }
  }, [token]);

  // Todos los vehículos del backend
  const fetchVehicles = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/vehicles/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVehicles(response.data);
    } catch (err) {
      setError("Error al cargar los vehiculos");
    }
  };

  // Crea un vehiculo nuevo
  const handleCreate = async () => {
    if (!marca || !localidad || !aspirante) {
      setError("Completa todos los campos por favor");
      return;
    }
    try {
      await axios.post(
        `${API_URL}/api/vehicles/`,
        { marca, localidad, aspirante },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      clearForm();
      fetchVehicles();
    } catch (err: any) {
      if (err.response?.status === 401) {
        alert("Esta sesion ha expirado, por favor inicia sesion nuevamente");
        logout();
      } else {
        setError("Error al crear el vehíiulo");
      }
    }
  };

  // Formulario para editar un vehiculo existente
  const handleEditClick = (vehicle: Vehicle) => {
    setEditingId(vehicle.id);
    setMarca(vehicle.marca);
    setLocalidad(vehicle.localidad);
    setaspirante(vehicle.aspirante);
    setIsEditing(true);
  };

  // Guarda los cambios del vehiculo editado
  const handleUpdate = async () => {
    if (!editingId) return;
    try {
      await axios.put(
        `${API_URL}/api/vehicles/${editingId}`,
        { marca, localidad, aspirante },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      clearForm();
      fetchVehicles();
    } catch (err: any) {
      if (err.response?.status === 401) {
        alert("Esta sesion ha expirado, por favor inicia sesion nuevamente");
        logout();
      } else {
        setError("Error al actualizar el vehiculo");
      }
    }
  };

  // Elimina un vehiculo por su ID
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/api/vehicles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchVehicles();
    } catch (err: any) {
      if (err.response?.status === 401) {
        alert("Esta sesion ha expirado, por favor inicia sesion nuevamente");
        logout();
      } else {
        setError("Error al eliminar el vehiculo");
      }
    }
  };

  // Limpia el formulario y sale de edicion
  const clearForm = () => {
    setMarca("");
    setLocalidad("");
    setaspirante("");
    setEditingId(null);
    setIsEditing(false);
    setError("");
  };

  if (!token) return null;

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Logo y boton cerrar sesion en el header */}
      <div className="flex justify-between items-center px-8 py-4 border-b border-gray-100">
        <Image src="/Assets/Imagologo_motion.svg" alt="Logo" width={35} height={35} />
        <button onClick={logout} className="text-sm text-gray-500 hover:text-pink-600">
          Cerrar sesión
        </button>
      </div>

      {/* Contenido en dos columnas */}
      <div className="flex flex-1 p-8 gap-8">

        {/* Colum izquierda = Formulario */}
        <div className="w-1/3">

          {/* Boton para abrir formulario (solo admin) */}
          {isAdmin && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="mb-4 flex items-center gap-2 text-pink-600 font-bold text-lg"
            >
              <Image src="/Assets/Icon_crear.svg" alt="crear" width={24} height={24} />
            </button>
          )}

          {/* Formulario visible */}
          {isAdmin && isEditing && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Campo marca */}
              <div className="flex items-center gap-3 border-b border-gray-200 pb-2">
                <Image src="/Assets/Icon_vehiculo.svg" alt="vehiculo" width={20} height={20} />
                <input
                  type="text"
                  value={marca}
                  onChange={(e) => setMarca(e.target.value)}
                  placeholder="Vehiculo"
                  className="flex-1 outline-none text-sm text-gray-600"
                />
              </div>

              {/* Campo localidad */}
              <div className="flex items-center gap-3 border-b border-gray-200 pb-2">
                <Image src="/Assets/Icon_puntoubicacion.svg" alt="ubicacion" width={20} height={20} />
                <input
                  type="text"
                  value={localidad}
                  onChange={(e) => setLocalidad(e.target.value)}
                  placeholder="Localidad"
                  className="flex-1 outline-none text-sm text-gray-600"
                />
              </div>

              {/* Campo aspirante */}
              <div className="flex items-center gap-3 border-b border-gray-200 pb-2">
                <Image src="/Assets/Icon_persona.svg" alt="persona" width={20} height={20} />
                <input
                  type="text"
                  value={aspirante}
                  onChange={(e) => setaspirante(e.target.value)}
                  placeholder="Nombre"
                  className="flex-1 outline-none text-sm text-gray-600"
                />
              </div>

              {/* Error */}
              {error && <p className="text-red-500 text-xs">{error}</p>}

              {/* Botones segun modo */}
              {editingId ? (
                // Modo edicion = Iconos de confirmar y cancelar
                <div className="flex gap-3 mt-2">
                  <button onClick={handleUpdate}>
                    <Image src="/Assets/Icon_confirmar.svg" alt="confirmar" width={28} height={28} />
                  </button>
                  <button onClick={clearForm}>
                    <Image src="/Assets/Icon_cancelar.svg" alt="cancelar" width={28} height={28} />
                  </button>
                </div>
              ) : (
                // Modo creacion = Botones Cancelar y crear
                <div className="flex gap-3 mt-2">
                  <button
                    onClick={clearForm}
                    className="px-4 py-1 text-sm border border-gray-300 rounded-full text-gray-600"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleCreate}
                    className="px-4 py-1 text-sm rounded-full text-white"
                    style={{ background: "linear-gradient(90deg, #C6007E, #40CEE4)" }}
                  >
                    Crear
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Column derecha = Tabla */}
        <div className="flex-1">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left py-2 px-4 text-white text-sm rounded-l-lg" style={{ background: "#C6007E" }}>Marca</th>
                <th className="text-left py-2 px-4 text-white text-sm" style={{ background: "#C6007E" }}>Sucursal</th>
                <th className="text-left py-2 px-4 text-white text-sm" style={{ background: "#C6007E" }}>Aspirante</th>
                <th className="py-2 px-4 rounded-r-lg" style={{ background: "#C6007E" }}></th>
              </tr>
            </thead>
            <tbody>
              {/* AnimatePresence permite animar filas al eliminarlas */}
              <AnimatePresence>
                {vehicles.map((vehicle) => (
                  <motion.tr
                    key={vehicle.id}
                    onClick={() => setSelectedId(selectedId === vehicle.id ? null : vehicle.id)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-2 px-4 text-sm text-gray-700">{vehicle.marca}</td>
                    <td className="py-2 px-4 text-sm text-gray-500">{vehicle.localidad}</td>
                    <td className="py-2 px-4 text-sm text-gray-500">{vehicle.aspirante}</td>

                    <td className="py-2 px-4">
                        
                        {/* Solo muestra los botones si el usuario es admin */}
                        {isAdmin && (
                            <div className="flex gap-2 justify-end">
                                
                        {/* Icono editar, cambia si la fila esta seleccionada */}
                        <button onClick={(e) => { 
                            e.stopPropagation(); 
                            setSelectedId(vehicle.id);
                            handleEditClick(vehicle); 
                        }}>

                            <Image
                            src={selectedId === vehicle.id ? "/Assets/Icon_editar1.svg" : "/Assets/Icon_editar.svg"}
                            alt="editar"
                            width={18}
                            height={18}
                            />
                        </button>
                        
                        {/* Icono eliminar, cambia si la fila esta seleccionada */}
                        <button onClick={(e) => { 
                            e.stopPropagation(); 
                            setSelectedId(vehicle.id);
                            handleDelete(vehicle.id); 
                        }}>
                            
                            <Image
                            src={selectedId === vehicle.id ? "/Assets/Icon_eliminar1.svg" : "/Assets/Icon_eliminar.svg"}
                            alt="eliminar"
                            width={18}
                            height={18}
                            />
                        </button>
                        </div>
                    )}
                    </td>
                 </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Logo motion al fondo */}
      <div className="flex justify-center py-4">
        <Image src="/Assets/Imagologotipo_motion.svg" alt="motion" width={80} height={30} />
      </div>
    </div>
  );
}