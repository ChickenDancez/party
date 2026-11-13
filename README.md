# HOTZA888 · ติดตั้งด้วย GitHub, Vercel และ Supabase

เว็บธีมตรุษจีนสำหรับรับโค้ด HZ888 พร้อมยอดผู้เข้าชมสะสม คนที่อยู่บนหน้า และยอดรับโค้ด เบราว์เซอร์เดิมนับเป็นผู้รับหนึ่งครั้ง ยอดทั้งหมดเริ่มจากศูนย์บนฐานข้อมูลใหม่

## 1. Supabase

1. เปิดโปรเจกต์ Supabase แล้วเข้า SQL Editor → New query
2. วางเนื้อหาจาก supabase/setup.sql ทั้งหมดแล้วกด Run
3. จด Project URL และคัดลอกSecret key (sb_secret_...) จากหน้า API Keys ของโปรเจกต์ เก็บคีย์นี้ไว้สำหรับตั้งค่าใน Vercel เท่านั้น

## 2. GitHub และ Vercel

1. แตก ZIP แล้วอัปโหลดไฟล์ด้านในขึ้น GitHub ให้ vercel.json, api และ public อยู่ที่รากของ repo ถ้าใช้ repo ที่มีอยู่ ให้สร้างโฟลเดอร์สำหรับเว็บนี้แล้วเลือกโฟลเดอร์นั้นเป็น Root Directory ตอน Import
2. ใน Vercel เลือก Add New → Project → Import repo จาก GitHub โปรเจกต์นี้ใช้ Framework Preset แบบ Other และ Output Directory เป็น public ตาม vercel.json
3. ใส่ Environment Variables สำหรับ Production ก่อนกด Deploy

   | ตัวแปร | ค่า |
   | --- | --- |
   | SUPABASE_URL | Project URL เช่น https://PROJECT.supabase.co |
   | SUPABASE_SECRET_KEY | Secret key (sb_secret_...) ของโปรเจกต์เดียวกัน |
   | ACTIVITY_CODE | HZ888 |
   | ACTIVITY_DETAILS | รายละเอียดที่จะแสดงหลังเปิดโค้ด เว้นว่างได้ |

4. เปิด URL ของ Vercel แล้วลองเปิดโค้ด ดูว่ายอดรับโค้ดเพิ่มเมื่อเปิดครั้งแรกและไม่เพิ่มเมื่อกดซ้ำจากเบราว์เซอร์เดิม การทดสอบบนเว็บจริงจะถูกบันทึกในยอด

## 3. โดเมนของคุณ

เปิด Settings → Domains ในโปรเจกต์ Vercel แล้วเพิ่มซับโดเมนที่ต้องการ เช่น event.example.com จากนั้นเพิ่ม DNS ตามค่าที่ Vercel แสดงในผู้ให้บริการ DNS ของโดเมน เมื่อสถานะผ่านและ HTTPS พร้อมแล้ว ให้นำลิงก์ไปใส่ปุ่มรับ Code ใน Telegram

เปลี่ยนโค้ดและรายละเอียดได้ที่ Environment Variables ของ Vercel แล้ว Redeploy ยอดรับโค้ดเป็นยอดสะสมตั้งแต่เริ่มใช้ฐานข้อมูลนี้

หัวเว็บใช้ชื่อ HOTZA888 แบบข้อความตามเวอร์ชันล่าสุด

