import type { Metadata } from "next";
import LegalShell from "@/components/legal/LegalShell";
import { legal } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms governing use of this site, and the ownership of the work, artwork, music and code presented on it.",
};

export default function TermsPage() {
  const year = new Date().getFullYear();

  return (
    <LegalShell
      title="Terms of Use"
      intro="The short version: look, read and share links freely. The work itself — the art, the music, the code, the writing — stays ours, and nothing here is an offer, a promise or professional advice."
    >
      <h2>1. Agreement</h2>
      <p>
        This site is published by <strong>{legal.entity}</strong>
        {legal.registration ? ` (${legal.registration})` : ""}. By visiting it you accept
        these terms. If you do not accept them, please stop using the site.
      </p>

      <h2>2. Ownership of the work</h2>
      <p>
        © {year} {legal.operator} / {legal.entity}. All rights reserved.
      </p>
      <p>
        Everything on this site — the written copy, the design and source code, the
        digital artwork, the music and audio, the project names, screenshots and
        imagery — is our intellectual property or is used with permission, and is
        protected by the Copyright Act 2022 of Nigeria and by international copyright
        treaties. <strong>PAPAGEDON</strong>, <strong>PAPAGEDON Labs</strong> and{" "}
        <strong>Daddy MUPHASA</strong> are our marks.
      </p>

      <h2>3. What you may do</h2>
      <ul>
        <li>View and read the site for your own personal, non-commercial use.</li>
        <li>Link to it, quote briefly from it with attribution, and share those links.</li>
        <li>
          Ask us for anything more — licensing, collaboration, press use. Written
          permission is usually a short email away.
        </li>
      </ul>

      <h2>4. What you may not do</h2>
      <ul>
        <li>
          Copy, reproduce, republish, sell or distribute the artwork, music, code or
          copy, in whole or in substantial part, without our prior written permission.
        </li>
        <li>
          Present the work as your own, or remove or obscure any credit or copyright
          notice.
        </li>
        <li>
          Scrape or harvest the site in bulk, or use its contents — including the
          artwork and music — to train, fine-tune or evaluate machine learning or
          generative AI systems, without our prior written permission.
        </li>
        <li>
          Attempt to disrupt the site, gain unauthorised access to it, or use it for any
          unlawful purpose.
        </li>
      </ul>

      <h2>5. Nothing here is an offer or advice</h2>
      <p>
        This site is a portfolio. It is published for information only. Descriptions of
        projects in development — including PAPAGEDON — describe present intentions, not
        commitments, and features, timing and scope may change or be abandoned entirely.
      </p>
      <p>
        Nothing on this site is an offer to sell or a solicitation to buy any security,
        token or digital asset, an offer of investment, or financial, legal or
        professional advice. Joining the waitlist creates no contract and reserves no
        product. Any actual engagement, investment or purchase would be governed by a
        separate signed agreement.
      </p>

      <h2>6. Third-party links and platforms</h2>
      <p>
        Links to external services — social platforms, streaming, marketplaces, forms —
        are provided for convenience. We do not control those services, do not endorse
        their content by linking, and are not responsible for them. Anything you buy,
        mint, stream or submit on another platform is between you and that platform.
      </p>

      <h2>7. No warranty</h2>
      <p>
        The site is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;. We make
        no warranty that it will be uninterrupted, error-free, or that the information on
        it is complete or current, and we may change or withdraw any part of it at any
        time without notice.
      </p>

      <h2>8. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by Nigerian law, we are not liable for any
        indirect, incidental or consequential loss — including lost profits, lost data or
        business interruption — arising from your use of, or inability to use, this site
        or anything you found through it. Nothing in these terms excludes liability that
        cannot lawfully be excluded.
      </p>

      <h2>9. Governing law</h2>
      <p>
        These terms are governed by the laws of the {legal.jurisdiction}, and the courts
        of {legal.venue} have exclusive jurisdiction over any dispute arising from them
        or from your use of this site.
      </p>

      <h2>10. Changes</h2>
      <p>
        We may revise these terms from time to time. The version published on this page
        is the one in force, and the date at the top shows when it last changed.
      </p>
    </LegalShell>
  );
}
