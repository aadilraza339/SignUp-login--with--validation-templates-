CREATE TABLE IF NOT EXISTS `users`(
    `user_id` int(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `username` VARCHAR(25) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `gender` BOOLEAN NOT NULL ,
    `phone` VARCHAR(11) NOT NULL,
    `age` DATETIME NOT NULL,
    PRIMARY KEY (`user_id`),
    UNIQUE KEY `email` (`email`)
);

CREATE  TABLE IF NOT EXISTS `mypost` (
  `post_id` int(20) UNSIGNED NOT NULL AUTO_INCREMENT,
 `user_id` INT(10) UNSIGNED NOT NULL,
  `caption` VARCHAR(255) ,
  `img_url` VARCHAR(255) ,
  FOREIGN KEY (`user_id`) REFERENCES users(`user_id`),
  PRIMARY KEY (`post_id`)
);