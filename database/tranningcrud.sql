USE [trainingcrud]
GO
/****** Object:  Table [dbo].[brand]    Script Date: 12/20/2023 10:11:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[brand](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[brand_name] [nvarchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[category]    Script Date: 12/20/2023 10:11:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[category](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[cate_code] [varchar](20) NULL,
	[cate_name] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[p_status]    Script Date: 12/20/2023 10:11:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[p_status](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[status_name] [nvarchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[product]    Script Date: 12/20/2023 10:11:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[product](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[subcate_id] [bigint] NULL,
	[product_name] [nvarchar](100) NULL,
	[color] [nvarchar](50) NULL,
	[quantity] [bigint] NULL,
	[sell_price] [float] NULL,
	[origin_price] [float] NULL,
	[descriptionn] [nvarchar](1000) NULL,
	[status_id] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[product_brand]    Script Date: 12/20/2023 10:11:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[product_brand](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[product_id] [bigint] NULL,
	[brand_id] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[sub_category]    Script Date: 12/20/2023 10:11:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sub_category](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[sub_cate_code] [nvarchar](20) NULL,
	[sub_cate_name] [nvarchar](50) NULL,
	[cate_id] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[brand] ON 

INSERT [dbo].[brand] ([id], [brand_name]) VALUES (1, N'DuKa')
INSERT [dbo].[brand] ([id], [brand_name]) VALUES (2, N'Long Thủy Toys')
INSERT [dbo].[brand] ([id], [brand_name]) VALUES (3, N'Toys House')
SET IDENTITY_INSERT [dbo].[brand] OFF
GO
SET IDENTITY_INSERT [dbo].[category] ON 

INSERT [dbo].[category] ([id], [cate_code], [cate_name]) VALUES (1, N'C1', N'Đồ Chơi Trẻ Em')
SET IDENTITY_INSERT [dbo].[category] OFF
GO
SET IDENTITY_INSERT [dbo].[p_status] ON 

INSERT [dbo].[p_status] ([id], [status_name]) VALUES (1, N'Còn Hàng')
INSERT [dbo].[p_status] ([id], [status_name]) VALUES (2, N'Hết Hàng')
SET IDENTITY_INSERT [dbo].[p_status] OFF
GO
SET IDENTITY_INSERT [dbo].[product] ON 

INSERT [dbo].[product] ([id], [subcate_id], [product_name], [color], [quantity], [sell_price], [origin_price], [descriptionn], [status_id]) VALUES (11, 1, N'Đồ chơi vặn cót cua tập bơi ngửa', N'Đa Màu', 30, 320000, 150000, N'tốt', 1)
INSERT [dbo].[product] ([id], [subcate_id], [product_name], [color], [quantity], [sell_price], [origin_price], [descriptionn], [status_id]) VALUES (12, 3, N'Đồ chơi gỗ ghép số hình khối 3D Toyshouse 574', N'Đa Màu', 100, 230000, 100000, N'tốt', 2)
INSERT [dbo].[product] ([id], [subcate_id], [product_name], [color], [quantity], [sell_price], [origin_price], [descriptionn], [status_id]) VALUES (15, 2, N'Đồ chơi vịt đạp xe kute có đèn nhạc', N'vàng', 40, 120000, 50000, N'tốt', 1)
INSERT [dbo].[product] ([id], [subcate_id], [product_name], [color], [quantity], [sell_price], [origin_price], [descriptionn], [status_id]) VALUES (16, 2, N'Đồ chơi cót chim cú mèo biết đi', N'tím', 50, 69000, 20000, N'tốt', 1)
INSERT [dbo].[product] ([id], [subcate_id], [product_name], [color], [quantity], [sell_price], [origin_price], [descriptionn], [status_id]) VALUES (17, 4, N'Đồ chơi Lego 701650 - Xe ô tô Mercedes Benz cổ điển', N'nhiều màu', 30, 190000, 60000, N'tốt', 1)
INSERT [dbo].[product] ([id], [subcate_id], [product_name], [color], [quantity], [sell_price], [origin_price], [descriptionn], [status_id]) VALUES (18, 4, N'Đồ chơi Lego City 60120 - Núi lửa khởi đầu', N'Đa Màu', 60, 120000, 50000, N'tốt', 1)
INSERT [dbo].[product] ([id], [subcate_id], [product_name], [color], [quantity], [sell_price], [origin_price], [descriptionn], [status_id]) VALUES (19, 5, N'Đồ chơi đường hầm sư tử', N'Đa Màu', 20, 320000, 10000, N'tốt', 1)
INSERT [dbo].[product] ([id], [subcate_id], [product_name], [color], [quantity], [sell_price], [origin_price], [descriptionn], [status_id]) VALUES (20, 5, N'Đồ chơi xe Bugatti biến hình robot Mecha Ares', N'Đa Màu', 30, 320000, 100000, N'tốt', 1)
INSERT [dbo].[product] ([id], [subcate_id], [product_name], [color], [quantity], [sell_price], [origin_price], [descriptionn], [status_id]) VALUES (22, 6, N'Cừu Barbra Bobi Craft tinh nghịch', N'Trắng', 30, 495000, 220000, N'tốt', 1)
INSERT [dbo].[product] ([id], [subcate_id], [product_name], [color], [quantity], [sell_price], [origin_price], [descriptionn], [status_id]) VALUES (23, 6, N'Gấu Lizzie Bobi Craft mũm mĩm', N'Trắng', 30, 190000, 100000, N'tốt', 1)
INSERT [dbo].[product] ([id], [subcate_id], [product_name], [color], [quantity], [sell_price], [origin_price], [descriptionn], [status_id]) VALUES (30, 4, N'abc', N'vàng', 222222, 22222222, 2222222, N'tốt', 1)
SET IDENTITY_INSERT [dbo].[product] OFF
GO
SET IDENTITY_INSERT [dbo].[product_brand] ON 

INSERT [dbo].[product_brand] ([id], [product_id], [brand_id]) VALUES (14, 11, 1)
INSERT [dbo].[product_brand] ([id], [product_id], [brand_id]) VALUES (15, 12, 2)
INSERT [dbo].[product_brand] ([id], [product_id], [brand_id]) VALUES (18, 15, 2)
INSERT [dbo].[product_brand] ([id], [product_id], [brand_id]) VALUES (19, 16, 1)
INSERT [dbo].[product_brand] ([id], [product_id], [brand_id]) VALUES (20, 17, 2)
INSERT [dbo].[product_brand] ([id], [product_id], [brand_id]) VALUES (21, 18, 3)
INSERT [dbo].[product_brand] ([id], [product_id], [brand_id]) VALUES (22, 19, 3)
INSERT [dbo].[product_brand] ([id], [product_id], [brand_id]) VALUES (23, 20, 2)
INSERT [dbo].[product_brand] ([id], [product_id], [brand_id]) VALUES (25, 22, 1)
INSERT [dbo].[product_brand] ([id], [product_id], [brand_id]) VALUES (26, 23, 2)
INSERT [dbo].[product_brand] ([id], [product_id], [brand_id]) VALUES (33, 30, 3)
SET IDENTITY_INSERT [dbo].[product_brand] OFF
GO
SET IDENTITY_INSERT [dbo].[sub_category] ON 

INSERT [dbo].[sub_category] ([id], [sub_cate_code], [sub_cate_name], [cate_id]) VALUES (1, N'SC1', N'Đồ Chơi Gỗ', 1)
INSERT [dbo].[sub_category] ([id], [sub_cate_code], [sub_cate_name], [cate_id]) VALUES (2, N'SC2', N'Đồ Chơi Phát Nhạc', 1)
INSERT [dbo].[sub_category] ([id], [sub_cate_code], [sub_cate_name], [cate_id]) VALUES (3, N'SC3', N'Đồ Chơi Nhà Tắm', 1)
INSERT [dbo].[sub_category] ([id], [sub_cate_code], [sub_cate_name], [cate_id]) VALUES (4, N'SC4', N'Đồ Chơi LeGo', 1)
INSERT [dbo].[sub_category] ([id], [sub_cate_code], [sub_cate_name], [cate_id]) VALUES (5, N'SC5', N'Đồ chơi mô hình', 1)
INSERT [dbo].[sub_category] ([id], [sub_cate_code], [sub_cate_name], [cate_id]) VALUES (6, N'SC6', N'Đồ chơi bông vải', 1)
SET IDENTITY_INSERT [dbo].[sub_category] OFF
GO
ALTER TABLE [dbo].[product]  WITH CHECK ADD FOREIGN KEY([status_id])
REFERENCES [dbo].[p_status] ([id])
GO
ALTER TABLE [dbo].[product]  WITH CHECK ADD FOREIGN KEY([subcate_id])
REFERENCES [dbo].[sub_category] ([id])
GO
ALTER TABLE [dbo].[product_brand]  WITH CHECK ADD FOREIGN KEY([brand_id])
REFERENCES [dbo].[brand] ([id])
GO
ALTER TABLE [dbo].[product_brand]  WITH CHECK ADD FOREIGN KEY([product_id])
REFERENCES [dbo].[product] ([id])
GO
ALTER TABLE [dbo].[sub_category]  WITH CHECK ADD FOREIGN KEY([cate_id])
REFERENCES [dbo].[category] ([id])
GO
