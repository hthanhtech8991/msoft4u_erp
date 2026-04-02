# ERP System - ReactJS + Tailwind CSS v4

Chào bạn! Dự án này sử dụng **Tailwind CSS v4** cùng với **Vite**. Ở phiên bản v4, Tailwind được tích hợp trực tiếp qua plugin của Vite và cấu hình chủ yếu nằm trong file CSS thay vì file `tailwind.config.js` truyền thống.

## Cách chạy dự án trên máy tính cá nhân

Để thấy được các hiệu ứng và CSS của Tailwind, bạn **không thể** chỉ mở file `index.html` trực tiếp trong trình duyệt. Bạn cần chạy môi trường phát triển (development server) theo các bước sau:

1.  **Cài đặt NodeJS:** Đảm bảo máy bạn đã cài đặt NodeJS (phiên bản 18 trở lên).
2.  **Mở Terminal/Command Prompt:** Di chuyển vào thư mục chứa mã nguồn.
3.  **Cài đặt thư viện:** Chạy lệnh sau để tải các thư viện cần thiết (bao gồm Tailwind CSS):
    ```bash
    npm install
    ```
4.  **Chạy dự án:** Khởi động môi trường phát triển:
    ```bash
    npm run dev
    ```
5.  **Truy cập:** Mở trình duyệt và truy cập vào địa chỉ hiển thị trên terminal (thường là `http://localhost:5173` hoặc `http://localhost:3000`).

## Tại sao không thấy file `tailwind.config.js`?

Dự án này sử dụng **Tailwind CSS v4**. Trong phiên bản này:
- Cấu hình được thực hiện trực tiếp trong file `src/index.css` bằng khối `@theme`.
- Plugin `@tailwindcss/vite` trong file `vite.config.ts` sẽ tự động quét các file `.tsx` để tạo ra CSS cần thiết khi bạn chạy lệnh `npm run dev` hoặc `npm run build`.

## Cấu trúc CSS chính
- File cấu hình CSS: `src/index.css`
- File cấu hình Vite: `vite.config.ts` (có dòng `import tailwindcss from '@tailwindcss/vite'`)

Nếu bạn gặp khó khăn gì khác, hãy cho mình biết nhé!
