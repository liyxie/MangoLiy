CREATE DATABASE `mangguo` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

-- mangguo.mango_attend definition

CREATE TABLE `mango_attend` (
  `attend_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `message_id` int NOT NULL,
  PRIMARY KEY (`attend_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;


-- mangguo.mango_category definition

CREATE TABLE `mango_category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `category_image` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`category_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;


-- mangguo.mango_chat_message definition

CREATE TABLE `mango_chat_message` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `created_by` bigint DEFAULT NULL COMMENT '创建人',
  `created_time` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_by` bigint DEFAULT NULL COMMENT '更新人',
  `updated_time` datetime DEFAULT NULL COMMENT '更新时间',
  `del_flag` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '是否删除',
  `status` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '状态',
  `remarks` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '备注',
  `type` tinyint(1) DEFAULT NULL COMMENT '是否显示时间 0：否 1:是',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '消息内容',
  `content_type` tinyint(1) DEFAULT NULL COMMENT '内容类型 0文字1图片2视频 3:礼物',
  `is_read` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '是否已读',
  `sender` bigint DEFAULT NULL COMMENT '发送人',
  `receiver` bigint DEFAULT NULL COMMENT '接收人',
  `request_id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_last` tinyint(1) DEFAULT NULL COMMENT '是否是最后一条消息 0:否 1:是',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=430 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='业务消息表';


-- mangguo.mango_collect definition

CREATE TABLE `mango_collect` (
  `collect_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `message_id` int NOT NULL,
  PRIMARY KEY (`collect_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;


-- mangguo.mango_comment definition

CREATE TABLE `mango_comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `user_id` int NOT NULL COMMENT '用户id',
  `message_id` int NOT NULL COMMENT '帖子id',
  `comment_detail` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '内容',
  `comment_creat_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '时间',
  `is_anonymous_reply` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`comment_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC COMMENT='回复表';


-- mangguo.mango_comment_reply definition

CREATE TABLE `mango_comment_reply` (
  `comment_reply_id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `comment_id` int NOT NULL COMMENT '被回复id',
  `comment_user_id` int NOT NULL COMMENT '被回复者id',
  `replay_user_id` int NOT NULL COMMENT '回复者id',
  `replay_user_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '回复者姓名',
  `receive_user_id` int NOT NULL COMMENT '回复者id',
  `receive_user_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '回复者姓名',
  `reply_detail` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '内容',
  `reply_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '时间',
  PRIMARY KEY (`comment_reply_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;


-- mangguo.mango_drift_bottle definition

CREATE TABLE `mango_drift_bottle` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '漂流瓶id',
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '发送时间',
  `create_id` varchar(100) COLLATE utf8mb4_general_ci NOT NULL COMMENT '发送者id',
  `content` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '内容',
  `is_del` int NOT NULL DEFAULT '0' COMMENT '是否删除',
  `type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '类型（0文本；1音乐；2图片；3其他；4视频）',
  `title` varchar(100) COLLATE utf8mb4_general_ci NOT NULL COMMENT '标题',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='漂流瓶';


-- mangguo.mango_message definition

CREATE TABLE `mango_message` (
  `message_id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `user_id_anonymity` int NOT NULL DEFAULT '0' COMMENT '是否匿名（1：是）',
  `user_id` int NOT NULL COMMENT '发帖者id',
  `category_id` int NOT NULL DEFAULT '1' COMMENT '分类（0其他；1日常；2失物招领；3闲置交易；4求助；5兼职）',
  `user_phone` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '作者手机号',
  `user_major` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '作者专业',
  `user_level` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '作者年级',
  `message_detail` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '内容',
  `message_share` int NOT NULL DEFAULT '0' COMMENT '转发',
  `message_comment` int NOT NULL DEFAULT '0',
  `message_watch` int NOT NULL DEFAULT '0' COMMENT '查看次数',
  `message_creat_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`message_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC COMMENT='帖子表';


-- mangguo.mango_message_images definition

CREATE TABLE `mango_message_images` (
  `image_id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `message_id` int NOT NULL COMMENT '帖子id',
  `image_url` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '图片url',
  PRIMARY KEY (`image_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC COMMENT='帖子图';


-- mangguo.mango_new_message definition

CREATE TABLE `mango_new_message` (
  `new_message_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `new_message_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `new_message_type` int NOT NULL,
  `message_id` int NOT NULL,
  `new_message_detail` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`new_message_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;


-- mangguo.mango_notice definition

CREATE TABLE `mango_notice` (
  `notice_id` int NOT NULL AUTO_INCREMENT,
  `notice_detail` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`notice_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;


-- mangguo.mango_score_item definition

CREATE TABLE `mango_score_item` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '评分对象名',
  `introduction` text COLLATE utf8mb4_general_ci NOT NULL COMMENT '简介',
  `is_del` int NOT NULL DEFAULT '0' COMMENT '是否删除',
  `img_url` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '图片链接',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_id` int NOT NULL COMMENT '创建者id',
  `theme_id` int NOT NULL COMMENT '所属主题id',
  `num_people` int NOT NULL DEFAULT '0' COMMENT '评论人数',
  `score` float NOT NULL DEFAULT '0' COMMENT '分数',
  `sum_score` float NOT NULL DEFAULT '0' COMMENT '总分',
  PRIMARY KEY (`id`),
  KEY `mango_score_item_theme_id_IDX` (`theme_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- mangguo.mango_score_theme definition

CREATE TABLE `mango_score_theme` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '主题',
  `introduction` text COLLATE utf8mb4_general_ci NOT NULL COMMENT '简介',
  `is_del` int NOT NULL DEFAULT '0' COMMENT '是否删除，0否，1是',
  `is_use` int NOT NULL DEFAULT '0' COMMENT '是否禁用，0是，1否',
  `img_url` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '图片链接',
  `create_id` int NOT NULL COMMENT '创建者id',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `is_open` int NOT NULL DEFAULT '0' COMMENT '是否开放',
  `sum` int NOT NULL DEFAULT '0' COMMENT '总评论数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- mangguo.mango_score_ui definition

CREATE TABLE `mango_score_ui` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `item_id` int NOT NULL COMMENT '评分对象id',
  `user_id` int NOT NULL COMMENT '用户id',
  `score` float NOT NULL COMMENT '分数',
  `comment` text COLLATE utf8mb4_general_ci COMMENT '评论',
  `theme_id` int DEFAULT NULL COMMENT '主题id',
  `like_num` int DEFAULT '0' COMMENT '点赞',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='用户评分表';


-- mangguo.mango_score_ui_like definition

CREATE TABLE `mango_score_ui_like` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `theme_id` int NOT NULL COMMENT '评分主题id',
  `item_id` int NOT NULL COMMENT '评分对象id',
  `like_user_id` int NOT NULL COMMENT '点赞用户id',
  `ui_id` int NOT NULL COMMENT '评分回复id',
  `time` date NOT NULL COMMENT '点赞时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='评分回复用户点赞表';


-- mangguo.mango_sensitive_words definition

CREATE TABLE `mango_sensitive_words` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `word` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '敏感词',
  `is_del` int NOT NULL DEFAULT '0',
  `is_use` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='敏感词库';


-- mangguo.mango_shop definition

CREATE TABLE `mango_shop` (
  `shop_id` int NOT NULL AUTO_INCREMENT,
  `shop_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `shop_intro` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `shop_phone` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `shop_avatar` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `shop_latitude` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `shop_longitude` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `shop_creat_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`shop_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;


-- mangguo.mango_shop_business definition

CREATE TABLE `mango_shop_business` (
  `business_id` int NOT NULL AUTO_INCREMENT,
  `shop_id` int NOT NULL,
  `shop_goods_image` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `shop_goods_title` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `shop_goods_price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`business_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;


-- mangguo.mango_shop_images definition

CREATE TABLE `mango_shop_images` (
  `shop_detail_id` int NOT NULL AUTO_INCREMENT,
  `shop_id` int NOT NULL,
  `shop_images` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`shop_detail_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;


-- mangguo.mango_swiper definition

CREATE TABLE `mango_swiper` (
  `swiper_id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `swiper_image_url` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '图片url',
  `url` varchar(100) DEFAULT NULL COMMENT '帖子链接',
  PRIMARY KEY (`swiper_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC COMMENT='轮播图';


-- mangguo.mango_user definition

CREATE TABLE `mango_user` (
  `user_id` int NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `user_openid` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '用户微信openId',
  `user_gender` int NOT NULL COMMENT '性别',
  `user_avatar` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '头像',
  `user_nickname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '昵称',
  `user_is_admin` int NOT NULL DEFAULT '1' COMMENT '是否管理员（2：管理员，3：超级管理员）',
  `user_allow` int NOT NULL DEFAULT '1' COMMENT '是否禁用',
  `user_creat_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `user_city` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '城市',
  `user_grade` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '班级',
  `user_phone` varchar(11) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT '' COMMENT '手机号',
  `user_phone_code` varchar(6) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `user_phone_code_time` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC COMMENT='用户表';