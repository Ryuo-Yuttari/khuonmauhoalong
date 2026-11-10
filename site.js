document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.mobile-toggle');
  const mobile = document.querySelector('.mobile-nav');

  if (toggle && mobile) {
    toggle.addEventListener('click', () => {
      mobile.classList.toggle('show');
      toggle.setAttribute('aria-expanded', mobile.classList.contains('show') ? 'true' : 'false');
    });
  }

  document.querySelectorAll('.mobile-nav a').forEach((link) => {
    link.addEventListener('click', () => mobile?.classList.remove('show'));
  });

  const filters = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-category]');

  filters.forEach((button) => {
    button.addEventListener('click', () => {
      filters.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');

      const filter = button.dataset.filter;
      cards.forEach((card) => {
        card.hidden = !(filter === 'all' || card.dataset.category === filter);
      });
    });
  });

  // Both index.html and lien-he.html use the same #quote-form.
  // Open Gmail's web compose window, and keep direct mailto/Gmail links
  // visible as fallbacks when the browser blocks a new tab.
  const form = document.querySelector('#quote-form');

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      // Let the browser show required-field validation before composing.
      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const phone = String(data.get('phone') || '').trim();
      const company = String(data.get('company') || '').trim() || 'Chưa cung cấp';
      const service = String(data.get('service') || '').trim() || 'Chưa chọn hạng mục';
      const message = String(data.get('message') || '').trim() || 'Chưa có mô tả';
      const recipient = 'cokhihoalong@gmail.com';

      const subjectText = 'Yêu cầu báo giá - ' + service;
      const bodyText = [
        'Họ tên: ' + name,
        'Điện thoại/Zalo: ' + phone,
        'Công ty: ' + company,
        'Hạng mục: ' + service,
        'Nội dung: ' + message
      ].join('\n');

      const gmailUrl = 'https://mail.google.com/mail/?' + new URLSearchParams({
        view: 'cm',
        fs: '1',
        to: recipient,
        su: subjectText,
        body: bodyText
      }).toString();

      const mailtoUrl = 'mailto:' + recipient + '?' + new URLSearchParams({
        subject: subjectText,
        body: bodyText
      }).toString();

      const note = document.querySelector('#form-note');

      if (note) {
        note.replaceChildren(document.createTextNode(
          'Đã chuẩn bị nội dung báo giá. Nếu cửa sổ soạn thư không tự mở, hãy chọn: '
        ));

        const addFallbackLink = (label, href) => {
          const link = document.createElement('a');
          link.href = href;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.textContent = label;
          link.style.color = 'var(--orange)';
          link.style.fontWeight = '700';
          link.style.textDecoration = 'underline';
          link.style.cursor = 'pointer';
          link.style.margin = '0 3px';
          note.appendChild(link);
          return link;
        };

        const gmailFallback = addFallbackLink('Mở Gmail', gmailUrl);
        note.appendChild(document.createTextNode(' hoặc '));
        addFallbackLink('mở ứng dụng email mặc định', mailtoUrl);

        // This click remains in the form's user-initiated submit event.
        // If a popup blocker stops it, the visible fallback links still work.
        gmailFallback.click();
      } else {
        // The form should normally have #form-note, but retain a direct fallback.
        const gmailLink = document.createElement('a');
        gmailLink.href = gmailUrl;
        gmailLink.target = '_blank';
        gmailLink.rel = 'noopener noreferrer';
        gmailLink.click();
      }
    });
  }
});
