-- CreateTable
CREATE TABLE `tbl_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_user` VARCHAR(255) NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('Admin', 'Staff', 'User') NOT NULL,

    UNIQUE INDEX `tbl_user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_barang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kd_barang` VARCHAR(255) NOT NULL,
    `nama_barang` VARCHAR(255) NULL,
    `merk` VARCHAR(255) NULL,
    `stok` INTEGER NOT NULL,
    `spesifikasi` TEXT NOT NULL,
    `foto_barang` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_peminjaman` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `id_barang` INTEGER NOT NULL,
    `tgl_pinjam` DATE NOT NULL,
    `tgl_selesai` DATE NOT NULL,
    `tgl_pengembalian` DATE NOT NULL,
    `qty` INTEGER NOT NULL,
    `status` ENUM('Menunggu', 'Ditolak', 'Disetujui', 'Selesai') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_peminjaman` ADD CONSTRAINT `tbl_peminjaman_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `tbl_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_peminjaman` ADD CONSTRAINT `tbl_peminjaman_id_barang_fkey` FOREIGN KEY (`id_barang`) REFERENCES `tbl_barang`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
