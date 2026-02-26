// Animation types
export type AnimationType = 'confetti' | 'partyPopper' | 'glowingBurst';

// Current animation state
let animationTimeoutId: number | null = null;
let animationElements: HTMLElement[] = [];

/**
 * Clear all active animations
 */
function clearAnimations(): void {
  // Clear any pending timeouts
  if (animationTimeoutId !== null) {
    clearTimeout(animationTimeoutId);
    animationTimeoutId = null;
  }

  // Remove all animation elements
  const container = document.getElementById('animationContainer');
  if (container) {
    container.innerHTML = '';
  }

  // Reset animation elements array
  animationElements = [];
}

/**
 * Create confetti animation
 */
function createConfetti(): void {
  const container = document.getElementById('animationContainer');
  if (!container) return;

  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#00b894'];
  const confettiCount = 100;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = Math.random() * 2 + 's';
    confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
    container.appendChild(confetti);
    animationElements.push(confetti);
  }

  // Clear animation after 4 seconds
  animationTimeoutId = window.setTimeout(() => {
    clearAnimations();
  }, 4000);
}

/**
 * Create party popper animation
 */
function createPartyPopper(): void {
  const container = document.getElementById('animationContainer');
  if (!container) return;

  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#00b894'];
  const popperCount = 60;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  for (let i = 0; i < popperCount; i++) {
    const popper = document.createElement('div');
    popper.className = 'party-popper';
    popper.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Random direction
    const angle = (Math.PI * 2 * i) / popperCount + Math.random() * 0.5;
    const velocity = 150 + Math.random() * 200;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;
    
    popper.style.left = centerX + 'px';
    popper.style.top = centerY + 'px';
    popper.style.setProperty('--tx', tx + 'px');
    popper.style.setProperty('--ty', ty + 'px');
    popper.style.animationDelay = Math.random() * 0.3 + 's';
    
    container.appendChild(popper);
    animationElements.push(popper);
  }

  // Clear animation after 3 seconds
  animationTimeoutId = window.setTimeout(() => {
    clearAnimations();
  }, 3000);
}

/**
 * Create glowing burst animation
 */
function createGlowingBurst(): void {
  const container = document.getElementById('animationContainer');
  if (!container) return;

  const burstCount = 30;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  // Create central glow
  const glow = document.createElement('div');
  glow.className = 'glow-center';
  glow.style.left = (centerX - 100) + 'px';
  glow.style.top = (centerY - 100) + 'px';
  container.appendChild(glow);
  animationElements.push(glow);

  // Create burst rays
  for (let i = 0; i < burstCount; i++) {
    const ray = document.createElement('div');
    ray.className = 'glow-ray';
    
    const angle = (360 / burstCount) * i;
    const length = 100 + Math.random() * 200;
    
    ray.style.left = centerX + 'px';
    ray.style.top = centerY + 'px';
    ray.style.width = length + 'px';
    ray.style.transform = `rotate(${angle}deg)`;
    ray.style.animationDelay = Math.random() * 0.5 + 's';
    
    container.appendChild(ray);
    animationElements.push(ray);
  }

  // Create floating orbs
  for (let i = 0; i < 20; i++) {
    const orb = document.createElement('div');
    orb.className = 'glow-orb';
    orb.style.left = (centerX + (Math.random() - 0.5) * 400) + 'px';
    orb.style.top = (centerY + (Math.random() - 0.5) * 400) + 'px';
    orb.style.animationDelay = Math.random() * 1 + 's';
    orb.style.animationDuration = (2 + Math.random() * 2) + 's';
    container.appendChild(orb);
    animationElements.push(orb);
  }

  // Clear animation after 4 seconds
  animationTimeoutId = window.setTimeout(() => {
    clearAnimations();
  }, 4000);
}

/**
 * Trigger a random animation
 */
function triggerRandomAnimation(): void {
  // Clear any existing animation first
  clearAnimations();

  const animations: AnimationType[] = ['confetti', 'partyPopper', 'glowingBurst'];
  const randomIndex = Math.floor(Math.random() * animations.length);
  const selectedAnimation = animations[randomIndex];

  switch (selectedAnimation) {
    case 'confetti':
      createConfetti();
      break;
    case 'partyPopper':
      createPartyPopper();
      break;
    case 'glowingBurst':
      createGlowingBurst();
      break;
  }
}

/**
 * Handle the greet button click
 */
function handleGreet(): void {
  const nameInput = document.getElementById('nameInput') as HTMLInputElement;
  const greetingMessage = document.getElementById('greetingMessage');

  if (!nameInput || !greetingMessage) return;

  const name = nameInput.value.trim();

  if (name) {
    greetingMessage.textContent = `Hello ${name}`;
    greetingMessage.classList.add('show');
    
    // Trigger random animation
    triggerRandomAnimation();
  } else {
    greetingMessage.textContent = 'Please enter your name first!';
    greetingMessage.classList.add('show');
    greetingMessage.style.color = '#ff6b6b';
    
    setTimeout(() => {
      greetingMessage.style.color = '';
    }, 2000);
  }
}

/**
 * Setup the greeting application
 */
export function setupGreetingApp(): void {
  const greetBtn = document.getElementById('greetBtn');
  const nameInput = document.getElementById('nameInput') as HTMLInputElement;

  if (greetBtn) {
    greetBtn.addEventListener('click', handleGreet);
  }

  // Allow Enter key to trigger greeting
  if (nameInput) {
    nameInput.addEventListener('keypress', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleGreet();
      }
    });
  }
}
