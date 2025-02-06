import axios from 'axios';


// Konfigurasi Axios default
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  // Interceptor untuk handling error
api.interceptors.response.use(
    response => response,
    error => {
        if (error.code === 'ECONNABORTED') {
        return Promise.reject({ message: 'Request timeout' });
        }
        return Promise.reject(error.response?.data || { message: 'Unknown error' });
    }
);

/*********************
 * Authentication API
 *********************/

/**
 * Mendaftarkan pengguna baru
 * @param {Object} userData - Data pengguna
 * @param {string} userData.email - Email pengguna
 * @param {string} userData.password - Password pengguna
 * @param {string} userData.nama - Nama lengkap pengguna
 */
export const register = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Login pengguna
 * @param {Object} credentials - Kredensial login
 * @param {string} credentials.email - Email pengguna
 * @param {string} credentials.password - Password pengguna
 */
export const login = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Logout pengguna
 */
export const logout = async () => {
  try {
    await api.post('/logout');
  } catch (error) {
    console.log(error)
    throw error.message;
  }
};

/**
 * Login dengan Google OAuth
 */
export const googleLogin = async () => {
  try {
    const response = await api.get('/auth/google');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/*********************
 * To-Do List API
 *********************/

/**
 * Mendapatkan semua tugas
 * @param {string} sort - Kriteria pengurutan (opsional)
 */
export const getTodos = async (sort) => {
  try {
    const url = sort ? `/${sort}` : '/';
    const response = await api.get(url);

    return response.data;
  } catch (error) {
    throw error.message;
  }
};

/**
 * Menambahkan tugas baru
 * @param {Object} todoData - Data tugas baru
 */
export const addTodo = async (todoData) => {
  try {
    const response = await api.post('/add', todoData);
    console.log(response)
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Mengedit tugas
 * @param {Object} todoData - Data tugas yang akan diupdate
 */
export const editTodo = async (todoData) => {
  try {
    const response = await api.put('/edit', todoData);
    return response.data;
  } catch (error) {
    throw error.message;
  }
};

/**
 * Mengubah status tugas
 * @param {string} id - ID tugas
 */
export const toggleTodoStatus = async (id) => {
  try {
    const response = await api.post(`/status/${id}`);
    return response;
  } catch (error) {
    throw error.message;
  }
};

/**
 * Menghapus tugas
 * @param {string} todoId - ID tugas yang akan dihapus
 */
export const deleteTodo = async (todoId) => {
  try {
    const response = await api.delete('/delete', { data: { todo_id: todoId } });
    return response.data;
  } catch (error) {
    throw error.message;
  }
};

/**
 * Mendapatkan tugas yang selesai
 * @param {string} sort - Kriteria pengurutan (opsional)
 */
export const getCompletedTodos = async (sort) => {
  try {
    const url = sort ? `/completed/${sort}` : '/completed';
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Menghapus tugas dari daftar selesai
 * @param {string} todoId - ID tugas yang akan dihapus
 */
export const deleteCompletedTodo = async (todoId) => {
  try {
    const response = await api.delete('/delete', {
      data: { todo_id: todoId },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const checkAuth = async () => {
    try {
      const response = await api.get('/check-auth'); // Endpoint khusus untuk cek auth
      return response.data;
    } catch (error) {
      throw error;
    }
};

export default {
  register,
  login,
  logout,
  googleLogin,
  getTodos,
  addTodo,
  editTodo,
  toggleTodoStatus,
  deleteTodo,
  getCompletedTodos,
  deleteCompletedTodo,
  checkAuth,
};