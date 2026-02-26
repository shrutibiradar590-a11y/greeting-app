import './style.css'
import { setupGreetingApp } from './greetingApp.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="greeting-container">
    <div class="card">
      <label for="nameInput" class="input-label">Enter Your Name</label>
      <input type="text" id="nameInput" class="name-input" placeholder="Type your name here" />
      <button id="greetBtn" type="button" class="greet-button">Greet</button>
      <div id="greetingMessage" class="greeting-message"></div>
    </div>
  </div>
  <div id="animationContainer" class="animation-container"></div>
`

setupGreetingApp()
