import { useAuth } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { User, Mail, Shield } from "lucide-react";
import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { Camera, ArrowBigLeft } from "lucide-react";
import { useEffect } from "react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";

export default function Profile() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [preview, setPreview] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const handleSave = async () => {
    try {
      let photoURL = user.photoURL;

      if (avatar) {
        photoURL = await uploadToCloudinary();
      }

      await updateProfile(user, {
        displayName: name,
        photoURL,
      });

      await user.reload();
      setPhotoURL(photoURL);
      setIsEditing(false);
      setAvatar(null);
    } catch (error) {
      console.error(error);
    }
  };

  const uploadToCloudinary = async () => {
    if (!avatar) return null;

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", avatar);
    formData.append("upload_preset", "avatar_upload");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/djxju2zyw/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    setIsUploading(false);

    return data.secure_url;
  };

  useEffect(() => {
    if (!user) return;

    setName(user.displayName || "");
    setPhotoURL(user.photoURL || "");
  }, [user]);

  useEffect(() => {
    if (!avatar) {
      setPreview("");
      return;
    }

    const url = URL.createObjectURL(avatar);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [avatar]);

  return (
    <div className="min-h-screen bg-stone-50">
      <Navigation />

      <main className="container mx-auto px-6 py-24 max-w-2xl">
        {/* Header Judul */}
        <div className="mb-8 flex items-center justify-center relative">
          {/* Tombol Back */}
          <button
            onClick={() => window.history.back()}
            className="
    absolute left-0
    flex items-center justify-center
    w-9 h-9
    rounded-full
    text-emerald-800
    hover:bg-emerald-50 hover:text-emerald-600
    transition
  "
            aria-label="Kembali"
          >
            <ArrowBigLeft size={50} strokeWidth={2.2} />
          </button>

          <div className="text-center">
            <h1 className="text-3xl font-serif font-medium text-emerald-950">
              {t("profile.title")}
            </h1>
            <p className="mt-2 text-stone-500">{t("profile.subtitle")}</p>
          </div>
        </div>

        {/* 2. Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-stone-200/50 overflow-hidden border border-stone-100">
          <div className="h-32 bg-gradient-to-br from-emerald-800 to-emerald-900 relative">
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          <div className="px-8 pb-8">
            {/* 3. Foto Profil */}
            <div className="relative -mt-12 mb-6 flex justify-center">
              <label className="cursor-pointer">
                {/* WRAPPER LINGKARAN */}
                <div
                  className="
        relative
        w-24 h-24
        rounded-full
        overflow-hidden
        border-4 border-white
        shadow-lg
        ring-2 ring-emerald-900/10
        group
      "
                >
                  {/* IMAGE */}
                  <img
                    src={preview || photoURL || "/avatar-placeholder.png"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />

                  {/* OVERLAY */}
                  {isEditing && (
                    <div
                      className="
            absolute inset-0
            bg-black/40
            flex items-center justify-center
            opacity-0 group-hover:opacity-100
            transition
          "
                    >
                      <Camera className="text-white" size={20} />
                    </div>
                  )}
                </div>

                {/* INPUT FILE (SATU AJA) */}
                {isEditing && (
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setAvatar(file);
                    }}
                  />
                )}
              </label>
            </div>

            {/* Informasi User */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-serif text-emerald-950">
                {name || "Tamu The Verdant"}
              </h2>
              <p className="text-stone-500">{user?.email}</p>
            </div>

            {/* List Detail */}
            <div className="space-y-4">
              {/* Item: Nama Lengkap */}
              <div
                className="flex items-center gap-4 p-4 rounded-xl 
    bg-[#FAF7F2] border-[#E7DED3]
    hover:bg-[#F4EFE8] transition-colors"
              >
                <div className="p-2 bg-white rounded-lg text-emerald-700 shadow-sm">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-xs font-medium text-stone-400 uppercase tracking-wider">
                    {t("profile.nameLabel")}
                  </p>
                  {!isEditing ? (
                    <p className="font-medium text-stone-800">{name || "-"}</p>
                  ) : (
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm
                focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  )}
                </div>
              </div>

              {/* Item: Email */}
              <div
                className="flex items-center gap-4 p-4 rounded-xl 
    bg-[#FAF7F2] border-[#E7DED3]
    hover:bg-[#F4EFE8] transition-colors"
              >
                <div className="p-2 bg-white rounded-lg text-emerald-700 shadow-sm">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs font-medium text-stone-400 uppercase tracking-wider">
                    {t("profile.emailLabel")}
                  </p>
                  <p className="font-medium text-stone-800">{user?.email}</p>
                </div>
              </div>

              {/* Item: Status Member */}
              <div
                className="flex items-center gap-4 p-4 rounded-xl 
    bg-[#FAF7F2] border-[#E7DED3]
    hover:bg-[#F4EFE8] transition-colors"
              >
                <div className="p-2 bg-white rounded-lg text-emerald-700 shadow-sm">
                  <Shield size={20} />
                </div>
                <div>
                  <p className="text-xs font-medium text-stone-400 uppercase tracking-wider">
                    {t("profile.membershipStatusLabel")}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-stone-800 ">
                      {t("Gold Member")}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200
  text-[10px] font-bold uppercase tracking-wide"
                    >
                      {t("profile.active")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tombol Edit */}
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                disabled={isUploading}
                className="mt-8 w-full py-3 rounded-xl bg-transparent
                border border-emerald-900/60 text-emerald-900
                hover:bg-emerald-900 hover:text-white font-medium
                transition-colors"
              >
                {t("profile.editButton")}
              </button>
            ) : (
              <div className="mt-8 flex gap-3">
                <button
                  onClick={handleSave}
                  disabled={isUploading}
                  className="flex-1 py-3 rounded-xl bg-emerald-900 text-white"
                >
                  {isUploading ? t("profile.saving") : t("profile.saveButton")}
                </button>

                <button
                  onClick={() => {
                    setIsEditing(false);
                    setName(user?.displayName || "");
                    setPhotoURL(user?.photoURL || "");
                    setAvatar(null);
                    setPreview("");
                  }}
                  className="flex-1 py-3 rounded-xl border border-stone-300
  text-stone-600 hover:bg-stone-100 transition"
                >
                  {t("profile.cancelButton")}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
