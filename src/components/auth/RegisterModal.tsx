import { useState } from "react";
import { registerWithEmail } from "@/services/authService";

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
}

export default function RegisterModal({
  open,
  onClose,
  onOpenLogin,
}: RegisterModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError("");
      await registerWithEmail(email, password);
      alert("Akun berhasil dibuat 🎉");
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-2xl font-semibold text-center">Daftar Akun</h2>

        {error && (
          <p className="mb-3 text-sm text-red-500 text-center">{error}</p>
        )}

        <div className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-md border px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-md border px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full rounded-md bg-black py-2 text-white hover:bg-gray-800"
          >
            {loading ? "Memproses..." : "Daftar"}
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
          Sudah punya akun?{" "}
          <button
            onClick={() => {
              onClose(); // tutup RegisterModal
              onOpenLogin(); // buka LoginModal
            }}
            className="font-medium text-black hover:underline"
          >
            Masuk
          </button>
        </p>

        <button
          onClick={onClose}
          className="mt-4 w-full text-sm text-gray-500 hover:underline"
        >
          Batal
        </button>
      </div>
    </div>
  );
}
