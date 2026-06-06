const type = {
  gold: 0.5,
  silver: 0.3,
  reguler: 0,
};

export const diskonSistem = async (req, res) => {
  const { userId, harga, member } = req.body;

  try {
    const diskon = type[member];
    const totalDiskon = harga * diskon;
    const hargaSetelahDiskon = harga - totalDiskon;

    return res.status(200).json({
      success: true,
      message: "Diskon berhasil dihitung",
      data: {
        hargaAwal: harga,
        hargaSetelahDiskon: hargaSetelahDiskon,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menghitung diskon",
      data: null,
    });
  }
};
