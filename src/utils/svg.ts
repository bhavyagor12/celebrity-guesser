export const makeSVG = (characterName: string, category: string) => {
  return `
 <svg width="300" height="350" viewBox="0 0 300 350" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#FFD700; stop-opacity:1" />
                <stop offset="50%" style="stop-color:#FFA500; stop-opacity:1" />
                <stop offset="100%" style="stop-color:#FF4500; stop-opacity:1" />
            </linearGradient>
        </defs>

        <!-- Hexagon Shape -->
        <polygon points="150,20 270,100 270,230 150,310 30,230 30,100"
                 fill="url(#gold-gradient)" stroke="black" stroke-width="5" />

        <text x="50%" y="30%" font-size="22" font-family="Arial" font-weight="bold"
              fill="white" text-anchor="middle">Hey, you guessed</text>
        <text x="50%" y="40%" font-size="24" font-family="Arial" font-weight="bold"
              fill="white" text-anchor="middle">it correctly!</text>
        
        <text x="50%" y="50%" font-size="24" font-family="Arial" font-weight="bold"
              fill="white" text-anchor="middle">${characterName}</text>

        <text x="50%" y="60%" font-size="22" font-family="Arial" font-weight="bold"
              fill="white" text-anchor="middle">${category}</text>
        
        <text x="50%" y="75%" font-size="22" font-family="Arial" font-weight="bold"
              fill="white" text-anchor="middle">Congratulations!</text>
    </svg>
`;
};
