var dssv = [];
var DSSV_LOCAL = "dssvLocalStorage";

function kiemTraMaSV(newSV, arrSV) {
  for (i = 0; i < arrSV.length; i++) {
    var currentSV = arrSV[i];
    if (newSV.ma == currentSV.ma) {
      return false;
    }
  }
  return true;
}

function renderTableSV(dssv) {
  var contentHTML = "";
  for (i = 0; i < dssv.length; i++) {
    const sv = dssv[i];
    contentHTML += `
            <tr>
                <td>${sv.ma}</td>
                <td>${sv.ten}</td>
                <td>${sv.email}</td>
                <td>${sv.ngaysinh}</td>
                <td>${sv.khoahoc}</td>
                <td>${sv.DTB()}</td>
                <td>
                    <button class="btn btn-success" onclick="suaSV('${
                      sv.ma
                    }')">Sửa</button>
                    <button class="btn btn-danger" onclick="xoaSV('${
                      sv.ma
                    }')">Xoá</button>
                </td>
            </tr>
                `;
  }

  document.getElementById("tbodySinhVien").innerHTML = contentHTML;
}

function saveLocalStorage(arr) {
  var dssvJSON = JSON.stringify(arr);
  localStorage.setItem(DSSV_LOCAL, dssvJSON);
}

function layThongTinSV() {
  var maSinhVien = document.getElementById("txtMaSV").value;
  var tenSinhVien = document.getElementById("txtTenSV").value;
  var emailSinhVien = document.getElementById("txtEmail").value;
  var matKhauSinhVien = document.getElementById("txtPass").value;
  var ngaySinh = document.getElementById("txtNgaySinh").value;
  var khoaHoc = document.getElementById("khSV").value;
  var diemToan = document.getElementById("txtDiemToan").value * 1;
  var diemLy = document.getElementById("txtDiemLy").value * 1;
  var diemHoa = document.getElementById("txtDiemHoa").value * 1;

  var sinhVien = new SinhVien(
    maSinhVien,
    tenSinhVien,
    emailSinhVien,
    matKhauSinhVien,
    ngaySinh,
    khoaHoc,
    diemToan,
    diemLy,
    diemHoa
  );
  return sinhVien;
}

function layViTriSV(maSV, arr) {
  var viTri = -1;
  for (i = 0; i < arr.length; i++) {
    if (maSV.toString() == arr[i].ma.toString()) {
      viTri = i;
    }
  }
  return viTri;
}

function suaSV(maSV) {
  var viTri = layViTriSV(maSV, dssv);
  if (viTri !== -1) {
    var currentSV = dssv[viTri];
    document.getElementById("txtMaSV").value = currentSV.ma;
    document.getElementById("txtMaSV").disabled = true;
    document.getElementById("txtTenSV").value = currentSV.ten;
    document.getElementById("txtEmail").value = currentSV.email;
    document.getElementById("txtPass").value = currentSV.matkhau;
    document.getElementById("txtNgaySinh").value = currentSV.ngaysinh;
    document.getElementById("khSV").value = currentSV.khoahoc;
    document.getElementById("txtDiemToan").value = currentSV.toan;
    document.getElementById("txtDiemLy").value = currentSV.ly;
    document.getElementById("txtDiemHoa").value = currentSV.hoa;
  }
}

function capNhatSV(maSV) {
  var sinhVien = layThongTinSV();
  var viTri = layViTriSV(sinhVien.ma, dssv);
  if (viTri !== -1) {
    dssv[viTri] = sinhVien;
    renderTableSV(dssv);
    saveLocalStorage(dssv);
  }
}

function xoaSV(maSV) {
  var viTri = layViTriSV(maSV, dssv);
  if (viTri !== -1) {
    dssv.splice(viTri, 1);
    renderTableSV(dssv);
    saveLocalStorage(dssv);
  }
}

function themSV() {
  var sinhVien = layThongTinSV();
  let checkSV = kiemTraMaSV(sinhVien, dssv);
  if (checkSV) {
    dssv.push(sinhVien);
    // var dssvJSON = JSON.stringify(dssv);
    // localStorage.setItem(DSSV_LOCAL, dssvJSON);
    saveLocalStorage(dssv);
  }

  renderTableSV(dssv);
}

function resetSV() {
  dssv = [];
  renderTableSV(dssv);
  saveLocalStorage(dssv);
}

var dssvJSON = localStorage.getItem(DSSV_LOCAL);
var newDSSV = JSON.parse(dssvJSON);

if (newDSSV) {
  dssv = newDSSV.map(function (item) {
    return new SinhVien(
      item.ma,
      item.ten,
      item.email,
      item.matkhau,
      item.ngaysinh,
      item.khoahoc,
      item.toan,
      item.ly,
      item.hoa
    );
  });
  renderTableSV(dssv);
}
