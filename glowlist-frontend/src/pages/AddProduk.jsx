import { useState  } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduk() {
    const [formData, setFormData] = useState({
        judul:"",
        deskripsi:"",
        harga:"",
        id_kategori:"",
    });

    const navigate = useNavigate();

    const handleChange = useNavigate = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });

    };
    const handlesSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/produk", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                alert("Produk berhasil ditambahkan!");
                navigate("/produk");
            } else {
                const data = await res.json();
                alert(data.message || "Gagal menambah produk");
            }
        } catch (err) {
        console.error("Error:", err);
        alert("Terjadi kesalahan saat menambah produk");
    } 
    }
    
    return (
        <div className="container mt-4">
            <h2 className="mb-3">Tambah Produk ☘</h2>
            <form onSubmit={handlesSubmit} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label className="form-label">Judul Produk</label>
                    <input
                    type="text"
                    name="judul"
                    value={formData.judul}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Masukan nama produk"
                    required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Deskripsi</label>
                    <textarea
                    name="deskripsi"
                    value={formData.deskripsi}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Masukkan deskripsi produk">
                    </textarea>
                </div>

                <div className="mb-3>">
                    <label className="form-label">ID Kategori</label>
                    <input 
                    type="number"
                    name="id_kategori"
                    value={formData.id_kategori}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Masukkan ID kategori"/>
                </div>
                <button type="sumbit" className="btn btn-success">
                    simpan
                </button>
            </form>
        </div>
    );
    }
