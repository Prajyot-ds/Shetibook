document.addEventListener('DOMContentLoaded', () => {
  const feed = document.getElementById('posts-feed');
  const postForm = document.getElementById('post-form');
  let activeCategory = '';

  async function loadPosts() {
    try {
      const url = activeCategory ? `/api/posts?category=${activeCategory}` : '/api/posts';
      const res = await fetch(url);
      const posts = await res.json();
      renderPosts(posts);
    } catch { if (feed) feed.innerHTML = '<p>Failed to load posts</p>'; }
  }

  function renderPosts(posts) {
    if (!feed) return;
    if (!posts.length) { feed.innerHTML = '<p style="text-align:center;color:var(--text-muted)">No posts yet. Be the first to share!</p>'; return; }
    feed.innerHTML = posts.map(p => `
      <div class="card post-card" id="post-${p.id}">
        <div class="post-header">
          <div class="avatar">${(p.author_name || 'U')[0].toUpperCase()}</div>
          <div><strong>${p.author_name}</strong><div class="post-meta">${p.category || 'general'} · ${timeAgo(p.created_at)}</div></div>
        </div>
        <h3 style="margin-bottom:.5rem">${p.title}</h3>
        <p style="color:var(--text-muted);line-height:1.6">${p.content}</p>
        ${p.image_path ? `<img src="${p.image_path}" style="max-width:100%;border-radius:8px;margin-top:.8rem" alt="Post image">` : ''}
        <div class="post-actions">
          <button onclick="likePost(${p.id})">❤️ ${t('like')} (${p.likes || 0})</button>
          <button onclick="toggleComments(${p.id})">💬 ${t('comment')}</button>
        </div>
        <div id="comments-${p.id}" style="display:none">
          <div class="comments-list" id="comments-list-${p.id}"></div>
          <div class="comment-input">
            <input class="form-control" id="comment-input-${p.id}" placeholder="${t('add_comment')}">
            <button class="btn btn-primary btn-sm" onclick="submitComment(${p.id})">${t('submit_comment')}</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  window.likePost = async (id) => {
    if (!requireLogin()) return;
    try { await fetch(`/api/posts/${id}/like`, { method: 'POST' }); loadPosts(); } catch {}
  };

  window.toggleComments = async (id) => {
    const div = document.getElementById(`comments-${id}`);
    if (div.style.display === 'none') {
      div.style.display = 'block';
      try {
        const res = await fetch(`/api/posts/${id}/comments`);
        const comments = await res.json();
        document.getElementById(`comments-list-${id}`).innerHTML = comments.map(c =>
          `<div class="comment-item"><strong>${c.author_name}:</strong> ${c.content}</div>`
        ).join('') || '<p style="font-size:.8rem;color:var(--text-muted)">No comments yet</p>';
      } catch {}
    } else div.style.display = 'none';
  };

  window.submitComment = async (id) => {
    if (!requireLogin()) return;
    const input = document.getElementById(`comment-input-${id}`);
    if (!input.value.trim()) return;
    try {
      await fetch(`/api/posts/${id}/comments`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: input.value })
      });
      input.value = '';
      window.toggleComments(id); window.toggleComments(id); // refresh
    } catch {}
  };

  if (postForm) {
    postForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!requireLogin()) return;
      const formData = new FormData(postForm);
      try {
        const res = await fetch('/api/posts', { method: 'POST', body: formData });
        if (res.ok) { postForm.reset(); showToast('Post created!'); loadPosts(); }
        else showToast('Failed to create post', 'error');
      } catch { showToast('Network error', 'error'); }
    });
  }

  document.querySelectorAll('.community-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.community-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.dataset.category || '';
      loadPosts();
    });
  });

  loadPosts();
});
