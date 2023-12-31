USE [trainingcrud]
GO
/****** Object:  Table [dbo].[brand]    Script Date: 12/23/2023 8:27:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[brand](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[brand_name] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[category]    Script Date: 12/23/2023 8:27:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[category](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[cate_code] [varchar](255) NULL,
	[cate_name] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[p_status]    Script Date: 12/23/2023 8:27:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[p_status](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[status_name] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[product]    Script Date: 12/23/2023 8:27:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[product](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[color] [nvarchar](255) NULL,
	[descriptionn] [nvarchar](255) NULL,
	[origin_price] [float] NULL,
	[product_name] [nvarchar](255) NULL,
	[quantity] [bigint] NULL,
	[sell_price] [float] NULL,
	[status_id] [bigint] NULL,
	[subcate_id] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[product_brand]    Script Date: 12/23/2023 8:27:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[product_brand](
	[brand_id] [bigint] NOT NULL,
	[product_id] [bigint] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[brand_id] ASC,
	[product_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[sub_category]    Script Date: 12/23/2023 8:27:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sub_category](
	[cate_id] [bigint] NULL,
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[sub_cate_code] [varchar](255) NULL,
	[sub_cate_name] [nvarchar](255) NULL,
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

INSERT [dbo].[product] ([id], [color], [descriptionn], [origin_price], [product_name], [quantity], [sell_price], [status_id], [subcate_id]) VALUES (117, N'888', N'tốt', 1, N'8888', 1, 1, 2, 1)
INSERT [dbo].[product] ([id], [color], [descriptionn], [origin_price], [product_name], [quantity], [sell_price], [status_id], [subcate_id]) VALUES (118, N'999', N'tốt', 1, N'999', NULL, 1, 2, 1)
INSERT [dbo].[product] ([id], [color], [descriptionn], [origin_price], [product_name], [quantity], [sell_price], [status_id], [subcate_id]) VALUES (119, N'Vàng', N'tốt', 300000, N'Leo âm nhạc Bobi Craft', 12, 599000, 1, 2)
INSERT [dbo].[product] ([id], [color], [descriptionn], [origin_price], [product_name], [quantity], [sell_price], [status_id], [subcate_id]) VALUES (120, N'Đa Màu', N'tốt', 60000, N'Điện thoại ô tô mèo con có dây kéo và nhạc', 56, 147000, 1, 2)
INSERT [dbo].[product] ([id], [color], [descriptionn], [origin_price], [product_name], [quantity], [sell_price], [status_id], [subcate_id]) VALUES (121, N'Đa Màu', N'tốt', 10000, N'Đồ chơi cót chim cú mèo biết đi', 43, 35000, 1, 2)
INSERT [dbo].[product] ([id], [color], [descriptionn], [origin_price], [product_name], [quantity], [sell_price], [status_id], [subcate_id]) VALUES (122, N'Đa Màu', N'tốt', 20000, N'Đồ chơi đàn gõ mộc cầm 8 thanh', 89, 63000, 1, 1)
INSERT [dbo].[product] ([id], [color], [descriptionn], [origin_price], [product_name], [quantity], [sell_price], [status_id], [subcate_id]) VALUES (123, N'Đa Màu', N'tốt', 90000, N'Đồ chơi gỗ ghép số hình khối 3D Toyshouse 574', 99, 219000, 1, 1)
INSERT [dbo].[product] ([id], [color], [descriptionn], [origin_price], [product_name], [quantity], [sell_price], [status_id], [subcate_id]) VALUES (124, N'Đa Màu', N'tốt', 30000, N'Đồ chơi chim xanh cáu kỉnh Woody', 76, 76000, 1, 1)
INSERT [dbo].[product] ([id], [color], [descriptionn], [origin_price], [product_name], [quantity], [sell_price], [status_id], [subcate_id]) VALUES (125, N'Đa Màu', N'tốt', 10000, N'Đồ chơi vặn cót cua tập bơi ngửa (nhiều màu)', 67, 25000, 1, 3)
INSERT [dbo].[product] ([id], [color], [descriptionn], [origin_price], [product_name], [quantity], [sell_price], [status_id], [subcate_id]) VALUES (126, N'Đa màu', N'tốt', 23000, N'Đồ chơi nhà tắm chú heo phun nước biết bơi', 88, 51000, 1, 3)
INSERT [dbo].[product] ([id], [color], [descriptionn], [origin_price], [product_name], [quantity], [sell_price], [status_id], [subcate_id]) VALUES (127, N'Đa Màu', N'tốt', 30000, N'Set đồ chơi tắm 4 món hình sinh vật biển Toys House 0321-TH-DC025', 99, 65000, 1, 3)
INSERT [dbo].[product] ([id], [color], [descriptionn], [origin_price], [product_name], [quantity], [sell_price], [status_id], [subcate_id]) VALUES (128, N'Đa Màu', N'tốt', 30000, N'Đồ chơi Lego 701650 - Xe ô tô Mercedes Benz cổ điển', 88, 673000, 1, 4)
INSERT [dbo].[product] ([id], [color], [descriptionn], [origin_price], [product_name], [quantity], [sell_price], [status_id], [subcate_id]) VALUES (129, N'Đa màu', N'tốt', 150000, N'Đồ chơi Lego 607401 - Xe ô tô Ford cổ điển', 33, 336000, 1, 4)
INSERT [dbo].[product] ([id], [color], [descriptionn], [origin_price], [product_name], [quantity], [sell_price], [status_id], [subcate_id]) VALUES (130, N'Đa Màu', N'tốt', 200000, N'Đồ chơi Lego 601075 - Mùa hoa anh đào nở', 45, 406000, 1, 4)
INSERT [dbo].[product] ([id], [color], [descriptionn], [origin_price], [product_name], [quantity], [sell_price], [status_id], [subcate_id]) VALUES (131, N'Đa Màu', N'tốt', 350000, N'Đồ chơi đường hầm sư tử', 88, 795000, 1, 5)
INSERT [dbo].[product] ([id], [color], [descriptionn], [origin_price], [product_name], [quantity], [sell_price], [status_id], [subcate_id]) VALUES (132, N'Đa Màu', N'tốt', 100000, N'Đồ chơi xe Bugatti biến hình robot Mecha Ares', 43, 171000, 1, 5)
INSERT [dbo].[product] ([id], [color], [descriptionn], [origin_price], [product_name], [quantity], [sell_price], [status_id], [subcate_id]) VALUES (133, N'Đa Màu', N'tốt', 200000, N'Đồ chơi mô hình xe cẩu móc có đèn nhạc Toystar', 89, 486000, 1, 5)
INSERT [dbo].[product] ([id], [color], [descriptionn], [origin_price], [product_name], [quantity], [sell_price], [status_id], [subcate_id]) VALUES (134, N'Đa màu', N'tốt', 200000, N'Cừu Barbra Bobi Craft tinh nghịch', 78, 495000, 1, 6)
INSERT [dbo].[product] ([id], [color], [descriptionn], [origin_price], [product_name], [quantity], [sell_price], [status_id], [subcate_id]) VALUES (135, N'Đa Màu', N'tốt', 300000, N'Gấu Lizzie Bobi Craft mũm mĩm', 80, 610000, 1, 6)
INSERT [dbo].[product] ([id], [color], [descriptionn], [origin_price], [product_name], [quantity], [sell_price], [status_id], [subcate_id]) VALUES (136, N'Đa Màu', N'tốt', 500000, N'Melody bông thân thiện Combi 114675 (dùng pin)', 56, 1109000, 1, 6)
SET IDENTITY_INSERT [dbo].[product] OFF
GO
INSERT [dbo].[product_brand] ([brand_id], [product_id]) VALUES (1, 119)
INSERT [dbo].[product_brand] ([brand_id], [product_id]) VALUES (1, 120)
INSERT [dbo].[product_brand] ([brand_id], [product_id]) VALUES (1, 123)
INSERT [dbo].[product_brand] ([brand_id], [product_id]) VALUES (1, 125)
INSERT [dbo].[product_brand] ([brand_id], [product_id]) VALUES (1, 127)
INSERT [dbo].[product_brand] ([brand_id], [product_id]) VALUES (1, 128)
INSERT [dbo].[product_brand] ([brand_id], [product_id]) VALUES (1, 134)
INSERT [dbo].[product_brand] ([brand_id], [product_id]) VALUES (2, 121)
INSERT [dbo].[product_brand] ([brand_id], [product_id]) VALUES (2, 126)
INSERT [dbo].[product_brand] ([brand_id], [product_id]) VALUES (2, 129)
INSERT [dbo].[product_brand] ([brand_id], [product_id]) VALUES (2, 131)
INSERT [dbo].[product_brand] ([brand_id], [product_id]) VALUES (2, 132)
INSERT [dbo].[product_brand] ([brand_id], [product_id]) VALUES (2, 135)
INSERT [dbo].[product_brand] ([brand_id], [product_id]) VALUES (3, 122)
INSERT [dbo].[product_brand] ([brand_id], [product_id]) VALUES (3, 124)
INSERT [dbo].[product_brand] ([brand_id], [product_id]) VALUES (3, 130)
INSERT [dbo].[product_brand] ([brand_id], [product_id]) VALUES (3, 133)
INSERT [dbo].[product_brand] ([brand_id], [product_id]) VALUES (3, 136)
GO
SET IDENTITY_INSERT [dbo].[sub_category] ON 

INSERT [dbo].[sub_category] ([cate_id], [id], [sub_cate_code], [sub_cate_name]) VALUES (1, 1, N'SC1', N'Đồ Chơi Gỗ')
INSERT [dbo].[sub_category] ([cate_id], [id], [sub_cate_code], [sub_cate_name]) VALUES (1, 2, N'SC2', N'Đồ Chơi Phát Nhạc')
INSERT [dbo].[sub_category] ([cate_id], [id], [sub_cate_code], [sub_cate_name]) VALUES (1, 3, N'SC3', N'Đồ Chơi Nhà Tắm')
INSERT [dbo].[sub_category] ([cate_id], [id], [sub_cate_code], [sub_cate_name]) VALUES (1, 4, N'SC4', N'Đồ Chơi LeGo')
INSERT [dbo].[sub_category] ([cate_id], [id], [sub_cate_code], [sub_cate_name]) VALUES (1, 5, N'SC5', N'Đồ chơi mô hình')
INSERT [dbo].[sub_category] ([cate_id], [id], [sub_cate_code], [sub_cate_name]) VALUES (1, 6, N'SC6', N'Đồ chơi bông vải')
SET IDENTITY_INSERT [dbo].[sub_category] OFF
GO
ALTER TABLE [dbo].[product]  WITH CHECK ADD  CONSTRAINT [FKirxcln8pingvfkgbvdwgsmien] FOREIGN KEY([subcate_id])
REFERENCES [dbo].[sub_category] ([id])
GO
ALTER TABLE [dbo].[product] CHECK CONSTRAINT [FKirxcln8pingvfkgbvdwgsmien]
GO
ALTER TABLE [dbo].[product]  WITH CHECK ADD  CONSTRAINT [FKj8mxdpc5s7vx5i6vxbbti8l6e] FOREIGN KEY([status_id])
REFERENCES [dbo].[p_status] ([id])
GO
ALTER TABLE [dbo].[product] CHECK CONSTRAINT [FKj8mxdpc5s7vx5i6vxbbti8l6e]
GO
ALTER TABLE [dbo].[product_brand]  WITH CHECK ADD  CONSTRAINT [FK4ifks1l2dre6xgfenp6esphh5] FOREIGN KEY([product_id])
REFERENCES [dbo].[product] ([id])
GO
ALTER TABLE [dbo].[product_brand] CHECK CONSTRAINT [FK4ifks1l2dre6xgfenp6esphh5]
GO
ALTER TABLE [dbo].[product_brand]  WITH CHECK ADD  CONSTRAINT [FKn3q2blfsr3x3olbkydrre5h1j] FOREIGN KEY([brand_id])
REFERENCES [dbo].[brand] ([id])
GO
ALTER TABLE [dbo].[product_brand] CHECK CONSTRAINT [FKn3q2blfsr3x3olbkydrre5h1j]
GO
ALTER TABLE [dbo].[sub_category]  WITH CHECK ADD  CONSTRAINT [FKlesuwl96jgbc9gey9eqsxgfo5] FOREIGN KEY([cate_id])
REFERENCES [dbo].[category] ([id])
GO
ALTER TABLE [dbo].[sub_category] CHECK CONSTRAINT [FKlesuwl96jgbc9gey9eqsxgfo5]
GO
