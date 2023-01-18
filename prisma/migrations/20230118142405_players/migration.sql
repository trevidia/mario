-- CreateTable
CREATE TABLE `Sponsor` (
    `sid` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`sid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `uid` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `middle_name` VARCHAR(191) NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(254) NULL,
    `role` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Link` (
    `lid` INTEGER NOT NULL AUTO_INCREMENT,
    `url` TEXT NOT NULL,
    `sid` INTEGER NOT NULL,

    PRIMARY KEY (`lid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `eid` INTEGER NOT NULL AUTO_INCREMENT,
    `event_title` VARCHAR(191) NOT NULL,
    `schId` INTEGER NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `event_date` DATETIME(3) NOT NULL,
    `event_deadline` DATETIME(3) NOT NULL,

    PRIMARY KEY (`eid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventSponsor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `eid` INTEGER NOT NULL,
    `sid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Player` (
    `pid` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `department` VARCHAR(191) NOT NULL,
    `image` TEXT NOT NULL,
    `schId` INTEGER NOT NULL,

    PRIMARY KEY (`pid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `School` (
    `schId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`schId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vote` (
    `vid` INTEGER NOT NULL AUTO_INCREMENT,
    `instagram_username` VARCHAR(191) NOT NULL,
    `pid` INTEGER NOT NULL,

    PRIMARY KEY (`vid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventPlayer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `eid` INTEGER NOT NULL,
    `pid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Link` ADD CONSTRAINT `Link_sid_fkey` FOREIGN KEY (`sid`) REFERENCES `Sponsor`(`sid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_schId_fkey` FOREIGN KEY (`schId`) REFERENCES `School`(`schId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventSponsor` ADD CONSTRAINT `EventSponsor_eid_fkey` FOREIGN KEY (`eid`) REFERENCES `Event`(`eid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventSponsor` ADD CONSTRAINT `EventSponsor_sid_fkey` FOREIGN KEY (`sid`) REFERENCES `Sponsor`(`sid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Player` ADD CONSTRAINT `Player_schId_fkey` FOREIGN KEY (`schId`) REFERENCES `School`(`schId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vote` ADD CONSTRAINT `Vote_pid_fkey` FOREIGN KEY (`pid`) REFERENCES `EventPlayer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventPlayer` ADD CONSTRAINT `EventPlayer_eid_fkey` FOREIGN KEY (`eid`) REFERENCES `Event`(`eid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventPlayer` ADD CONSTRAINT `EventPlayer_pid_fkey` FOREIGN KEY (`pid`) REFERENCES `Player`(`pid`) ON DELETE RESTRICT ON UPDATE CASCADE;
