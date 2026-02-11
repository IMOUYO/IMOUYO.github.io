<script>
(function() {
  // ===== 生成目录 =====
  function buildToc() {
    // var article = document.querySelector('.post-content, .article-content, main');
    var article = document.querySelector('article.thisIsAAnchor');
    if (!article) return;
    
    document.getElementById('catalog').innerHTML = '目录';
    var headings = article.querySelectorAll('h1, h2, h3, h4');
    if (headings.length === 0) {
      document.getElementById('toc').innerHTML = '<p>无标题</p>';
      return;
    }
    
    var toc = document.getElementById('toc');
    var ul = document.createElement('ul');
    
    headings.forEach(function(heading, index) {
      // 生成唯一ID
      if (!heading.id) {
        heading.id = 'heading-' + index;
      }
      
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#' + heading.id;
      a.textContent = heading.textContent;
      a.style.marginLeft = (parseInt(heading.tagName[1]) - 1) * 12 + 'px';
      a.style.display = 'inline-block';
      
      li.appendChild(a);
      ul.appendChild(li);
    });
    
    toc.innerHTML = '';
    toc.appendChild(ul);
    return headings;
  }
  
  // ===== 绑定点击事件 =====
  function bindClick() {
    document.getElementById('toc').addEventListener('click', function(e) {
      var link = e.target.closest('a');
      if (link) {
        e.preventDefault();
        var target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          history.pushState(null, null, link.getAttribute('href'));
        }
      }
    });
  }
  
  // ===== 滚动高亮 =====
  function highlightActive() {
  var tocLinks = document.querySelectorAll('#toc a');
  if (tocLinks.length === 0) return;
  
  // 默认高亮第一个
  tocLinks[0].style.fontWeight = 'bold';
  tocLinks[0].style.color = '#0066cc';
  tocLinks[0].style.borderLeft = '3px solid #0066cc';
  tocLinks[0].style.paddingLeft = '8px';
  
  // 为每个目录链接添加点击事件
  tocLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      // 移除所有链接的高亮样式
      tocLinks.forEach(function(l) {
        l.style.fontWeight = 'normal';
        l.style.color = '';
        l.style.borderLeft = '';
        l.style.paddingLeft = '';
      });
      
      // 为当前点击的链接添加高亮样式
      this.style.fontWeight = 'bold';
      this.style.color = '#0066cc';
      this.style.borderLeft = '3px solid #0066cc';
      this.style.paddingLeft = '8px';
    });
  });
}
  
  // ===== 初始化 =====
  function init() {
    buildToc();
    bindClick();
    highlightActive();
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
</script>

<style>
/* 极简样式，可删除 */
#toc ul { list-style: none; padding-left: 0; }
#toc li { margin: 5px 0; }
#toc a { text-decoration: none; color: #333; }
#toc a:hover { color: #0066cc; }
</style>