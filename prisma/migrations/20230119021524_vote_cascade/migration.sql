-- DropForeignKey
ALTER TABLE `Vote` DROP FOREIGN KEY `Vote_pid_fkey`;

-- AddForeignKey
ALTER TABLE `Vote` ADD CONSTRAINT `Vote_pid_fkey` FOREIGN KEY (`pid`) REFERENCES `EventPlayer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
