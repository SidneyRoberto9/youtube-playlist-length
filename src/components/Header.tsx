import { ThemeButton } from '@/components/ThemeButton';
import { GithubButton } from '@/components/GithubButton';

export function Header() {
  return (
    <header className="flex items-center justify-between h-20 p-4">
      <div className="font-bold select-none">
        <h1 className="sm:text-lg text-base">YOUTUBE PLAYLIST LENGTH</h1>
      </div>

      <div className="flex items-center gap-4">
        <ThemeButton />
        <GithubButton />
      </div>
    </header>
  );
}
