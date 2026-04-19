// Initialize Lucide Icons
lucide.createIcons();

// Drawer functionality
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const drawer = document.getElementById('drawer');
const overlay = document.getElementById('overlay');

function openDrawer() {
    drawer.classList.remove('translate-x-full');
    drawer.classList.add('translate-x-0');
    overlay.classList.remove('hidden');
    setTimeout(() => {
        overlay.classList.remove('opacity-0');
        overlay.classList.add('opacity-100', 'pointer-events-auto');
    }, 10);
}

function closeDrawer() {
    drawer.classList.remove('translate-x-0');
    drawer.classList.add('translate-x-full');
    overlay.classList.remove('opacity-100', 'pointer-events-auto');
    overlay.classList.add('opacity-0');
    setTimeout(() => {
        overlay.classList.add('hidden');
    }, 300);
}

menuBtn.addEventListener('click', openDrawer);
closeBtn.addEventListener('click', closeDrawer);
overlay.addEventListener('click', closeDrawer);

// --- Step 1 (Verify UID) ---
const checkIdBtn = document.getElementById('check-id-btn');
const uidInput = document.getElementById('player-uid');
const step2 = document.getElementById('step-2');
const statusMsg = document.getElementById('status-msg');

checkIdBtn.addEventListener('click', () => {
    const uid = uidInput.value.trim();
    if (uid.length < 5) {
        alert("দয়া করে সঠিক Player ID দিন!");
        return;
    }

    checkIdBtn.disabled = true;
    uidInput.readOnly = true;
    uidInput.classList.add('opacity-70');
    
    checkIdBtn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Searching Server...';
    lucide.createIcons();
    
    statusMsg.classList.remove('hidden');
    statusMsg.className = 'text-center text-sm font-bold text-yellow-400 animate-pulse mt-2';
    statusMsg.innerText = "Connecting to Garena server...";

    setTimeout(() => {
        statusMsg.innerText = `Verifying UID: ${uid}...`;
        
        setTimeout(() => {
            statusMsg.className = 'text-center text-sm font-bold text-green-400 mt-2';
            statusMsg.innerHTML = '<i data-lucide="check-circle-2" class="w-4 h-4 inline-block mb-1"></i> ID Verified! Eligible for Diamonds.';
            lucide.createIcons();
            
            checkIdBtn.classList.add('hidden'); 
            
            step2.classList.remove('hidden');
            setTimeout(() => {
                step2.classList.remove('opacity-0');
                step2.classList.add('opacity-100');
            }, 50);

        }, 2000);
    }, 1500);
});

// --- Risk / No Risk Selection ---
const btnNoRisk = document.getElementById('btn-no-risk');
const btnRisk = document.getElementById('btn-risk');
const diamondSelect = document.getElementById('diamond-select');
const modeBadge = document.getElementById('mode-badge');
const mainCard = document.getElementById('main-card');
const mainGlow = document.getElementById('main-glow');

let isRiskMode = false;

const noRiskOptions = `
    <option value="30">💎 30 Diamonds</option>
    <option value="45">💎 45 Diamonds</option>
    <option value="70">💎 70 Diamonds</option>
    <option value="150">💎 150 Diamonds</option>
    <option value="300" class="text-green-400 font-bold">💎 300 (Max Safe Limit)</option>
`;

const riskOptions = `
    <option value="1000">💎 1,000 Diamonds</option>
    <option value="5600">💎 5,600 Diamonds</option>
    <option value="10000">💎 10,000 Diamonds</option>
    <option value="99999" class="text-red-500 font-bold">💎 99,999 (High Ban Risk)</option>
`;

diamondSelect.innerHTML = noRiskOptions;

