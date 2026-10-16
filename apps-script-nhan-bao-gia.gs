/**
 * Nhận yêu cầu báo giá từ website OKIO và ghi vào Google Sheet.
 * Cách dùng: mở Google Sheet > Tiện ích mở rộng > Apps Script, dán file này,
 * Triển khai > Tùy chọn triển khai mới > Ứng dụng web
 * (Thực thi với tư cách: Tôi, Người có quyền truy cập: Bất kỳ ai),
 * rồi dán URL /exec vào FORM_ENDPOINT trong index.html.
 */
const SHEET_NAME = 'Báo giá';
const HEADERS = ['Thời gian', 'Họ tên', 'Số điện thoại', 'Dòng bể', 'Vị trí', 'Tỉnh/TP', 'Ghi chú', 'Trang'];

function doPost(e) {
  const p = e.parameter || {};
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
  }
  sh.appendRow([
    new Date(),
    p.ho_ten || '',
    "'" + (p.so_dien_thoai || ''),
    p.dong_be_ten || p.dong_be || '',
    p.vi_tri || '',
    p.tinh_thanh || '',
    p.ghi_chu || '',
    p.trang || ''
  ]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
