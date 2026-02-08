export const staticContent: Record<string, { title: string; content: string }> = {
    // HỖ TRỢ KHÁCH HÀNG
    'payment-methods': {
        title: 'Phương thức thanh toán',
        content: `
            <h3>1. Thanh toán tiền mặt tại cửa hàng</h3>
            <p>Quý khách có thể đến mua hàng và thanh toán trực tiếp tại các showroom của SmartParts Việt Nam.</p>
            
            <h3>2. Thanh toán khi nhận hàng (COD)</h3>
            <p>SmartParts hỗ trợ giao hàng và thu tiền tận nơi trên toàn quốc. Quý khách được kiểm tra hàng trước khi thanh toán.</p>
            
            <h3>3. Chuyển khoản ngân hàng</h3>
            <p>Quý khách có thể chuyển khoản qua các tài khoản sau:</p>
            <ul>
                <li><strong>Vietcombank</strong>: 0123456789 - SMARTPARTS VN</li>
                <li><strong>Techcombank</strong>: 1903456789 - SMARTPARTS VN</li>
            </ul>
            <p>Nội dung chuyển khoản: Tên khách hàng - Số điện thoại mua hàng.</p>
        `
    },
    'ordering-guide': {
        title: 'Hướng dẫn mua hàng',
        content: `
            <h3>Bước 1: Tìm kiếm sản phẩm</h3>
            <p>Quý khách có thể tìm sản phẩm theo danh mục hoặc nhập tên sản phẩm vào ô tìm kiếm.</p>
            
            <h3>Bước 2: Thêm vào giỏ hàng</h3>
            <p>Chọn số lượng và nhấn nút "Thêm vào giỏ" hoặc "Mua ngay".</p>
            
            <h3>Bước 3: Thanh toán</h3>
            <p>Điền thông tin giao hàng và chọn phương thức thanh toán phù hợp.</p>
            
            <h3>Bước 4: Xác nhận đơn hàng</h3>
            <p>Sau khi đặt hàng thành công, nhân viên SmartParts sẽ liên hệ xác nhận đơn hàng sớm nhất.</p>
        `
    },
    'return-policy': {
        title: 'Chính sách đổi trả',
        content: `
            <h3>1. Điều kiện đổi trả</h3>
            <ul>
                <li>Sản phẩm còn nguyên tem bảo hành, không bị rách, tẩy xóa.</li>
                <li>Sản phẩm còn đầy đủ phụ kiện, hộp, sách hướng dẫn (nếu có).</li>
                <li>Sản phẩm bị lỗi kỹ thuật do nhà sản xuất.</li>
            </ul>
            
            <h3>2. Thời gian đổi trả</h3>
            <p>Đổi mới 1:1 trong vòng <strong>7 ngày</strong> đầu tiên nếu có lỗi.</p>
            
            <h3>3. Quy trình đổi trả</h3>
            <p>Quý khách vui lòng mang sản phẩm trực tiếp đến cửa hàng hoặc gửi chuyển phát nhanh về địa chỉ bảo hành của chúng tôi.</p>
        `
    },
    'warranty-policy': {
        title: 'Chính sách bảo hành',
        content: `
            <h3>1. Thời gian bảo hành</h3>
            <p>Tất cả sản phẩm bán ra đều được bảo hành theo quy định của nhà sản xuất, thời gian từ 3 - 12 tháng tùy loại sản phẩm.</p>
            
            <h3>2. Từ chối bảo hành</h3>
            <ul>
                <li>Sản phẩm bị rơi vỡ, va đập, trầy xước nặng.</li>
                <li>Tem bảo hành bị rách, cạo sửa.</li>
                <li>Sản phẩm bị vô nước, cháy nổ, sử dụng sai nguồn điện.</li>
            </ul>
        `
    },
    'privacy-policy': {
        title: 'Chính sách bảo mật',
        content: `
            <h3>1. Thu thập thông tin</h3>
            <p>Chúng tôi chỉ thu thập thông tin cần thiết để xử lý đơn hàng (Tên, SĐT, Địa chỉ).</p>
            
            <h3>2. Cam kết bảo mật</h3>
            <p>SmartParts cam kết không chia sẻ thông tin khách hàng cho bên thứ ba, ngoại trừ đơn vị vận chuyển để giao hàng.</p>
        `
    },
    'cooperation': {
        title: 'Hợp tác phát triển',
        content: `
            <p>SmartParts luôn chào đón các đối tác là cửa hàng sửa chữa, đại lý phân phối linh kiện trên toàn quốc.</p>
            <h3>Quyền lợi đối tác:</h3>
            <ul>
                <li>Chiết khấu cao, giá sỉ tốt nhất thị trường.</li>
                <li>Hỗ trợ kỹ thuật, tư vấn sản phẩm.</li>
                <li>Chính sách công nợ linh hoạt cho đại lý lâu năm.</li>
            </ul>
            <p>Liên hệ hợp tác: <strong>0909.123.456</strong></p>
        `
    },
    'loyalty-program': {
        title: 'Khách hàng thân thiết',
        content: `
            <h3>Chương trình tích điểm</h3>
            <p>Mỗi đơn hàng thành công sẽ được tích lũy điểm thưởng. 10.000đ = 1 điểm.</p>
            
            <h3>Hạng thành viên</h3>
            <ul>
                <li><strong>Bạc:</strong> Tích lũy 1000 điểm - Giảm 2% mọi đơn hàng.</li>
                <li><strong>Vàng:</strong> Tích lũy 5000 điểm - Giảm 5% mọi đơn hàng.</li>
                <li><strong>Kim Cương:</strong> Tích lũy 10000 điểm - Giảm 10% mọi đơn hàng.</li>
            </ul>
        `
    },

    // VỀ CHÚNG TÔI
    'about-us': {
        title: 'Giới thiệu công ty',
        content: `
            <h3>SmartParts Việt Nam</h3>
            <p>Chuyên cung cấp linh kiện điện thoại, iPad, máy tính bảng và dụng cụ sửa chữa chuyên nghiệp.</p>
            <p>Với hơn 10 năm kinh nghiệm trong ngành, chúng tôi tự hào mang đến những sản phẩm chất lượng nhất, giá cả cạnh tranh nhất cho kỹ thuật viên và cửa hàng sửa chữa trên toàn quốc.</p>
            
            <h3>Sứ mệnh</h3>
            <p>Trở thành nhà cung cấp linh kiện và giải pháp sửa chữa số 1 tại Việt Nam.</p>
        `
    },
    'careers': {
        title: 'Tuyển dụng',
        content: `
            <h3>Các vị trí đang tuyển:</h3>
            <ol>
                <li><strong>Nhân viên bán hàng (Sales)</strong>: 05 người.</li>
                <li><strong>Nhân viên kho</strong>: 03 người.</li>
                <li><strong>Kỹ thuật viên sửa chữa</strong>: 05 người.</li>
            </ol>
            <p>Gửi CV về email: <strong>hr@smartparts.vn</strong></p>
        `
    },
    'complaints': {
        title: 'Góp ý - Khiếu nại',
        content: `
            <p>Mọi góp ý về chất lượng dịch vụ, thái độ nhân viên, quý khách vui lòng liên hệ trực tiếp:</p>
            <p><strong>Hotline Giám đốc:</strong> 0909.999.888</p>
            <p>Email: <strong>feedback@smartparts.vn</strong></p>
            <p>Chúng tôi luôn lắng nghe để phục vụ quý khách tốt hơn mỗi ngày.</p>
        `
    },
    'contact': {
        title: 'Liên hệ',
        content: `
            <h3>Công ty TNHH SmartParts Việt Nam</h3>
            <p><strong>Địa chỉ:</strong> 123 Đường 3/2, Phường 11, Quận 10, TP.HCM</p>
            <p><strong>Hotline:</strong> 1900 2667</p>
            <p><strong>Email:</strong> support@smartparts.vn</p>
            <p><strong>Giờ làm việc:</strong> 8:00 - 20:00 (Tất cả các ngày trong tuần)</p>
        `
    },
    'account': {
        title: 'Tài khoản của tôi',
        content: 'Redirecting to login...' // Logic handled in component
    }
};
