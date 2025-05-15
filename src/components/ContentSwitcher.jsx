import { useState, useEffect } from 'react';

const ScrambleText = ({ text }) => {
    const [displayText, setDisplayText] = useState('');
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';

    useEffect(() => {
        let iterations = 0;
        const interval = setInterval(() => {
            setDisplayText((prev) =>
                text
                    .split('')
                    .map((char, i) => {
                        if (i < iterations) return char;
                        return characters[Math.floor(Math.random() * characters.length)];
                    })
                    .join('')
            );

            if (iterations >= text.length) clearInterval(interval);
            iterations += 1 / 3;
        }, 50);

        return () => clearInterval(interval);
    }, [text]);

    return <h1 className="text-4xl font-bold mb-4">{displayText}</h1>;
};

const AboutContent = () => (
    <>
        <ScrambleText text="Noemi Roos" />
        <p className="text-xl mb-8">2000 / F / AMS, ZÜR, BKK</p>
        <p className="text-lg leading-relaxed mb-12">
            Hi, I'm an AI enthusiast and data science graduate with a focus on projects that blend pragmatism with imagination. My background combines technical training in artificial intelligence with a sense of structure, clarity, and exploration. Whether through code, visuals, or narrative, I'm drawn to work that bridges the digital and the real — in ways that invite both technical depth and a human-centered approach.
        </p>
        <p className="text-lg leading-relaxed mb-12">
            Outside of work, I enjoy picking up new skills, staying up to date with emerging trends, gaming, reading, and making art.
        </p>
    </>
);

const ContactContent = () => (
    <>
        <h1 className="text-4xl font-bold mb-4">Contact</h1>
        <p className="text-lg leading-relaxed mb-12">
            I'm open to collaborations, AI/data roles, and ideas: <a href="mailto:noemi.roos44@gmail.com" className="text-gray-800 hover:underline">noemi.roos44@gmail.com</a>
        </p>
    </>
);

const CreativeProjectsContent = () => (
    <>
        <h1 className="text-4xl font-bold mb-4">Creative & Projects</h1>
        <p className="text-lg leading-relaxed mb-12">
            My <a href="#" className="underline text-gray-800 hover:text-gray-600">creative website</a> is under construction. In the meantime, you can check out my
            <a href="#" className="underline text-gray-800 hover:text-gray-600 ml-1">CV</a>,
            <a href="https://github.com/noemi00" target="_blank" rel="noopener noreferrer" className="underline text-gray-800 hover:text-gray-600 ml-1">GitHub</a> or
            <a href="https://www.goodreads.com/review/list/167495262?ref=nav_mybooks" target="_blank" rel="noopener noreferrer" className="underline text-gray-800 hover:text-gray-600 ml-1">Goodreads</a>.
        </p>
    </>
);

const PixelatedNR = () => (
    <div className="pixelated-nr">
        <svg width="100" height="100" viewBox="0 0 100 100">
            <text x="10" y="40" fontSize="40" fontWeight="bold" fill="#000" fontFamily="monospace">NR</text>
            <filter id="pixelate">
                <feFlood floodColor="#000" result="flood" />
                <feComposite in="flood" in2="SourceAlpha" operator="in" result="mask" />
                <feMorphology in="mask" operator="dilate" radius="1" result="dilated" />
                <feTile in="dilated" result="tiled" />
                <feComposite in="SourceGraphic" in2="tiled" operator="in" />
            </filter>
            <g filter="url(#pixelate)">
                <text x="10" y="40" fontSize="40" fontWeight="bold" fill="#000" fontFamily="monospace">NR</text>
            </g>
        </svg>
    </div>
);

const ContentSwitcher = () => {
    const [currentPage, setCurrentPage] = useState('about');

    const navItems = [
        { name: 'About', id: 'about', active: currentPage === 'about' },
        { name: 'Creative & Projects', id: 'projects', active: currentPage === 'projects' },
        { name: 'Contact', id: 'contact', active: currentPage === 'contact' }
    ];

    const renderContent = () => {
        switch (currentPage) {
            case 'about':
                return <AboutContent />;
            case 'projects':
                return <CreativeProjectsContent />;
            case 'contact':
                return <ContactContent />;
            default:
                return <p>Coming soon...</p>;
        }
    };

    return (
        <main className="min-h-screen flex">
            {/* Left side - Navigation */}
            <div className="w-80 p-8">
                <h2 className="text-2xl mb-8">Profile</h2>
                <nav className="space-y-2 pt-16">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setCurrentPage(item.id)}
                            className={`block py-1 hover:text-gray-600 ${item.active ? 'text-gray-800' : 'text-gray-500'}`}
                        >
                            {item.name}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Vertical divider */}
            <div className="w-px bg-gray-300 h-screen"></div>

            {/* Right side - Content */}
            <div className="flex-1 p-8 max-w-[800px]">
                <div className="pr-8 pt-24">
                    {renderContent()}
                </div>
            </div>
        </main>
    );
};

export default ContentSwitcher; 