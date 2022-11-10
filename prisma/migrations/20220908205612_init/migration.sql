-- CreateTable
CREATE TABLE `users` (
    `userName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `birthDate` DATETIME(3) NOT NULL,
    `adress` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
