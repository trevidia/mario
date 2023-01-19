-- DropForeignKey
ALTER TABLE `EventPlayer` DROP FOREIGN KEY `EventPlayer_pid_fkey`;

-- AddForeignKey
ALTER TABLE `EventPlayer` ADD CONSTRAINT `EventPlayer_pid_fkey` FOREIGN KEY (`pid`) REFERENCES `Player`(`pid`) ON DELETE CASCADE ON UPDATE CASCADE;