btnNoRisk.addEventListener('click', () => {
    isRiskMode = false;
    btnNoRisk.className = "flex flex-1 justify-center items-center gap-2 bg-green-600/20 border border-green-500 text-green-400 py-2 rounded-lg text-sm font-bold transition-all shadow-[0_0_10px_rgba(34,197,94,0.2)]";
    btnRisk.className = "flex flex-1 justify-center items-center gap-2 bg-black/50 border border-gray-700 text-gray-400 py-2 rounded-lg text-sm font-bold transition-all hover:border-red-500 hover:text-red-400";
    diamondSelect.innerHTML = noRiskOptions;
    
    modeBadge.innerText = "Safe";
    modeBadge.className = "text-green-500";
    mainCard.classList.remove('border-red-500/50', 'shadow-[0_0_30px_rgba(239,68,68,0.2)]');
    mainCard.classList.add('border-orange-500/30', 'shadow-[0_0_30px_rgba(255,136,0,0.1)]');
    mainGlow.style.background = "radial-gradient(circle, rgba(255, 115, 0, 0.4) 0%, rgba(255, 115, 0, 0) 70%)";
    lucide.createIcons();
});

btnRisk.addEventListener('click', () => {
    isRiskMode = true;
    btnRisk.className = "flex flex-1 justify-center items-center gap-2 bg-red-600/20 border border-red-500 text-red-400 py-2 rounded-lg text-sm font-bold transition-all shadow-[0_0_10px_rgba(239,68,68,0.2)]";
    btnNoRisk.className = "flex flex-1 justify-center items-center gap-2 bg-black/50 border border-gray-700 text-gray-400 py-2 rounded-lg text-sm font-bold transition-all hover:border-green-500 hover:text-green-400";
    diamondSelect.innerHTML = riskOptions;
    
    modeBadge.innerText = "RISK";
    modeBadge.className = "text-red-500 text-glow-red";
    mainCard.classList.remove('border-orange-500/30', 'shadow-[0_0_30px_rgba(255,136,0,0.1)]');
    mainCard.classList.add('border-red-500/50', 'shadow-[0_0_30px_rgba(239,68,68,0.2)]');
    mainGlow.style.background = "radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, rgba(239, 68, 68, 0) 70%)";
    lucide.createIcons();
});

// --- Random Live Activity ---
const liveActivityText = document.getElementById('live-activity-text');
const randomDiamondAmounts = ['30', '70', '150', '300', '1,000', '5,600', '10,000', '99,999'];

setInterval(() => {
    const randomPrefix = Math.floor(Math.random() * 900) + 100; 
    const randomAmount = randomDiamondAmounts[Math.floor(Math.random() * randomDiamondAmounts.length)];
    
    liveActivityText.style.opacity = '0'; 
    
    setTimeout(() => {
        liveActivityText.innerHTML = `সর্বশেষ জেনারেট: <span class="text-green-400">ID ${randomPrefix}***</span> পেয়েছে ${randomAmount} 💎`;
        liveActivityText.style.opacity = '1'; 
    }, 300);
}, 3500);

// --- Step 3 (Generate Diamonds Progress Prank) ---
const generateBtn = document.getElementById('generate-btn');
const step3 = document.getElementById('step-3');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const progressPercentage = document.getElementById('progress-percentage');
const terminalOutput = document.getElementById('terminal-output');
const verifyHumanBtn = document.getElementById('verify-human-btn');
const progressHeader = document.getElementById('progress-header');

function addTerminalLog(message, type = 'normal') {
    const div = document.createElement('div');
    if (type === 'error') {
        div.innerHTML = `<span class="text-red-500 font-bold">[ERROR] ${message}</span>`;
    } else if (type === 'warning') {
        div.innerHTML = `<span class="text-yellow-500 font-bold">[WARN] ${message}</span>`;
    } else {
        div.innerHTML = `> ${message}`;
    }
    terminalOutput.prepend(div);
}

