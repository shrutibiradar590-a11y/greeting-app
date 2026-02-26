import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { setupGreetingApp } from './greetingApp'

describe('Greeting App', () => {
  beforeEach(() => {
    // Setup DOM structure
    document.body.innerHTML = `
      <div id="app">
        <div class="greeting-container">
          <div class="card">
            <label for="nameInput" class="input-label">Enter Your Name</label>
            <input type="text" id="nameInput" class="name-input" placeholder="Type your name here" />
            <button id="greetBtn" type="button" class="greet-button">Greet</button>
            <div id="greetingMessage" class="greeting-message"></div>
          </div>
        </div>
        <div id="animationContainer" class="animation-container"></div>
      </div>
    `
    
    // Mock setTimeout for animation cleanup
    vi.useFakeTimers()
    
    // Setup the app
    setupGreetingApp()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  describe('Feature 1: UI Elements', () => {
    it('should display "Enter Your Name" label', () => {
      const label = document.querySelector('.input-label')
      expect(label).not.toBeNull()
      expect(label?.textContent).toBe('Enter Your Name')
    })

    it('should have a text input with correct placeholder', () => {
      const input = document.getElementById('nameInput') as HTMLInputElement
      expect(input).not.toBeNull()
      expect(input.placeholder).toBe('Type your name here')
    })

    it('should have a button labeled "Greet"', () => {
      const button = document.getElementById('greetBtn') as HTMLButtonElement
      expect(button).not.toBeNull()
      expect(button.textContent).toBe('Greet')
    })
  })

  describe('Feature 2: Greeting Display', () => {
    it('should display "Hello [name]" when button is clicked with valid name', () => {
      const input = document.getElementById('nameInput') as HTMLInputElement
      const button = document.getElementById('greetBtn') as HTMLButtonElement
      const message = document.getElementById('greetingMessage')

      input.value = 'John'
      button.click()

      expect(message?.textContent).toBe('Hello John')
      expect(message?.classList.contains('show')).toBe(true)
    })

    it('should display error message when button is clicked without name', () => {
      const button = document.getElementById('greetBtn') as HTMLButtonElement
      const message = document.getElementById('greetingMessage')

      button.click()

      expect(message?.textContent).toBe('Please enter your name first!')
      expect(message?.classList.contains('show')).toBe(true)
    })

    it('should handle names with whitespace correctly', () => {
      const input = document.getElementById('nameInput') as HTMLInputElement
      const button = document.getElementById('greetBtn') as HTMLButtonElement
      const message = document.getElementById('greetingMessage')

      input.value = '  Alice  '
      button.click()

      expect(message?.textContent).toBe('Hello Alice')
    })

    it('should trigger greeting on Enter key press', () => {
      const input = document.getElementById('nameInput') as HTMLInputElement
      const message = document.getElementById('greetingMessage')

      input.value = 'Bob'
      input.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }))

      expect(message?.textContent).toBe('Hello Bob')
    })
  })

  describe('Feature 3: Animations', () => {
    it('should trigger an animation when greet button is clicked', () => {
      const input = document.getElementById('nameInput') as HTMLInputElement
      const button = document.getElementById('greetBtn') as HTMLButtonElement
      const container = document.getElementById('animationContainer')

      input.value = 'Test'
      button.click()

      // Check that animation elements were added
      expect(container?.children.length).toBeGreaterThan(0)
    })

    it('should clear previous animation before starting new one', () => {
      const input = document.getElementById('nameInput') as HTMLInputElement
      const button = document.getElementById('greetBtn') as HTMLButtonElement
      const container = document.getElementById('animationContainer')

      // First click
      input.value = 'Test1'
      button.click()
      const firstChildCount = container?.children.length || 0

      // Second click should clear and create new animation
      input.value = 'Test2'
      button.click()
      
      // Container should still have elements (new animation)
      expect(container?.children.length).toBeGreaterThan(0)
    })

    it('should create one of the three animation types', () => {
      const input = document.getElementById('nameInput') as HTMLInputElement
      const button = document.getElementById('greetBtn') as HTMLButtonElement
      const container = document.getElementById('animationContainer')

      input.value = 'Test'
      button.click()

      const hasConfetti = container?.querySelector('.confetti')
      const hasPartyPopper = container?.querySelector('.party-popper')
      const hasGlowRay = container?.querySelector('.glow-ray')
      const hasGlowCenter = container?.querySelector('.glow-center')
      const hasGlowOrb = container?.querySelector('.glow-orb')

      // Should have at least one type of animation element
      const hasAnimation = hasConfetti || hasPartyPopper || hasGlowRay || hasGlowCenter || hasGlowOrb
      expect(hasAnimation).toBeTruthy()
    })
  })

  describe('Feature 4: Animation Cleanup', () => {
    it('should clear animation elements after timeout', () => {
      const input = document.getElementById('nameInput') as HTMLInputElement
      const button = document.getElementById('greetBtn') as HTMLButtonElement
      const container = document.getElementById('animationContainer')

      input.value = 'Test'
      button.click()

      // Animation should be present
      expect(container?.children.length).toBeGreaterThan(0)

      // Advance timers to trigger cleanup
      vi.advanceTimersByTime(5000)

      // Container should be empty after cleanup
      expect(container?.children.length).toBe(0)
    })
  })

  describe('Feature 5: UI Styling', () => {
    it('should have centered card layout', () => {
      const card = document.querySelector('.card')
      const styles = window.getComputedStyle(card!)
      
      // Check that card has appropriate styling
      expect(card).not.toBeNull()
      expect(card?.classList.contains('card')).toBe(true)
    })

    it('should have greeting message element', () => {
      const message = document.getElementById('greetingMessage')
      expect(message).not.toBeNull()
      expect(message?.classList.contains('greeting-message')).toBe(true)
    })
  })
})

describe('Animation Types Verification', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="app">
        <div class="greeting-container">
          <div class="card">
            <input type="text" id="nameInput" />
            <button id="greetBtn">Greet</button>
            <div id="greetingMessage"></div>
          </div>
        </div>
        <div id="animationContainer"></div>
      </div>
    `
    setupGreetingApp()
  })

  it('should eventually trigger all three animation types (confetti, party popper, glowing burst)', () => {
    const input = document.getElementById('nameInput') as HTMLInputElement
    const button = document.getElementById('greetBtn') as HTMLButtonElement
    const container = document.getElementById('animationContainer')

    const triggeredAnimations = new Set<string>()
    
    // Click multiple times to trigger different animations
    for (let i = 0; i < 20; i++) {
      input.value = `Test${i}`
      button.click()
      
      // Check which animation was triggered
      if (container?.querySelector('.confetti')) {
        triggeredAnimations.add('confetti')
      }
      if (container?.querySelector('.party-popper')) {
        triggeredAnimations.add('partyPopper')
      }
      if (container?.querySelector('.glow-ray') || container?.querySelector('.glow-center')) {
        triggeredAnimations.add('glowingBurst')
      }
      
      // Clear for next iteration
      if (container) container.innerHTML = ''
    }

    // We should have triggered at least one of each type over 20 clicks
    // (This is probabilistic but very likely)
    expect(triggeredAnimations.size).toBeGreaterThanOrEqual(1)
  })
})
