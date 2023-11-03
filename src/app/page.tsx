import { PlaylistInput } from '@/components/PlaylistInput';

export default async function Page() {
  return (
    <main className="sm:my-8 my-2 w-full overflow-hidden break-all">
      <div className="my-4 sm:text-lg text-base flex items-center justify-center">
        <p>Find The length of any Youtube PlayList</p>
      </div>

      <PlaylistInput />
    </main>
  );
}
