# Thư Mời Tốt Nghiệp · Trần Hoàng Tuấn Minh

Trang web thư mời dự lễ tốt nghiệp kiêm portfolio cá nhân, theo chủ đề **thẻ bài tarot phép thuật**. Trang có bản đồ hành trình 2.5D để khám phá như trong game.

> Lễ tốt nghiệp: **Thứ Bảy, 07.11.2026 · từ 12h30** tại Trường Đại học FPT TP.HCM (Lô E2a-7, Đường D1, Khu Công nghệ cao, TP.HCM)

## Tính năng

**Màn mở đầu**
- Bộ bài trên quyển sách phép. Chọn một lá thì lá bài bay ra giữa màn hình, xoay, phát sáng rồi lật ra ảnh chân dung.
- Các lá còn lại tan thành hàng trăm lá bài nhỏ, bay xếp thành tên.

**Thư mời**
- Lời cảm ơn, trải bài ba lá (quá khứ, hiện tại, tương lai), album kỷ niệm.
- Phong bì thư mời có đếm ngược tới ngày lễ (theo giờ Việt Nam) và nút xem đường đi.

**Bản đồ hành trình 2.5D**
- Kéo để di chuyển, cuộn chuột hoặc chụm hai ngón để phóng to.
- Mèo phù thủy dẫn đường, sương mờ tan khi khám phá, đếm tiến độ x/8.
- 8 địa điểm ứng với các phần của portfolio:

| # | Địa điểm | Nội dung |
|---|----------|----------|
| 1 | Làng Khởi Đầu | Giới thiệu bản thân |
| 2 | Thư Viện Cổ | Học vấn và các cột mốc |
| 3 | Xưởng Giả Kim | Kinh nghiệm thực tập Backend tại FPT Software |
| 4 | Vườn Pha Lê | Dự án .NET: 360Retail, TreeShop |
| 5 | Lều Người Máy | Đồ án tốt nghiệp SmartCanteen |
| 6 | Đài Thiên Văn | Kỹ năng |
| 7 | Tháp Cú Thư | Liên hệ |
| 8 | Lâu Đài Tốt Nghiệp | Quay về thư mời |

**Hiệu ứng nền**
- Trời sao, sao băng, thẻ bài bay theo khi cuộn, vệt lấp lánh theo con trỏ.

**Khả năng truy cập**
- Responsive từ điện thoại đến màn hình lớn.
- Tôn trọng tùy chọn giảm chuyển động (`prefers-reduced-motion`).
- Điều khiển được bằng bàn phím (Tab, Enter, Esc).

## Công nghệ

HTML, CSS và JavaScript thuần, không dùng framework và **không cần bước build**.

- Toàn bộ hình minh họa (thẻ bài, công trình, cây cối, mèo...) được vẽ bằng **SVG sinh từ code**.
- Hiệu ứng hạt và chữ dùng **Canvas 2D**.
- Font: Baloo 2, Nunito, Mali (Google Fonts, hỗ trợ tiếng Việt).

## Cấu trúc thư mục

```
.
├── index.html          # Bố cục trang và nội dung thư mời
├── css/
│   └── style.css       # Toàn bộ giao diện
├── js/
│   ├── sprite.js       # Bộ hình SVG: thẻ bài, trăng, mũ, sách, mèo...
│   ├── main.js         # Màn mở đầu, hiệu ứng nền, đếm ngược, khung ảnh
│   ├── iso.js          # Vẽ bản đồ 2.5D (công trình, cây, đường đá)
│   └── map.js          # Bản đồ tương tác và nội dung từng địa điểm
└── assets/
    └── images/         # Ảnh cá nhân (sẽ thêm sau)
```

## Chạy thử trên máy

Mở trực tiếp file `index.html` bằng trình duyệt, hoặc chạy một server tĩnh:

```bash
npx serve .
# hoặc
python -m http.server 8000
```

## Chỉnh nội dung

| Muốn sửa | Ở đâu |
|----------|-------|
| Lời cảm ơn, thư mời, giờ lễ, địa điểm | `index.html` |
| Nội dung các địa điểm trên bản đồ (giới thiệu, dự án, kỹ năng, liên hệ) | `js/map.js`: `INFO`, `PROJECTS`, hàm `bodyFor` |
| Tên và nhãn các địa điểm | `js/iso.js`: mảng `LOC` |
| Giờ lễ và đếm ngược | `js/main.js` và `js/map.js`: `EV_START`, `EV_END` (giờ UTC) |
| Màu sắc, font | `css/style.css`: biến trong `:root` |

**Về ảnh:** các khung ảnh hiện cho phép bấm để xem thử ảnh trên máy mình. Ảnh này **không được lưu và không gửi đi đâu**. Ảnh chính thức sẽ được đặt vào `assets/images/` rồi gắn cố định vào trang.

## Triển khai

**Vercel**
1. Import repository này trên vercel.com.
2. Framework Preset chọn **Other**, để trống Build Command và Output Directory.
3. Bấm **Deploy**.

**GitHub Pages**
1. Vào *Settings → Pages*.
2. Ở mục *Source*, chọn **Deploy from a branch**, nhánh `main`, thư mục `/ (root)`.

## Tác giả

**Trần Hoàng Tuấn Minh**, Backend Developer · C# / .NET, Đại học FPT TP.HCM
- GitHub: [TranMinh0903](https://github.com/TranMinh0903)
- LinkedIn: [tranhoangtuanminh](https://www.linkedin.com/in/tranhoangtuanminh)
