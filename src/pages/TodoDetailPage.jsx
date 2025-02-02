import { useParams, useNavigate } from "react-router-dom";

const TodoDetailPage = ({ todos }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const todo = todos.find((t) => t.id === parseInt(id));

  if (!todo) {
    return <div className="p-6">Todo tidak ditemukan!</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{todo.title}</h1>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-500">Status:</span>
              {todo.completed ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  Selesai
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-800">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Dalam Proses
                </span>
              )}
            </div>

            <div className="space-y-1">
              <p className="text-lg font-medium text-gray-700">Deskripsi:</p>
              <pre className="whitespace-pre-wrap font-sans text-gray-600 bg-gray-50 p-4 rounded-lg">
                {todo.description || "Tidak ada deskripsi"}
              </pre>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-gray-700">Tanggal Jatuh Tempo:</p>
                <p className="text-gray-600">{todo.dueDate || "-"}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Prioritas:</p>
                <span className={`inline-block px-2 py-1 rounded ${todo.priority === 'High' ? 'bg-red-100 text-red-800' : todo.priority === 'Medium' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                  {todo.priority}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-end gap-3 mt-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoDetailPage;