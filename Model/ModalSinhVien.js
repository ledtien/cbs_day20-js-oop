function SinhVien(
  _ma,
  _ten,
  _email,
  _matKhau,
  _ngaySinh,
  _khoaHoc,
  _toan,
  _ly,
  _hoa
) {
  this.ma = _ma;
  this.ten = _ten;
  this.email = _email;
  (this.matkhau = _matKhau),
    (this.ngaysinh = _ngaySinh),
    (this.khoahoc = _khoaHoc),
    (this.toan = _toan),
    (this.ly = _ly),
    (this.hoa = _hoa),
    (this.DTB = function () {
      return (this.toan + this.ly + this.hoa) / 3;
    });
}
