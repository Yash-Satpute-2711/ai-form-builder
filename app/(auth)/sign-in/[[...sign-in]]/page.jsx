import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="bg-white">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-12">
        <main
          className="flex items-center justify-center col-span-1 px-4 py-4 sm:px-6 sm:py-6 lg:col-span-7 lg:px-8 lg:py-8 xl:col-span-12"
          style={{
            backgroundImage:
              "url('https://wallpapercave.com/wp/wp2508260.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex items-center justify-center w-full max-w-md lg:max-w-lg">
            <SignIn path="/sign-in" />
          </div>
        </main>
      </div>
    </section>
  );
}
