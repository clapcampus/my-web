// src/components/NavBar.tsx
import { NavLink } from 'react-router-dom';

export default function NavBar() {
    const navItems = [
        { name: '홈', path: '/' },
        { name: '팀 소개', path: '/team' },
        { name: '날씨', path: '/weather' },
        { name: '패션 추천 ✨', path: '/fashion' },
    ];
    console.log('NavBar rendering items:', navItems);

    return (
        <nav>
            <ul className="flex gap-6">
                {navItems.map((item) => (
                    <li key={item.path}>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                `text-sm font-medium transition-colors duration-200 ${isActive
                                    ? 'text-blue-600 dark:text-blue-400'
                                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                                }`
                            }
                        >
                            {item.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}