/**
 * freshmilksource - Modern Single Page Application
 * Core JavaScript Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Set current year in footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ========================================================
     1. Sticky Header Shadow on Scroll
  ======================================================== */
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('shadow-sm', 'bg-white/95');
      header.classList.remove('bg-white/90');
    } else {
      header.classList.remove('shadow-sm', 'bg-white/95');
      header.classList.add('bg-white/90');
    }
  });

  /* ========================================================
     2. Mobile Menu Toggle
  ======================================================== */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  /* ========================================================
     3. Animated Stats Counters
  ======================================================== */
  const counters = document.querySelectorAll('.counter');
  let hasAnimated = false;

  const runCounters = () => {
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target'));
      let count = 0;
      const duration = 1600; // ms
      const steps = 50;
      const increment = target / steps;
      const stepTime = duration / steps;

      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          // If decimal, round to 1 decimal place, else integer
          counter.textContent = target % 1 !== 0 ? count.toFixed(1) : Math.floor(count);
        }
      }, stepTime);
    });
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        runCounters();
      }
    });
  }, { threshold: 0.3 });

  const firstCounter = document.querySelector('.counter');
  if (firstCounter) {
    counterObserver.observe(firstCounter.closest('section'));
  }

  /* ========================================================
     4. Product Category Filter
  ======================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('bg-brand-700', 'text-white', 'shadow-sm', 'active');
        b.classList.add('bg-white', 'text-slate-700', 'border', 'border-slate-200');
      });

      btn.classList.add('bg-brand-700', 'text-white', 'shadow-sm', 'active');
      btn.classList.remove('bg-white', 'text-slate-700', 'border-slate-200');

      const category = btn.getAttribute('data-category');

      productCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'flex';
          card.classList.remove('opacity-0', 'scale-95');
          card.classList.add('opacity-100', 'scale-100');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ========================================================
     5. Interactive Plan Calculator
  ======================================================== */
  let calcSelectedMilk = {
    name: 'Raw A2 Gir Cow Milk',
    price: 2.40
  };
  let calcSelectedDays = 30;
  let calcFrequencyLabel = 'Everyday';
  let calcLiters = 1.0;

  const slider = document.getElementById('quantity-slider');
  const sliderDisplay = document.getElementById('slider-val-display');
  const milkTypeButtons = document.querySelectorAll('.calc-type-btn');
  const freqButtons = document.querySelectorAll('.calc-freq-btn');

  // Summary Elements
  const summaryTitle = document.getElementById('summary-milk-title');
  const summaryMeta = document.getElementById('summary-meta');
  const summaryUnitPrice = document.getElementById('summary-unit-price');
  const summaryVolume = document.getElementById('summary-volume');
  const summaryOriginalPrice = document.getElementById('summary-original-price');
  const summaryFinalPrice = document.getElementById('summary-final-price');

  const updateCalculator = () => {
    const totalVolume = calcLiters * calcSelectedDays;
    const baseTotal = totalVolume * calcSelectedMilk.price;
    const discountedTotal = baseTotal * 0.85; // 15% initial monthly promotion

    if (sliderDisplay) sliderDisplay.textContent = `${calcLiters.toFixed(1)} Liter / day`;
    if (summaryTitle) summaryTitle.textContent = calcSelectedMilk.name;
    if (summaryMeta) {
      summaryMeta.textContent = `${calcLiters.toFixed(1)}L delivered ${calcFrequencyLabel} (${calcSelectedDays} deliveries/mo)`;
    }
    if (summaryUnitPrice) summaryUnitPrice.textContent = `$${calcSelectedMilk.price.toFixed(2)}`;
    if (summaryVolume) summaryVolume.textContent = `${totalVolume.toFixed(0)} Liters`;
    if (summaryOriginalPrice) summaryOriginalPrice.textContent = `$${baseTotal.toFixed(2)}`;
    if (summaryFinalPrice) summaryFinalPrice.textContent = `$${discountedTotal.toFixed(2)}`;
  };

  // Milk Type Toggle
  milkTypeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      milkTypeButtons.forEach(b => {
        b.classList.remove('border-brand-600', 'bg-brand-50/50', 'active');
        b.classList.add('border-slate-200', 'bg-white');
        const priceLabel = b.querySelector('.text-brand-700');
        if (priceLabel) {
          priceLabel.classList.remove('text-brand-700');
          priceLabel.classList.add('text-slate-500');
        }
      });

      btn.classList.add('border-brand-600', 'bg-brand-50/50', 'active');
      btn.classList.remove('border-slate-200', 'bg-white');
      const activePrice = btn.querySelector('.text-slate-500');
      if (activePrice) {
        activePrice.classList.remove('text-slate-500');
        activePrice.classList.add('text-brand-700');
      }

      calcSelectedMilk = {
        name: btn.getAttribute('data-name'),
        price: parseFloat(btn.getAttribute('data-price'))
      };
      updateCalculator();
    });
  });

  // Slider change
  if (slider) {
    slider.addEventListener('input', (e) => {
      calcLiters = parseFloat(e.target.value);
      updateCalculator();
    });
  }

  // Frequency Buttons
  freqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      freqButtons.forEach(b => {
        b.classList.remove('border-brand-600', 'bg-brand-50/50', 'text-brand-900', 'active');
        b.classList.add('border-slate-200', 'bg-white', 'text-slate-700');
      });

      btn.classList.add('border-brand-600', 'bg-brand-50/50', 'text-brand-900', 'active');
      btn.classList.remove('border-slate-200', 'bg-white', 'text-slate-700');

      calcSelectedDays = parseInt(btn.getAttribute('data-days'), 10);
      calcFrequencyLabel = btn.getAttribute('data-label');
      updateCalculator();
    });
  });

  // Initial Calculation Run
  updateCalculator();

  /* ========================================================
     6. Shopping Cart & Drawer Management
  ======================================================== */
  let cart = [];

  const cartBtn = document.getElementById('cart-btn');
  const mobileCartBtn = document.getElementById('mobile-cart-btn');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartBackdrop = document.getElementById('cart-drawer-backdrop');
  const cartBadge = document.getElementById('cart-badge');
  const mobileCartCount = document.getElementById('mobile-cart-count');
  const cartItemsContainer = document.getElementById('cart-items');
  const emptyCartMsg = document.getElementById('empty-cart-msg');
  const cartSubtotal = document.getElementById('cart-subtotal');
  const cartTotal = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');

  const openCart = () => {
    cartBackdrop.classList.remove('hidden');
    setTimeout(() => {
      cartBackdrop.classList.remove('opacity-0');
      cartDrawer.classList.remove('translate-x-full');
    }, 10);
  };

  const closeCart = () => {
    cartDrawer.classList.add('translate-x-full');
    cartBackdrop.classList.add('opacity-0');
    setTimeout(() => {
      cartBackdrop.classList.add('hidden');
    }, 300);
  };

  if (cartBtn) cartBtn.addEventListener('click', openCart);
  if (mobileCartBtn) {
    mobileCartBtn.addEventListener('click', () => {
      if (mobileMenu) mobileMenu.classList.add('hidden');
      openCart();
    });
  }
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  if (cartBackdrop) cartBackdrop.addEventListener('click', closeCart);

  const updateCartUI = () => {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (cartBadge) cartBadge.textContent = totalCount;
    if (mobileCartCount) mobileCartCount.textContent = totalCount;

    if (cart.length === 0) {
      if (emptyCartMsg) emptyCartMsg.classList.remove('hidden');
      if (cartItemsContainer) {
        cartItemsContainer.querySelectorAll('.cart-item-row').forEach(row => row.remove());
      }
      if (checkoutBtn) checkoutBtn.disabled = true;
      if (cartSubtotal) cartSubtotal.textContent = '$0.00';
      if (cartTotal) cartTotal.textContent = '$0.00';
      return;
    }

    if (emptyCartMsg) emptyCartMsg.classList.add('hidden');
    if (checkoutBtn) checkoutBtn.disabled = false;
    if (cartSubtotal) cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    if (cartTotal) cartTotal.textContent = `$${subtotal.toFixed(2)}`;

    // Rebuild item rows
    if (cartItemsContainer) {
      cartItemsContainer.querySelectorAll('.cart-item-row').forEach(row => row.remove());

      cart.forEach(item => {
        const itemRow = document.createElement('div');
        itemRow.className = 'cart-item-row bg-slate-50 border border-slate-200/80 p-3.5 rounded-2xl flex items-center justify-between gap-3';
        itemRow.innerHTML = `
          <div class="flex-1 min-w-0">
            <h4 class="text-xs font-bold text-slate-900 truncate">${item.name}</h4>
            <div class="text-[11px] text-slate-500 mt-0.5">$${item.price.toFixed(2)} each</div>
          </div>
          <div class="flex items-center gap-2">
            <div class="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden">
              <button class="cart-qty-btn px-2 py-1 text-slate-600 hover:bg-slate-100 text-xs font-bold" data-id="${item.id}" data-action="decrease">-</button>
              <span class="px-2 text-xs font-bold text-slate-800">${item.quantity}</span>
              <button class="cart-qty-btn px-2 py-1 text-slate-600 hover:bg-slate-100 text-xs font-bold" data-id="${item.id}" data-action="increase">+</button>
            </div>
            <button class="cart-remove-btn p-1.5 text-slate-400 hover:text-red-500 rounded-lg transition-colors" data-id="${item.id}">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        `;
        cartItemsContainer.appendChild(itemRow);
      });

      // Bind increment/decrement and remove buttons
      cartItemsContainer.querySelectorAll('.cart-qty-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          const action = e.currentTarget.getAttribute('data-action');
          const itemIndex = cart.findIndex(i => i.id === id);

          if (itemIndex > -1) {
            if (action === 'increase') {
              cart[itemIndex].quantity += 1;
            } else if (action === 'decrease') {
              cart[itemIndex].quantity -= 1;
              if (cart[itemIndex].quantity <= 0) {
                cart.splice(itemIndex, 1);
              }
            }
            updateCartUI();
          }
        });
      });

      cartItemsContainer.querySelectorAll('.cart-remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          cart = cart.filter(i => i.id !== id);
          updateCartUI();
        });
      });
    }
  };

  // Add to cart buttons in product cards
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      const name = e.currentTarget.getAttribute('data-name');
      const price = parseFloat(e.currentTarget.getAttribute('data-price'));

      const existingItem = cart.find(i => i.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ id, name, price, quantity: 1 });
      }

      updateCartUI();
      showToast('Added to Basket', `${name} has been added.`);
      
      // Animate badge
      if (cartBadge) {
        cartBadge.classList.add('scale-125');
        setTimeout(() => cartBadge.classList.remove('scale-125'), 200);
      }
    });
  });

  // Start shopping link inside empty cart
  const startShoppingBtn = document.getElementById('start-shopping-btn');
  if (startShoppingBtn) {
    startShoppingBtn.addEventListener('click', closeCart);
  }

  // Checkout button interaction
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      closeCart();
      const trialSection = document.getElementById('trial');
      if (trialSection) {
        trialSection.scrollIntoView({ behavior: 'smooth' });
      }
      showToast('Dispatch Slot Reserved', 'Please finalize your delivery address below.');
    });
  }

  /* ========================================================
     7. Toast Notification System
  ======================================================== */
  const toast = document.getElementById('toast');
  const toastTitle = document.getElementById('toast-title');
  const toastMsg = document.getElementById('toast-msg');
  let toastTimeout;

  const showToast = (title, message) => {
    if (!toast) return;
    if (toastTitle) toastTitle.textContent = title;
    if (toastMsg) toastMsg.textContent = message;

    toast.classList.remove('translate-y-24', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.add('translate-y-24', 'opacity-0');
      toast.classList.remove('translate-y-0', 'opacity-100');
    }, 3500);
  };

  /* ========================================================
     8. FAQ Accordion
  ======================================================== */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const toggle = item.querySelector('.faq-toggle');
    const content = item.querySelector('.faq-content');
    const chevron = item.querySelector('.faq-chevron');

    toggle.addEventListener('click', () => {
      const isOpen = !content.classList.contains('hidden');

      // Close all others
      faqItems.forEach(other => {
        other.querySelector('.faq-content').classList.add('hidden');
        other.querySelector('.faq-chevron').classList.remove('rotate-180');
      });

      if (!isOpen) {
        content.classList.remove('hidden');
        chevron.classList.add('rotate-180');
      }
    });
  });

  /* ========================================================
     9. Sample Trial Form Submission
  ======================================================== */
  const trialForm = document.getElementById('trial-form');
  if (trialForm) {
    trialForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('trial-name').value;
      const phone = document.getElementById('trial-phone').value;
      const address = document.getElementById('trial-address').value;
      const pincode = document.getElementById('trial-pincode').value;
      const pref = document.getElementById('trial-pref').options[document.getElementById('trial-pref').selectedIndex].text;

      // Reset form
      trialForm.reset();

      // Feedback to user
      showToast('Trial Confirmed! 🎉', `Welcome ${name}! Your chilled 500ml sample is queued for tomorrow morning before 7:00 AM.`);
    });
  }

  /* ========================================================
     10. Realistic Live Social Proof Activity Pill
  ======================================================== */
  const activityPill = document.getElementById('activity-pill');
  const activityUser = document.getElementById('activity-user');
  const activityAction = document.getElementById('activity-action');

  const activities = [
    { user: 'Emma L. from Greenfield', action: 'Subscribed to 2L Daily A2 Cow Milk • 2m ago' },
    { user: 'Dr. Michael Chen from Highland Ridge', action: 'Ordered 1x Vedic A2 Golden Ghee • 5m ago' },
    { user: 'Kavita Patel from Palm Meadows', action: 'Swapped to 1.5L Murrah Buffalo Milk • 9m ago' },
    { user: 'James R. from Lakeview Park', action: 'Requested 500ml morning sample • 12m ago' },
    { user: 'Ananya Deshmukh from Silver Oak', action: 'Renewed monthly family subscription • 16m ago' }
  ];

  let currentActivityIndex = 0;

  const cycleActivity = () => {
    if (!activityPill) return;

    const data = activities[currentActivityIndex];
    if (activityUser) activityUser.textContent = data.user;
    if (activityAction) activityAction.textContent = data.action;

    // Show
    activityPill.classList.remove('translate-y-32', 'hidden');
    activityPill.classList.add('translate-y-0');

    // Hide after 5 seconds
    setTimeout(() => {
      activityPill.classList.add('translate-y-32');
      activityPill.classList.remove('translate-y-0');
    }, 5000);

    currentActivityIndex = (currentActivityIndex + 1) % activities.length;
  };

  // Trigger first after 4 seconds, then repeat every 18 seconds
  setTimeout(() => {
    cycleActivity();
    setInterval(cycleActivity, 18000);
  }, 4000);

});

