/** The sample site the demo opens: one Liquid page and two partials, styled with Tailwind classes. */
const HEADER = `<header class="flex items-center justify-between px-6 py-4 bg-emerald-900 text-emerald-50" data-edit-name="Header">
  <a href="/" class="text-lg font-bold">Moss &amp; Fern</a>
  <nav class="flex gap-6 text-sm"><a href="/shop">Shop</a><a href="/about">About</a></nav>
</header>
`;

const FOOTER = `<footer class="px-6 py-8 text-sm bg-emerald-950 text-emerald-200" data-edit-name="Footer">&copy; {{ "now" | date: "%Y" }} Moss &amp; Fern</footer>
`;

const HOME = `<style>body{margin:0;font-family:system-ui,sans-serif}</style>
{% render 'header' %}
<section class="flex flex-col gap-6 px-6 py-16 bg-emerald-50 text-emerald-950" id="hero">
  <h1 class="text-4xl font-bold sm:text-5xl">Plants for slow rooms</h1>
  <p class="max-w-xl text-lg">Small-batch houseplants, potted by hand and shipped with care.</p>
  <div class="flex gap-3">
    <a href="/shop" class="rounded-lg bg-emerald-700 px-6 py-3 font-semibold text-white">Shop plants</a>
    <a href="/about" class="rounded-lg border border-emerald-700 px-6 py-3 font-semibold">Our story</a>
  </div>
</section>
<section class="grid gap-6 px-6 py-16 sm:grid-cols-3" id="features">
  <div class="rounded-xl bg-white p-6 shadow">
    <h2 class="text-xl font-semibold">Hand potted</h2>
    <p class="mt-2 text-slate-600">Every plant is repotted in our studio before it ships.</p>
  </div>
  <div class="rounded-xl bg-white p-6 shadow">
    <h2 class="text-xl font-semibold">Care cards</h2>
    <p class="mt-2 text-slate-600">Light, water and soil notes come in the box.</p>
  </div>
  <div class="rounded-xl bg-white p-6 shadow">
    <h2 class="text-xl font-semibold">30-day promise</h2>
    <p class="mt-2 text-slate-600">If it struggles in the first month, we replace it.</p>
  </div>
</section>
{% render 'footer' %}
`;

export const SITE_FILES: Record<string, string> = {
  "pages/index.liquid": HOME,
  "partials/header.liquid": HEADER,
  "partials/footer.liquid": FOOTER,
};
