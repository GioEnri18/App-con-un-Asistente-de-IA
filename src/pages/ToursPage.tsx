import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import api from '../services/api';

interface Tour {
  id: number;
  name: string;
  description: string;
  price: number;
}

const ToursPage: React.FC = () => {
  const permissions = useAuthStore(s => s.permissions);
  const can = (action: string, subject: string) => permissions?.some((p: any) => typeof p === 'object' && p.action === action && p.subject === subject);
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editTour, setEditTour] = useState<Tour | null>(null);

  useEffect(() => {
    api.get('/tours').then(res => {
      setTours(res.data);
      setLoading(false);
    });
  }, []);

  const handleCreate = () => {
    setEditTour(null);
    setShowModal(true);
  };

  const handleEdit = (tour: Tour) => {
    setEditTour(tour);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!can('delete', 'Tour')) return;
    await api.delete(`/tours/${id}`);
    setTours(tours.filter(t => t.id !== id));
  };

  const handleSave = async (tour: Partial<Tour>) => {
    if (editTour) {
      // Edit
      const res = await api.put(`/tours/${editTour.id}`, tour);
      setTours(tours.map(t => (t.id === editTour.id ? res.data : t)));
    } else {
      // Create
      const res = await api.post('/tours', tour);
      setTours([...tours, res.data]);
    }
    setShowModal(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Tours</h1>
        {can('create', 'Tour') && (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleCreate}
          >
            Crear Tour
          </button>
        )}
      </div>
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Descripción</th>
              <th className="px-4 py-2">Precio</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tours.map(tour => (
              <tr key={tour.id} className="border-t">
                <td className="px-4 py-2">{tour.name}</td>
                <td className="px-4 py-2">{tour.description}</td>
                <td className="px-4 py-2">${tour.price}</td>
                <td className="px-4 py-2 flex gap-2">
                  {can('update', 'Tour') && (
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                      onClick={() => handleEdit(tour)}
                    >
                      Editar
                    </button>
                  )}
                  {can('delete', 'Tour') && (
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDelete(tour.id)}
                    >
                      Eliminar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showModal && (
        <TourModal
          tour={editTour}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

// Modal para crear/editar tour
const TourModal: React.FC<{ tour: Tour | null; onClose: () => void; onSave: (tour: Partial<Tour>) => void }> = ({ tour, onClose, onSave }) => {
  const [name, setName] = useState(tour?.name || '');
  const [description, setDescription] = useState(tour?.description || '');
  const [price, setPrice] = useState(tour?.price || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, description, price });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">{tour ? 'Editar Tour' : 'Crear Tour'}</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={e => setPrice(Number(e.target.value))}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <div className="flex justify-end gap-2 mt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Guardar</button>
        </div>
      </form>
    </div>
  );
};

export default ToursPage;
