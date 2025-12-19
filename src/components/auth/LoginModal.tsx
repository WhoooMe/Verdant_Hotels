import { useState } from "react";
import { loginWithEmail, loginWithGoogle } from "../../services/authService";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onOpenRegister: () => void;
}

export default function LoginModal({
  open,
  onClose,
  onOpenRegister,
}: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleEmailLogin = async () => {
    try {
      setLoading(true);
      setError("");
      await loginWithEmail(email, password);
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
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
        <h2 className="mb-4 text-2xl font-semibold text-center">
          Masuk ke The Verdant
        </h2>

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
            onClick={handleEmailLogin}
            disabled={loading}
            className="w-full rounded-md bg-black py-2 text-white hover:bg-gray-800"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>

          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-gray-300" />
            <span className="text-sm text-gray-500">atau</span>
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="relative flex w-full items-center justify-start rounded-md border py-2 hover:bg-gray-100"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google Logo"
              className="absolute left-4 h-5 w-5"
            />
            <span className="w-full text-center">Masuk dengan Google</span>
          </button>
          <div className="flex items-center justify-center gap-1 text-sm">
            <span className="text-gray-500">Belum punya akun?</span>
            <button
              onClick={onOpenRegister}
              className="font-medium text-black hover:underline"
            >
              Daftar
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-4 mx-auto block w-fit text-sm text-gray-500 hover:underline"
        >
          Tutup
        </button>
      </div>
    </div>
  );
}
