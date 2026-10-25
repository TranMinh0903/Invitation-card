/* ===== Bộ hình SVG hoạt hình: thẻ bài, trăng, mũ, bút lông, sách, bình thuốc, quả cầu ===== */
(function () {
  'use strict';
  var INK = '#2B1C7A', PURPLE = '#6E56F0', PURPLE_D = '#5843D6', LAV = '#A99BFF', LAV_L = '#DAD3FF',
      CREAM = '#FFF4DC', YEL = '#FFC93C', SUN = '#FFB020', ORA = '#FF9F43', PINK = '#FF8FCB',
      PINK_L = '#FFC6E4', TEAL = '#36CFC0', TEAL_L = '#A6F4EA', WHITE = '#FFFFFF';
  var DEFS = [];
  function n(v) { return Math.round(v * 10) / 10; }

  function spark(x, y, r, fill, sw, st) {
    fill = fill || WHITE; sw = sw == null ? 1.6 : sw;
    var k = r * 0.2;
    return '<path d="M' + n(x) + ' ' + n(y - r) + 'Q' + n(x + k) + ' ' + n(y - k) + ' ' + n(x + r) + ' ' + n(y) +
      'Q' + n(x + k) + ' ' + n(y + k) + ' ' + n(x) + ' ' + n(y + r) + 'Q' + n(x - k) + ' ' + n(y + k) + ' ' + n(x - r) + ' ' + n(y) +
      'Q' + n(x - k) + ' ' + n(y - k) + ' ' + n(x) + ' ' + n(y - r) + 'Z" fill="' + fill + '" stroke="' + (st || INK) + '" stroke-width="' + sw + '" stroke-linejoin="round"/>';
  }
  function diamond(x, y, w, h, fill, sw) {
    return '<path d="M' + x + ' ' + (y - h) + 'L' + (x + w) + ' ' + y + 'L' + x + ' ' + (y + h) + 'L' + (x - w) + ' ' + y + 'Z" fill="' + (fill || ORA) +
      '" stroke="' + INK + '" stroke-width="' + (sw || 1.6) + '" stroke-linejoin="round"/>';
  }
  function starPts(cx, cy, k, R, r, rot) {
    rot = rot == null ? -Math.PI / 2 : rot;
    var p = [];
    for (var i = 0; i < k * 2; i++) {
      var rr = i % 2 ? r : R, a = rot + i * Math.PI / k;
      p.push(n(cx + Math.cos(a) * rr) + ',' + n(cy + Math.sin(a) * rr));
    }
    return p.join(' ');
  }
  function cloud(x, y, s, o) {
    o = o == null ? 3 : o;
    var parts = [[-0.95, 0.12, 0.5], [-0.38, -0.3, 0.68], [0.34, -0.14, 0.6], [0.95, 0.16, 0.46]], a = '', b = '';
    parts.forEach(function (p) {
      a += '<circle cx="' + n(x + p[0] * s) + '" cy="' + n(y + p[1] * s) + '" r="' + n(p[2] * s + o) + '"/>';
      b += '<circle cx="' + n(x + p[0] * s) + '" cy="' + n(y + p[1] * s) + '" r="' + n(p[2] * s) + '"/>';
    });
    var rx = x - 1.4 * s, rw = 2.8 * s, rh = 0.62 * s;
    a += '<rect x="' + n(rx - o) + '" y="' + n(y - o) + '" width="' + n(rw + 2 * o) + '" height="' + n(rh + 2 * o) + '" rx="' + n(rh / 2 + o) + '"/>';
    b += '<rect x="' + n(rx) + '" y="' + n(y) + '" width="' + n(rw) + '" height="' + n(rh) + '" rx="' + n(rh / 2) + '"/>';
    return '<g fill="' + INK + '">' + a + '</g><g fill="' + WHITE + '">' + b + '</g>';
  }
  /* trăng lưỡi liềm: vòng A bị khoét bởi vòng B */
  function crescent(id, cx, cy, R, bx, by, br, sw, fill) {
    var pad = sw + 2;
    DEFS.push('<mask id="' + id + 'm" maskUnits="userSpaceOnUse" x="' + n(cx - R - pad) + '" y="' + n(cy - R - pad) + '" width="' + n(2 * (R + pad)) + '" height="' + n(2 * (R + pad)) + '">' +
      '<rect x="' + n(cx - R - pad) + '" y="' + n(cy - R - pad) + '" width="' + n(2 * (R + pad)) + '" height="' + n(2 * (R + pad)) + '" fill="#fff"/>' +
      '<circle cx="' + bx + '" cy="' + by + '" r="' + br + '" fill="#000"/></mask>' +
      '<clipPath id="' + id + 'c"><circle cx="' + cx + '" cy="' + cy + '" r="' + R + '"/></clipPath>');
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="' + (fill || YEL) + '" stroke="' + INK + '" stroke-width="' + sw + '" mask="url(#' + id + 'm)"/>' +
      '<circle cx="' + bx + '" cy="' + by + '" r="' + br + '" fill="none" stroke="' + INK + '" stroke-width="' + sw + '" clip-path="url(#' + id + 'c)"/>';
  }
  function arc(cx, cy, r, a1, a2, color, w) {
    var t1 = a1 * Math.PI / 180, t2 = a2 * Math.PI / 180;
    return '<path d="M' + n(cx + Math.cos(t1) * r) + ' ' + n(cy + Math.sin(t1) * r) + 'A' + r + ' ' + r + ' 0 0 1 ' + n(cx + Math.cos(t2) * r) + ' ' + n(cy + Math.sin(t2) * r) +
      '" fill="none" stroke="' + (color || WHITE) + '" stroke-width="' + (w || 4) + '" stroke-linecap="round" opacity=".9"/>';
  }
  function rays(cx, cy, r1, r2, k, half, fill, sw) {
    var d = '';
    for (var i = 0; i < k; i++) {
      var a = i / k * Math.PI * 2;
      d += 'M' + n(cx + Math.cos(a - half) * r1) + ' ' + n(cy + Math.sin(a - half) * r1) + 'L' + n(cx + Math.cos(a) * r2) + ' ' + n(cy + Math.sin(a) * r2) +
        'L' + n(cx + Math.cos(a + half) * r1) + ' ' + n(cy + Math.sin(a + half) * r1) + 'Z';
    }
    return '<path d="' + d + '" fill="' + fill + '" stroke="' + INK + '" stroke-width="' + sw + '" stroke-linejoin="round"/>';
  }
  function flower(x, y, r) {
    var a = '', b = '';
    for (var i = 0; i < 5; i++) {
      var t = -Math.PI / 2 + i * Math.PI * 2 / 5, px = x + Math.cos(t) * r * 1.1, py = y + Math.sin(t) * r * 1.1;
      a += '<circle cx="' + n(px) + '" cy="' + n(py) + '" r="' + n(r + 1.6) + '"/>';
      b += '<circle cx="' + n(px) + '" cy="' + n(py) + '" r="' + n(r) + '"/>';
    }
    return '<g fill="' + INK + '">' + a + '</g><g fill="' + YEL + '">' + b + '</g><circle cx="' + x + '" cy="' + y + '" r="' + n(r * 0.75) + '" fill="' + ORA + '" stroke="' + INK + '" stroke-width="1.4"/>';
  }
  function face(cx, cy, s, happy) {
    var e = s * 0.24, out = '';
    if (happy) {
      out += '<path d="M' + n(cx - e - s * 0.12) + ' ' + n(cy) + 'Q' + n(cx - e) + ' ' + n(cy - s * 0.16) + ' ' + n(cx - e + s * 0.12) + ' ' + n(cy) +
        'M' + n(cx + e - s * 0.12) + ' ' + n(cy) + 'Q' + n(cx + e) + ' ' + n(cy - s * 0.16) + ' ' + n(cx + e + s * 0.12) + ' ' + n(cy) +
        '" fill="none" stroke="' + INK + '" stroke-width="' + n(s * 0.075) + '" stroke-linecap="round"/>';
      out += '<path d="M' + n(cx - s * 0.26) + ' ' + n(cy + s * 0.2) + 'Q' + n(cx) + ' ' + n(cy + s * 0.62) + ' ' + n(cx + s * 0.26) + ' ' + n(cy + s * 0.2) + 'Z" fill="' + INK + '" stroke="' + INK + '" stroke-width="' + n(s * 0.05) + '" stroke-linejoin="round"/>';
      out += '<ellipse cx="' + cx + '" cy="' + n(cy + s * 0.4) + '" rx="' + n(s * 0.13) + '" ry="' + n(s * 0.07) + '" fill="' + PINK + '"/>';
    } else {
      out += '<ellipse cx="' + n(cx - e) + '" cy="' + cy + '" rx="' + n(s * 0.07) + '" ry="' + n(s * 0.1) + '" fill="' + INK + '"/>' +
        '<ellipse cx="' + n(cx + e) + '" cy="' + cy + '" rx="' + n(s * 0.07) + '" ry="' + n(s * 0.1) + '" fill="' + INK + '"/>';
      out += '<path d="M' + n(cx - s * 0.2) + ' ' + n(cy + s * 0.24) + 'Q' + cx + ' ' + n(cy + s * 0.44) + ' ' + n(cx + s * 0.2) + ' ' + n(cy + s * 0.24) +
        '" fill="none" stroke="' + INK + '" stroke-width="' + n(s * 0.075) + '" stroke-linecap="round"/>';
    }
    out += '<circle cx="' + n(cx - s * 0.45) + '" cy="' + n(cy + s * 0.22) + '" r="' + n(s * 0.13) + '" fill="' + PINK + '" opacity=".85"/>' +
      '<circle cx="' + n(cx + s * 0.45) + '" cy="' + n(cy + s * 0.22) + '" r="' + n(s * 0.13) + '" fill="' + PINK + '" opacity=".85"/>';
    return out;
  }
  function bow(x, y) {
    return '<g stroke="' + INK + '" stroke-width="3" stroke-linejoin="round" fill="' + PINK + '">' +
      '<path d="M' + (x - 3) + ' ' + (y + 2) + 'L' + (x - 13) + ' ' + (y + 21) + 'L' + (x - 6) + ' ' + (y + 19) + 'L' + (x - 3) + ' ' + (y + 25) + 'L' + (x + 1) + ' ' + (y + 4) + 'Z"/>' +
      '<path d="M' + (x + 3) + ' ' + (y + 2) + 'L' + (x + 13) + ' ' + (y + 21) + 'L' + (x + 6) + ' ' + (y + 19) + 'L' + (x + 3) + ' ' + (y + 25) + 'L' + (x - 1) + ' ' + (y + 4) + 'Z"/>' +
      '<path d="M' + x + ' ' + y + 'C' + (x - 10) + ' ' + (y - 15) + ' ' + (x - 27) + ' ' + (y - 11) + ' ' + (x - 25) + ' ' + (y + 1) + 'C' + (x - 23) + ' ' + (y + 12) + ' ' + (x - 10) + ' ' + (y + 9) + ' ' + x + ' ' + y + 'Z"/>' +
      '<path d="M' + x + ' ' + y + 'C' + (x + 10) + ' ' + (y - 15) + ' ' + (x + 27) + ' ' + (y - 11) + ' ' + (x + 25) + ' ' + (y + 1) + 'C' + (x + 23) + ' ' + (y + 12) + ' ' + (x + 10) + ' ' + (y + 9) + ' ' + x + ' ' + y + 'Z"/>' +
      '<circle cx="' + x + '" cy="' + y + '" r="5.5"/></g>';
  }

  /* ---------- khung thẻ (viewBox 0 0 200 330) ---------- */
  var FRAME = 'M44 40 H80 C88 40 92 36 100 29 C108 36 112 40 120 40 H156 A12 12 0 0 0 168 52 V272 A12 12 0 0 0 156 284 H120 C112 284 108 288 100 295 C92 288 88 284 80 284 H44 A12 12 0 0 0 32 272 V52 A12 12 0 0 0 44 40 Z';
  var RIBBON = '<path d="M32 256 H13 L20 268 L13 280 H32 Z" fill="' + PINK + '" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>' +
    '<path d="M168 256 H187 L180 268 L187 280 H168 Z" fill="' + PINK + '" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>' +
    '<rect x="26" y="250" width="148" height="34" rx="10" fill="' + WHITE + '" stroke="' + INK + '" stroke-width="3.5"/>';
  function base(panel, ribbon) {
    return '<rect x="6" y="12" width="188" height="316" rx="24" fill="' + INK + '"/>' +
      '<rect x="6" y="4" width="188" height="316" rx="24" fill="' + PURPLE + '" stroke="' + INK + '" stroke-width="5"/>' +
      '<rect x="14" y="12" width="172" height="300" rx="17" fill="none" stroke="' + LAV_L + '" stroke-width="1.6" opacity=".7"/>' +
      spark(18.5, 18.5, 4.5) + spark(181.5, 18.5, 4.5) + spark(18.5, 305.5, 4.5) + spark(181.5, 305.5, 4.5) +
      '<rect x="24" y="26" width="152" height="272" rx="12" fill="' + panel + '" stroke="' + INK + '" stroke-width="3.5"/>' +
      '<path d="' + FRAME + '" fill="none" stroke="' + INK + '" stroke-width="7" stroke-linejoin="round"/>' +
      '<path d="' + FRAME + '" fill="none" stroke="' + WHITE + '" stroke-width="3" stroke-linejoin="round"/>' +
      (ribbon ? RIBBON : '');
  }

  var backArt = cloud(52, 152, 12) + cloud(150, 154, 12) +
    crescent('bk', 96, 160, 40, 117, 146, 32, 4.5) + arc(96, 160, 31, 160, 222, WHITE, 4) +
    rays(123, 150, 12.5, 21, 12, 0.2, YEL, 2.4) +
    '<circle cx="123" cy="150" r="12" fill="' + SUN + '" stroke="' + INK + '" stroke-width="3"/>' + arc(123, 150, 7.5, 200, 250, WHITE, 2.4) +
    bow(100, 228) +
    diamond(100, 82, 5, 8.5) + diamond(70, 108, 3.4, 6) + diamond(132, 206, 3.4, 6) + diamond(64, 210, 3, 5, YEL) +
    spark(76, 86, 6.5) + spark(128, 92, 7.5) + spark(52, 190, 6) + spark(150, 196, 6.5) + spark(100, 262, 7.5) +
    spark(76, 258, 3.6) + spark(124, 258, 3.6) + spark(148, 116, 4);

  var starArt = cloud(60, 146, 10) + cloud(142, 142, 10) +
    crescent('sm', 62, 76, 13, 69, 70, 10.5, 3) +
    '<polygon points="' + starPts(100, 138, 5, 43, 25) + '" fill="' + YEL + '" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>' +
    '<ellipse cx="86" cy="120" rx="3.2" ry="7" fill="#fff" opacity=".85" transform="rotate(-28 86 120)"/>' +
    face(100, 138, 20, false) +
    '<ellipse cx="100" cy="214" rx="55" ry="17" fill="' + TEAL + '" stroke="' + INK + '" stroke-width="4"/>' +
    '<ellipse cx="95" cy="209" rx="36" ry="7.5" fill="' + TEAL_L + '" opacity=".8"/>' +
    '<ellipse cx="68" cy="217" rx="9" ry="3.6" fill="#1FA898" stroke="' + INK + '" stroke-width="2"/>' +
    '<ellipse cx="132" cy="219" rx="8" ry="3.2" fill="#1FA898" stroke="' + INK + '" stroke-width="2"/>' +
    '<polygon points="' + starPts(104, 215, 5, 6.5, 3.2) + '" fill="' + YEL + '" stroke="' + INK + '" stroke-width="1.8" stroke-linejoin="round"/>' +
    spark(140, 92, 7.5, YEL) + spark(152, 120, 4.6) + spark(50, 118, 4.6) + spark(86, 62, 4.2) + spark(148, 196, 5) + spark(52, 192, 4.6) +
    diamond(118, 70, 3.4, 6) + diamond(150, 66, 2.6, 4.5, PINK);

  var sunArt = rays(100, 122, 33, 52, 12, 0.19, SUN, 3.2) +
    '<circle cx="100" cy="122" r="34" fill="' + YEL + '" stroke="' + INK + '" stroke-width="4.5"/>' + arc(100, 122, 26, 195, 250, WHITE, 4) +
    face(100, 118, 30, true) +
    cloud(62, 170, 12) + cloud(140, 174, 12) +
    '<path d="M40 244 Q62 200 100 214 Q136 198 160 244 Z" fill="' + LAV + '" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>' +
    '<path d="M58 222 Q72 210 88 212" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/>' +
    flower(74, 230, 3.6) + flower(102, 222, 4) + flower(130, 232, 3.6) +
    spark(52, 82, 6) + spark(150, 78, 6.5, PINK) + spark(42, 140, 4.2) + spark(160, 140, 4.2) + diamond(70, 60, 3.2, 5.5) + diamond(132, 58, 3.2, 5.5, YEL);

  var magicArt =
    '<ellipse cx="68" cy="96" rx="25" ry="7" fill="' + PURPLE_D + '" stroke="' + INK + '" stroke-width="3.5"/>' +
    '<path d="M48 96 L64 54 Q69 44 75 54 L88 94 Z" fill="' + PURPLE + '" stroke="' + INK + '" stroke-width="3.5" stroke-linejoin="round"/>' +
    '<path d="M52 86 L84 84 L86.5 92 L50 94 Z" fill="' + YEL + '" stroke="' + INK + '" stroke-width="2.4" stroke-linejoin="round"/>' +
    spark(69, 70, 4.5, YEL) +
    cloud(152, 62, 8) + cloud(56, 142, 10) +
    '<path d="M124 112 C150 126 156 150 134 160 C118 168 126 186 150 180" fill="none" stroke="' + INK + '" stroke-width="10" stroke-linecap="round"/>' +
    '<path d="M124 112 C150 126 156 150 134 160 C118 168 126 186 150 180" fill="none" stroke="' + PINK + '" stroke-width="5" stroke-linecap="round"/>' +
    '<line x1="84" y1="170" x2="132" y2="104" stroke="' + INK + '" stroke-width="13" stroke-linecap="round"/>' +
    '<line x1="84" y1="170" x2="132" y2="104" stroke="' + LAV + '" stroke-width="7" stroke-linecap="round"/>' +
    '<line x1="96" y1="149" x2="118" y2="119" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity=".8"/>' +
    '<polygon points="' + starPts(138, 96, 5, 19, 9) + '" fill="' + YEL + '" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>' +
    '<ellipse cx="133" cy="88" rx="2.4" ry="4.5" fill="#fff" opacity=".85" transform="rotate(-30 133 88)"/>' +
    '<rect x="58" y="176" width="84" height="52" rx="7" fill="' + PURPLE + '" stroke="' + INK + '" stroke-width="4"/>' +
    '<rect x="64" y="182" width="72" height="40" rx="4" fill="' + LAV_L + '"/>' +
    '<text x="100" y="209" text-anchor="middle" font-family="\'Baloo 2\',Nunito,sans-serif" font-weight="800" font-size="18" fill="' + INK + '">&lt;/&gt;</text>' +
    '<path d="M44 230 H156 L162 239 Q163 243 158 243 H42 Q37 243 38 239 Z" fill="' + PINK + '" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>' +
    '<rect x="88" y="232" width="24" height="4" rx="2" fill="' + INK + '" opacity=".35"/>' +
    spark(106, 66, 6) + spark(46, 116, 4.8) + spark(162, 112, 5, PINK) + spark(108, 146, 4, YEL) + diamond(92, 58, 3, 5.5) + spark(160, 206, 4.5);

  /* sticker nhỏ cho khung ảnh (viewBox 0 0 60 60) */
  var stickerStar = '<polygon points="' + starPts(30, 32, 5, 26, 15) + '" fill="' + YEL + '" stroke="' + INK + '" stroke-width="3.6" stroke-linejoin="round"/>' + face(30, 32, 12, false);
  var stickerSun = rays(30, 30, 19, 29, 10, 0.24, SUN, 2.4) + '<circle cx="30" cy="30" r="19" fill="' + YEL + '" stroke="' + INK + '" stroke-width="3.4"/>' + face(30, 28, 16, true);

  /* ---------- đạo cụ trang chủ ---------- */
  var moonBig = crescent('mb', 112, 128, 80, 150, 100, 66, 7) + arc(112, 128, 64, 150, 215, WHITE, 8) +
    diamond(214, 44, 12, 20, ORA, 4) + diamond(236, 150, 9, 15, ORA, 3.5) + diamond(150, 236, 8, 13, ORA, 3.5) + diamond(30, 30, 7, 11, YEL, 3);
  var hat =
    '<ellipse cx="120" cy="186" rx="108" ry="26" fill="' + PURPLE_D + '" stroke="' + INK + '" stroke-width="7"/>' +
    '<path d="M42 182 C74 120 104 62 130 32 C140 20 160 18 172 30 C160 32 152 44 154 58 L198 178 Z" fill="' + PURPLE + '" stroke="' + INK + '" stroke-width="7" stroke-linejoin="round"/>' +
    '<path d="M56 156 C100 146 150 146 188 152 L196 176 C150 168 98 168 46 178 Z" fill="' + YEL + '" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>' +
    spark(118, 104, 12, YEL, 3) + spark(150, 126, 7, WHITE, 2.4) + spark(96, 136, 5, WHITE, 2) +
    '<path d="M120 76 A10 10 0 1 0 128 90 A7.5 7.5 0 1 1 120 76 Z" fill="' + YEL + '" stroke="' + INK + '" stroke-width="2.6" stroke-linejoin="round"/>';
  var quill =
    '<path d="M36 82 C80 40 170 14 254 18 C214 40 184 72 132 92 C100 104 62 102 36 82 Z" fill="#FFD27A" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>' +
    '<path d="M60 70 C110 48 160 34 226 26" fill="none" stroke="#E2A23A" stroke-width="3" stroke-linecap="round"/>' +
    '<path d="M98 56 L112 92 M128 46 L144 84 M158 38 L176 70 M188 30 L206 52 M86 64 L84 46 M120 50 L118 34 M152 40 L154 24" stroke="#E2A23A" stroke-width="2.4" stroke-linecap="round"/>' +
    '<path d="M40 80 C34 86 22 98 8 112 C20 104 32 96 46 88 Z" fill="#C98B4A" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>' +
    '<ellipse cx="44" cy="82" rx="8" ry="11" fill="' + YEL + '" stroke="' + INK + '" stroke-width="4" transform="rotate(35 44 82)"/>';


  /* ---------- mặt sau sang: xanh đêm + vàng, la bàn 8 cánh, mũ cử nhân ---------- */
  var GOLD = '#F5C451', GOLD_L = '#FFE597', GOLD_D = '#D9962B', GOLD_DD = '#B87A1E', NAVY = '#1C1860', INDIGO = '#2A2580';
  function moonRowGold(y) {
    var r = 4.2, xs = [70, 85, 100, 115, 130], ring = function (x) { return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="none" stroke="' + GOLD + '" stroke-width="1.6"/>'; };
    return ring(xs[0]) + ring(xs[1]) + '<path d="M' + xs[1] + ' ' + (y - r) + 'A' + r + ' ' + r + ' 0 0 1 ' + xs[1] + ' ' + (y + r) + 'Z" fill="' + GOLD + '"/>' +
      '<circle cx="100" cy="' + y + '" r="' + (r + 0.8) + '" fill="' + GOLD + '" stroke="' + INK + '" stroke-width="1.2"/>' +
      ring(xs[3]) + '<path d="M' + xs[3] + ' ' + (y - r) + 'A' + r + ' ' + r + ' 0 0 0 ' + xs[3] + ' ' + (y + r) + 'Z" fill="' + GOLD + '"/>' + ring(xs[4]);
  }
  function compass(cx, cy) {
    var o = '', tips = [], vals = [];
    for (var k = 0; k < 8; k++) {
      var a = -Math.PI / 2 + k * Math.PI / 4, L = k % 2 ? 22 : 33, b = a + Math.PI / 8;
      tips.push([cx + Math.cos(a) * L, cy + Math.sin(a) * L]);
      vals.push([cx + Math.cos(b) * 13.5, cy + Math.sin(b) * 13.5]);
    }
    [1, 3, 5, 7, 0, 2, 4, 6].forEach(function (k) {
      var t = tips[k], vr = vals[k], vl = vals[(k + 7) % 8];
      o += '<path d="M' + cx + ' ' + cy + 'L' + n(t[0]) + ' ' + n(t[1]) + 'L' + n(vl[0]) + ' ' + n(vl[1]) + 'Z" fill="' + (k % 2 ? GOLD_D : GOLD_L) + '"/>' +
        '<path d="M' + cx + ' ' + cy + 'L' + n(t[0]) + ' ' + n(t[1]) + 'L' + n(vr[0]) + ' ' + n(vr[1]) + 'Z" fill="' + (k % 2 ? GOLD_DD : GOLD) + '"/>' +
        '<path d="M' + n(vl[0]) + ' ' + n(vl[1]) + 'L' + n(t[0]) + ' ' + n(t[1]) + 'L' + n(vr[0]) + ' ' + n(vr[1]) + '" fill="none" stroke="' + INK + '" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>';
    });
    return o;
  }
  function mortar(cx, cy) {
    return '<path d="M' + (cx - 6) + ' ' + (cy + 1) + 'V' + (cy + 5) + 'Q' + cx + ' ' + (cy + 8.5) + ' ' + (cx + 6) + ' ' + (cy + 5) + 'V' + (cy + 1) + 'Z" fill="' + GOLD_D + '" stroke="' + INK + '" stroke-width="1.3" stroke-linejoin="round"/>' +
      '<path d="M' + cx + ' ' + (cy - 7) + 'L' + (cx + 10) + ' ' + (cy - 2) + 'L' + cx + ' ' + (cy + 3) + 'L' + (cx - 10) + ' ' + (cy - 2) + 'Z" fill="' + GOLD_L + '" stroke="' + INK + '" stroke-width="1.3" stroke-linejoin="round"/>' +
      '<path d="M' + cx + ' ' + (cy - 2) + 'L' + (cx + 7) + ' ' + (cy + 0.5) + 'V' + (cy + 6) + '" fill="none" stroke="' + GOLD + '" stroke-width="1.1" stroke-linecap="round"/>' +
      '<circle cx="' + (cx + 7) + '" cy="' + (cy + 6.8) + '" r="1.3" fill="' + GOLD + '"/>';
  }
  function luxBack() {
    var rr = seeded(11), dots = '', raysD = '', tick = '';
    for (var i = 0; i < 40; i++) dots += '<circle cx="' + n(36 + rr() * 128) + '" cy="' + n(46 + rr() * 238) + '" r="' + n(0.5 + rr() * 0.9) + '" fill="' + GOLD + '" opacity="' + n(0.2 + rr() * 0.45) + '"/>';
    for (var j = 0; j < 32; j++) {
      var a = j / 32 * Math.PI * 2, r2 = j % 2 ? 60 : 70, hw = j % 2 ? 0.035 : 0.05;
      raysD += 'M' + n(100 + Math.cos(a - hw) * 50) + ' ' + n(160 + Math.sin(a - hw) * 50) + 'L' + n(100 + Math.cos(a) * r2) + ' ' + n(160 + Math.sin(a) * r2) + 'L' + n(100 + Math.cos(a + hw) * 50) + ' ' + n(160 + Math.sin(a + hw) * 50) + 'Z';
    }
    for (var t = 0; t < 32; t++) {
      var ta = t / 32 * Math.PI * 2, r1 = t % 4 ? 39.5 : 36.5;
      tick += 'M' + n(100 + Math.cos(ta) * r1) + ' ' + n(160 + Math.sin(ta) * r1) + 'L' + n(100 + Math.cos(ta) * 43) + ' ' + n(160 + Math.sin(ta) * 43);
    }
    return '<rect x="6" y="12" width="188" height="316" rx="24" fill="' + INK + '"/>' +
      '<rect x="6" y="4" width="188" height="316" rx="24" fill="' + INDIGO + '" stroke="' + INK + '" stroke-width="5"/>' +
      '<rect x="14" y="12" width="172" height="300" rx="17" fill="none" stroke="' + GOLD + '" stroke-width="1.6" opacity=".85"/>' +
      spark(18.5, 18.5, 4.5, GOLD) + spark(181.5, 18.5, 4.5, GOLD) + spark(18.5, 305.5, 4.5, GOLD) + spark(181.5, 305.5, 4.5, GOLD) +
      '<rect x="24" y="26" width="152" height="272" rx="12" fill="' + NAVY + '" stroke="' + INK + '" stroke-width="3.5"/>' + dots +
      '<path d="' + FRAME + '" fill="none" stroke="' + INK + '" stroke-width="7" stroke-linejoin="round"/>' +
      '<path d="' + FRAME + '" fill="none" stroke="' + GOLD + '" stroke-width="3" stroke-linejoin="round"/>' +
      diamond(100, 31, 4.5, 6.5, GOLD_L, 1.6) + diamond(100, 293, 4.5, 6.5, GOLD_L, 1.6) +
      '<path d="' + raysD + '" fill="' + GOLD + '" opacity=".55"/>' +
      '<circle cx="100" cy="160" r="47" fill="' + INDIGO + '" stroke="' + INK + '" stroke-width="9"/>' +
      '<circle cx="100" cy="160" r="47" fill="none" stroke="' + GOLD + '" stroke-width="4"/>' +
      '<path d="' + tick + '" stroke="' + GOLD + '" stroke-width="1.6" stroke-linecap="round"/>' +
      '<circle cx="100" cy="160" r="34.5" fill="none" stroke="' + GOLD_L + '" stroke-width="1" opacity=".8"/>' +
      compass(100, 160) +
      '<circle cx="100" cy="160" r="12.5" fill="' + NAVY + '" stroke="' + INK + '" stroke-width="3"/>' +
      '<circle cx="100" cy="160" r="12.5" fill="none" stroke="' + GOLD + '" stroke-width="1.6"/>' + mortar(100, 160) +
      moonRowGold(62) + moonRowGold(258) +
      spark(52, 96, 5, GOLD) + spark(148, 96, 5, GOLD) + spark(52, 224, 5, GOLD) + spark(148, 224, 5, GOLD) +
      spark(100, 82, 3.4, GOLD_L, 1.2) + spark(100, 238, 3.4, GOLD_L, 1.2) +
      diamond(42, 160, 3, 5.5, GOLD, 1.4) + diamond(158, 160, 3, 5.5, GOLD, 1.4);
  }

  /* ---------- họa tiết chìm trên trang sách ---------- */
  var WM = '#D9C189', WMF = '#F4E8C8';
  function wmSpark(x, y, r) { return spark(x, y, r, WMF, 2.5, WM); }
  function wmTree(x, y, h) {
    var w = h * 0.6, d = '';
    for (var i = 0; i < 3; i++) { var ty = y - h + i * h * 0.27, bw = w * (0.5 + i * 0.25); d += 'M' + x + ' ' + n(ty) + 'L' + n(x + bw / 2) + ' ' + n(ty + h * 0.44) + 'L' + n(x - bw / 2) + ' ' + n(ty + h * 0.44) + 'Z'; }
    return '<path d="M' + x + ' ' + n(y - h * 0.16) + 'V' + (y + 4) + '" stroke="' + WM + '" stroke-width="4"/><path d="' + d + '" fill="' + WMF + '" stroke="' + WM + '" stroke-width="3" stroke-linejoin="round"/>';
  }
  function wmBanner(cx, y, w) {
    var h = 24, x0 = cx - w / 2, x1 = cx + w / 2, sty = '" fill="' + WMF + '" stroke="' + WM + '" stroke-width="3" stroke-linejoin="round"/>';
    return '<path d="M' + (x0 - 24) + ' ' + (y + 7) + 'H' + (x0 + 4) + 'V' + (y + h + 7) + 'H' + (x0 - 24) + 'L' + (x0 - 13) + ' ' + (y + h / 2 + 7) + 'Z' + sty +
      '<path d="M' + (x1 + 24) + ' ' + (y + 7) + 'H' + (x1 - 4) + 'V' + (y + h + 7) + 'H' + (x1 + 24) + 'L' + (x1 + 13) + ' ' + (y + h / 2 + 7) + 'Z' + sty +
      '<rect x="' + x0 + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="4' + sty +
      '<path d="M' + (x0 + 16) + ' ' + (y + h / 2) + 'H' + (x1 - 16) + '" stroke="' + WM + '" stroke-width="2.4" stroke-dasharray="2 7" stroke-linecap="round"/>';
  }
  function wmHang(x, y0, y1, r) { return '<path d="M' + x + ' ' + y0 + 'V' + (y1 - r) + '" stroke="' + WM + '" stroke-width="2"/>' + wmSpark(x, y1, r); }
  function wmRow(x0, x1, y) {
    var o = '<path d="M' + x0 + ' ' + y + 'H' + x1 + '" stroke="' + WM + '" stroke-width="2.5" stroke-linecap="round"/>', i = 0;
    for (var x = x0 + 24; x < x1 - 14; x += 42, i++) {
      var k = i % 4;
      if (k === 0) o += wmSpark(x, y, 9);
      else if (k === 2) o += '<path d="M' + (x - 7) + ' ' + (y + 1) + 'V' + (y + 6) + 'Q' + x + ' ' + (y + 10) + ' ' + (x + 7) + ' ' + (y + 6) + 'V' + (y + 1) + 'Z" fill="' + WMF + '" stroke="' + WM + '" stroke-width="2.4" stroke-linejoin="round"/>' +
        '<path d="M' + x + ' ' + (y - 8) + 'L' + (x + 12) + ' ' + (y - 2) + 'L' + x + ' ' + (y + 4) + 'L' + (x - 12) + ' ' + (y - 2) + 'Z" fill="' + WMF + '" stroke="' + WM + '" stroke-width="2.4" stroke-linejoin="round"/>';
      else o += '<circle cx="' + x + '" cy="' + y + '" r="3.5" fill="' + WM + '"/>';
    }
    return o;
  }
  var wmLeft =
    wmBanner(272, 74, 150) + wmHang(222, 105, 136, 8) + wmHang(320, 105, 128, 6.5) +
    '<path d="M150 232 C176 192 246 178 286 200 C318 218 312 258 282 258 C260 258 254 234 272 228 C284 224 292 236 284 242" fill="none" stroke="' + WM + '" stroke-width="5" stroke-linecap="round"/>' +
    '<path d="M86 214 C112 208 134 206 156 198 M98 240 C122 238 140 234 162 226" fill="none" stroke="' + WM + '" stroke-width="3" stroke-linecap="round"/>' +
    '<path d="M60 318 Q150 280 240 304 Q330 328 480 294" fill="none" stroke="' + WM + '" stroke-width="3"/>' +
    wmTree(98, 312, 72) + wmTree(140, 302, 52) + wmTree(438, 300, 62) + wmTree(466, 296, 44) +
    '<g fill="' + WMF + '" stroke="' + WM + '" stroke-width="3" stroke-linejoin="round">' +
    '<path d="M312 308 Q296 300 300 284" fill="none" stroke-width="4" stroke-linecap="round"/>' +
    '<path d="M310 316 Q306 298 322 294 H350 Q362 294 362 306 V316 Z"/>' +
    '<path d="M356 287 L357 272 L366 283 Z M370 283 L377 272 L377 288 Z"/><circle cx="368" cy="293" r="11"/></g>' +
    wmSpark(392, 160, 7) + wmSpark(118, 150, 6) + wmRow(84, 470, 342);
  var wmRight =
    wmBanner(728, 74, 150) + wmHang(682, 105, 132, 6.5) + wmHang(776, 105, 138, 8) +
    '<path d="M520 300 Q610 268 700 290 Q800 312 940 280" fill="none" stroke="' + WM + '" stroke-width="3"/>' +
    '<g fill="' + WMF + '" stroke="' + WM + '" stroke-width="3" stroke-linejoin="round">' +
    '<rect x="660" y="214" width="26" height="80"/><path d="M655 214 L673 174 L691 214 Z"/>' +
    '<rect x="748" y="220" width="26" height="76"/><path d="M743 220 L761 182 L779 220 Z"/>' +
    '<rect x="684" y="236" width="66" height="60"/>' +
    '<rect x="702" y="178" width="30" height="60"/><path d="M697 178 L717 128 L737 178 Z"/></g>' +
    '<path d="M717 128 V112 L731 117 L717 122" fill="' + WMF + '" stroke="' + WM + '" stroke-width="2.6" stroke-linejoin="round"/>' +
    '<path d="M707 296 V280 A10 10 0 0 1 727 280 V296" fill="none" stroke="' + WM + '" stroke-width="3"/>' +
    '<rect x="668" y="230" width="9" height="13" rx="4" fill="' + WM + '"/><rect x="756" y="236" width="9" height="13" rx="4" fill="' + WM + '"/><rect x="712" y="194" width="10" height="15" rx="5" fill="' + WM + '"/>' +
    '<path d="M852 126 A24 24 0 1 0 876 160 A19 19 0 1 1 852 126 Z" fill="' + WMF + '" stroke="' + WM + '" stroke-width="3" stroke-linejoin="round"/>' +
    '<path d="M556 200 C566 180 598 180 602 200 C604 214 588 218 584 208 M884 252 C894 234 920 238 918 256" fill="none" stroke="' + WM + '" stroke-width="3.5" stroke-linecap="round"/>' +
    wmSpark(806, 126, 8) + wmSpark(900, 206, 6) + wmSpark(600, 146, 7) + wmSpark(628, 236, 5) + wmRow(530, 916, 342);

  /* sách mở (viewBox 0 0 1000 430) */
  function seeded(seed) { return function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }
  var rnd = seeded(7), constel = '';
  [[120, 120, 420, 300], [580, 120, 880, 300]].forEach(function (b) {
    for (var g = 0; g < 3; g++) {
      var pts = [], cx = b[0] + rnd() * (b[2] - b[0]), cy = b[1] + rnd() * (b[3] - b[1]);
      for (var i = 0; i < 4; i++) { pts.push([n(cx + (rnd() - 0.5) * 120), n(cy + (rnd() - 0.5) * 70)]); }
      constel += '<polyline points="' + pts.map(function (p) { return p.join(','); }).join(' ') + '" fill="none" stroke="#C7BDF2" stroke-width="2.4" stroke-dasharray="2 7" stroke-linecap="round"/>';
      pts.forEach(function (p) { constel += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="4" fill="#C7BDF2"/>'; });
    }
  });
  DEFS.push('<linearGradient id="spineShade" x1="400" y1="0" x2="600" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2B1C7A" stop-opacity="0"/><stop offset=".5" stop-color="#2B1C7A" stop-opacity=".22"/><stop offset="1" stop-color="#2B1C7A" stop-opacity="0"/></linearGradient>');
  var book =
    '<path d="M30 76 Q260 34 500 74 Q740 34 970 76 L992 392 Q750 360 500 410 Q250 360 8 392 Z" fill="' + PURPLE_D + '" stroke="' + INK + '" stroke-width="8" stroke-linejoin="round"/>' +
    '<path d="M44 78 Q260 40 500 76 L500 398 Q260 352 36 380 Z" fill="#EBD5A2" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round" transform="translate(0 12)"/>' +
    '<path d="M956 78 Q740 40 500 76 L500 398 Q740 352 964 380 Z" fill="#EBD5A2" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round" transform="translate(0 12)"/>' +
    '<path d="M50 70 Q260 30 500 66 L500 388 Q260 344 42 372 Z" fill="' + CREAM + '" stroke="' + INK + '" stroke-width="6" stroke-linejoin="round"/>' +
    '<path d="M950 70 Q740 30 500 66 L500 388 Q740 344 958 372 Z" fill="' + CREAM + '" stroke="' + INK + '" stroke-width="6" stroke-linejoin="round"/>' +
    '<g opacity=".9">' + wmLeft + wmRight + '</g>' +
    '<rect x="400" y="60" width="200" height="330" fill="url(#spineShade)"/>' +
    '<path d="M500 66 V388" stroke="' + INK + '" stroke-width="5"/>' +
    '<path d="M486 392 V428 L500 418 L514 428 V392 Z" fill="' + PURPLE + '" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>';

  var potion =
    '<rect x="36" y="6" width="18" height="14" rx="3" fill="#C98B4A" stroke="' + INK + '" stroke-width="3.5"/>' +
    '<rect x="33" y="18" width="24" height="20" rx="4" fill="' + PINK_L + '" stroke="' + INK + '" stroke-width="3.5"/>' +
    '<circle cx="45" cy="70" r="32" fill="' + PINK_L + '" stroke="' + INK + '" stroke-width="4"/>' +
    '<path d="M16 72 Q30 63 45 71 Q60 79 74 70 A29 29 0 0 1 16 72 Z" fill="' + PINK + '"/>' +
    '<ellipse cx="32" cy="58" rx="4.5" ry="9" fill="#fff" opacity=".9" transform="rotate(30 32 58)"/>' +
    '<circle cx="54" cy="84" r="3.4" fill="#fff" opacity=".85"/><circle cx="40" cy="88" r="2.2" fill="#fff" opacity=".85"/>';
  var crystal =
    '<circle cx="55" cy="48" r="36" fill="#BFF3FF" stroke="' + INK + '" stroke-width="4.5"/>' +
    '<path d="M30 56 C40 40 58 66 76 42" fill="none" stroke="' + LAV + '" stroke-width="5" stroke-linecap="round" opacity=".8"/>' +
    '<ellipse cx="40" cy="32" rx="6" ry="11" fill="#fff" opacity=".9" transform="rotate(35 40 32)"/>' +
    spark(64, 50, 9, WHITE, 2.2) +
    '<path d="M22 98 L32 78 H78 L88 98 Q90 104 84 104 H26 Q20 104 22 98 Z" fill="' + PURPLE_D + '" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>' +
    '<path d="M36 86 H74" stroke="' + YEL + '" stroke-width="4" stroke-linecap="round"/>';

  /* dây leo tím xoắn (viewBox 0 0 220 440) */
  var VINE = '#4B2DB3', VINE_HI = '#7B60F2';
  var stemSegs = [[[160, 440], [120, 380], [178, 330], [150, 270]], [[150, 270], [124, 214], [178, 170], [146, 112]], [[146, 112], [126, 76], [140, 44], [120, 20]]];
  function bez(s, t) {
    var u = 1 - t;
    return [u * u * u * s[0][0] + 3 * u * u * t * s[1][0] + 3 * u * t * t * s[2][0] + t * t * t * s[3][0],
      u * u * u * s[0][1] + 3 * u * u * t * s[1][1] + 3 * u * t * t * s[2][1] + t * t * t * s[3][1]];
  }
  var thorns = '';
  [[0, 0.35, 1], [0, 0.72, -1], [1, 0.3, 1], [1, 0.68, -1], [2, 0.45, 1]].forEach(function (q) {
    var s = stemSegs[q[0]], p = bez(s, q[1]), p2 = bez(s, q[1] + 0.02), tx = p2[0] - p[0], ty = p2[1] - p[1], l = Math.hypot(tx, ty);
    tx /= l; ty /= l;
    var nx = -ty * q[2], ny = tx * q[2];
    thorns += '<path d="M' + n(p[0] + tx * 7) + ' ' + n(p[1] + ty * 7) + 'L' + n(p[0] + nx * 22 - tx * 4) + ' ' + n(p[1] + ny * 22 - ty * 4) + 'L' + n(p[0] - tx * 7) + ' ' + n(p[1] - ty * 7) + 'Z" fill="' + VINE + '" stroke="' + INK + '" stroke-width="3.5" stroke-linejoin="round"/>';
  });
  var vinePaths = ['M160 440 C120 380 178 330 150 270 C124 214 178 170 146 112 C126 76 140 44 120 20',
    'M146 300 C104 304 70 284 72 254 C74 228 104 222 114 240 C122 256 104 266 96 256',
    'M160 196 C196 184 214 156 204 128 C196 104 168 104 166 124 C164 140 182 144 186 132',
    'M138 96 C104 96 84 74 92 52 C100 32 126 36 124 54 C122 66 108 64 110 56',
    'M144 392 C172 398 192 382 188 362 C184 344 162 346 166 362'];
  var vine = thorns +
    vinePaths.map(function (d, i) { return '<path d="' + d + '" fill="none" stroke="' + INK + '" stroke-width="' + (i ? 13 : 17) + '" stroke-linecap="round" stroke-linejoin="round"/>'; }).join('') +
    vinePaths.map(function (d, i) { return '<path d="' + d + '" fill="none" stroke="' + VINE + '" stroke-width="' + (i ? 7 : 10) + '" stroke-linecap="round" stroke-linejoin="round"/>'; }).join('') +
    '<path d="' + vinePaths[0] + '" fill="none" stroke="' + VINE_HI + '" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="40 26" opacity=".9"/>' +
    spark(84, 160, 7, YEL, 2.2) + spark(196, 236, 5, WHITE, 2) + spark(70, 30, 5, PINK, 2);

  /* bụi gai tím lớn phía sau (viewBox 0 0 360 900) */
  var BR_D = '#1E1266', BR = '#35209A', BR_HI = '#5D42D8';
  var brPaths = [
    ['M60 905 C36 760 150 700 112 580 C84 480 176 420 142 318 C118 248 164 190 130 116', 36],
    ['M104 660 C176 650 226 610 218 558 C212 518 168 518 170 550 C172 572 198 570 196 554', 24],
    ['M122 470 C60 470 18 438 24 398 C30 362 72 364 70 394 C68 412 48 410 50 398', 22],
    ['M140 332 C212 318 254 270 242 228 C232 194 192 198 196 226 C200 246 224 242 220 228', 22],
    ['M132 166 C88 156 66 114 84 86 C98 64 130 76 124 98', 18],
    ['M72 830 C154 840 236 806 256 744 C268 702 234 682 218 708', 24],
    ['M96 760 C40 750 6 716 14 680 C22 650 56 656 52 680', 18]
  ];
  var brSegs = [[[60, 905], [36, 760], [150, 700], [112, 580]], [[112, 580], [84, 480], [176, 420], [142, 318]], [[142, 318], [118, 248], [164, 190], [130, 116]]];
  var brThorns = '';
  [[0, 0.25, 1], [0, 0.5, -1], [0, 0.8, 1], [1, 0.2, -1], [1, 0.55, 1], [1, 0.85, -1], [2, 0.35, 1], [2, 0.7, -1]].forEach(function (q) {
    var s = brSegs[q[0]], p = bez(s, q[1]), p2 = bez(s, q[1] + 0.02), tx = p2[0] - p[0], ty = p2[1] - p[1], l = Math.hypot(tx, ty);
    tx /= l; ty /= l;
    var nx = -ty * q[2], ny = tx * q[2];
    brThorns += '<path d="M' + n(p[0] + tx * 13) + ' ' + n(p[1] + ty * 13) + 'L' + n(p[0] + nx * 42 - tx * 8) + ' ' + n(p[1] + ny * 42 - ty * 8) + 'L' + n(p[0] - tx * 13) + ' ' + n(p[1] - ty * 13) + 'Z" fill="' + BR + '" stroke="' + BR_D + '" stroke-width="5" stroke-linejoin="round"/>';
  });
  var bramble = brThorns +
    brPaths.map(function (p) { return '<path d="' + p[0] + '" fill="none" stroke="' + BR_D + '" stroke-width="' + (p[1] + 9) + '" stroke-linecap="round" stroke-linejoin="round"/>'; }).join('') +
    brPaths.map(function (p) { return '<path d="' + p[0] + '" fill="none" stroke="' + BR + '" stroke-width="' + p[1] + '" stroke-linecap="round" stroke-linejoin="round"/>'; }).join('') +
    brPaths.map(function (p, i) { return '<path d="' + p[0] + '" fill="none" stroke="' + BR_HI + '" stroke-width="' + (i ? 3.5 : 5) + '" stroke-linecap="round" stroke-dasharray="' + (i ? '30 40' : '70 50') + '" transform="translate(-' + (i ? 4 : 7) + ' 0)" opacity=".85"/>'; }).join('');

  /* dải mây phía dưới (viewBox 0 0 1440 200) */
  function cloudRow(y, startX, step, rBase, rVar, fill, base) {
    var a = '', b = '', i = 0;
    for (var x = startX; x < 1540; x += step, i++) {
      var r = rBase + (i % 3) * rVar;
      a += '<circle cx="' + x + '" cy="' + y + '" r="' + (r + 5) + '"/>';
      b += '<circle cx="' + x + '" cy="' + y + '" r="' + r + '"/>';
    }
    if (base) { a += '<rect x="-80" y="' + (y - 5) + '" width="1600" height="120"/>'; b += '<rect x="-80" y="' + y + '" width="1600" height="120"/>'; }
    return '<g fill="' + INK + '">' + a + '</g><g fill="' + fill + '">' + b + '</g>';
  }
  var cloudBand = cloudRow(118, -60, 118, 62, 14, '#B4A4FF', true) + cloudRow(168, -10, 96, 50, 12, '#ECE7FF', true) +
    spark(300, 120, 9, YEL, 2.4) + spark(1150, 110, 8, WHITE, 2.2) + spark(760, 150, 6, PINK, 2);

  /* mèo cam đội mũ phù thủy (viewBox 0 -10 170 180) */
  var CAT = '#FFA94D', CAT_D = '#E07A1F';
  var cat =
    '<path d="M40 72 L34 18 Q36 11 43 16 L80 52 Z" fill="' + CAT + '" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>' +
    '<path d="M45 60 L42 31 L65 51 Z" fill="' + PINK + '"/>' +
    '<path d="M130 72 L136 18 Q134 11 127 16 L90 52 Z" fill="' + CAT + '" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>' +
    '<path d="M125 60 L128 31 L105 51 Z" fill="' + PINK + '"/>' +
    '<ellipse cx="85" cy="96" rx="62" ry="50" fill="' + CAT + '" stroke="' + INK + '" stroke-width="5"/>' +
    '<path d="M85 48 V62 M70 51 L73 63 M100 51 L97 63" stroke="' + CAT_D + '" stroke-width="4.5" stroke-linecap="round"/>' +
    '<ellipse cx="85" cy="114" rx="25" ry="15" fill="#FFF4E6"/>' +
    '<path d="M57 98 Q65 87 73 98 M97 98 Q105 87 113 98" fill="none" stroke="' + INK + '" stroke-width="4.5" stroke-linecap="round"/>' +
    '<path d="M80 106 H90 L85 112 Z" fill="' + PINK + '" stroke="' + INK + '" stroke-width="2.2" stroke-linejoin="round"/>' +
    '<path d="M85 112 Q80 120 74 116 M85 112 Q90 120 96 116" fill="none" stroke="' + INK + '" stroke-width="3" stroke-linecap="round"/>' +
    '<circle cx="51" cy="112" r="8" fill="' + PINK + '" opacity=".85"/><circle cx="119" cy="112" r="8" fill="' + PINK + '" opacity=".85"/>' +
    '<path d="M38 108 H18 M40 117 L22 122 M132 108 H152 M130 117 L148 122" stroke="' + INK + '" stroke-width="2.6" stroke-linecap="round"/>' +
    '<ellipse cx="52" cy="150" rx="21" ry="13" fill="' + CAT + '" stroke="' + INK + '" stroke-width="4.5"/>' +
    '<ellipse cx="118" cy="150" rx="21" ry="13" fill="' + CAT + '" stroke="' + INK + '" stroke-width="4.5"/>' +
    '<path d="M46 144 V152 M58 144 V152 M112 144 V152 M124 144 V152" stroke="' + INK + '" stroke-width="2.4" stroke-linecap="round"/>' +
    '<ellipse cx="112" cy="47" rx="27" ry="7.5" fill="' + PURPLE_D + '" stroke="' + INK + '" stroke-width="4"/>' +
    '<path d="M95 45 L116 3 Q120 -3 124 4 L132 43 Z" fill="' + PURPLE + '" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>' +
    spark(116, 27, 5.5, YEL, 1.8);

  var symbols = {
    bramble: ['0 0 360 900', bramble],
    cloudBand: ['0 0 1440 200', cloudBand, 'xMidYMax slice'],
    cat: ['0 -10 170 180', cat],
    vine: ['0 0 220 440', vine],
    cardBack: ['0 0 200 330', luxBack()],
    cardStar: ['0 0 200 330', base(CREAM, true) + starArt],
    cardSun: ['0 0 200 330', base(CREAM, true) + sunArt],
    cardMagician: ['0 0 200 330', base(CREAM, true) + magicArt],
    cardPhoto: ['0 0 200 330', base(CREAM, true)],
    stickerStar: ['0 0 60 60', stickerStar],
    stickerSun: ['0 0 60 60', stickerSun],
    moonBig: ['0 0 260 260', moonBig],
    hat: ['0 0 240 220', hat],
    quill: ['0 0 262 120', quill],
    book: ['0 0 1000 432', book],
    potion: ['0 0 90 108', potion],
    crystal: ['0 0 110 108', crystal],
    spark: ['0 0 40 40', spark(20, 20, 17, YEL, 2.6)],
    sparkW: ['0 0 40 40', spark(20, 20, 17, WHITE, 2.6)],
    heart: ['0 0 40 40', '<path d="M20 34 C8 25 4 18 6 12 C8 6 16 5 20 12 C24 5 32 6 34 12 C36 18 32 25 20 34 Z" fill="' + PINK + '" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>']
  };
  var html = '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true" focusable="false"><defs>';
  var body = '';
  Object.keys(symbols).forEach(function (k) {
    body += '<symbol id="' + k + '" viewBox="' + symbols[k][0] + '"' + (symbols[k][2] ? ' preserveAspectRatio="' + symbols[k][2] + '"' : '') + '>' + symbols[k][1] + '</symbol>';
  });
  html += DEFS.join('') + '</defs>' + body + '</svg>';
  var holder = document.createElement('div');
  holder.innerHTML = html;
  document.body.insertBefore(holder.firstChild, document.body.firstChild);
})();
