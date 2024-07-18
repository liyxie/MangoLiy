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
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '����ID',
  `created_by` bigint DEFAULT NULL COMMENT '������',
  `created_time` datetime DEFAULT NULL COMMENT '����ʱ��',
  `updated_by` bigint DEFAULT NULL COMMENT '������',
  `updated_time` datetime DEFAULT NULL COMMENT '����ʱ��',
  `del_flag` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '�Ƿ�ɾ��',
  `status` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '״̬',
  `remarks` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '��ע',
  `type` tinyint(1) DEFAULT NULL COMMENT '�Ƿ���ʾʱ�� 0���� 1:��',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '��Ϣ����',
  `content_type` tinyint(1) DEFAULT NULL COMMENT '�������� 0����1ͼƬ2��Ƶ 3:����',
  `is_read` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '�Ƿ��Ѷ�',
  `sender` bigint DEFAULT NULL COMMENT '������',
  `receiver` bigint DEFAULT NULL COMMENT '������',
  `request_id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_last` tinyint(1) DEFAULT NULL COMMENT '�Ƿ������һ����Ϣ 0:�� 1:��',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=430 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='ҵ����Ϣ��';


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
  `user_id` int NOT NULL COMMENT '�û�id',
  `message_id` int NOT NULL COMMENT '����id',
  `comment_detail` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '����',
  `comment_creat_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'ʱ��',
  `is_anonymous_reply` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`comment_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC COMMENT='�ظ���';


-- mangguo.mango_comment_reply definition