generateBtn.addEventListener('click', () => {
    generateBtn.classList.add('hidden');
    diamondSelect.disabled = true;
    btnNoRisk.disabled = true;
    btnRisk.disabled = true;
    
    step3.classList.remove('hidden');
    setTimeout(() => {
        step3.classList.remove('opacity-0');
        step3.classList.add('opacity-100');
    }, 50);

    if(isRiskMode) {
        progressBar.classList.replace('from-orange-600', 'from-red-700');
        progressBar.classList.replace('to-yellow-400', 'to-red-500');
        progressHeader.classList.replace('text-orange-400', 'text-red-500');
        terminalOutput.classList.replace('text-green-400', 'text-red-400');
    }

    progressBar.classList.add('animate-progress');

    let steps = [];
    
    if (!isRiskMode) {
        steps = [
            { time: 0, text: "Initializing safe framework...", log: "Starting payload sequence v2.1.0", type: 'normal' },
            { time: 1000, text: "Connecting securely...", log: "Establishing encrypted connection...", type: 'normal' },
            { time: 2500, text: "Bypassing Security...", log: "Injecting SSL bypass token...", type: 'normal' },
            { time: 4000, text: "Fetching Data...", log: `Target UID: ${uidInput.value} verified.`, type: 'normal' },
            { time: 5500, text: "Injecting Diamonds...", log: `Sending ${diamondSelect.value} Diamonds...`, type: 'normal' },
            { time: 7000, text: "Finalizing...", log: "Clearing traces...", type: 'normal' }
        ];
    } else {
        steps = [
            { time: 0, text: "Forcing connection...", log: "Attempting brute force on server port 443...", type: 'warning' },
            { time: 1500, text: "WARNING: High Volume Request", log: `Amount ${diamondSelect.value} exceeds safe limit!`, type: 'warning' },
            { time: 3000, text: "Security Alert Triggered...", log: "Garena Anti-Cheat AI detecting anomaly...", type: 'error' },
            { time: 4500, text: "Injecting Payload...", log: `Forcing payload for UID: ${uidInput.value}...`, type: 'warning' },
            { time: 6000, text: "SYSTEM ERROR", log: "Connection interrupted by server admin!", type: 'error' },
            { time: 7000, text: "Account Flagged!", log: "UID marked as suspicious.", type: 'error' }
        ];
    }

    let currentPercentage = 0;
    const percentageInterval = setInterval(() => {
        if (currentPercentage < 99) {
            currentPercentage += 1;
            progressPercentage.innerText = `${currentPercentage}%`;
        }
    }, 80);

    steps.forEach(step => {
        setTimeout(() => {
            progressText.innerText = step.text;
            addTerminalLog(step.log, step.type);
            if(step.type === 'error') {
                terminalOutput.classList.add('animate-shake');
                setTimeout(() => terminalOutput.classList.remove('animate-shake'), 500);
            }
        }, step.time);
    });

    setTimeout(() => {
        clearInterval(percentageInterval);
        progressPercentage.innerText = "100%";
        
        if (!isRiskMode) {
            progressText.innerText = "Operation Complete! Verification needed.";
            progressText.classList.replace('text-orange-400', 'text-green-400');
            addTerminalLog("Success! Diamonds queued.", 'normal');
        } else {
            progressText.innerText = "Operation Paused! Verification needed.";
            progressText.classList.replace('text-red-500', 'text-yellow-500');
            progressText.classList.add('text-glow-red');
            addTerminalLog("Process halted. Human verification required to bypass security lock.", 'warning');
        }

        setTimeout(() => {
            terminalOutput.classList.add('opacity-0');
            setTimeout(() => {
                terminalOutput.classList.add('hidden');
                verifyHumanBtn.classList.remove('hidden');
                verifyHumanBtn.classList.add('flex');
            }, 500);
        }, 2000);
        
    }, 8000); 
});

// Prank Button Action (আগে অ্যালার্ট এবং রিলোড ছিল, এখন ফাঁকা করে দেওয়া হয়েছে)
verifyHumanBtn.addEventListener('click', () => {
    // এখানে আপনার নতুন কোড বা লিংক বসাতে পারবেন। আপাতত ক্লিক করলে কিছুই হবে না।
});
