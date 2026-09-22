/**
 * Silverbyte Studio - Lightweight Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            const isExpanded = navLinks.classList.toggle('show');
            menuBtn.setAttribute('aria-expanded', isExpanded);
        });

        // Close mobile menu when clicking outside or on a link
        document.addEventListener('click', (e) => {
            if (!menuBtn.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('show')) {
                    navLinks.classList.remove('show');
                    menuBtn.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                menuBtn.setAttribute('aria-expanded', 'false');
                menuBtn.focus();
            }
        });
    }

    // Dynamic current year
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});

/**
 * Copy email to clipboard with visual feedback
 */
function copyEmail(email, btnEl) {
    if (!navigator.clipboard) {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            showCopyFeedback(btnEl);
        } catch (err) {
            console.error('Failed to copy', err);
        }
        document.body.removeChild(textarea);
        return;
    }

    navigator.clipboard.writeText(email).then(() => {
        showCopyFeedback(btnEl);
    }).catch(err => {
        console.error('Failed to copy', err);
    });
}

function showCopyFeedback(btnEl) {
    if (!btnEl) return;
    const originalText = btnEl.innerHTML;
    btnEl.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg> Copied!
    `;
    btnEl.style.borderColor = '#10b981';
    btnEl.style.color = '#6ee7b7';

    setTimeout(() => {
        btnEl.innerHTML = originalText;
        btnEl.style.borderColor = '';
        btnEl.style.color = '';
    }, 2200);
}
