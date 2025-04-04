# 🎭 Guess the Character – An Onchain AI Game

## **Overview**

**"Guess the Character"** is an interactive, AI-powered **onchain** game where players chat with an AI agent that takes on the persona of a famous personality. The goal is to **ask questions, gather hints, and correctly guess the character within 5 attempts** to win **onchain rewards**.

If guessed correctly, the player receives:  
✅ **1.25x their entry fee**  
✅ **A mintable LSP8 NFT as a collectible**

If they fail, the entry fee is lost, but they can try again!

## **Tech Stack**

- **Frontend**: Next.js, Shadcn, TailwindCSS, TypeScript
- **AI Agent**: Google Gemini AI (via Vercel AI SDK)
- **Smart Contracts**: Foundry (Solidity)
- **Blockchain Standards**: LSP8 Mintable NFT (LUKSO)
- **Deployment**: Vercel

---

## **Game Flow**

1️⃣ **User connects their Universal Profile (UP) Provider** and selects a category (Football, Cricket, Hollywood, etc.).  
2️⃣ The AI agent initiates the game and requests a **small entry fee (~$2)** via an onchain transaction.  
3️⃣ Once the **transaction is confirmed**, the user has **5 tries** to guess the character's exact name.  
4️⃣ If the user **wins**:

- The **GuessTheCharacter.sol** contract **mints an LSP8 NFT** as a reward.
- The user receives **1.25x their entry fee** back.  
  5️⃣ If the user **loses**, the entry fee is burned, and they can try again.

---

## **Smart Contracts**

### **1. GuessTheCharacter.sol**

- Tracks **active games** for players.
- `startGame()`: Initializes a new game for the player.
- `resolveGame()`: AI agent determines if the player **won or lost**.
- If **won**, the contract:
  - **Mints an NFT** (via CategoryGuessedNFT contract).
  - **Disburses rewards (1.25x entry fee)** to the user.
- If **lost**, the contract **deletes the active game**.

### **2. CategoryGuessedNFT.sol (LSP8 Mintable)**

- Mints **unique NFTs** as **proof of victory**.
- Receives **SVG art from AI agent** and embeds it into the NFT metadata.
- Fully **compatible with The Grid** (LUKSO ecosystem).

---

## **Unique Features & Adoption Strategy**

### 🎮 **Game Enhancements**

- **Parallel Game Modes**: Players can compete in **multiple sessions simultaneously**.
- **Lesser Tries = More Rewards**: Winning with **fewer guesses** earns **higher payouts**.
- **Streak-Based Rewards**: Players who play **daily** get:  
  ✅ **Discounted entry fees**  
  ✅ **Special streak-based NFTs**

### 🚀 **User Growth & Community Engagement**

✅ **First 5 Games Free**: New users can **play for free** to experience the game.  
✅ **Referral System**: Invite friends → They retweet a promo → Earn free game tokens.  
✅ **Early Adopter NFT**: Users who join early **mint an exclusive OG collectible**.

---

## **Deployment & Running Locally**

### **1. Clone the Repo**

```bash
git clone https://github.com/bhavyagor12/celebrity-guesser
cd celebrity-guesser
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Start the Dev Server**

```bash
npm run dev
```

### **4. Deploy on Vercel**

```bash
vercel
```

---

## **Contributing**

🚀 **Pull requests** are welcome! If you have suggestions, feel free to **open an issue**.

## **License**

MIT
