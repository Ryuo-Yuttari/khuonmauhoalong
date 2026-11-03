document.addEventListener('DOMContentLoaded',()=>{
 const toggle=document.querySelector('.mobile-toggle'), mobile=document.querySelector('.mobile-nav');
 if(toggle&&mobile) toggle.addEventListener('click',()=>{mobile.classList.toggle('show');toggle.setAttribute('aria-expanded',mobile.classList.contains('show')?'true':'false')});
 document.querySelectorAll('.mobile-nav a').forEach(a=>a.addEventListener('click',()=>mobile?.classList.remove('show')));
 const filters=document.querySelectorAll('[data-filter]'), cards=document.querySelectorAll('[data-category]');
 filters.forEach(btn=>btn.addEventListener('click',()=>{filters.forEach(x=>x.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;cards.forEach(card=>card.hidden=!(f==='all'||card.dataset.category===f))}));
 const form=document.querySelector('#quote-form');
 if(form) form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const name=d.get('name'),phone=d.get('phone'),company=d.get('company')||'Chưa cung cấp',service=d.get('service'),message=d.get('message')||'Chưa có mô tả';const subject=encodeURIComponent('Yêu cầu báo giá - '+service);const body=encodeURIComponent('Họ tên: '+name+'\nĐiện thoại/Zalo: '+phone+'\nCông ty: '+company+'\nHạng mục: '+service+'\nNội dung: '+message);window.location.href='mailto:cokhihoalong@gmail.com?subject='+subject+'&body='+body;const note=document.querySelector('#form-note');if(note)note.textContent='Đã mở ứng dụng email với nội dung yêu cầu. Vui lòng nhấn Gửi trong ứng dụng email để hoàn tất.';});
});