CREATE TABLE `mango_comment_reply` (
  `comment_reply_id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `comment_id` int NOT NULL COMMENT '���ظ�id',
  `comment_user_id` int NOT NULL COMMENT '���ظ���id',
  `replay_user_id` int NOT NULL COMMENT '�ظ���id',
  `replay_user_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '�ظ�������',
  `receive_user_id` int NOT NULL COMMENT '�ظ���id',
  `receive_user_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '�ظ�������',
  `reply_detail` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '����',
  `reply_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'ʱ��',
  PRIMARY KEY (`comment_reply_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;


-- mangguo.mango_drift_bottle definition

CREATE TABLE `mango_drift_bottle` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Ư��ƿid',
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '����ʱ��',
  `create_id` varchar(100) COLLATE utf8mb4_general_ci NOT NULL COMMENT '������id',
  `content` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '����',
  `is_del` int NOT NULL DEFAULT '0' COMMENT '�Ƿ�ɾ��',
  `type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '���ͣ�0�ı���1���֣�2ͼƬ��3������4��Ƶ��',
  `title` varchar(100) COLLATE utf8mb4_general_ci NOT NULL COMMENT '����',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Ư��ƿ';


-- mangguo.mango_message definition

CREATE TABLE `mango_message` (
  `message_id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `user_id_anonymity` int NOT NULL DEFAULT '0' COMMENT '�Ƿ�������1���ǣ�',
  `user_id` int NOT NULL COMMENT '������id',
  `category_id` int NOT NULL DEFAULT '1' COMMENT '���ࣨ0������1�ճ���2ʧ�����죻3���ý��ף�4������5��ְ��',
  `user_phone` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '�����ֻ���',
  `user_major` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '����רҵ',
  `user_level` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '�����꼶',
  `message_detail` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '����',
  `message_share` int NOT NULL DEFAULT '0' COMMENT 'ת��',
  `message_comment` int NOT NULL DEFAULT '0',
  `message_watch` int NOT NULL DEFAULT '0' COMMENT '�鿴����',
  `message_creat_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '����ʱ��',
  PRIMARY KEY (`message_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC COMMENT='���ӱ�';


-- mangguo.mango_message_images definition

CREATE TABLE `mango_message_images` (
  `image_id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `message_id` int NOT NULL COMMENT '����id',
  `image_url` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT 'ͼƬurl',
  PRIMARY KEY (`image_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC COMMENT='����ͼ';


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
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '���ֶ�����',
  `introduction` text COLLATE utf8mb4_general_ci NOT NULL COMMENT '���',
  `is_del` int NOT NULL DEFAULT '0' COMMENT '�Ƿ�ɾ��',
  `img_url` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'ͼƬ����',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '����ʱ��',
  `create_id` int NOT NULL COMMENT '������id',
  `theme_id` int NOT NULL COMMENT '��������id',
  `num_people` int NOT NULL DEFAULT '0' COMMENT '��������',
  `score` float NOT NULL DEFAULT '0' COMMENT '����',
  `sum_score` float NOT NULL DEFAULT '0' COMMENT '�ܷ�',
  PRIMARY KEY (`id`),
  KEY `mango_score_item_theme_id_IDX` (`theme_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- mangguo.mango_score_theme definition

CREATE TABLE `mango_score_theme` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '����',
  `introduction` text COLLATE utf8mb4_general_ci NOT NULL COMMENT '���',
  `is_del` int NOT NULL DEFAULT '0' COMMENT '�Ƿ�ɾ����0��1��',
  `is_use` int NOT NULL DEFAULT '0' COMMENT '�Ƿ���ã�0�ǣ�1��',
  `img_url` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'ͼƬ����',
  `create_id` int NOT NULL COMMENT '������id',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '����ʱ��',
  `is_open` int NOT NULL DEFAULT '0' COMMENT '�Ƿ񿪷�',
  `sum` int NOT NULL DEFAULT '0' COMMENT '��������',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- mangguo.mango_score_ui definition

CREATE TABLE `mango_score_ui` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `item_id` int NOT NULL COMMENT '���ֶ���id',
  `user_id` int NOT NULL COMMENT '�û�id',
  `score` float NOT NULL COMMENT '����',
  `comment` text COLLATE utf8mb4_general_ci COMMENT '����',
  `theme_id` int DEFAULT NULL COMMENT '����id',
  `like_num` int DEFAULT '0' COMMENT '����',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='�û����ֱ�';


-- mangguo.mango_score_ui_like definition

CREATE TABLE `mango_score_ui_like` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `theme_id` int NOT NULL COMMENT '��������id',
  `item_id` int NOT NULL COMMENT '���ֶ���id',
  `like_user_id` int NOT NULL COMMENT '�����û�id',
  `ui_id` int NOT NULL COMMENT '���ֻظ�id',
  `time` date NOT NULL COMMENT '����ʱ��',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='���ֻظ��û����ޱ�';


-- mangguo.mango_sensitive_words definition

CREATE TABLE `mango_sensitive_words` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `word` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '���д�',
  `is_del` int NOT NULL DEFAULT '0',
  `is_use` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='���дʿ�';


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
  `swiper_image_url` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT 'ͼƬurl',
  `url` varchar(100) DEFAULT NULL COMMENT '��������',
  PRIMARY KEY (`swiper_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC COMMENT='�ֲ�ͼ';


-- mangguo.mango_user definition

CREATE TABLE `mango_user` (
  `user_id` int NOT NULL AUTO_INCREMENT COMMENT '�û�id',
  `user_openid` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '�û�΢��openId',
  `user_gender` int NOT NULL COMMENT '�Ա�',
  `user_avatar` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT 'ͷ��',
  `user_nickname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '�ǳ�',
  `user_is_admin` int NOT NULL DEFAULT '1' COMMENT '�Ƿ����Ա��2������Ա��3����������Ա��',
  `user_allow` int NOT NULL DEFAULT '1' COMMENT '�Ƿ����',
  `user_creat_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '����ʱ��',
  `user_city` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '����',
  `user_grade` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '�༶',
  `user_phone` varchar(11) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT '' COMMENT '�ֻ���',
  `user_phone_code` varchar(6) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `user_phone_code_time` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC COMMENT='�û���';