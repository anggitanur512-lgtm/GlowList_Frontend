import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProduk() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        judul: "",
        deskripsi: "",
        harga: "",
        id_kategori: "",
    });
    const [fileBaru, setFileBaru] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/produk/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setFormData(data[0]);
                setLoading(false);
            })
            .catch((err) => console.error(err));
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (fileBaru && fileBaru.size > 2 * 1024 * 1024) {
            alert("Ukuran file terlalu besar, maksimal 2MB");
            return;
        }

        if (!window.confirm("Yakin ingin memperbarui produk ini")) {
            return;
        }

        const data = new FormData();
        data.append("judul", formData.judul);
        data.append("deskripsi", formData.deskripsi);
        data.append("harga", formData.harga);
        data.append("id_kategori", formData.id_kategori);

        if (fileBaru) {
            data.append("file", fileBaru);
        }

        const res = await fetch(`http://localhost:5000/produk/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: data,
        });

        if (res.ok) {
            alert("Produk berhasil diperbarui!");
            navigate("/produk");
        } else {
            const hasil = await res.json();
            alert(hasil.message || "Gagal memperbarui produk");
        }
    };

    if (loading) {
        return <div className="container mt-4">Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <h2>Edit Produk</h2>

            <form onSubmit={handleSubmit} className="mt-3">

                <div className="mb-3">
                    <label className="form-label">Judul</label>
                    <input
                        type="text"
                        name="judul"
                        value={formData.judul}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Deskripsi</label>
                    <textarea
                        name="deskripsi"
                        value={formData.deskripsi}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Masukkan deskripsi produk"
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label className="form-label">Harga</label>
                    <input
                        type="number"
                        name="harga"
                        value={formData.harga}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="masukan harga"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">ID Kategori</label>
                    <select
                        name="id_kategori"
                        value={formData.id_kategori}
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value="">-- Pilih Kategori--</option>
                        <option value="1">-- serum --</option>
                        <option value="2">-- moisturizer --</option>
                        <option value="3">-- sunscreen --</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Foto Saat Ini</label>
                    <div>
                        {formData.nama_file ? (
                            <img
                                src={`http://localhost:5000/uploads/${formData.nama_file}`}
                                alt="Foto lama"
                                style={{
                                    width: "120px",
                                    borderRadius: "8px"
                                }}
                            />
                        ) : (
                            <p>Tidak ada foto</p>
                        )}
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Ganti Foto (opsional)</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        onChange={(e) => setFileBaru(e.target.files[0])}
                    />
                </div>

                <button type="submit" className="btn btn-success me-2">
                    Simpan Perubahan
                </button>

            </form>
        </div>
    );
}