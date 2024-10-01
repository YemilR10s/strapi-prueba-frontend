'use client'
import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    nombrePersona: '',
    apellidoPersona: '',
    correoElectronico: '',
    numeroTelefono: '',
    fechaAndTime: '',
    personas: 1,
    ubicacion: 'Bello',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch(`${process.env.BASE_URL_API}/api/reservas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {  // Aquí incluimos los datos dentro de 'data'
            nombrePersona: formData.nombrePersona,
            apellidoPersona: formData.apellidoPersona,
            correoElectronico: formData.correoElectronico, 
            numeroTelefono: formData.numeroTelefono, 
            fechaAndTime: formData.fechaAndTime, 
            personas: formData.personas, 
            ubicacion: formData.ubicacion,
          },
        }),
      });

      if (!res.ok) {
        const errorDetails = await res.json();
        console.log('Detalles del error:', errorDetails);
        throw new Error(`Error en la reserva: ${JSON.stringify(errorDetails)}`);
      }

      setSuccess(true);
     /*  setFormData({
        nombrePersona: '',
        apellidoPersona: '',
        correoElectronico: '',
        numeroTelefono: '',
        fechaAndTime: '',
        personas: 1,
        ubicacion: 'Bello',
      }); */
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Reserva tu mesa</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-lg rounded-lg w-full max-w-lg"
      >
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">¡Reserva realizada con éxito!</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            name="nombrePersona"
            value={formData.nombrePersona}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Apellido</label>
          <input
            type="text"
            name="apellidoPersona"
            value={formData.apellidoPersona}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
          <input
            type="email"
            name="correoElectronico"
            value={formData.correoElectronico}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Teléfono</label>
          <input
            type="text"
            name="numeroTelefono"
            value={formData.numeroTelefono}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Fecha y Hora</label>
          <input
            type="datetime-local"
            name="fechaAndTime"
            value={formData.fechaAndTime}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Número de personas</label>
          <input
            type="number"
            name="personas"
            value={formData.personas}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            min="1"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Ubicación</label>
          <select
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          >
            <option value="Bello">Bello</option>
            <option value="Aranjuez">Aranjuez</option>
            <option value="Envigado">Envigado</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600"
        >
          {loading ? 'Reservando...' : 'Reservar'}
        </button>
      </form>
    </div>
  );
}


