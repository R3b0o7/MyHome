import axios from 'axios';
const URL = "http://LocalHost:9000"

const registerUser = async (userData) => {
    try {
      const response = await axios.post(`${URL}/api/users/register`, userData);
      // Si el registro es exitoso, response.data contendrá la respuesta del servidor.
      console.log('Registro exitoso:', response.data);
      return response.data;
    } catch (error) {
      // En caso de error, puedes manejarlo aquí.
      console.error('Error en el registro:', error);
      throw error; // O devolver un mensaje de error personalizado.
    }
  };
  
  // Llamada a la función para registrar un usuario
  const userData = {
    userName: 'nombredeusuario',
    email: 'correo@example.com',
    visibleEmail: 'correo@example.com',
    password: 'contraseña',
  };
  
  registerUser(userData)
    .then(() => {
      // Realizar acciones adicionales después del registro exitoso.
    })
    .catch((error) => {
      // Manejar el error, por ejemplo, mostrar un mensaje al usuario.
    });
  